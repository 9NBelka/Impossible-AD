const { onDocumentCreated } = require('firebase-functions/v2/firestore');
const { initializeApp } = require('firebase-admin/app');
const axios = require('axios');

initializeApp();

const TELEGRAM_TOKEN = import.meta.env.TELEGRAM_TOKEN;
const TELEGRAM_CHAT_ID = import.meta.env.TELEGRAM_CHAT_ID;

exports.notifyTelegramOnNewContact = onDocumentCreated('contactform/{docId}', async (event) => {
  const newFormData = event.data.data();

  // Форматирование даты для Украины (Europe/Kyiv, UTC+3)
  let formattedDate = 'Не указано';
  if (newFormData.dateCreate) {
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
  }

  const message = `
Новая заявка из контактной формы!
Имя: ${newFormData.name || 'Не указано'}
Email: ${newFormData.email || 'Не указано'}
Компания: ${newFormData.company || 'Не указано'}
Телефон: ${newFormData.phone || 'Не указано'}
Услуга: ${newFormData.plan || 'Не указано'} ${
    newFormData.serviceE ? `(Доп: ${newFormData.serviceE})` : ''
  }
Сообщение: ${newFormData.message || 'Не указано'}
Дата: ${formattedDate}
Статус: ${newFormData.status || 'В обработке'}
`;

  try {
    await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: 'HTML',
    });
    console.log('Уведомление отправлено в чат с ботом!');
  } catch (error) {
    console.error('Ошибка отправки в Telegram:', error.message);
  }
});
