import { useState } from 'react';
import scss from './CostScreen.module.scss';
import clsx from 'clsx';
import CostCard from './CostCard/CostCard';

export default function CostScreen() {
  const descriptions = [
    {
      description: '1-й місяць - 300€',
    },
    {
      description: '2-й місяць - 400€',
    },
    {
      description: '3-й місяць - 500€',
    },
  ];

  const [isOn, setIsOn] = useState(false);

  return (
    <section className={scss.mainCostScreen}>
      <div className={scss.container}>
        <div className={scss.contentTitleAndDescription}>
          <h2 className={scss.title}>Вартість</h2>
          <div className={scss.descriptionAndButtonChangeBlock}>
            <p className={scss.description}>Раз на місяць</p>
            <div
              className={clsx(scss.toggleSwitch, isOn ? 'on' : 'off')}
              onClick={() => setIsOn(!isOn)}>
              <div className={scss.toggleCircle} />
            </div>
            <p className={scss.description}>За 3 місяці</p>
            <div className={scss.discountGradientBlock}>
              <p className={scss.textDiscount}>8% знижка</p>
            </div>
          </div>
          <CostCard isOn={isOn} />
          <div className={scss.priceOnAdsBlock}>
            <h6>Бюджет на рекламу</h6>
            <div className={scss.priceOnAdsDescriptionMain}>
              {descriptions.map((text, idx) => (
                <div key={idx} className={scss.priceOnAdsDescription}>
                  <div className={scss.blockIcon}>
                    <img
                      src='/iconOnCostScreenBlack.svg'
                      alt='iconOnCostScreenBlack'
                      width='32'
                      height='32'
                    />
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
