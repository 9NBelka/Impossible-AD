import clsx from 'clsx';
import scss from './ContactForm.module.scss';
import { BsArrowRightShort } from 'react-icons/bs';

export default function ContactForm({
  name,
  setName,
  email,
  setEmail,
  phone,
  setPhone,
  formData,
  handleInputChange,
  handleSubmit,
  submitMessage,
}) {
  return (
    <div className={scss.formMainBlock}>
      <div className={scss.formInputsAndCheckoutBlock}>
        <div className={scss.formInputsAndCheckout}>
          <div className={scss.formGroup}>
            <label>
              Ім'я <span className={scss.importantText}>*</span>
            </label>
            <input
              type='text'
              value={name}
              name='name'
              onChange={(e) => setName(e.target.value)}
              className={scss.input}
              required
            />
          </div>
          <div className={scss.formGroup}>
            <label>
              Пошта <span className={scss.importantText}>*</span>
            </label>
            <input
              type='email'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            Отримати аудит <BsArrowRightShort className={scss.buttonIconDownload} />
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
  );
}
