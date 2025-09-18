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
      TELEGRAM_TOKEN: TELEGRAM_TOKEN ? 'Установлен' : 'Не установлен',
      TELEGRAM_CHAT_ID: TELEGRAM_CHAT_ID ? 'Установлен' : 'Не установлен',
    });

    if (!TELEGRAM_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error('Переменные окружения TELEGRAM_TOKEN или TELEGRAM_CHAT_ID не установлены', {
        TELEGRAM_TOKEN: TELEGRAM_TOKEN ? 'Установлен' : 'Не установлен',
        TELEGRAM_CHAT_ID: TELEGRAM_CHAT_ID ? 'Установлен' : 'Не установлен',
      });
      return;
    }

    const newFormData = event.data.data();
    console.log('Данные документа:', newFormData);

    // Форматирование даты для Украины (Europe/Kyiv, UTC+3)
    let formattedDate = 'Не указано';
    if (newFormData.dateCreate) {
      try {
        const date = new Date(newFormData.dateCreate);
        formattedDate = date
          .toLocaleString('uk-UA', {
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
        formSource = 'страница Благодарности';
        break;
      case 'thanks-sto':
        formSource = 'страница Благодарности СТО';
        break;
      case 'googleAdsAudit':
        formSource = 'страница GoogleAdsAudit';
        break;
      case 'googleAds':
        formSource = 'страница GoogleAds';
        break;
      case 'webdevelopment':
        formSource = 'страница Веб-разработки';
        break;
      case 'businessAutomation':
        formSource = 'страница Автоматизации';
        break;
      case 'sto':
        formSource = 'страница СТО';
        break;
      case 'stoHero':
        formSource = 'страница СТО HeroBlock';
        break;
      default:
        formSource = 'Главная страница';
    }

    const messageParts = [
      `🔥 *Новая заявка!* 🔥`,
      `Источник: ${formSource}\n`,
      '',
      `👤 *Имя*: ${newFormData.name || '❌ Не указано'}`,
      newFormData.source !== 'sto' && newFormData.source !== 'stoHero'
        ? `📧 *Email*: ${newFormData.email || '❌ Не указано'}`
        : null,
      newFormData.source === 'sto'
        ? `
🏢 *Город*: ${newFormData.city || '❌ Не указано'}
🚗 *Название СТО*: ${newFormData.companySTO || '❌ Не указано'}
🔗 *Сайт*: ${newFormData.site || '❌ Не указано'}
`
        : null,
      newFormData.source === 'stoHero'
        ? `🏢 *Город*: ${newFormData.city || '❌ Не указано'}`
        : null,
      newFormData.source === ''
        ? `
🏢 *Компания*: ${newFormData.company || '❌ Не указано'}
💬 *Сообщение*: ${newFormData.message || '❌ Не указано'}`
        : null,
      '',
      `📱 *Телефон*: ${newFormData.phone || '❌ Не указано'}`,
      `⚙️ *Услуга*: ${newFormData.plan || '❌ Не указано'}`,
      `📅 *Дата*: ${formattedDate}`,
      `⏳ *Статус*: ${newFormData.status || 'В обработке'}`,
    ];

    // Фильтруем null и пустые строки, объединяем с переносом строк
    const message = messageParts.filter((part) => part !== null && part.trim() !== '').join('\n');

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
