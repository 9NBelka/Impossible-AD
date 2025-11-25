import { useState } from 'react';
import scss from './CostScreen.module.scss';
import clsx from 'clsx';
import CostCard from './CostCard/CostCard';

export default function CostScreen() {
  const descriptions = [
    {
      description: '1st month - 300€',
    },
    {
      description: '2nd month - 400€',
    },
    {
      description: '3rd month - 500€',
    },
  ];

  const [isOn, setIsOn] = useState(false);

  return (
    <section className={scss.mainCostScreen} id='price'>
      <div className={scss.container}>
        <div className={scss.contentTitleAndDescription}>
          <h2 className={scss.title}>Pricing</h2>
          <div className={scss.descriptionAndButtonChangeBlock}>
            <p className={scss.description}>Per Month</p>
            <div
              className={clsx(scss.toggleSwitch, isOn ? 'on' : 'off')}
              onClick={() => setIsOn(!isOn)}>
              <div className={scss.toggleCircle} />
            </div>
            <p className={scss.description}>For 3 Months</p>
            <div className={scss.discountGradientBlock}>
              <p className={scss.textDiscount}>8% discount</p>
            </div>
          </div>
          <CostCard isOn={isOn} />
          <div className={scss.priceOnAdsBlock}>
            <h6>Advertising Budget</h6>
            <div className={scss.priceOnAdsDescriptionMain}>
              {descriptions.map((text, idx) => (
                <div key={idx} className={scss.priceOnAdsDescription}>
                  <div className={scss.blockIcon}>
                    <img src='/iconOnCostScreenBlack.svg' alt='iconOnCostScreenBlack' />
                  </div>
                  <p className={scss.priceOnAdsDescriptionText}>{text.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
