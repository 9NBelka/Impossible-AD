import { FaMapMarkerAlt, FaPhone, FaClock, FaEnvelope } from 'react-icons/fa';
import { AiFillTikTok } from 'react-icons/ai';
import styles from './Footer.module.scss';
import { useState } from 'react';

const Footer = ({ onHeaderTextLinks }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.flex}>
          {/* Company Info */}
          <div className={styles.mainBlock}>
            <div className={styles.logo}>YourLogo</div>
            <p className={styles.companyDescription}>
              Ваш надійний автосервіс у Місто. Обслуговування авто будь-якої марки з гарантією 12
              місяців.
            </p>
            <div className={styles.socialLinks}>
              <a href='#' className={styles.socialLink} target='_blank'>
                <AiFillTikTok className={styles.tiktokIcon} />
              </a>
              <a href='#' className={styles.socialLink} target='_blank'>
                <AiFillTikTok className={styles.tiktokIcon} />
              </a>
              <a href='#' className={styles.socialLink} target='_blank'>
                <AiFillTikTok className={styles.tiktokIcon} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className={styles.services}>
            <h3 className={styles.sectionTitle}>Навігація</h3>
            <ul className={styles.serviceList}>
              {onHeaderTextLinks.map((info, index) => (
                <li key={index}>
                  <a
                    className={styles.serviceLink}
                    onClick={() => scrollToSection(info.linkToPage)}>
                    {info.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className={styles.services}>
            <h3 className={styles.sectionTitle}>Контакти</h3>
            <div className={styles.contactList}>
              <div className={styles.contactItem}>
                <FaMapMarkerAlt className={styles.contactIcon} />
                <span>вулиця Пушкіна, 4, Київ</span>
              </div>
              <div className={styles.contactItem}>
                <FaPhone className={styles.contactIcon} />
                <a href='tel:+380441234567' className={styles.contactLink}>
                  +38 (099) 090-99-99
                </a>
              </div>
              <div className={styles.contactItem}>
                <FaEnvelope className={styles.contactIcon} />
                <a href='mailto:example@gmail.com' className={styles.contactLink}>
                  example@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Working Hours */}
          <div className={styles.services}>
            <h3 className={styles.sectionTitle}>Графік роботи</h3>
            <div className={styles.workingHours}>
              <div className={styles.contactItem}>
                <FaClock className={styles.contactIcon} />
                <div className={styles.contactItemTime}>
                  <p>Пн-Пт: 09:00 - 19:00</p>
                  <p>Сб: за домовленістю</p>
                  <p>Нд: вихідний</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>© 2025 СТО YourLogo. Всі права захищені.</p>
          <div className={styles.bottomLinks}>
            <a href='#' className={styles.bottomLink}>
              Політика конфіденційності
            </a>
            <a href='#' className={styles.bottomLink}>
              Умови використання
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
