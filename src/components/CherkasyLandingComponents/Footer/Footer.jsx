import { FaMapMarkerAlt, FaPhone, FaClock, FaEnvelope } from 'react-icons/fa';
import styles from './Footer.module.scss';
import { useState } from 'react';
import { BsInstagram, BsTiktok, BsYoutube } from 'react-icons/bs';

const Footer = ({ onHeaderTextLinks }) => {
  const currentYear = new Date().getFullYear();
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
            <div className={styles.logo}>
              <a onClick={() => scrollToSection('hero')}>
                <img src='./images/avtosferaLogo_white.png'></img>
              </a>
            </div>
            <p className={styles.companyDescription}>
              Ваш надійний автосервіс у Черкасах. Обслуговування авто будь-якої марки з гарантією 6
              місяців.
            </p>
            <div className={styles.socialLinks}>
              <a
                href='https://www.tiktok.com/@avtoatmosfera.com?lang=ru-RU'
                className={styles.socialLink}
                target='_blank'>
                <BsTiktok className={styles.tiktokIcon} />
              </a>
              <a
                href='https://www.instagram.com/avtoatmosfera_com/'
                className={styles.socialLink}
                target='_blank'>
                <BsInstagram className={styles.tiktokIcon} />
              </a>
              <a
                href='https://www.youtube.com/channel/UCZANjQxcAYbz2CuIDQrZlrQ/featured'
                className={styles.socialLink}
                target='_blank'>
                <BsYoutube className={styles.tiktokIcon} />
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
                <span>м. Черкаси, вул. Луценко, 6</span>
              </div>
              <div className={styles.contactItem}>
                <FaPhone className={styles.contactIcon} />
                <a href='tel:+380673341749' className={styles.contactLink}>
                  +380 67 334 17 49
                </a>
              </div>
              {/* <div className={styles.contactItem}>
                <FaPhone className={styles.contactIcon} />
                <a href='tel:+380933312299' className={styles.contactLink}>
                  +380 93 331 22 99
                </a>
              </div> */}
              <div className={styles.contactItem}>
                <FaEnvelope className={styles.contactIcon} />
                <a href='mailto:avtoatmosfera2@gmail.com' className={styles.contactLink}>
                  avtoatmosfera2@gmail.com
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
                  <p>Пн-Пт: 09:00 - 18:00</p>
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
            &copy; {currentYear} СТО АвтоАтмосфера. Всі права захищені.
          </p>
          <div className={styles.bottomLinks}>
            <a href='/privacy-policy' className={styles.bottomLink}>
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
