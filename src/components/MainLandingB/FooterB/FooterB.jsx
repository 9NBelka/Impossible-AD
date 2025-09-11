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
              impossible<strong>AD</strong>
            </div>
            <p className={scss.slogan}>We Do #impossibleAD</p>
            <p className={scss.description}>
              Ваш надійний партнер у веб-розробці та digital-маркетингу. Створюємо рішення, що
              генерують прибуток.
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
                <li>
                  <a href='/google-ads-audit'>Google Ads</a>
                </li>
                <li>
                  <a href='/web-development'>Веб-розробка</a>
                </li>
                <li>
                  <a href='/business-automation'>Бізнес-автоматизація</a>
                </li>
                <li>
                  <a href='/google-ads'>Аудит реклами</a>
                </li>
                {/* <li>
                  <a href='/google-ads-audit'>Аудит сайту</a>
                </li> */}
              </ul>
            </div>

            <div className={scss.contactSection}>
              <h4>Контакти</h4>
              <div className={scss.contactList}>
                <a href='mailto:impossiblead2025@gmail.com' className={scss.contactLink}>
                  <BsEnvelope />
                  impossiblead2025@gmail.com
                </a>
                <a href='tel:+380733291216' className={scss.contactLink}>
                  <BsTelephone />
                  +380 (73) 329-12-16
                </a>
                <a href='https://t.me/impossiblead' className={scss.contactLink}>
                  <BsChat />
                  @impossiblead
                </a>
              </div>

              <div className={scss.social}>
                <h5>Соціальні мережі</h5>
                <div className={scss.socialLinks}>
                  <a href='#' aria-label='Facebook'>
                    <BsFacebook />
                  </a>
                  <a href='#' aria-label='Telegram'>
                    <BsTelegram />
                  </a>
                  <a href='#' aria-label='Instagram'>
                    <BsInstagram />
                  </a>
                  <a href='#' aria-label='Instagram'>
                    <BsTwitter />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={scss.bottom}>
          <div className={scss.copyright}>
            <p>&copy; {currentYear} impossibleAD. Всі права захищені.</p>
            <p className={scss.tagline}>We Do #impossibleAD</p>
          </div>

          <div className={scss.legal}>
            <a href='/privacy-policy' target='_blank'>
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
