import scss from './CarContent.module.scss';
import { BsBuilding, BsCreditCard2BackFill, BsPeopleFill } from 'react-icons/bs';

export default function CarContent() {
  return (
    <div className={scss.carMainBlock}>
      <div className={scss.carBackground}>
        <img src='images/backgroundCarBorder.png' />
        <div className={scss.carImageBlock}>
          <img src='images/carImage.png' />
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
    </div>
  );
}
