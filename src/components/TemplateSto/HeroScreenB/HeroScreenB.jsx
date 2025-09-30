import {
  BsCode,
  BsGraphUpArrow,
  BsLightningCharge,
  BsRocketTakeoff,
  BsWrenchAdjustable,
} from 'react-icons/bs';
import scss from './HeroScreenB.module.scss';
import { LuGauge, LuStethoscope } from 'react-icons/lu';
import { IoMdSettings } from 'react-icons/io';
// import { Rocket, TrendingUp, Zap, Code } from 'lucide-react';

export default function HeroScreenB() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
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
              <span className={scss.brand}>Назва Компанії</span> – ваш надійний автосервіс у Місті
            </h1>
            {/* <div className={scss.hashtag}>We Do #impossibleAD</div> */}

            <p className={scss.subtitle}>
              Обслуговування авто будь-якої марки з гарантією{' '}
              <strong>3 місяці або 20 000 км</strong>
            </p>

            <div className={scss.ctaBlock}>
              <a href='tel:+3809909090909'>
                <button className={scss.ctaButton}>Записатися зараз</button>
              </a>
              <div className={scss.ctaNote}>🚀 Потрібен ремонт авто, дзвони нам!</div>
            </div>

            <div className={scss.stats}>
              <div className={scss.stat}>
                <strong>8+</strong>
                <span>років досвіду</span>
              </div>
              <div className={scss.stat}>
                <strong>1000+</strong>
                <span>позитивних відгуків</span>
              </div>
              <div className={scss.stat}>
                <strong>150%</strong>
                <span>гарантія результату</span>
              </div>
            </div>
          </div>

          <div className={scss.graphics}>
            <div className={scss.iconGrid}>
              <div className={scss.iconCardBlock} onClick={() => scrollToSection('services')}>
                <BsWrenchAdjustable className={scss.iconCard} />
                <span>Заміна моторної оливи</span>
              </div>
              <div className={scss.iconCardBlock} onClick={() => scrollToSection('services')}>
                <LuStethoscope className={scss.iconCard} />
                <span>Комп`ютерна діагностика</span>
              </div>
              <div className={scss.iconCardBlock} onClick={() => scrollToSection('benefits')}>
                <IoMdSettings className={scss.iconCard} />
                <span>Діагностика ходової</span>
              </div>
              <div className={scss.iconCardBlock} onClick={() => scrollToSection('benefits')}>
                <LuGauge className={scss.iconCard} />
                <span>Перевірка компресії ДВЗ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
