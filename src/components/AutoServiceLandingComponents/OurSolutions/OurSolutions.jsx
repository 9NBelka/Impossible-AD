import { useState } from 'react';
import scss from './OurSolutions.module.scss';

import { BsGeoAltFill, BsGraphUpArrow } from 'react-icons/bs';
import { FaCarSide } from 'react-icons/fa';

export default function OurSolutions() {
  const [zoomedImage, setZoomedImage] = useState(null);

  // Функция для обработки клика по картинке
  const handleImageClick = (imageSrc) => {
    setZoomedImage(imageSrc);
  };

  // Функция для закрытия увеличенной картинки
  const handleCloseZoom = () => {
    setZoomedImage(null);
  };

  const solutions = [
    {
      icon: <BsGeoAltFill className={scss.cardIcon} />,
      title: 'Клієнти щодня шукають «СТО поруч»',
      description: 'Якщо не ви — то ваші конкуренти.',
      image: '/images/screen-google-search.jpg',
    },
    {
      icon: <BsGraphUpArrow className={scss.cardIcon} />,
      title: 'Реклама дорожчає',
      description: 'Хто запускається сьогодні — платить менше.',
    },
    {
      icon: <FaCarSide className={scss.cardIcon} />,
      title: 'Миттєва окупність',
      description: 'Перші клієнти вже в перший тиждень.',
    },
  ];

  return (
    <section className={scss.guaranteesScreen} id='solutions'>
      <div className={scss.container}>
        <div className={scss.header}>
          <h2>Чому зараз?</h2>
        </div>

        <div className={scss.flexBlock}>
          {solutions.map((problem, index) => (
            <div key={index} className={scss.card}>
              <div className={scss.cardIconBlock}>{problem.icon}</div>
              <h3 className={scss.cartTitle}>{problem.title}</h3>
              <p className={scss.cartDescription}>{problem.description}</p>
              {problem.image && (
                <img
                  src={problem.image}
                  alt={problem.title}
                  className={scss.cardImage}
                  onClick={() => handleImageClick(problem.image)}
                />
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

        <div className={scss.buttonBottomSection}>
          <button className={scss.buttonBottom}>Дізнатись більше</button>
        </div>
      </div>
    </section>
  );
}
