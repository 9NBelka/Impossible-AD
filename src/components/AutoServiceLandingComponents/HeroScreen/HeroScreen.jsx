import scss from './HeroScreen.module.scss';
import clsx from 'clsx';

export default function HeroScreen({ scrollToSection }) {
  return (
    <section className={scss.hero} id='hero'>
      <div className={scss.container}>
        <div className={scss.content}>
          <h1 className={scss.title}>
            <span className={scss.brand}> 250</span> нових клієнтів за 3 місяці — або повернемо
            гроші.
          </h1>

          <p className={scss.subtitle}>
            Вартість дзвінка — не більше <span className={scss.brandTwo}>200грн.</span>
          </p>
          <div className={scss.ctaBlock}>
            <button className={scss.ctaButton} onClick={() => scrollToSection('contacts')}>
              👉 Хочу клієнтів
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
