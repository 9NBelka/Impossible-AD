import { BsCode, BsGraphUpArrow, BsLightningCharge, BsRocketTakeoff } from 'react-icons/bs';
import scss from './HeroScreenB.module.scss';
// import { Rocket, TrendingUp, Zap, Code } from 'lucide-react';

export default function HeroScreenB() {
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
              <span className={scss.brand}>impossibleAD</span> – ваш партнер у веброзробці та
              digital-маркетингу
            </h1>
            <div className={scss.hashtag}>We Do #impossibleAD</div>

            <p className={scss.subtitle}>
              Створюємо сайти, запускаємо продажі через Google-рекламу та автоматизуємо
              бізнес-процеси за допомогою AI. З 2017 року генеруємо прибуток клієнтам онлайн.
            </p>

            <div className={scss.ctaBlock}>
              <button className={scss.ctaButton} onClick={scrollToContact}>
                Замовити безкоштовний аудит
              </button>
              <div className={scss.ctaNote}>
                🚀 Ми проаналізуємо вашу рекламу чи сайт та покажемо точки зростання
              </div>
            </div>

            <div className={scss.stats}>
              <div className={scss.stat}>
                <strong>8+</strong>
                <span>років досвіду</span>
              </div>
              <div className={scss.stat}>
                <strong>200+</strong>
                <span>проєктів</span>
              </div>
              <div className={scss.stat}>
                <strong>150%</strong>
                <span>середній ріст ROI</span>
              </div>
            </div>
          </div>

          <div className={scss.graphics}>
            <div className={scss.iconGrid}>
              <div className={scss.iconCardBlock}>
                <BsCode className={scss.iconCard} />
                <span>Web Dev</span>
              </div>
              <div className={scss.iconCardBlock}>
                <BsGraphUpArrow className={scss.iconCard} />
                <span>ROI Growth</span>
              </div>
              <div className={scss.iconCardBlock}>
                <BsLightningCharge className={scss.iconCard} />
                <span>AI Automation</span>
              </div>
              <div className={scss.iconCardBlock}>
                <BsRocketTakeoff className={scss.iconCard} />
                <span>Digital Ads</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
