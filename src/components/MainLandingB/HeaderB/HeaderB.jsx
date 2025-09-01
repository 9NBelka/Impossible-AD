import React, { useState, useEffect } from 'react';
import scss from './HeaderB.module.scss';
import { BsList, BsXLg } from 'react-icons/bs';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className={`${scss.header} ${isScrolled ? scss.scrolled : ''}`}>
      <div className={scss.container}>
        <div className={scss.logo}>
          <span>
            impossible<strong>AD</strong>
          </span>
        </div>

        <nav className={`${scss.nav} ${isMenuOpen ? scss.navOpen : ''}`}>
          <a onClick={() => scrollToSection('services')}>Послуги</a>
          <a onClick={() => scrollToSection('benefits')}>Переваги</a>
          <a onClick={() => scrollToSection('cases')}>Кейси</a>
          <a onClick={() => scrollToSection('contacts')}>Контакти</a>
        </nav>

        <button
          className={scss.menuToggle}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label='Меню'>
          {isMenuOpen ? <BsXLg className={scss.menuIcon} /> : <BsList className={scss.menuIcon} />}
        </button>
      </div>
    </header>
  );
}
