import ContentPhones from './ContentPhones/ContentPhones';
import scss from './HeroScreen.module.scss';
import { BsCheckCircleFill, BsCurrencyExchange, BsGeoAltFill } from 'react-icons/bs';

export default function HeroScreen({ scrollToSection }) {
  return (
    <section className={scss.hero} id='hero'>
      <div className={scss.container}>
        <div className={scss.contentMaimFlex}>
          <div className={scss.content}>
            <h1 className={scss.title}>
              Від <span className={scss.brand}> 100 </span>
              нових клієнтів у місяць
            </h1>

            <div className={scss.ctaBlock}>
              <p className={scss.subtitle}>Або повернемо гроші</p>
              <div>
                <button
                  className={scss.ctaButton}
                  onClick={() => scrollToSection('contacts')}
                  id='goToFormButtonOnHero'>
                  <BsCheckCircleFill className={scss.heroArrowIcon} /> Хочу рекламу
                </button>
              </div>
            </div>
            <div className={scss.iconAndTextMainBlock}>
              <div className={scss.iconAndTextBlock}>
                <svg className={scss.iconAndTextIcon} viewBox='0 0 24 24'>
                  <defs>
                    <linearGradient id='gradient' x1='0%' y1='0%' x2='100%' y2='100%'>
                      <stop offset='0%' style={{ stopColor: '#F9EBAA', stopOpacity: 1 }} />
                      <stop offset='100%' style={{ stopColor: '#F8B560', stopOpacity: 1 }} />
                    </linearGradient>
                  </defs>
                  <BsCurrencyExchange
                    style={{ width: '100%', height: '100%', fill: 'url(#gradient)' }}
                  />
                </svg>
                <div className={scss.textBlockColumn}>
                  <h4>499 €</h4>
                  <p>На місяць</p>
                </div>
              </div>
              <div className={scss.iconAndTextBlockTwo}>
                <svg className={scss.iconAndTextIcon} viewBox='0 0 24 24'>
                  <defs>
                    <linearGradient id='gradient2' x1='0%' y1='0%' x2='100%' y2='100%'>
                      <stop offset='0%' style={{ stopColor: '#EFF4FC', stopOpacity: 1 }} />
                      <stop offset='100%' style={{ stopColor: '#C7DCEC', stopOpacity: 1 }} />
                    </linearGradient>
                  </defs>
                  <BsGeoAltFill
                    style={{ width: '100%', height: '100%', fill: 'url(#gradient2)' }}
                  />
                </svg>
                <div className={scss.textBlockColumn}>
                  <h4>608</h4>
                  <p>Маршрутів</p>
                </div>
              </div>
            </div>
          </div>
          <div className={scss.contentTwoPhones}>
            <ContentPhones />
          </div>
        </div>
      </div>
    </section>
  );
}
