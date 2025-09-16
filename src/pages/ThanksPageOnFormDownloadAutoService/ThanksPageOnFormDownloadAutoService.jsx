import clsx from 'clsx';
import scss from './ThanksPageOnFormDownloadAutoService.module.scss';
import { useState } from 'react';
import { addContactForm } from '../../store/slices/contactFormSlice';
import { useDispatch } from 'react-redux';
import ThanksPageContactForm from './ThanksPageContactForm/ThanksPageContactForm';
import { BsArrowLeftShort, BsBoxArrowInDown } from 'react-icons/bs';

export default function ThanksPageOnFormDownloadAutoService() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
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
      const contactFormData = {
        dateCreate,
        email: formData.email,
        name: formData.name,
        phone: formData.phone,
        source: 'thanks', // Add source to indicate thanks page form
        status: 'В обработке',
        plan: 'Чек-лист СТО PDF', // Add plan to indicate the form purpose
      };

      // Dispatch to add to 'contactform' collection
      await dispatch(addContactForm(contactFormData)).unwrap();

      setSubmitMessage('Дякуємо! Ми зв`яжемося з вами протягом 24 годин.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        gdprConsent: false,
      });
    } catch (error) {
      setSubmitMessage('Помилка при надсиланні форми. Будь ласка, спробуйте пізніше.');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to handle PDF download
  const handleDownload = () => {
    const pdfUrl = '/CheckListSto.pdf'; // Path to the PDF in the public folder
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'CheckListSto.pdf'; // Name of the file when downloaded
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // Clean up
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className={scss.backgroundBlock}>
      <div className={scss.container}>
        <div className={scss.thanksPageBlock}>
          <img src='/images/imageForThanksPageDownload.png' alt='imageForThanksPageDownload' />
          <h2>
            <span>🎉</span> Дякуємо, ваш чек-лист вже у вас!
          </h2>
          {/* <p className={scss.thanksPageDescriptionOrange}>
            Нема листа? Перевірте Вхідні → Промоакції/Спам/Усі листи.
          </p> */}
          {/* <p className={clsx(scss.thanksPageDescriptionOrange, scss.thanksPageDescription)}>
            Ви зробили перший крок до того, щоб зрозуміти, чому Google-реклама може “зливати” бюджет
            і як цього уникнути. Перевірте вашу пошту — ми надіслали чек-лист із покроковими
            інструкціями.
          </p> */}

          <p className={clsx(scss.thanksPageDescriptionOrange, scss.thanksPageDescription)}>
            Ви зробили перший крок до того, щоб зрозуміти, чому Google-реклама може “зливати” бюджет
            і як цього уникнути. Натисніть на кнопку "завантажити" щоб отримати ваш чек-лист із
            покроковими інструкціями.
          </p>
          <button className={scss.downloadButton} onClick={handleDownload}>
            Завантажити <BsBoxArrowInDown className={scss.iconDownload} />
          </button>
          <p className={clsx(scss.thanksPageDescriptionOrange, scss.thanksPageDescription)}>
            💡 Порада:
          </p>
          <p
            className={clsx(
              scss.thanksPageDescriptionOrange,
              scss.thanksPageDescription,
              scss.noMarg,
            )}>
            Якщо хочете заощадити час і отримати ще глибший аналіз — замовте безкоштовну
            консультацію від наших експертів. Ми покажемо, де саме ваш акаунт втрачає гроші, і
            підкажемо, як це виправити.
          </p>
          <ThanksPageContactForm
            handleSubmit={handleSubmit}
            formData={formData}
            handleInputChange={handleInputChange}
            isSubmitting={isSubmitting}
            submitMessage={submitMessage}
          />
        </div>
      </div>
      <button onClick={handleBack} className={scss.backButton}>
        <BsArrowLeftShort className={scss.iconBack} />
        Повернутись
      </button>
    </div>
  );
}
