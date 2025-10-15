import { useEffect, useRef } from 'react';
import scss from './Header.module.scss';
import { FiPhoneCall } from 'react-icons/fi';
import { BsList, BsReceiptCutoff, BsTelephoneOutboundFill, BsXLg } from 'react-icons/bs';

export default function Header({
  onHeaderTextLinks,
  isScrolled,
  scrollToSection,
  setIsMenuOpen,
  isMenuOpen,
}) {
  const navRef = useRef(null); // для бургера

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
          {onHeaderTextLinks.map((info, idx) => (
            <a key={idx} onClick={() => scrollToSection(info.linkToPage)}>
              {info.title}
            </a>
          ))}
          {/* <a className={scss.linkToPhone} href='tel:+380685504202' id='callToPhoneOnHeader'>
            <FiPhoneCall className={scss.iconPhone} /> +380 (68) 550-42-02
          </a> */}
        </nav>

        <a href='tel:+380685504202' className={scss.linkToPhone} id='callToPhoneOnHeader'>
          <BsTelephoneOutboundFill className={scss.iconPhone} /> +380 (68) 550-42-02
        </a>
        <div className={scss.buttonsBlockRow}>
          <button
            className={scss.buttonContactWithMe}
            onClick={() => scrollToSection('contacts')}
            id='goToFormButton'>
            <BsReceiptCutoff className={scss.iconButtonToForm} />
            Залишити заявку
          </button>

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
