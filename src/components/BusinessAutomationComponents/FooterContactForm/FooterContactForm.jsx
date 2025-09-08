import { BsCheck2Circle, BsClock } from 'react-icons/bs';
import scss from './FooterContactForm.module.scss';
import { useState } from 'react';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { addContactForm } from '../../../store/slices/contactFormSlice';
import ContactForm from './ContactForm/ContactForm';

export default function FooterContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [formData, setFormData] = useState({ gdprConsent: false });
  const [submitMessage, setSubmitMessage] = useState('');
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.gdprConsent) {
      setSubmitMessage('Будь ласка, погодьтеся з політикою конфіденційності');
      return;
    }

    const formPayload = {
      name,
      email,
      phone,
      plan: 'Автоматизация',
      source: 'businessAutomation',
      dateCreate: new Date().toISOString(),
      status: 'В обробці',
    };

    try {
      await dispatch(addContactForm(formPayload)).unwrap();
      setSubmitMessage('Дякуємо! Ваша заявка успішно відправлена.');
      setName('');
      setEmail('');
      setPhone('');
      setFormData({ gdprConsent: false });
    } catch (error) {
      setSubmitMessage('Помилка при відправці заявки. Спробуйте ще раз.');
      console.error('Form submission error:', error);
    }
  };

  return (
    <section className={scss.footerContactForm} id='contacts'>
      <div className={scss.container}>
        <div className={scss.contentFlexRow}>
          <div className={scss.content}>
            <h1 className={scss.title}>
              Автоматизація — це не майбутнє, це ваша{' '}
              <span className={scss.brand}>конкурентна перевага</span> вже сьогодні
            </h1>
            <p className={scss.subtitle}>
              Поки ваші конкуренти витрачають час на рутину, ви будете масштабувати бізнес
            </p>
          </div>

          <ContactForm
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            phone={phone}
            setPhone={setPhone}
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            submitMessage={submitMessage}
          />
        </div>
      </div>
    </section>
  );
}
