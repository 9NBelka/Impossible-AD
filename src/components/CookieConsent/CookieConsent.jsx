import React, { useState, useEffect } from 'react';
import styles from './CookieConsent.module.scss';
import { BsCookie } from 'react-icons/bs';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasConsented = localStorage.getItem('cookieConsent');
    if (!hasConsented) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'false');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className={styles.cookieContainer}>
      <div className={styles.cookiePopup}>
        <div className={styles.cookieContent}>
          <span className={styles.cookieIcon}>
            <BsCookie className={styles.iconCookie} />
          </span>
          <p>
            Ми використовуємо файли cookie для персоналізації контенту, реклами та аналізу трафіку
            сайту.{' '}
            <a href='/privacy-policy' className={styles.learnMore}>
              Дізнатися більше
            </a>
          </p>
        </div>
        <div className={styles.cookieButtons}>
          <button onClick={handleDecline} className={styles.declineButton}>
            Відхилити
          </button>
          <button onClick={handleAccept} className={styles.acceptButton}>
            Дозволити
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
