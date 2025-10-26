import clsx from 'clsx';
import CardsWhyUs from './CardsWhyUs/CardsWhyUs';
import scss from './WhyUsScreen.module.scss';

export default function WhyUsScreen() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <section className={scss.whyUsMain} id='whyus'>
      <div className={scss.container}>
        <div className={scss.contentMainWhyUsBlock}>
          <div className={scss.contentTitleAndButton}>
            <h2 className={scss.title}>Чому саме ми?</h2>
            <p className={scss.description}>
              Представники Google відзначили, що наші рекламні кампанії для СТО налаштовані на
              професійному рівні.
            </p>
            <p className={clsx(scss.description, scss.nomarg)}>
              Це означає: ви отримуєте якісну рекламу за стандартами Google
            </p>
            <div>
              <button className={scss.buttonMore} onClick={() => scrollToSection('contacts')}>
                Дізнатись більше
              </button>
            </div>
          </div>
          <div className={scss.contentBlocksIconsAndTexts}>
            <CardsWhyUs />
          </div>
        </div>
      </div>
    </section>
  );
}
