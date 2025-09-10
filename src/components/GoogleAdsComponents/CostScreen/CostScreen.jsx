import clsx from 'clsx';
import scss from './CostScreen.module.scss';
import { BsCalendar, BsCurrencyEuro } from 'react-icons/bs';

export default function CostScreen({ scrollToSection }) {
  const promises = [
    {
      icon: <BsCurrencyEuro className={clsx(scss.cardIcon, scss.cardIconBig)} />,
      title: 'Первинне налаштування',
      description: 'рекламних кампаній та кабінету',
      price: 'від 350 €',
      link: 'contacts',
    },
    {
      icon: <BsCalendar className={scss.cardIcon} />,
      title: 'Щомісячне ведення',
      description: 'повна оптимізація та підтримка',
      price: 'від 300 €',
      link: 'contacts',
    },
  ];

  return (
    <section className={scss.guaranteesScreen} id='cost'>
      <div className={scss.container}>
        <div className={scss.header}>
          <h2>Вартість</h2>
        </div>

        <div className={scss.flexBlock}>
          {promises.map((promise, index) => (
            <div key={index} className={scss.card}>
              <div className={scss.cardIconBlock}>{promise.icon}</div>
              <h3 className={scss.cartTitle}>{promise.title}</h3>
              <p className={scss.cartDescription}>{promise.description}</p>
              <p className={scss.cartPrice}>{promise.price}</p>
              <button className={scss.button} onClick={() => scrollToSection({})}>
                {index == 0 ? 'Дізнатися більше' : 'Обговорити деталі'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
