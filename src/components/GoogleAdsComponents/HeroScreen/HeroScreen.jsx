import { BsArrowRightShort, BsGraphUpArrow } from 'react-icons/bs';
import scss from './HeroScreen.module.scss';

export default function HeroScreen() {
  return (
    <section className={scss.hero} id='hero'>
      <div className={scss.container}>
        <div className={scss.contentFlexRow}>
          <div className={scss.content}>
            <h1 className={scss.title}>Google Ads, який продає, а не зливає бюджет</h1>
            <p className={scss.subtitle}>
              Налаштовуємо та ведемо пошукову, медійну, YouTube та Shopping рекламу з акцентом на
              ROI
            </p>
            <div className={scss.buttonAndTextBlock}>
              <button className={scss.buttonHeroBlock}>
                Замовити аудит Google Ads <BsArrowRightShort className={scss.buttonIcon} />
              </button>
              <div className={scss.graphAndTextHeroBlock}>
                <BsGraphUpArrow className={scss.buttonIconToText} />
                <p className={scss.textRightButton}>Результат за 72 години</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
