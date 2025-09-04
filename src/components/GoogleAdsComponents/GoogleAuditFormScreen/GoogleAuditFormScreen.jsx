import { BsSearch } from 'react-icons/bs';
import scss from './GoogleAuditFormScreen.module.scss';
import { useState } from 'react';
import clsx from 'clsx';

export default function GoogleAuditFormScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [formData, setFormData] = useState({ gdprConsent: false });

  const handleInputChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name, email, phone };

    try {
      const response = await fetch('https://hook.eu2.make.com/d1ylv3c1bgtgog8tn970gyv7jidg8iw9', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      window.location.href = '/thanks';
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return (
    <div className={scss.formForDownload}>
      <div className={scss.container}>
        <h2>Замовити аудит Google Ads</h2>
        <p>Замовляй аудит та отримай Результат за 72 години </p>
        <form onSubmit={handleSubmit} className={scss.formMainBlock}>
          <div className={scss.formInputsAndCheckoutBlock}>
            <div className={scss.formInputsAndCheckout}>
              <div className={scss.formGroup}>
                <label>
                  Ім'я <span className={scss.importantText}>*</span>
                </label>
                <input
                  type='text'
                  value={name}
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
                  type='phone'
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={scss.input}
                  required
                />
              </div>
              <button type='submit' className={scss.button}>
                <BsSearch className={scss.buttonIconDownload} />
                Замовити аудит Google Ads
              </button>
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
          </div>
        </form>
      </div>
    </div>
  );
}
