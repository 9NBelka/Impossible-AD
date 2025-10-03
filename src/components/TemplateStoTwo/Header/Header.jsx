import { useState } from 'react';
// import { Menu, X, Phone } from 'lucide-react';
import styles from './Header.module.scss';
import { MdOutlinePhoneInTalk } from 'react-icons/md';
import { BsX } from 'react-icons/bs';

import { AiOutlineMenu } from 'react-icons/ai';
import { FiPhoneCall } from 'react-icons/fi';
import DiscountBlockSToTwo from '../DiscountBlockSToTwo/DiscountBlockSToTwo';

const Header = ({ onHeaderTextLinks }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handlePhoneKeyDown = (e) => {
    if (e.key === 'Enter') {
      window.location.href = 'tel:+380936430070';
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.headerInner}>
          {/* Logo */}
          <div className={styles.logoContainer}>
            <a href='/'>
              <span>Logo</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className={styles.desktopNav}>
            {onHeaderTextLinks.map((info, index) => (
              <a
                key={index}
                type='button'
                onClick={() => scrollToSection(info.linkToPage)}
                className={styles.navLink}>
                {info.title}
              </a>
            ))}
          </nav>

          {/* Contact Info & CTA */}
          <div className={styles.contactContainer}>
            <a className={styles.linkToPhone} href='tel:+3809909090909'>
              <FiPhoneCall className={styles.iconPhone} /> +38 (099) 090-90-90
            </a>

            <button onClick={() => scrollToSection('booking')} className={styles.ctaButton}>
              Записатися
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            type='button'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={styles.mobileMenuButton}
            aria-label='Меню'>
            {isMenuOpen ? (
              <BsX className={styles.icon} />
            ) : (
              <AiOutlineMenu className={styles.icon} />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className={styles.mobileNav}>
            <nav className={styles.mobileNavList}>
              <button
                type='button'
                onClick={() => scrollToSection('hero')}
                className={styles.mobileNavLink}>
                Головна
              </button>
              <button
                type='button'
                onClick={() => scrollToSection('services')}
                className={styles.mobileNavLink}>
                Послуги
              </button>
              <button
                type='button'
                onClick={() => scrollToSection('diagnostics')}
                className={styles.mobileNavLink}>
                Діагностика
              </button>
              <button
                type='button'
                onClick={() => scrollToSection('testimonials')}
                className={styles.mobileNavLink}>
                Відгуки
              </button>
              <button
                type='button'
                onClick={() => scrollToSection('booking')}
                className={styles.mobileNavLink}>
                Запис
              </button>
              <button
                type='button'
                onClick={() => scrollToSection('contacts')}
                className={styles.mobileNavLink}>
                Контакти
              </button>
              <div className={styles.mobileCtaContainer}>
                <button
                  onClick={() => scrollToSection('booking')}
                  className={styles.mobileCtaButton}>
                  Записатися
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
      <div onClick={() => scrollToSection('booking')}>
        <DiscountBlockSToTwo right='right' />
      </div>
    </header>
  );
};

export default Header;
