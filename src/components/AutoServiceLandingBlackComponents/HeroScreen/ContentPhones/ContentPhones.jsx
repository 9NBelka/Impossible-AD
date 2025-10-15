import clsx from 'clsx';
import scss from './ContentPhones.module.scss';
import { BsBuilding, BsCreditCard2BackFill, BsPeopleFill } from 'react-icons/bs';

export default function ContentPhones() {
  return (
    <div class={scss.card}>
      <div class={scss.content}></div>
      <div className={scss.phoneLeftBlock}>
        <img src='images/heroPhoneLeft.png' />
      </div>
      <div className={scss.phoneRightBlock}>
        <img src='images/heroPhoneRight.png' />
      </div>
      <div className={scss.neonContainer}>
        <div className={clsx(scss.neonSpot, scss.spot1)}></div>
        <div className={clsx(scss.neonSpot, scss.spot2)}></div>
        <div className={clsx(scss.neonSpot, scss.spot3)}></div>
      </div>
      <div className={scss.priceBlockGlass}>
        <div className={scss.priceBlockGlassBorder}>
          <div className={scss.iconAndTextBlock}>
            <div className={scss.backgroundIcon}>
              <BsCreditCard2BackFill className={scss.priceIcon} />
            </div>
            <h5>Ціна</h5>
          </div>
          <p className={scss.textDesignPrice}>
            <span>47</span> грн
          </p>
          <p className={scss.textDesign}>Звернення клієнта</p>
        </div>
      </div>
      <div className={scss.priceBlockGradient}>
        <div className={scss.iconAndTextBlock}>
          <div className={scss.backgroundIcon}>
            <BsBuilding className={scss.priceIcon} />
          </div>
          <h5>Users</h5>
        </div>
        <p className={scss.textDesignPrice}>
          <span>170</span>
        </p>
        <p className={scss.textDesign}>Клієнтів у місяць</p>
      </div>
      <div className={scss.priceBlockGlassGraph}>
        <div className={scss.iconAndTextBlock}>
          <div className={scss.backgroundIcon}>
            <BsPeopleFill className={scss.priceIcon} />
          </div>
          <h5>296+</h5>
        </div>
        <div className={scss.graphBlockRow}>
          <div className={scss.graphBlockColumn}>
            <div className={scss.graphBlockColumnImage}>
              <img src='/images/iconGraphOne.png' />
            </div>
            <p className={scss.textDesign}>Травень</p>
          </div>
          <div className={scss.graphBlockColumn}>
            <div className={scss.graphBlockColumnImage}>
              <img src='/images/iconGraphTwo.png' />
            </div>
            <p className={scss.textDesign}>Червень</p>
          </div>
          <div className={scss.graphBlockColumn}>
            <div className={scss.graphBlockColumnImage}>
              <img src='/images/iconGraphThree.png' />
            </div>
            <p className={scss.textDesign}>Липень</p>
          </div>
        </div>
      </div>
    </div>
  );
}
