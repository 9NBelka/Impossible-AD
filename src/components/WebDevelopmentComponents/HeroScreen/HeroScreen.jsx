import { BsCode, BsGraphUpArrow, BsLightningCharge, BsRocketTakeoff } from 'react-icons/bs';
import scss from './HeroScreen.module.scss';
import clsx from 'clsx';

export default function HeroScreen() {
  const scrollToContact = () => {
    const element = document.getElementById('contacts');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <section className={scss.hero} id='hero'>
      <div className={scss.background}>
        <div className={scss.shape1}></div>
        <div className={scss.shape2}></div>
        <div className={scss.shape3}></div>
      </div>

      <div className={scss.container}>
        <div className={scss.contentFlexRow}>
          <div className={scss.content}>
            <h1 className={scss.title}>
              Веб-розробка, яка<span className={scss.brand}> працює</span> на ваш бізнес
            </h1>

            <p className={scss.subtitle}>
              Створюємо сайти від швидких лендінгів до масштабних інтернет- магазинів та
              web-додатків. Орієнтир — продажі, зручність і швидкість роботи.
            </p>

            <div className={scss.ctaBlock}>
              <button className={scss.ctaButton} onClick={scrollToContact}>
                Отримати консультацію
              </button>
              <button className={clsx(scss.ctaButton, scss.whiteButton)} onClick={scrollToContact}>
                Наші кейси
              </button>
            </div>

            <div className={scss.stats}>
              <div className={scss.stat}>
                <strong>10+</strong>
                <span>років досвіду</span>
              </div>
              <div className={scss.stat}>
                <strong>30+</strong>
                <span>інтернет-магазинів</span>
              </div>
              <div className={scss.stat}>
                <strong>100%</strong>
                <span>задоволених клієнтів</span>
              </div>
            </div>
          </div>

          <div className={scss.graphics}>
            <div className={scss.iconGrid}>
              <img src='/images/heroBlockWebImage.jpg' />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
