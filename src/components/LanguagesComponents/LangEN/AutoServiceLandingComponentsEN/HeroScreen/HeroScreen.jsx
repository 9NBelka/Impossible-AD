import { FaArrowRight } from 'react-icons/fa';
import scss from './HeroScreen.module.scss';

export default function HeroScreen({ scrollToSection }) {
  //tf просто 100
  return (
    <section className={scss.hero} id='hero' onClick={() => scrollToSection('contacts')}>
      <div className={scss.container}>
        <div className={scss.content}>
          <h1 className={scss.title}>
            <span className={scss.wordBeforeSto}>від</span>
            <span className={scss.brand}>100</span>
            <p className={scss.subtitleMain}>клієнтів у місяць</p>
          </h1>
          {/* <h1 className={scss.title}>клієнтів у місяць</h1> */}

          <div className={scss.ctaBlock}>
            <p className={scss.subtitle}>
              <span className={scss.brandTwo}> або повернемо гроші </span>
            </p>
            <button
              className={scss.ctaButton}
              onClick={() => scrollToSection('contacts')}
              id='goToFormButtonOnHero'>
              Згоден <FaArrowRight className={scss.heroArrowIcon} />
            </button>
          </div>
        </div>
        {/* <div className={scss.formComponent}>
          <HeroContactForm />
        </div> */}
      </div>
    </section>
  );
}
