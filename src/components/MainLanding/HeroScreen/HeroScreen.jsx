import { BsCheckCircleFill } from 'react-icons/bs';
import scss from './HeroScreen.module.scss';

export default function HeroScreen() {
  return (
    <section className={scss.hero}>
      <div className={scss.container}>
        <div className={scss.heroContent}>
          <h1>Ускорьте свое цифровое присутствие в Европе</h1>
          {/* <h2>Взрывной рост продаж через цифровую рекламу</h2> */}
          <p className={scss.heroSubtitle}>
            Профессиональные продающие рекламные решения для социальных сетей, веб-сайтов и
            поисковых систем. Повысьте узнаваемость вашего бренда с помощью наших комплексных услуг
            цифрового маркетинга.
          </p>
          <ul className={scss.heroFeatures}>
            <li className={scss.featureItem}>
              <span className={scss.checkmark}>
                <BsCheckCircleFill className={scss.iconCheckmark} />
              </span>
              <span className={scss.featureItemText}>Реклама в социальных сетях</span>
            </li>
            <li className={scss.featureItem}>
              <span className={scss.checkmark}>
                <BsCheckCircleFill className={scss.iconCheckmark} />
              </span>
              <span className={scss.featureItemText}>SEO оптимизация</span>
            </li>
            <li className={scss.featureItem}>
              <span className={scss.checkmark}>
                <BsCheckCircleFill className={scss.iconCheckmark} />
              </span>
              <span className={scss.featureItemText}>Индивидуальные лендинг-страницы</span>
            </li>
          </ul>
          <div className={scss.ctaButtonBlock}>
            <a href='#contact' className={scss.ctaButton}>
              Получить бесплатную консультацию
            </a>
          </div>
        </div>
        <div className={scss.heroImage}>
          <div className={scss.heroGraphic}>
            <div className={scss.graphicElement}></div>
            <div className={scss.graphicElement}></div>
            <div className={scss.graphicElement}></div>
          </div>
        </div>
      </div>
    </section>
  );
}
