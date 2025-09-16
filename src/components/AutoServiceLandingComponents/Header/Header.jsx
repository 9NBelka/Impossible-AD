import React, { useState, useEffect, useRef } from 'react';
import scss from './Header.module.scss';
import { BsChevronDown, BsList, BsXLg } from 'react-icons/bs';

export default function Header({ onHeaderTextLinks }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // бургер

  const [isScrolled, setIsScrolled] = useState(false);

  const navRef = useRef(null); // для бургера

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Закрытие при клике вне меню и подменю
  useEffect(() => {
    const handleClickOutside = (event) => {
      // если клик не в nav и не по кнопке → закрыть бургер
      if (
        navRef.current &&
        !navRef.current.contains(event.target) &&
        !event.target.closest(`.${scss.menuToggle}`)
      ) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

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
          <a href='/'>
            <img src='/images/carIconHeader.png' />
            <span>ImpossibleAD</span>
          </a>
        </div>

        <nav ref={navRef} className={`${scss.nav} ${isMenuOpen ? scss.navOpen : ''}`}>
          {onHeaderTextLinks.map((info, idx) => (
            <a key={idx} onClick={() => scrollToSection(info.linkToPage)}>
              {info.title}
            </a>
          ))}
        </nav>

        <div className={scss.buttonsBlockRow}>
          <button className={scss.buttonContactWithMe}>Залишити заявку</button>

          <button
            className={scss.menuToggle}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label='Меню'>
            {isMenuOpen ? (
              <BsXLg className={scss.menuIcon} />
            ) : (
              <BsList className={scss.menuIcon} />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
