import scss from './OurSolutions.module.scss';

import { BsCart, BsCode, BsDisplay, BsGlobe2 } from 'react-icons/bs';

export default function OurSolutions() {
  const solutions = [
    {
      icon: <BsDisplay className={scss.cardIcon} />,
      title: 'Клієнти щодня шукають «СТО поруч»',
      description: 'Якщо не ви — то ваші конкуренти.',
    },
    {
      icon: <BsGlobe2 className={scss.cardIcon} />,
      title: 'Реклама дорожчає',
      description: 'Хто запускається сьогодні — платить менше.',
    },
    {
      icon: <BsCart className={scss.cardIcon} />,
      title: 'Швидкий старт',
      description: 'Стартувати можна вже цього тижня.',
    },
  ];

  return (
    <section className={scss.guaranteesScreen} id='solutions'>
      <div className={scss.container}>
        <div className={scss.header}>
          <h2>⏳ Чому зараз?</h2>
        </div>

        <div className={scss.flexBlock}>
          {solutions.map((problem, index) => (
            <div key={index} className={scss.card}>
              <div className={scss.cardIconBlock}>{problem.icon}</div>
              <h3 className={scss.cartTitle}>{problem.title}</h3>
              <p className={scss.cartDescription}>{problem.description}</p>
            </div>
          ))}
        </div>

        <div className={scss.buttonBottomSection}>
          <button className={scss.buttonBottom}>Дізнатись більше</button>
        </div>
      </div>
    </section>
  );
}
