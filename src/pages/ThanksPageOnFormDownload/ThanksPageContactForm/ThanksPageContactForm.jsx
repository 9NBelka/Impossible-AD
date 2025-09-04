import clsx from 'clsx';
import scss from './ThanksPageContactForm.module.scss';

export default function ThanksPageContactForm({
  handleSubmit,
  formData,
  handleInputChange,
  isSubmitting,
  submitMessage,
}) {
  return (
    <form className={scss.contactForm} onSubmit={handleSubmit}>
      <div className={scss.formRow}>
        <div className={scss.formGroup}>
          <label className={scss.formInputNoneMarg}>
            Ім’я <span className={scss.importantText}>*</span>
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
            Пошта <span className={scss.importantText}>*</span>
          </label>
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={scss.formGroup}>
          <label>
            Телефон <span className={scss.importantText}>*</span>
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
            Я згоден на обробку моїх персональних даних відповідно до
            <a href='#' className={scss.privacyLink}>
              Політики конфіденційності
            </a>
          </span>
        </label>
      </div>

      <button
        type='submit'
        className={clsx(scss.submitButton, isSubmitting && scss.submitting)}
        disabled={isSubmitting}>
        {isSubmitting ? 'Відправка...' : 'Замовити консультацію'}
      </button>
      {submitMessage && (
        <div
          className={clsx(
            scss.submitMessage,
            submitMessage.includes('Дякуємо!') ? scss.success : scss.error,
          )}>
          {submitMessage}
        </div>
      )}
    </form>
  );
}
