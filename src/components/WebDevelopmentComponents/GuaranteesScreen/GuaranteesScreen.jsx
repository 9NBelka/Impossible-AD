import scss from './GuaranteesScreen.module.scss';
import { BsClock, BsHeadphones, BsLightningCharge } from 'react-icons/bs';

export default function GuaranteesScreen() {
  const approach = [
    {
      icon: <BsClock className={scss.cardIcon} />,
      subtitle: '10 днів',
      title: 'Лендінг під ключ',
      description: 'включено 2 кола правок',
    },
    {
      icon: <BsLightningCharge className={scss.cardIcon} />,
      subtitle: '14 днів',
      title: 'Аудит + quick wins',
      description: 'до 10 год dev/design на покращення',
    },
    {
      icon: <BsHeadphones className={scss.cardIcon} />,
      subtitle: '24/7',
      title: 'Підтримка після запуску',
      description: 'оновлення та технічна підтримка',
    },
  ];

  return (
    <section className={scss.guaranteesScreen} id='guarantees'>
      <div className={scss.container}>
        <div className={scss.header}>
          <h2>Гарантії та офери</h2>
          <p>Конкретні терміни, прозорі умови та повна підтримка вашого проекту</p>
        </div>

        <div className={scss.flexBlock}>
          {approach.map((problem, index) => (
            <div key={index} className={scss.card}>
              <div className={scss.cardIconBlock}>{problem.icon}</div>
              <p className={scss.cartSubtitle}>{problem.subtitle}</p>
              <h3 className={scss.cartTitle}>{problem.title}</h3>
              <div className={scss.greenBlockLine}></div>
              <p className={scss.cartDescription}>{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
