import { useDispatch } from 'react-redux';
import scss from './HeroContactForm.module.scss';
import { useState } from 'react';
import clsx from 'clsx';
import { BsArrowRightShort } from 'react-icons/bs';
import { addContactForm } from '../../../../store/slices/contactFormSlice';

export default function HeroContactForm() {
  const [name, setName] = useState('');
  // const [companySTO, setCompanySTO] = useState('');
  // const [site, setSite] = useState('');
  const [city, setCity] = useState('');
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
      // companySTO,
      phone,
      // site,
      city,
      plan: 'СТО Hero',
      source: 'stoHero',
      dateCreate: new Date().toISOString(),
      status: 'В обробці',
    };

    try {
      await dispatch(addContactForm(formPayload)).unwrap();
      setSubmitMessage('Дякуємо! Ваша заявка успішно відправлена.');
      setName('');
      setCity('');
      // setCompanySTO('');
      setPhone('');
      setFormData({ gdprConsent: false });
    } catch (error) {
      setSubmitMessage('Помилка при відправці заявки. Спробуйте ще раз.');
      console.error('Form submission error:', error);
    }
  };
  return (
    <div className={scss.formWidth}>
      <div className={scss.formMainBlock}>
        <div className={scss.formInputsAndCheckoutBlock}>
          <div className={scss.formInputsAndCheckout}>
            <h3>Потрібні кліенти?</h3>
            <div className={scss.formGroup}>
              <label>
                Ім'я <span className={scss.importantText}>*</span>
              </label>
              <input
                type='text'
                name='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={scss.input}
                required
              />
            </div>
            <div className={scss.formGroup}>
              <label>
                Телефон <span className={scss.importantText}>*</span>
              </label>
              <input
                type='tel'
                name='tel'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={scss.input}
                required
              />
            </div>
            <div className={scss.formGroup}>
              <label>
                Місто <span className={scss.importantText}>*</span>
              </label>
              <input
                type='text'
                name='city'
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className={scss.input}
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
                Я згоден на обробку моїх персональних даних відповідно до
                <a href='/privacy-policy' className={scss.privacyLink} target='_blank'>
                  Політики конфіденційності
                </a>
              </span>
            </label>
          </div>
          <div className={scss.blockButtonFlex}>
            <button type='button' onClick={handleSubmit} className={scss.button}>
              Відправити заявку <BsArrowRightShort className={scss.buttonIconDownload} />
            </button>
          </div>
          {submitMessage && (
            <div
              className={clsx(
                scss.submitMessage,
                submitMessage.includes('Дякуємо!') ? scss.success : scss.error,
              )}>
              {submitMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
