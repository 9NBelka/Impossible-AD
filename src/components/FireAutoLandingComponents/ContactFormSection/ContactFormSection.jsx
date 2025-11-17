import { useState } from 'react';
import { FaClock, FaPhone, FaUser } from 'react-icons/fa';
import axios from 'axios';
import styles from './ContactFormSection.module.scss';

const services = [
  'Діагностика автомобіля',
  'Діагностика перед покупкою',
  'Планове ТО',
  'Підбір запчастин',
  'Ремонт ходової',
  'Ремонт двигуна',
  'Ремонт гальмівної системи',
  'Ремонт рульової групи',
  'Ремонт трансмісійної групи',
  'Ремонт паливної системи',
  'Реставрація та ремонт турбін',
  'Ремонт коробки передач та зчеплення',
  'Заміна мастил, фільтрів роботизованих КПП',
  'Заміна мастил, фільтрів DSG та Power Shift',
  'Шиномонтаж та балансування',
  'Заміна витратних матеріалів та компонентів',
  'Детейлінг',
];

const ContactFormSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    car: '',
    service: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage('');

    try {
      const message = `
      Новий запис на сервіс:

      👤 Ім'я: ${formData.name}
      📱 Телефон: ${formData.phone}
      🚗 Автомобіль: ${formData.car || 'Не вказано'}
      ⚙️ Послуга: ${formData.service || 'Не вказано'}
    `;

      const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN_FIREAUTO;
      const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID_FIREAUTO;

      if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
        throw new Error('Telegram Bot Token или Chat ID не настроены в .env');
      }

      // https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage

      const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

      const response = await axios.post(telegramUrl, {
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'Markdown',
      });

      setSuccessMessage("Дякуємо, що відправили заявку! Ми зв'яжемося з вами найближчим часом.");
      setFormData({ name: '', phone: '', car: '', service: '' });
    } catch (error) {
      console.error('Помилка відправки даних:', error);
      alert('Виникла помилка при відправці даних. Спробуйте ще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id='contacts' className={styles.bookingSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Онлайн-запис</h2>
          <p className={styles.description}>
            Забронюйте зручний час для обслуговування вашого автомобіля
          </p>
        </div>

        <div className={styles.cardContainer}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>Записатися на сервіс</h3>
              <p className={styles.cardDescription}>
                Заповніть форму і ми зв'яжемося з вами для підтвердження
              </p>
            </div>
            <div className={styles.cardContent}>
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formFlex}>
                  <div className={styles.formGroup}>
                    <label htmlFor='name' className={styles.label}>
                      <FaUser className={styles.labelIcon} />
                      Ім'я *
                    </label>
                    <input
                      id='name'
                      placeholder="Введіть ваше ім'я"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor='phone' className={styles.label}>
                      <FaPhone className={styles.labelIcon} />
                      Телефон *
                    </label>
                    <input
                      id='phone'
                      type='tel'
                      placeholder='+380 (XX) XXX-XX-XX'
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      required
                      className={styles.input}
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor='car' className={styles.label}>
                    Марка/модель автомобіля
                  </label>
                  <input
                    id='car'
                    placeholder='Наприклад: Toyota Camry 2018'
                    value={formData.car}
                    onChange={(e) => handleInputChange('car', e.target.value)}
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor='service' className={styles.label}>
                    Послуга
                  </label>
                  <select
                    id='service'
                    value={formData.service}
                    onChange={(e) => handleInputChange('service', e.target.value)}
                    className={styles.select}>
                    <option value='' disabled>
                      Оберіть послугу
                    </option>
                    {services.map((service, index) => (
                      <option key={index} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.submitGroup}>
                  <button type='submit' className={styles.submitButton} disabled={isSubmitting}>
                    {isSubmitting ? 'Відправка...' : 'Записатися'}
                  </button>
                  {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
                </div>
              </form>

              <div className={styles.infoCard}>
                <div className={styles.infoHeader}>
                  <FaClock className={styles.infoIcon} />
                  Що далі?
                </div>
                <p className={styles.infoText}>
                  Після отримання заявки наш менеджер зв'яжемося з вами протягом 15 хвилин для
                  підтвердження запису та уточнення деталей.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;
