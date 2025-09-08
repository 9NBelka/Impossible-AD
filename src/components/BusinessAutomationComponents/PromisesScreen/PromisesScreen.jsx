import scss from './PromisesScreen.module.scss';

import { BsArrowUpRight, BsClock, BsLightningCharge, BsShield } from 'react-icons/bs';

export default function PromisesScreen() {
  const promises = [
    {
      icon: <BsArrowUpRight className={scss.cardIcon} />,
      title: 'Більше продажів',
      description: 'Зростання конверсії на 30-50% завдяки швидкій обробці заявок',
    },
    {
      icon: <BsClock className={scss.cardIcon} />,
      title: 'Економія часу',
      description: 'До 80% часу команди звільняється від рутинних завдань',
    },
    {
      icon: <BsShield className={scss.cardIcon} />,
      title: 'Контроль процесів',
      description: 'Повна прозорість та можливість відстежувати кожен крок',
    },
    {
      icon: <BsLightningCharge className={scss.cardIcon} />,
      title: 'Масштабованість',
      description: 'Система росте разом з вашим бізнесом без додаткових витрат',
    },
  ];

  return (
    <section className={scss.guaranteesScreen} id='promises'>
      <div className={scss.container}>
        <div className={scss.header}>
          <h2>Що ви отримаєте вже в перші тижні</h2>
        </div>

        <div className={scss.flexBlock}>
          {promises.map((promise, index) => (
            <div key={index} className={scss.card}>
              <div className={scss.cardIconBlock}>{promise.icon}</div>
              <h3 className={scss.cartTitle}>{promise.title}</h3>
              <p className={scss.cartDescription}>{promise.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
