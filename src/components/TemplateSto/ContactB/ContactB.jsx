import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addClient } from '../../../store/slices/clientsSlice';
import { addContactForm } from '../../../store/slices/contactFormSlice';
import scss from './ContactB.module.scss';
import { BsChat, BsCheck2, BsClock, BsEnvelope, BsTelephone } from 'react-icons/bs';
import ContactFormB from './ContactFormB/ContactFormB';

export default function ContactB() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
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
      setSubmitMessage('Будь ласка, ухваліть політику конфіденційності для продовження.');
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const dateCreate = new Date().toISOString();
      const status = 'В обработке';
      const plan = formData.service;

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
        company: formData.company,
        phone: formData.phone,
        source: 'main', // Add source to indicate main page form
      };

      // Dispatch to add to 'clients' collection
      await dispatch(addClient(clientData)).unwrap();

      // Dispatch to add to 'contactform' collection
      await dispatch(addContactForm(contactFormData)).unwrap();

      setSubmitMessage('Дякуємо! Ми зв`яжемося з вами протягом 24 годин.');
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        service: '',
        gdprConsent: false,
      });
    } catch (error) {
      setSubmitMessage('Помилка при надсиланні форми. Будь ласка, спробуйте пізніше.');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={scss.contact}>
      <div className={scss.container}>
        <h2>Онлайн-запис</h2>
        <p className={scss.sectionSubtitle}>
          Забронюйте зручний час для обслуговування вашого автомобіля
        </p>

        <div className={scss.contactContent}>
          <div className={scss.contactInfo}>
            <h3>Контактна інформація</h3>
            <div className={scss.contactItem}>
              <BsEnvelope className={scss.contactIcon} />
              <div>
                <p className={scss.contactItemTitleMini}>Email</p>
                <a href='mailto:example@gmail.com' className={scss.contactLink}>
                  <p className={scss.contactItemTextMini}>example@gmail.com</p>
                </a>
              </div>
            </div>
            <div className={scss.contactItem}>
              <BsTelephone className={scss.contactIcon} />
              <div>
                <p className={scss.contactItemTitleMini}>Телефон</p>
                <a href='tel:+3800000000'>
                  <p className={scss.contactItemTextMini}>+380 (XX) XXX-XX-XX</p>
                </a>
              </div>
            </div>
            <div className={scss.contactItem}>
              <BsChat className={scss.contactIcon} />
              <div>
                <p className={scss.contactItemTitleMini}>Telegram / WhatsApp</p>
                <a href='https://t.me/example' target='_blank'>
                  <p className={scss.contactItemTextMini}>@example</p>
                </a>
              </div>
            </div>
            <div className={scss.contactItem}>
              <BsClock className={scss.contactIcon} />
              <div>
                <p className={scss.contactItemTitleMini}>Графік роботи</p>
                <p className={scss.contactItemTextMini}>Пн–Сб, 9:00–18:00 (GMT+2)</p>
              </div>
            </div>
          </div>

          <ContactFormB
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
