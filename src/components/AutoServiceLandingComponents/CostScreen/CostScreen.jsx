import { BsCalendar4, BsCurrencyEuro, BsExclamationTriangle } from 'react-icons/bs';
import scss from './CostScreen.module.scss';
import clsx from 'clsx';

export default function CostScreen() {
  return (
    <section className={scss.problemsScreen} id='whatwillyouget'>
      <div className={scss.container}>
        <div className={scss.header}>
          <h2>💵 Скільки це коштує</h2>
        </div>
        <div className={scss.mainCostBlockWidth}>
          <div className={scss.mainCostBlock}>
            <div className={scss.iconAndTextBlockRow}>
              <BsCurrencyEuro className={scss.icon} />
              <div className={scss.iconAndTextBlockColumn}>
                <h5>Наші послуги</h5>
                <p>300 € на місяць</p>
              </div>
            </div>
            <div className={clsx(scss.iconAndTextBlockRow, scss.margTop)}>
              <BsCalendar4 className={clsx(scss.icon, scss.calendarIcon)} />
              <div className={scss.iconAndTextBlockColumn}>
                <h5>Бюджет на рекламу:</h5>
                <ul>
                  <li>1-й місяць — 300 €</li>
                  <li>2-й місяць — 400 €</li>
                  <li>3-й місяць — 500 €</li>
                </ul>
              </div>
            </div>
            <div
              className={clsx(
                scss.iconAndTextBlockRow,
                scss.margTop,
                scss.backgroundRedExclamation,
              )}>
              <BsExclamationTriangle className={clsx(scss.icon, scss.iconRed)} />
              <div className={scss.iconAndTextBlockColumn}>
                <h5>Важливі умови:</h5>
                <ul>
                  <li className={scss.miniText}>Мінімальний термін — 3 місяці.</li>
                  <li className={scss.miniText}>
                    Якщо зупинитесь раніше — акаунт Google Ads лишається за нами.
                  </li>
                </ul>
              </div>
            </div>
            <div className={scss.blockTextAndButtonBottomSection}>
              <button className={scss.buttonBottom}>Розпочати зараз</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
