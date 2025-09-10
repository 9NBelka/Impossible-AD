import scss from './HowToMeWork.module.scss';

import { BsCart, BsCode, BsDisplay, BsGlobe2 } from 'react-icons/bs';

export default function HowToMeWork() {
  const work = [
    {
      icon: <BsDisplay className={scss.cardIcon} />,
      title: 'Бриф',
      description: 'аналіз бізнесу та ніші.',
    },
    {
      icon: <BsGlobe2 className={scss.cardIcon} />,
      title: 'Запуск',
      description: 'рекламних кампаній.',
    },
    {
      icon: <BsCart className={scss.cardIcon} />,
      title: 'Оптимізація',
      description: 'та масштабування.',
    },
    {
      icon: <BsCode className={scss.cardIcon} />,
      title: 'Звітність',
      description: 'щомісячна звітність + рекомендації.',
    },
  ];

  return (
    <section className={scss.guaranteesScreen} id='solution'>
      <div className={scss.container}>
        <div className={scss.header}>
          <h2>Наші рішення</h2>
          <p>
            Комплексні веб-рішення для будь-якого бізнесу — від простих лендінгів до складних
            додатків
          </p>
        </div>

        <div className={scss.flexBlock}>
          {work.map((problem, index) => (
            <div key={index} className={scss.card}>
              <div className={scss.nubmerBackGroundBlock}>
                <p className={scss.nubmerBlock}>0{index + 1}</p>
              </div>
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
