import { BsArrowUpRight, BsClock, BsShield } from 'react-icons/bs';
import scss from './GuaranteesScreen.module.scss';

export default function GuaranteesScreen() {
  const guarantees = [
    {
      icon: <BsClock className={scss.cardIcon} />,
      subtitle: '72 години',
      title: 'Аудит Google Ads від 72 годин',
      description:
        'Детальний план виправлень з конкретними рекомендаціями для покращення результатів',
    },
    {
      icon: <BsShield className={scss.cardIcon} />,
      subtitle: '50% повернення',
      title: 'Гарантія результату',
      description:
        'Якщо за 30 днів після впровадження жодна метрика не покращиться — повертаємо 50% вартості аудиту',
    },
    {
      icon: <BsArrowUpRight className={scss.cardIcon} />,
      subtitle: 'Щотижня',
      title: 'Щотижневе ведення з акцентом на CPL',
      description:
        'Постійна оптимізація кампаній з фокусом на зниження вартості ліда та збільшення ROI',
    },
  ];

  return (
    <section className={scss.guaranteesScreen} id='guarantees'>
      <div className={scss.container}>
        <div className={scss.header}>
          <h2>Наші гарантії</h2>
          <p>Ми впевнені в якості наших послуг і готові гарантувати результат</p>
        </div>

        <div className={scss.flexBlock}>
          {guarantees.map((problem, index) => (
            <div key={index} className={scss.card}>
              <div className={scss.cardIconBlock}>{problem.icon}</div>
              <div className={scss.subTitleBlock}>
                <p className={scss.subTitleText}>{problem.subtitle}</p>
              </div>
              <h3 className={scss.cartTitle}>{problem.title}</h3>
              <p className={scss.cartDescription}>{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
