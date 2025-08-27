import clsx from 'clsx';
import scss from './Services.module.scss';
import { BsArrowRight, BsGraphUpArrow } from 'react-icons/bs';
import { FcGlobe, FcPositiveDynamic, FcSurvey, FcTabletAndroid } from 'react-icons/fc';

export default function Services() {
  return (
    <section id='services' className={scss.services}>
      <div className={scss.container}>
        <div className={scss.titleServicesBlocks}>
          <h2>Наши услуги цифрового маркетинга</h2>
          <p className={scss.sectionSubtitle}>
            Комплексные решения, адаптированные для европейского рынка
          </p>
        </div>

        <div className={scss.servicesBlock}>
          <div className={scss.serviceCard}>
            <div className={scss.serviceIcon}>
              <FcTabletAndroid />
            </div>
            <h3>Реклама в социальных сетях</h3>
            <p>
              Стратегические кампании в Facebook, Instagram, LinkedIn и других платформах для
              эффективного охвата вашей целевой аудитории.
            </p>
            <ul>
              <li>
                <BsArrowRight className={scss.iconArrow} />
                <span className={scss.serviceListText}>Стратегия и планирование кампаний</span>
              </li>
              <li>
                <BsArrowRight className={scss.iconArrow} />
                <span className={scss.serviceListText}>Креативный дизайн рекламы</span>
              </li>
              <li>
                <BsArrowRight className={scss.iconArrow} />
                <span className={scss.serviceListText}>Таргетинг аудитории</span>
              </li>
              <li>
                <BsArrowRight className={scss.iconArrow} />
                <span className={scss.serviceListText}>Аналитика эффективности</span>
              </li>
            </ul>
          </div>

          <div className={scss.serviceCard}>
            <div className={scss.serviceIcon}>
              <FcGlobe />
            </div>
            <h3>Реклама на веб-сайтах</h3>
            <p>
              Медийная реклама и ретаргетинговые кампании для привлечения качественного трафика на
              ваш сайт и увеличения конверсий.
            </p>
            <ul>
              <li>
                <BsArrowRight className={scss.iconArrow} />
                <span className={scss.serviceListText}>Управление Google Ads</span>
              </li>
              <li>
                <BsArrowRight className={scss.iconArrow} />
                <span className={scss.serviceListText}>Кампании в медийной сети</span>
              </li>
              <li>
                <BsArrowRight className={scss.iconArrow} />
                <span className={scss.serviceListText}>Стратегии ретаргетинга</span>
              </li>
              <li>
                <BsArrowRight className={scss.iconArrow} />
                <span className={scss.serviceListText}>Оптимизация конверсий</span>
              </li>
            </ul>
          </div>

          <div className={scss.serviceCard}>
            <div className={scss.serviceIcon}>
              <FcPositiveDynamic />
            </div>
            <h3>Google ADs</h3>
            <p>
              Улучшите позиции в поисковых системах и органическую видимость с помощью наших
              комплексных SEO стратегий.
            </p>
            <ul>
              <li>
                <BsArrowRight className={scss.iconArrow} />
                <span className={scss.serviceListText}>Исследование и анализ ключевых слов</span>
              </li>
              <li>
                <BsArrowRight className={scss.iconArrow} />
                <span className={scss.serviceListText}>Внутренняя оптимизация</span>
              </li>
              <li>
                <BsArrowRight className={scss.iconArrow} />
                <span className={scss.serviceListText}>Технический SEO аудит</span>
              </li>
              <li>
                <BsArrowRight className={scss.iconArrow} />
                <span className={scss.serviceListText}>Контент-стратегия</span>
              </li>
            </ul>
          </div>

          <div className={clsx(scss.serviceCard, scss.featured)}>
            <div className={scss.serviceIcon}>
              <FcSurvey />
            </div>
            <h3>Индивидуальные продающие лендинг-страницы</h3>
            <p>
              Высококонверсионные лендинг-страницы, разработанные специально для ваших кампаний и
              целевой аудитории.
            </p>
            <ul>
              <li>
                <BsArrowRight className={scss.iconArrow} />
                <span className={scss.serviceListText}>Профессиональный дизайн</span>
              </li>
              <li>
                <BsArrowRight className={scss.iconArrow} />
                <span className={scss.serviceListText}>Мобильная оптимизация</span>
              </li>
              <li>
                <BsArrowRight className={scss.iconArrow} />
                <span className={scss.serviceListText}>A/B тестирование</span>
              </li>
              <li>
                <BsArrowRight className={scss.iconArrow} />
                <span className={scss.serviceListText}>Отслеживание конверсий</span>
              </li>
            </ul>
            <div className={scss.additionalService}>Дополнительная услуга</div>
          </div>
        </div>
      </div>
    </section>
  );
}
