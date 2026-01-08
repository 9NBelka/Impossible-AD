import { FaMapMarkerAlt, FaPhone, FaClock, FaEnvelope } from 'react-icons/fa';
import styles from './Footer.module.scss';
import { useState } from 'react';
import { BsInstagram, BsTelegram } from 'react-icons/bs';

const Footer = ({ onHeaderTextLinks }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentYear = new Date().getFullYear();

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
            <div className={styles.logo}>🔥 FireAuto 🔥 </div>
            <p className={styles.companyDescription}>
              Ваш надійний автосервіс у Місто. Обслуговування авто будь-якої марки з гарантією 12
              місяців.
            </p>
            <div className={styles.socialLinks}>
              <a
                href='https://t.me/fire_auto_service'
                className={styles.socialLink}
                target='_blank'>
                <BsTelegram className={styles.tiktokIcon} />
              </a>
              <a
                href='https://www.instagram.com/fire_auto_service/'
                className={styles.socialLink}
                target='_blank'>
                <BsInstagram className={styles.tiktokIcon} />
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
                <span>м. Київ, вул. Охтирська, 8</span>
              </div>
              <div className={styles.contactItem}>
                <FaPhone className={styles.contactIcon} />
                <a href='tel:+380733312299' className={styles.contactLink}>
                  +380 73 331 22 99
                </a>
              </div>
              <div className={styles.contactItem}>
                <FaPhone className={styles.contactIcon} />
                <a href='tel:+380933312299' className={styles.contactLink}>
                  +380 93 331 22 99
                </a>
              </div>
              <div className={styles.contactItem}>
                <FaEnvelope className={styles.contactIcon} />
                <a href='mailto:fireautoservice@gmail.com' className={styles.contactLink}>
                  fireautoservice@gmail.com
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
                  <p>Сб: 09:00 - 15:00</p>
                  <p>Нд: вихідний</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            &copy; {currentYear} Fire Автосервіс. Всі права захищені.
          </p>
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
