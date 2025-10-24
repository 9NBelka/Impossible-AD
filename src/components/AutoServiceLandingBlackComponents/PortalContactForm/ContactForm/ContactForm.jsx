import clsx from 'clsx';
import scss from './ContactForm.module.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsArrowRightShort } from 'react-icons/bs';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+380');
  const [formData, setFormData] = useState({ gdprConsent: false });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Проверка email формата
  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  // Проверка телефона — минимум 9 цифр (без +, скобок и пробелов)
  const isValidPhone = (phone) => {
    const digits = phone.replace(/\D/g, '');
    return digits.length >= 9;
  };

  // Форматирование телефона под шаблон +380 (__) ___-__-__
  const formatPhoneNumber = (value) => {
    const digits = value.replace(/\D/g, '');
    let formatted = '+380';

    if (digits.startsWith('380')) {
      const rest = digits.slice(3);
      if (rest.length > 0) formatted += ' ';
      if (rest.length <= 2) formatted += `(${rest}`;
      else if (rest.length <= 5) formatted += `(${rest.slice(0, 2)}) ${rest.slice(2)}`;
      else if (rest.length <= 7)
        formatted += `(${rest.slice(0, 2)}) ${rest.slice(2, 5)}-${rest.slice(5)}`;
      else if (rest.length <= 9)
        formatted += `(${rest.slice(0, 2)}) ${rest.slice(2, 5)}-${rest.slice(5, 7)}-${rest.slice(
          7,
        )}`;
    } else if (digits.startsWith('0')) {
      const rest = digits.slice(1);
      formatted = '+380';
      if (rest.length > 0) formatted += ' ';
      if (rest.length <= 2) formatted += `(${rest}`;
      else if (rest.length <= 5) formatted += `(${rest.slice(0, 2)}) ${rest.slice(2)}`;
      else if (rest.length <= 7)
        formatted += `(${rest.slice(0, 2)}) ${rest.slice(2, 5)}-${rest.slice(5)}`;
      else if (rest.length <= 9)
        formatted += `(${rest.slice(0, 2)}) ${rest.slice(2, 5)}-${rest.slice(5, 7)}-${rest.slice(
          7,
        )}`;
    }

    return formatted;
  };

  const handlePhoneChange = (e) => {
    const input = e.target.value;

    // Разрешаем только цифры, пробелы, скобки, дефисы и "+"
    if (/^[0-9+\-()\s]*$/.test(input)) {
      setPhone(formatPhoneNumber(input));
    }
  };

  const handleInputChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!name.trim()) newErrors.name = "Введіть ваше ім'я";
    if (!email.trim()) newErrors.email = 'Введіть вашу пошту';
    else if (!isValidEmail(email)) newErrors.email = 'Некоректна пошта';
    if (!phone.trim() || !isValidPhone(phone)) newErrors.phone = 'Введіть коректний номер телефону';
    if (!formData.gdprConsent)
      newErrors.gdprConsent = 'Потрібно погодитися з політикою конфіденційності';

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const data = { name, email, phone };

    try {
      const response = await fetch('https://hook.eu2.make.com/d1ylv3c1bgtgog8tn970gyv7jidg8iw9', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // 1. Скачивание PDF
      const pdfUrl = '/CheckListSto.pdf';
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = 'CheckListSto.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // 2. Перенаправление
      navigate('/thanks-auto-service');
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return (
    <div className={scss.contactForm}>
      <h3>Ваш сайт має продавати. Давайте створимо його разом 🚀</h3>
      <p className={scss.description}>
        Залиште заявку — і протягом 24 год отримаєте перший план рішення для вашого бізнесу.
      </p>

      <div className={scss.formForDownload} id='formOnCheckList'>
        <form onSubmit={handleSubmit} className={scss.formMainBlock} noValidate>
          <div className={scss.formInputsAndCheckoutBlock}>
            <div className={scss.formGroup}>
              <label>
                Ім'я <span className={scss.importantText}>*</span>
              </label>
              <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={clsx(scss.input, errors.name && scss.inputError)}
                placeholder='Роман'
                required
              />
            </div>

            <div className={scss.formGroup}>
              <label>
                Пошта <span className={scss.importantText}>*</span>
              </label>
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={clsx(scss.input, errors.email && scss.inputError)}
                placeholder='example@gmail.com'
                required
              />
            </div>

            <div className={scss.formGroup}>
              <label>
                Телефон <span className={scss.importantText}>*</span>
              </label>
              <input
                type='tel'
                value={phone}
                onChange={handlePhoneChange}
                maxLength='19'
                className={clsx(scss.input, errors.phone && scss.inputError)}
                required
              />
            </div>

            <div className={scss.formGroup}>
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
                  Я згоден на обробку моїх персональних даних відповідно до{' '}
                  <a
                    href='/privacy-policy'
                    className={scss.privacyLink}
                    target='_blank'
                    rel='noopener noreferrer'>
                    Політики конфіденційності
                  </a>
                </span>
              </label>
            </div>

            <button type='submit' className={scss.button} id='downloadPdfButton'>
              Замовити розробку
              <BsArrowRightShort className={scss.buttonIconDownload} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
