import clsx from 'clsx';
import scss from './ContactFormB.module.scss';

export default function ContactFormB({
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
      </div>

      <div className={scss.formRow}>
        <div className={scss.formGroup}>
          <label>Назва компанії (опціонально)</label>
          <input type='text' name='company' value={formData.company} onChange={handleInputChange} />
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

      <div className={scss.formGroup}>
        <label>
          Послуга, що цікавить <span className={scss.importantText}>*</span>
        </label>
        <select name='service' value={formData.service} onChange={handleInputChange} required>
          <option value=''>Виберіть послугу</option>
          <option value='Комплексная услуга'>Комплексная услуга</option>
          <option value='Реклама в социальных сетях'>Реклама в социальных сетях</option>
          <option value='Реклама на веб-сайтах'>Реклама на веб-сайтах</option>
          <option value='Индивидуальные лендинг-страницы'>Индивидуальные лендинг-страницы</option>
          <option value='Полный маркетинговый пакет'>Полный маркетинговый пакет</option>
          <option value='Я не определился, хочу консультацию'>
            Я не определился, хочу консультацию
          </option>
        </select>
      </div>

      {/* <div className={scss.formGroup}>
              <label>Интересующая услуга (опционально)</label>
              <select name='serviceE' value={formData.serviceE} onChange={handleInputChange}>
                <option value=''>Выберите услугу</option>
                <option value='Реклама в социальных сетях'>Реклама в социальных сетях</option>
                <option value='Реклама на веб-сайтах'>Реклама на веб-сайтах</option>
                <option value='Индивидуальные лендинг-страницы'>
                  Индивидуальные лендинг-страницы
                </option>
                <option value='Полный маркетинговый пакет'>Полный маркетинговый пакет</option>
              </select>
            </div> */}

      <div className={scss.formGroup}>
        <label>Розкажіть про ваш проект (опціонально)</label>
        <textarea
          name='message'
          value={formData.message}
          onChange={handleInputChange}
          rows='4'
          placeholder='Опишіть ваші цілі, цільову аудиторію та те, як виглядає успіх для вашого бізнесу.'></textarea>
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
        {isSubmitting ? 'Відправка...' : 'Отримати безкоштовну консультацію'}
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
