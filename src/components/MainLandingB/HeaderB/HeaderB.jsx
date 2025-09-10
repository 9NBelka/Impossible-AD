import React, { useState, useEffect, useRef } from 'react';
import scss from './HeaderB.module.scss';
import { BsChevronDown, BsList, BsXLg } from 'react-icons/bs';
import DiscountBlock from './DiscountBlock/DiscountBlock';

export default function Header({ onHeaderTextLinks }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // бургер
  const [isMenuOpenTwo, setIsMenuOpenTwo] = useState(false); // подменю
  const [isScrolled, setIsScrolled] = useState(false);

  const dropdownRef = useRef(null); // для подменю
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
      // если клик не в dropdown → закрыть подменю
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMenuOpenTwo(false);
      }

      // если клик не в nav и не по кнопке → закрыть бургер
      if (
        navRef.current &&
        !navRef.current.contains(event.target) &&
        !event.target.closest(`.${scss.menuToggle}`)
      ) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen || isMenuOpenTwo) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen, isMenuOpenTwo]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
      setIsMenuOpenTwo(false);
    }
  };

  return (
    <header className={`${scss.header} ${isScrolled ? scss.scrolled : ''}`}>
      <div className={scss.container}>
        <div className={scss.logo}>
          <a href='/'>
            <span>
              impossible<strong>AD</strong>
            </span>
          </a>
        </div>

        <nav ref={navRef} className={`${scss.nav} ${isMenuOpen ? scss.navOpen : ''}`}>
          <div className={scss.dropdown} ref={dropdownRef}>
            <a onClick={() => setIsMenuOpenTwo(!isMenuOpenTwo)}>
              Послуги <BsChevronDown className={scss.iconDown} />
            </a>
            {isMenuOpenTwo && (
              <div className={scss.dropdownMenu}>
                <a href='/google-ads-audit'>Google Ads</a>
                <a href='/web-development' onClick={() => scrollToSection('service2')}>
                  Веб-розробка
                </a>
                <a href='/business-automation' onClick={() => scrollToSection('service3')}>
                  Бізнес-автоматизація
                </a>
                <a href='/google-ads' onClick={() => scrollToSection('service3')}>
                  Аудит реклами
                </a>
              </div>
            )}
          </div>

          {onHeaderTextLinks.map((info, idx) => (
            <a key={idx} onClick={() => scrollToSection(info.linkToPage)}>
              {info.title}
            </a>
          ))}
        </nav>

        <button
          className={scss.menuToggle}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label='Меню'>
          {isMenuOpen ? <BsXLg className={scss.menuIcon} /> : <BsList className={scss.menuIcon} />}
        </button>
      </div>
      <DiscountBlock />
    </header>
  );
}
