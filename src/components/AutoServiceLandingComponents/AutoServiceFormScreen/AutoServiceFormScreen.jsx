import { BsCheck2All } from 'react-icons/bs';
import scss from './AutoServiceFormScreen.module.scss';
import { useState } from 'react';
import clsx from 'clsx';

export default function AutoServiceFormScreen() {
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

      window.location.href = '/thanks-auto-service';
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return (
    <div className={scss.formForDownload}>
      <div className={scss.container}>
        <h2>🎁 Подарунок: чек-лист</h2>
        <p>
          Як зробити так, щоб клієнт після дзвінка реально приїхав. Прості правила для
          адміністратора: що сказати, як записати, як закріпити клієнта.
        </p>
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
                  type='tel'
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={scss.input}
                  required
                />
              </div>
              <button type='submit' className={scss.button}>
                Отримати чек-лист
                <BsCheck2All className={scss.buttonIconDownload} />
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
                  <a href='/privacy-policy' className={scss.privacyLink} target='_blank'>
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
