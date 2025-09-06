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

  const auditText = [
    {
      title: 'Аналіз структури кампаній',
    },
    {
      title: 'Перевірка налаштувань',
    },
  ];

  const auditText2 = [
    {
      title: 'Оптимізація ключових слів',
    },
    {
      title: 'План покращень з цифрами',
    },
  ];

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
      plan: 'google Ads',
      source: 'googleAds', // Updated to reflect GoogleAds page
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
    <section className={scss.footerContactForm} id='contact'>
      <div className={scss.container}>
        <div className={scss.contentFlexRow}>
          <div className={scss.content}>
            <h1 className={scss.title}>
              Залиште заявку — отримаєте аудит Google Ads за 72 години!
            </h1>
            <p className={scss.subtitle}>
              Детальний аналіз ваших кампаній з конкретними рекомендаціями для покращення ROI
            </p>
          </div>
          <div className={scss.infoForAuditBlock}>
            <h6>Що ви отримаєте в аудиті:</h6>
            <div className={scss.iconAndTextBlock}>
              <div className={scss.containerText}>
                {auditText.map((text, idx) => (
                  <div className={scss.iconAndText} key={idx}>
                    <BsCheck2Circle className={scss.iconAudit} />
                    <p>{text.title}</p>
                  </div>
                ))}
              </div>
              <div className={scss.containerText}>
                {auditText2.map((text, idx) => (
                  <div className={scss.iconAndText} key={idx}>
                    <BsCheck2Circle className={scss.iconAudit} />
                    <p>{text.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <ContactForm
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

          <div className={scss.iconAndTextBlockFooter}>
            <div className={scss.iconAndText}>
              <BsClock className={scss.iconForm} />
              <p>Результат за 72 години</p>
            </div>
            <div className={scss.iconAndText}>
              <BsCheck2Circle className={clsx(scss.iconForm, scss.greenIcon)} />
              <p>Безкоштовна консультація</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
