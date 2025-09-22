import {
  BsBullseye,
  BsChatLeft,
  BsCurrencyDollar,
  BsFileEarmarkMedical,
  BsGlobe2,
  BsRobot,
  BsTelephone,
} from 'react-icons/bs';
import scss from './WhatWillYouGet.module.scss';

export default function WhatWillYouGet({ scrollToSection }) {
  const problems = [
    {
      icon: <BsBullseye className={scss.cardIcon} />,
      title: '250 нових клієнтів за 3 місяці',
    },
    {
      icon: <BsCurrencyDollar className={scss.cardIcon} />,
      title: 'Ціна дзвінка — не дорожче 5$',
    },
    {
      icon: <BsGlobe2 className={scss.cardIcon} />,
      title: 'Робочий сайт для вашого СТО',
    },
    {
      icon: <BsRobot className={scss.cardIcon} />,
      title: 'Telegram-бот для заявок',
    },
    {
      icon: <BsTelephone className={scss.cardIcon} />,
      title: 'IP-телефонія з записом дзвінків',
    },
    {
      icon: <BsFileEarmarkMedical className={scss.cardIcon} />,
      title: 'Щотижневий короткий звіт з результатами',
    },
  ];

  return (
    <section className={scss.problemsScreen} id='whatwillyouget'>
      <div className={scss.container}>
        <div className={scss.header}>
          <h2>Чому саме ми?</h2>
        </div>

        <div className={scss.flexBlock}>
          {problems.map((problem, index) => (
            <div key={index} className={scss.card}>
              <div className={scss.cardIconBlock}>{problem.icon}</div>
              <div className={scss.cartTitleAndDescription}>
                <h3 className={scss.cartTitle}>{problem.title}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className={scss.blockTextAndButtonBottomSection}>
          <h4>👉 Усе це входить у пакет. Конкуренти беруть за це окремо.</h4>
          <p>
            Представники Google відзначили, що наші рекламні кампанії для СТО налаштовані на
            професійному рівні. Це означає: ви отримуєте якісну рекламу за стандартами Google
          </p>
          <button className={scss.buttonBottom} onClick={() => scrollToSection('contacts')}>
            Замовити пакет
          </button>
        </div>
      </div>
    </section>
  );
}
