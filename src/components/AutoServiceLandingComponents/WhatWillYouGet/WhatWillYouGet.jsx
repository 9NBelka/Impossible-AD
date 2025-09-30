import {
  BsBullseye,
  BsChatLeft,
  BsCurrencyDollar,
  BsFileEarmarkMedical,
  BsGlobe2,
  BsRobot,
  BsTelephone,
} from 'react-icons/bs';
import scss from './WhatWillYouGet.module.scss';
import { useState } from 'react';

export default function WhatWillYouGet({ scrollToSection }) {
  const [zoomedImage, setZoomedImage] = useState(null);

  // Функция для обработки клика по картинке
  const handleImageClick = (imageSrc) => {
    setZoomedImage(imageSrc);
  };

  // Функция для закрытия увеличенной картинки
  const handleCloseZoom = () => {
    setZoomedImage(null);
  };

  const problems = [
    {
      icon: <BsGlobe2 className={scss.cardIcon} />,
      title: 'Новий налаштований сайт для швидкого старту',
      image: '/images/screenshot-heroScreen-example.png',
    },
    {
      icon: <BsTelephone className={scss.cardIcon} />,
      title: 'Підключимо IP-телефонію до рекламних компаній',
      image: '/images/screen-binotella-table.jpg',
    },
    {
      icon: <BsRobot className={scss.cardIcon} />,
      title: 'Підключимо Telegram-бот до сайту',
      image: '/images/screenshot-bot-on-telegram.png',
    },
    {
      icon: <BsFileEarmarkMedical className={scss.cardIcon} />,
      title: 'Щотижневий короткий звіт з результатами',
      image: '/images/excel-table1.jpg',
      imageTwo: '/images/excel-table2.jpg',
    },
  ];

  return (
    <section className={scss.problemsScreen} id='whatwillyouget'>
      <div className={scss.container}>
        <div className={scss.header}>
          <h2>Чому саме ми?</h2>
        </div>

        <div className={scss.flexBlock}>
          {problems.map((problem, index) => (
            <div key={index} className={scss.card}>
              <div className={scss.cardRow}>
                <div className={scss.cardIconBlock}>{problem.icon}</div>
                <div className={scss.cartTitleAndDescription}>
                  <h3 className={scss.cartTitle}>{problem.title}</h3>
                </div>
              </div>
              {problem.image && (
                <div className={scss.imageContainer}>
                  <img
                    src={problem.image}
                    alt={problem.title}
                    className={scss.cardImage}
                    onClick={() => handleImageClick(problem.image)}
                  />
                  {problem.imageTwo && (
                    <img
                      src={problem.imageTwo}
                      alt={problem.title}
                      className={scss.cardImage}
                      onClick={() => handleImageClick(problem.imageTwo)}
                    />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Модальное окно для увеличенной картинки */}
        {zoomedImage && (
          <div className={scss.zoomOverlay} onClick={handleCloseZoom}>
            <img src={zoomedImage} alt='Zoomed' className={scss.zoomedImage} />
          </div>
        )}

        <div className={scss.blockTextAndButtonBottomSection}>
          <h4 className={scss.blockTextAndButtonBottomSectionBigText}>
            👉 Усе це входить у пакет.
          </h4>
          <h4>Конкуренти беруть за це окремо.</h4>
          <p>
            Представники Google відзначили, що наші рекламні кампанії для СТО налаштовані на
            професійному рівні. Це означає: ви отримуєте якісну рекламу за стандартами Google
          </p>
          <button className={scss.buttonBottom} onClick={() => scrollToSection('contacts')}>
            Замовити пакет
          </button>
        </div>
      </div>
    </section>
  );
}
