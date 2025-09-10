import scss from './OurApproach.module.scss';
import { BsCheck2Circle, BsPeople, BsSearch, BsSpeedometer2 } from 'react-icons/bs';

export default function OurApproach() {
  const approach = [
    {
      icon: <BsSpeedometer2 className={scss.cardIcon} />,
      title: 'PageSpeed мобайл ≥ 80',
      description: 'Швидкість завантаження критична для конверсій',
    },
    {
      icon: <BsPeople className={scss.cardIcon} />,
      title: 'UX/UI на основі досліджень',
      description: 'Дизайн, заснований на поведінці користувачів',
    },
    {
      icon: <BsSearch className={scss.cardIcon} />,
      title: 'SEO та аналітика «з коробки»',
      description: 'Оптимізація та відстеження результатів з першого дня',
    },
    {
      icon: <BsCheck2Circle className={scss.cardIcon} />,
      title: 'Прозорий процес',
      description: 'Від ТЗ до запуску — ви контролюєте кожен етап',
    },
  ];

  return (
    <section className={scss.guaranteesScreen} id='approach'>
      <div className={scss.container}>
        <div className={scss.header}>
          <h2>Наш підхід</h2>
          <p>Ми не просто створюємо сайти — ми будуємо digital-рішення, що приносять результат</p>
        </div>

        <div className={scss.flexBlock}>
          {approach.map((problem, index) => (
            <div key={index} className={scss.card}>
              <div className={scss.cardIconBlock}>{problem.icon}</div>
              <h3 className={scss.cartTitle}>{problem.title}</h3>
              <p className={scss.cartDescription}>{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
