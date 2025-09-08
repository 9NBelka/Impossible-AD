import scss from './HeroScreen.module.scss';
import clsx from 'clsx';

export default function HeroScreen({ scrollToSection }) {
  return (
    <section className={scss.hero} id='hero'>
      <div className={scss.container}>
        <div className={scss.contentFlexRow}>
          <div className={scss.content}>
            <h1 className={scss.title}>
              Google Ads, що приносить
              <span className={scss.brand}> клієнтів</span>, а не кліки
            </h1>

            <p className={scss.subtitle}>
              Запускаємо та ведемо рекламні кампанії з акцентом на продажі й зниження CPL.
            </p>
            <div className={scss.ctaBlock}>
              <button className={scss.ctaButton} onClick={() => scrollToSection('contacts')}>
                Замовити консультацію
              </button>
            </div>
          </div>

          <div className={scss.graphics}>
            <div className={scss.iconGrid}>
              <img className={scss.imgPc} src='/images/imageAdsHero.jpg' />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
