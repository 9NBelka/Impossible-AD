import { BsArrowUpRight, BsPeople, BsPlay, BsTelephone } from 'react-icons/bs';
import scss from './WeSpeakWithResults.module.scss';
import { useState, useRef } from 'react';
import { LiaAwardSolid } from 'react-icons/lia';

export default function WeSpeakWithResults() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  // Функция для запуска видео и убирания затемнения
  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <section className={scss.problemsScreen} id='results'>
      <div className={scss.container}>
        {/* <div className={scss.header}>
          <h2>Реальний результат</h2>
        </div> */}
        <div className={scss.caseBlockMain}>
          <div className={scss.caseBlock}>
            <h3 className={scss.caseBlockTitle}>
              <LiaAwardSolid className={scss.icon} /> Наші результати
            </h3>
            {/* <p className={scss.caseBlockText}>Зростання кількості клієнтів на 72% за 3 місяці </p> */}
            <div className={scss.videoWrapper}>
              <video
                ref={videoRef}
                className={scss.video}
                src='/images/video-reklama.MOV'
                poster='/images/imageAdsHero.jpg'
                controls={isPlaying}
              />
              {!isPlaying && (
                <div className={scss.videoOverlay} onClick={handlePlayClick}>
                  <div className={scss.iconBlockPlay}>
                    <BsPlay className={scss.iconPlay} />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className={scss.infoBlock}>
            <div className={scss.infoBlockRow}>
              <div className={scss.infoBlockColumn}>
                {/* <BsArrowUpRight className={scss.infoIconTop} /> */}
                <h4>Від 47.59 грн.</h4>
                <p>Звернення клієнта</p>
              </div>
              <div className={scss.infoBlockColumn}>
                {/* <BsPeople className={clsx(scss.infoIconTop, scss.blueIcon)} /> */}
                <h4 className={scss.blueText}>Більше 170</h4>
                <p>Клієнтів у місяць</p>
              </div>
            </div>
            <div className={scss.infoBlockList}>
              <div className={scss.infoIconAndText}>
                {/* <BsTelephone className={scss.infoIcon} /> */}
                <p>Працуючи з нами:</p>
              </div>

              <ul>
                <li>Стабільний потік звернень від нових клієнтів</li>
                <li>Нові клієнти вже в перший тиждень співпраці</li>
                <li>
                  Всіма налаштуваннями аналітикою і маркетингом займаємось ми, ви тільки
                  відповідаєте на дзвінки
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
