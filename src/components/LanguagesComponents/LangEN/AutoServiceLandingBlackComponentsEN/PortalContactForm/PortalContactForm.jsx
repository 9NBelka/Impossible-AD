import clsx from 'clsx';
import scss from './PortalContactForm.module.scss';
import { useEffect, useState } from 'react';
import { BsFacebook, BsInstagram, BsTelegram } from 'react-icons/bs';
import ContactForm from './ContactForm/ContactForm';
import { FaWhatsapp } from 'react-icons/fa';

export default function PortalContactForm() {
  const [move, setMove] = useState({ x: 0, y: 0 });
  const [moveSmall, setMoveSmall] = useState({ x: 0, y: 0 });
  const [moveNegative, setMoveNegative] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      // Смещение рассчитывается на основе центра окна
      const moveX = ((windowWidth / 2 - clientX) / windowWidth) * 5;
      const moveY = ((windowHeight / 2 - clientY) / windowHeight) * 5;

      const moveSmallX = ((windowWidth / 2 - clientX) / windowWidth) * 6;
      const moveSmallY = ((windowHeight / 2 - clientY) / windowHeight) * 6;

      const moveNegX = moveX * -1;
      const moveNegY = moveY * -1;

      setMove({ x: moveX, y: moveY });
      setMoveSmall({ x: moveSmallX, y: moveSmallY });
      setMoveNegative({ x: moveNegX, y: moveNegY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className={scss.portalBackground}>
      <div className={scss.container}>
        <div className={scss.portalImagesPortal}>
          <div className={scss.portalTitlesAndSocial}>
            <div className={scss.logo}>
              <a href='/'>
                <span>
                  impossible<strong>AD</strong>
                </span>
              </a>
            </div>
            <div className={scss.priceBlockGlassMain}>
              <div className={scss.priceBlockGlass}>
                <div className={scss.priceBlockGlassBorder}>
                  <a href='https://t.me/Archerius' aria-label='Telegram' target='_blank'>
                    <BsTelegram className={scss.priceIcon} />
                  </a>
                  <a
                    href='https://www.instagram.com/ad_impossible/'
                    aria-label='Instagram'
                    target='_blank'>
                    <BsInstagram className={scss.priceIcon} />
                  </a>
                  <a href='https://t.me/Archerius' target='_blank'>
                    <FaWhatsapp className={scss.priceIcon} />
                  </a>
                </div>
              </div>
            </div>
            <div className={scss.blockTitle}>
              <p className={scss.titleStart}>WE WILL</p>
              <p className={scss.titleYour}>LAUNCH</p>
              <p className={scss.titleAD}>YOUR ADS</p>
              <p className={scss.titleKosmos}>INTO SPACE</p>
            </div>
          </div>
          <div className={scss.allImagePortall}>
            <img
              className={scss.portalImagePortal}
              src='/images/portal/backfround-portal-new-portal.webp'
            />
            <img
              className={clsx(scss.portalImageRocksOne)}
              src='/images/portal/stones-back-portal-new-size.webp'
              style={{
                transform: `translate(${moveNegative.x}px, ${moveNegative.y}px)`,
              }}
            />
            <img
              className={scss.portalImageRocksTwo}
              src='/images/portal/stones-up-portal-new-size.webp'
              // style={{
              //   transform: `translate(${moveSmall.x}px, ${moveSmall.y}px)`,
              // }}
              style={{
                transform: `translate(${moveNegative.x}px, ${moveNegative.y}px)`,
              }}
            />
            <img
              className={scss.portalImageCosmonaft}
              src='/images/portal/cosmonaft-portal-new-size-two.webp'
              style={{
                transform: `translate(${move.x}px, ${move.y}px)`,
              }}
            />
          </div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
