import React from 'react';
// import { Mail, Phone, MessageCircle, Facebook, Linkedin, Instagram } from 'lucide-react';
import scss from './Footer.module.scss';
import {
  BsChat,
  BsEnvelope,
  BsFacebook,
  BsInstagram,
  BsTelegram,
  BsTelephone,
  BsTwitter,
} from 'react-icons/bs';
import { FaWhatsapp } from 'react-icons/fa';

export default function Footer({ onFooterTextLinks }) {
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
              Your reliable partner in web development and digital marketing. We create solutions
              that generate profit.
            </p>
          </div>

          <div className={scss.linksAndServicesBlock}>
            <div className={scss.linksSection}>
              <h4>Navigation</h4>
              <ul>
                {onFooterTextLinks.map((info, idx) => (
                  <li key={idx}>
                    <a onClick={() => scrollToSection(info.linkToPage)}>{info.title}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className={scss.servicesSection}>
              <h4>Services</h4>
              <ul>
                <li>
                  <a href='https://impossiblead.com/google-ads-audit' target='_blank'>
                    Google Ads
                  </a>
                </li>
                <li>
                  <a href='https://impossiblead.com/web-development' target='_blank'>
                    Web Development
                  </a>
                </li>
                <li>
                  <a href='https://impossiblead.com/business-automation' target='_blank'>
                    Business Automation
                  </a>
                </li>
                <li>
                  <a href='https://impossiblead.com/google-ads' target='_blank'>
                    Advertising Audit
                  </a>
                </li>
                {/* <li>
                  <a href='/google-ads-audit'>Аудит сайту</a>
                </li> */}
              </ul>
            </div>

            <div className={scss.contactSection}>
              <h4>Contacts</h4>
              <div className={scss.contactList}>
                <a href='mailto:mpdart2013@gmail.com' className={scss.contactLink} target='_blank'>
                  <BsEnvelope />
                  mpdart2013@gmail.com
                </a>
                <a href='https://wa.me/380733291216' className={scss.contactLink} target='_blank'>
                  <FaWhatsapp />
                  +380 (73) 329-12-16
                </a>
                <a href='https://t.me/Archerius' className={scss.contactLink} target='_blank'>
                  <BsChat />
                  @Archerius
                </a>
              </div>

              <div className={scss.social}>
                <h5>Social Media</h5>
                <div className={scss.socialLinks}>
                  {/* <a href='#' aria-label='Facebook' target='_blank'>
                    <BsFacebook />
                  </a> */}
                  <a href='https://t.me/Archerius' aria-label='Telegram' target='_blank'>
                    <BsTelegram />
                  </a>
                  <a
                    href='https://www.instagram.com/ad_impossible/'
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
            <p>&copy; {currentYear} impossibleAD. All rights reserved.</p>
            <p className={scss.tagline}>We Do #impossibleAD</p>
          </div>

          <div className={scss.legal}>
            <a href='/privacy-policy' target='_blank'>
              Privacy Policy
            </a>
            {/* <a href='#'>Умови використання</a>
            <a href='#'>Договір оферти</a> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
