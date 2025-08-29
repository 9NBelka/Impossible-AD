import clsx from 'clsx';
import scss from './ContactForm.module.scss';

export default function ContactForm({
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
          <label>Название компании (опционально)</label>
          <input type='text' name='company' value={formData.company} onChange={handleInputChange} />
        </div>
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

      <div className={scss.formGroup}>
        <label>
          Интересующая услуга <span className={scss.importantText}>*</span>
        </label>
        <select name='service' value={formData.service} onChange={handleInputChange} required>
          <option value=''>Выберите услугу</option>
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
        <label>Расскажите о вашем проекте (опционально)</label>
        <textarea
          name='message'
          value={formData.message}
          onChange={handleInputChange}
          rows='4'
          placeholder='Опишите ваши цели, целевую аудиторию и то, как выглядит успех для вашего бизнеса...'></textarea>
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
            и согласен на контакт по моему запросу.
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
  );
}
