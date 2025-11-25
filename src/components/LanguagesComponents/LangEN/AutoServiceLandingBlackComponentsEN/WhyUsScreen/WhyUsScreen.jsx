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
            <h2 className={scss.title}>Why Us?</h2>
            <p className={scss.description}>
              Google representatives noted that our advertising campaigns for auto repair shops are
              set up at a professional level.
            </p>
            <p className={clsx(scss.description, scss.nomarg)}>
              This means you get high-quality advertising that meets Google’s standards.
            </p>
            <div>
              <button className={scss.buttonMore} onClick={() => scrollToSection('contacts')}>
                Learn More
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
