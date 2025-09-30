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
            placeholder='Введіть ваше ім`я'
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
            placeholder='example@gmail.com'
            required
          />
        </div>
      </div>

      <div className={scss.formRow}>
        <div className={scss.formGroup}>
          <label>Марка/модель автомобіля</label>
          <input
            type='text'
            name='company'
            value={formData.company}
            onChange={handleInputChange}
            placeholder='Наприклад: Toyota Camry 2018'
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
            placeholder='+380 (XX) XXX-XX-XX'
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
          <option value='Заміна моторної оливи'>Заміна моторної оливи</option>
          <option value='Комп`ютерна діагностика'>Комп'ютерна діагностика</option>
          <option value='Заміна гальмівних колодок'>Заміна гальмівних колодок</option>
          <option value='Ремонт двигуна'>Ремонт двигуна</option>
          <option value='Я не визначився, хочу консультацію'>
            Я не визначився, хочу консультацію
          </option>
        </select>
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
