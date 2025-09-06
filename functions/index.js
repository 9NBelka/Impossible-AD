import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import { initializeApp } from 'firebase-admin/app';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

initializeApp();

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export const notifyTelegramOnNewContact = onDocumentCreated(
  'contactform/{docId}',
  async (event) => {
    console.log('Переменные окружения:', {
      TELEGRAM_TOKEN,
      TELEGRAM_CHAT_ID,
      env: process.env,
    });

    if (!TELEGRAM_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error('Переменные окружения TELEGRAM_TOKEN или TELEGRAM_CHAT_ID не установлены', {
        TELEGRAM_TOKEN,
        TELEGRAM_CHAT_ID,
      });
      return;
    }

    console.log('Функция notifyTelegramOnNewContact вызвана для документа:', event.data.id);
    const newFormData = event.data.data();
    console.log('Данные документа:', newFormData);

    // Форматирование даты для Украины (Europe/Kyiv, UTC+3)
    let formattedDate = 'Не указано';
    if (newFormData.dateCreate) {
      try {
        const date = new Date(newFormData.dateCreate);
        formattedDate = date
          .toLocaleString('ru-UA', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: 'Europe/Kyiv',
          })
          .replace(',', '');
      } catch (error) {
        console.error('Ошибка форматирования даты:', error.message);
      }
    }

    // Определяем заголовок в зависимости от source
    let formSource;
    switch (newFormData.source) {
      case 'thanks':
        formSource = 'страницы Благодарности';
        break;
      case 'googleAds':
        formSource = 'GoogleAds';
        break;
      default:
        formSource = 'Главной страницы';
    }

    // Формируем сообщение, исключая поля, которых нет в форме благодарности
    const message = `
*Новая заявка из контактной формы ${formSource}!*
*Имя*: ${newFormData.name || 'Не указано'}
*Email*: ${newFormData.email || 'Не указано'}
${
  newFormData.source == 'Главной страницы'
    ? `*Компания*: ${newFormData.company || 'Не указано'}\n*Сообщение*: ${
        newFormData.message || 'Не указано'
      }\n`
    : ''
}
*Телефон*: ${newFormData.phone || 'Не указано'}
*Услуга*: ${newFormData.plan || 'Не указано'}
*Дата*: ${formattedDate}
*Статус*: ${newFormData.status || 'В обработке'}
`;

    try {
      const response = await axios.post(
        `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`,
        {
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'Markdown',
        },
      );
      console.log('Уведомление отправлено в Telegram:', response.data);
    } catch (error) {
      console.error('Ошибка отправки в Telegram:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
    }
  },
);
