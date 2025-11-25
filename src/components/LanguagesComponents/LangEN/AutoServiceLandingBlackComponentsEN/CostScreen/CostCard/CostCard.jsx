import { BsCurrencyEuro } from 'react-icons/bs';
import scss from './CostCard.module.scss';
import { FaEuroSign } from 'react-icons/fa';

export default function CostCard({ isOn }) {
  const info = [
    {
      description: '300 new clients in 3 months',
    },
    {
      description: 'A Telegram bot for handling inquiries',
    },
    {
      description: 'Call cost — no more than 200 UAH.',
    },
    {
      description: 'Weekly report"',
    },
    {
      description: 'A fully functioning website for your auto repair shop',
    },
    {
      description: 'IP telephony with call recording',
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
        <h3>Included in the package</h3>
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
          <p className={scss.monthText}>{!isOn ? '/ month' : 'for 3 months'}</p>
        </div>
        <div className={scss.fourMonthBlock}>
          <p className={scss.fourMonthText}>€349 / from the 4th month</p>
        </div>
        <button className={scss.buttonNow} onClick={() => scrollToSection('contacts')}>
          Start Now
        </button>
      </div>
    </>
  );
}
