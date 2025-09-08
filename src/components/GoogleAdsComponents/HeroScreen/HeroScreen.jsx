import scss from './HeroScreen.module.scss';
import clsx from 'clsx';

export default function HeroScreen({ scrollToSection }) {
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
              Автоматизуйте бізнес і забудьте про
              <span className={scss.brand}> хаос у процесах</span>
            </h1>

            <p className={scss.subtitle}>
              AI + Zapier/Make → єдина система, яка економить час, знижує витрати і підвищує продажі
            </p>
            <div className={scss.ctaBlock}>
              <button className={scss.ctaButton} onClick={() => scrollToSection('contacts')}>
                Безкоштовна консультація
              </button>
              <button
                className={clsx(scss.ctaButton, scss.whiteButton)}
                onClick={() => scrollToSection('cases')}>
                Показати кейси
              </button>
            </div>
          </div>

          <div className={scss.graphics}>
            <div className={scss.iconGrid}>
              <img className={scss.imgPc} src='/images/automatizationHeroImage.png' />
              <img className={scss.imgPhone} src='/images/automatizationHeroImage2.jpg' />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
