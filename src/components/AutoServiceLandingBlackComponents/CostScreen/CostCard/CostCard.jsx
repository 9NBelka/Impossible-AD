import { BsCurrencyEuro } from 'react-icons/bs';
import scss from './CostCard.module.scss';
import { FaEuroSign } from 'react-icons/fa';

export default function CostCard({ isOn }) {
  const info = [
    {
      description: '300 нових клієнтів за 3 місяці',
    },
    {
      description: 'Telegram-бот для заявок',
    },
    {
      description: 'Ціна дзвінка - не дорожчк 200 грн.',
    },
    {
      description: 'Щотижневий звіт',
    },
    {
      description: 'Робочий сайт для вашого СТО',
    },
    {
      description: 'IP-телефонія з записом дзвінків',
    },
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className={scss.costCard}>
        <h3>У пакеті</h3>
        <div className={scss.pointDescriptionBlocks}>
          {info.map((info, idx) => (
            <div key={idx} className={scss.pointDescriptionBlock}>
              <div className={scss.blockIcon}>
                <img src='/iconOnCostScreenBlack.svg' alt='iconOnCostScreenBlack' />
              </div>
              <p className={scss.pointDescriptionText}>{info.description}</p>
            </div>
          ))}
        </div>
        <div className={scss.priceBlock}>
          {!isOn && <FaEuroSign className={scss.priceIcon} />}
          <h5 className={scss.priceText}>
            {!isOn ? (
              '499'
            ) : (
              <div className={scss.discountPrice}>
                <span>
                  1497
                  <FaEuroSign className={scss.priceIconOn} />
                </span>
                1377
                <FaEuroSign className={scss.priceIconOn} />
              </div>
            )}
          </h5>
          <p className={scss.monthText}>{!isOn ? '/ місяць' : 'за 3 місяця'}</p>
        </div>
        <div className={scss.fourMonthBlock}>
          <p className={scss.fourMonthText}>€349 / з 4 місяця</p>
        </div>
        <button className={scss.buttonNow} onClick={() => scrollToSection('contacts')}>
          Розпочати зараз
        </button>
      </div>
    </>
  );
}
