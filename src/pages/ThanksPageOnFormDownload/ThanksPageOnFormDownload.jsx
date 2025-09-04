import clsx from 'clsx';
import scss from './ThanksPageOnFormDownload.module.scss';
import { useState } from 'react';
import { addContactForm } from '../../store/slices/contactFormSlice';
import { useDispatch } from 'react-redux';

export default function ThanksPageOnFormDownload() {
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
      setSubmitMessage('Пожалуйста, примите политику конфиденциальности для продолжения.');
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
      };

      // Dispatch to add to 'contactform' collection
      await dispatch(addContactForm(contactFormData)).unwrap();

      setSubmitMessage('Спасибо! Мы свяжемся с вами в течение 24 часов.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        gdprConsent: false,
      });
    } catch (error) {
      setSubmitMessage('Ошибка при отправке формы. Пожалуйста, попробуйте позже.');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className={scss.backgroundBlock}>
      <div className={scss.container}>
        <div className={scss.thanksPageBlock}>
          <img src='/images/imageForThanksPageDownload.png' alt='imageForThanksPageDownload' />
          <h2>🎉 Дякуємо, ваш чек-лист вже у вас!</h2>
          <p className={scss.thanksPageDescriptionOrange}>
            Нема листа? Перевірте Вхідні → Промоакції/Спам/Усі листи.
          </p>
          <p className={clsx(scss.thanksPageDescriptionOrange, scss.thanksPageDescription)}>
            Ви зробили перший крок до того, щоб зрозуміти, чому Google-реклама може “зливати” бюджет
            і як цього уникнути. Перевірте вашу пошту — ми надіслали чек-лист із покроковими
            інструкціями.
          </p>
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

          <form className={scss.contactForm} onSubmit={handleSubmit}>
            <div className={scss.formRow}>
              <div className={scss.formGroup}>
                <label className={scss.formInputNoneMarg}>
                  Полное имя <span className={scss.importantText}>*</span>
                </label>
                <input
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className={scss.formGroup}>
                <label className={clsx(scss.formInputNoneMarg, scss.formInputYepMarg)}>
                  Email адрес <span className={scss.importantText}>*</span>
                </label>
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className={scss.formRow}>
              <div className={scss.formGroup}>
                <label>
                  Номер телефона <span className={scss.importantText}>*</span>
                </label>
                <input
                  type='tel'
                  name='phone'
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className={clsx(scss.formGroup, scss.checkboxGroup)}>
              <label className={scss.checkboxLabel}>
                <input
                  type='checkbox'
                  name='gdprConsent'
                  checked={formData.gdprConsent}
                  onChange={handleInputChange}
                  required
                />
                <span className={scss.checkmark}></span>
                <span className={scss.checkmarkText}>
                  Я согласен на обработку моих персональных данных в соответствии с
                  <a href='#' className={scss.privacyLink}>
                    Политикой конфиденциальности
                  </a>
                </span>
              </label>
            </div>

            <button
              type='submit'
              className={clsx(scss.submitButton, isSubmitting && scss.submitting)}
              disabled={isSubmitting}>
              {isSubmitting ? 'Отправка...' : 'Получить бесплатную консультацию'}
            </button>

            {submitMessage && (
              <div
                className={clsx(
                  scss.submitMessage,
                  submitMessage.includes('Спасибо') ? scss.success : scss.error,
                )}>
                {submitMessage}
              </div>
            )}
          </form>
        </div>

        <button onClick={handleBack} className={scss.backButton}>
          Назад
        </button>
      </div>
    </div>
  );
}
