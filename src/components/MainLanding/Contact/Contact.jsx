// src/components/Contact.jsx (updated)
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addClient } from '../../../store/slices/clientsSlice';
import { addContactForm } from '../../../store/slices/contactFormSlice';
import scss from './Contact.module.scss';
import { BsCheck2 } from 'react-icons/bs';
import ContactForm from './ContactForm/ContactForm';

export default function Contact() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    // serviceE: '',
    message: '',
    gdprConsent: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.gdprConsent) {
      setSubmitMessage('Пожалуйста, примите политику конфиденциальности для продолжения.');
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const dateCreate = new Date().toISOString();
      const status = 'В обработке';
      const plan = formData.service || formData.serviceE; // Use service or serviceE as plan; fallback to first if both present

      // Prepare data for both collections
      const clientData = {
        ...formData,
        dateCreate,
        status,
        plan,
      };

      const contactFormData = {
        dateCreate,
        email: formData.email,
        name: formData.name,
        plan,
        status,
        company: formData.company, // Include additional fields as needed
        phone: formData.phone,
        message: formData.message,
        // serviceE: formData.serviceE,
      };

      // Dispatch to add to 'clients' collection
      await dispatch(addClient(clientData)).unwrap();

      // Dispatch to add to 'contactform' collection
      await dispatch(addContactForm(contactFormData)).unwrap();

      setSubmitMessage('Спасибо! Мы свяжемся с вами в течение 24 часов.');
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        service: '',
        // serviceE: '',
        message: '',
        gdprConsent: false,
      });
    } catch (error) {
      setSubmitMessage('Ошибка при отправке формы. Пожалуйста, попробуйте позже.');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id='contact' className={scss.contact}>
      <div className={scss.container}>
        <h2>Готовы усилить свое цифровое присутствие?</h2>
        <p className={scss.sectionSubtitle}>
          Свяжитесь с нами для бесплатной консультации и индивидуальной стратегии для вашего бизнеса
        </p>

        <div className={scss.contactContent}>
          <div className={scss.contactInfo}>
            <h3>Начните сегодня</h3>
            <div className={scss.contactItem}>
              <p className={scss.contactItemTitleMini}>Время ответа:</p>
              <p className={scss.contactItemTextMini}>В течение 24 часов</p>
            </div>
            <div className={scss.contactItem}>
              <p className={scss.contactItemTitleMini}>Бесплатная консультация:</p>
              <p className={scss.contactItemTextMini}>30-минутная стратегическая сессия</p>
            </div>
            <div className={scss.contactItem}>
              <p className={scss.contactItemTitleMini}>Индивидуальное предложение:</p>
              <p className={scss.contactItemTextMini}> Адаптированное под ваши потребности</p>
            </div>
            <div className={scss.trustBadges}>
              <div className={scss.badge}>
                <BsCheck2 className={scss.iconBadge} /> <p>Соответствие GDPR</p>
              </div>
              <div className={scss.badge}>
                <BsCheck2 className={scss.iconBadge} /> <p>ISO сертификация</p>
              </div>
              <div className={scss.badge}>
                <BsCheck2 className={scss.iconBadge} /> <p>Опыт 5+ лет</p>
              </div>
            </div>
          </div>

          <ContactForm
            handleSubmit={handleSubmit}
            formData={formData}
            handleInputChange={handleInputChange}
            isSubmitting={isSubmitting}
            submitMessage={submitMessage}
          />
        </div>
      </div>
    </section>
  );
}
