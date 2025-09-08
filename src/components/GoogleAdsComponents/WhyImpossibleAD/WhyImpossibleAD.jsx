import scss from './WhyImpossibleAD.module.scss';
import { BsAward, BsBullseye, BsGraphUpArrow, BsRobot } from 'react-icons/bs';

export default function WhyImpossibleAD() {
  const problems2 = [
    {
      icon: <BsAward className={scss.cardIcon} />,
      title: '10+ років у performance-маркетингу',
      description: 'Великий досвід роботи з різними нішами та масштабування рекламних кампаній',
    },
    {
      icon: <BsRobot className={scss.cardIcon} />,
      title: 'Власна CRM + AI-автоматизація',
      description:
        'Використовуємо власні інструменти для автоматизації процесів та покращення ефективності',
    },
    {
      icon: <BsGraphUpArrow className={scss.cardIcon} />,
      title: 'Прозорі цифри замість «повітря»',
      description: 'Надаємо детальні звіти з реальними метриками та їх поясненням',
    },
    {
      icon: <BsBullseye className={scss.cardIcon} />,
      title: 'Працюємо тільки з нішами з реальним ROI',
      description: 'Відмовляємося від проектів, де неможливо досягти окупності реклами',
    },
  ];
  return (
    <section className={scss.problemsScreen} id='whywescreen2'>
      <div className={scss.container}>
        <div className={scss.header}>
          <h2>Чому обирають ImpossibleAD</h2>
          <p>Ми не просто ведемо рекламу — ми забезпечуемо її прибутковість</p>
        </div>

        <div className={scss.flexBlock}>
          {problems2.map((problem, index) => (
            <div key={index} className={scss.card}>
              <div className={scss.cardIconBlock}>{problem.icon}</div>
              <div className={scss.cartTitleAndDescription}>
                <h3 className={scss.cartTitle}>{problem.title}</h3>
                <p className={scss.cartDescription}>{problem.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
