import { FaMapMarkerAlt, FaPhone, FaClock, FaEnvelope } from 'react-icons/fa';
import { AiFillTikTok } from 'react-icons/ai';
import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.flex}>
          {/* Company Info */}
          <div className={styles.mainBlock}>
            <div className={styles.logo}>ChekCar</div>
            <p className={styles.companyDescription}>
              Ваш надійний автосервіс у Києві. Обслуговування авто будь-якої марки з гарантією 12
              місяців.
            </p>
            <div className={styles.socialLinks}>
              <a
                href='https://www.tiktok.com/@.chekcar?_t=ZS-8zfqDzH1Rf5&_r=1'
                className={styles.socialLink}
                target='_blank'>
                <AiFillTikTok className={styles.tiktokIcon} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className={styles.services}>
            <h3 className={styles.sectionTitle}>Послуги</h3>
            <ul className={styles.serviceList}>
              <li>
                <a href='#services' className={styles.serviceLink}>
                  Заміна моторної оливи
                </a>
              </li>
              <li>
                <a href='#services' className={styles.serviceLink}>
                  Ремонт двигуна
                </a>
              </li>
              <li>
                <a href='#services' className={styles.serviceLink}>
                  Ремонт коробки передач
                </a>
              </li>
              <li>
                <a href='#diagnostics' className={styles.serviceLink}>
                  Діагностика
                </a>
              </li>
              <li>
                <a href='#services' className={styles.serviceLink}>
                  Шиномонтаж
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className={styles.services}>
            <h3 className={styles.sectionTitle}>Контакти</h3>
            <div className={styles.contactList}>
              <div className={styles.contactItem}>
                <FaMapMarkerAlt className={styles.contactIcon} />
                <span>вулиця Вацлава Гавела, 4 (на території БЦ), Київ</span>
              </div>
              <div className={styles.contactItem}>
                <FaPhone className={styles.contactIcon} />
                <a href='tel:+380441234567' className={styles.contactLink}>
                  +38 (093) 643-00-70
                </a>
              </div>
              <div className={styles.contactItem}>
                <FaEnvelope className={styles.contactIcon} />
                <a href='mailto:chekcarcto@gmail.com' className={styles.contactLink}>
                  chekcarcto@gmail.com
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
          <p className={styles.copyright}>© 2025 СТО ChekCar. Всі права захищені.</p>
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
