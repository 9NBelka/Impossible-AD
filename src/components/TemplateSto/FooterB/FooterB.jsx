import React from 'react';
// import { Mail, Phone, MessageCircle, Facebook, Linkedin, Instagram } from 'lucide-react';
import scss from './FooterB.module.scss';
import {
  BsChat,
  BsEnvelope,
  BsFacebook,
  BsInstagram,
  BsTelegram,
  BsTelephone,
  BsTwitter,
} from 'react-icons/bs';

export default function FooterB({ onFooterTextLinks }) {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className={scss.footer}>
      <div className={scss.container}>
        <div className={scss.content}>
          <div className={scss.brandSection}>
            <div className={scss.logo}>
              ваше<strong>Logo</strong>
            </div>

            <p className={scss.description}>
              Ваш надійний автосервіс у Києві. Обслуговування авто будь-якої марки з гарантією 12
              місяців.
            </p>
          </div>

          <div className={scss.linksAndServicesBlock}>
            <div className={scss.linksSection}>
              <h4>Навігація</h4>
              <ul>
                {onFooterTextLinks.map((info, idx) => (
                  <li key={idx}>
                    <a onClick={() => scrollToSection(info.linkToPage)}>{info.title}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className={scss.servicesSection}>
              <h4>Послуги</h4>
              <ul>
                <li>Заміна моторної оливи</li>
                <li>Комп`ютерна діагностика</li>
                <li>Заміна гальмівних колодок</li>
                <li>Ваш текст</li>
                <li>Ваш текст</li>
                <li>Ваш текст</li>
              </ul>
            </div>

            <div className={scss.contactSection}>
              <h4>Контакти</h4>
              <div className={scss.contactList}>
                <a href='mailto:example@gmail.com' className={scss.contactLink} target='_blank'>
                  <BsEnvelope />
                  example@gmail.com
                </a>
                <a href='tel:+380000000' className={scss.contactLink}>
                  <BsTelephone />
                  +380 (XX) XXX-XX-XX
                </a>
                <a href='https://t.me/example' className={scss.contactLink} target='_blank'>
                  <BsChat />
                  @example
                </a>
              </div>

              <div className={scss.social}>
                <h5>Соціальні мережі</h5>
                <div className={scss.socialLinks}>
                  <a href='#' aria-label='Facebook' target='_blank'>
                    <BsFacebook />
                  </a>
                  <a href='https://t.me/example' aria-label='Telegram' target='_blank'>
                    <BsTelegram />
                  </a>
                  <a
                    href='https://www.instagram.com/example/'
                    aria-label='Instagram'
                    target='_blank'>
                    <BsInstagram />
                  </a>
                  {/* <a href='#' aria-label='Instagram' target='_blank'>
                    <BsTwitter />
                  </a> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={scss.bottom}>
          <div className={scss.copyright}>
            <p>&copy; {currentYear} НазваКомпанії. Всі права захищені.</p>
          </div>

          <div className={scss.legal}>
            <a href='#' target='_blank'>
              Політика конфіденційності
            </a>
            {/* <a href='#'>Умови використання</a>
            <a href='#'>Договір оферти</a> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
