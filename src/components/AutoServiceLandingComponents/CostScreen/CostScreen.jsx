import { BsCalendar4, BsClockHistory, BsExclamationTriangle } from 'react-icons/bs';
import scss from './CostScreen.module.scss';
import clsx from 'clsx';

export default function CostScreen({ scrollToSection }) {
  return (
    <section className={scss.problemsScreen} id='price'>
      <div className={scss.container}>
        <div className={scss.header}>
          <h2>Вартість</h2>
        </div>
        <div className={scss.mainCostBlockWidth}>
          <div className={scss.mainCostBlock}>
            <div className={scss.blockWithPrice}>
              <p>300 € на місяць</p>
            </div>
            <div className={scss.iconAndTextBlockRow}>
              {/* <BsClockHistory className={scss.icon} /> */}
              <div className={scss.iconAndTextBlockColumn}>
                <h5>Наші послуги</h5>
                <ul>
                  <li>250 нових клієнтів за 3 місяці</li>
                  <li>Ціна дзвінка — не дорожче 5$</li>
                  <li>Робочий сайт для вашого СТО</li>
                  <li>Telegram-бот для заявок</li>
                  <li>IP-телефонія з записом дзвінків</li>
                  <li>Щотижневий короткий звіт з результатами</li>
                </ul>
              </div>
            </div>
            <div className={clsx(scss.iconAndTextBlockRow, scss.margTop)}>
              {/* <BsCalendar4 className={clsx(scss.icon, scss.calendarIcon)} /> */}
              <div className={scss.iconAndTextBlockColumn}>
                <h5>Бюджет на рекламу:</h5>
                <ul>
                  <li>1-й місяць — 300 €</li>
                  <li>2-й місяць — 400 €</li>
                  <li>3-й місяць — 500 €</li>
                </ul>
              </div>
            </div>
            <p className={scss.textDodatok}>* додатково сплачується бюджет на рекламу</p>
            <div
              className={clsx(
                scss.iconAndTextBlockRow,
                scss.margTop,
                scss.backgroundRedExclamation,
              )}>
              {/* <BsExclamationTriangle className={clsx(scss.icon, scss.iconRed)} /> */}
              <div className={scss.iconAndTextBlockColumn}>
                <h5>Важливі умови:</h5>
                <ul>
                  <li>Мінімальний термін — 3 місяці.</li>
                  <li>Якщо зупинитесь раніше — акаунт Google Ads лишається за нами.</li>
                </ul>
              </div>
            </div>
            <div className={scss.blockTextAndButtonBottomSection}>
              <button className={scss.buttonBottom} onClick={() => scrollToSection('contacts')}>
                Розпочати зараз
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
