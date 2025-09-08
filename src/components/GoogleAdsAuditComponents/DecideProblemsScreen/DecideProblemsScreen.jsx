import { BsBarChart, BsBullseye, BsCheck2Circle, BsFileEarmarkText } from 'react-icons/bs';
import scss from './DecideProblemsScreen.module.scss';

export default function DecideProblemsScreen() {
  const decideProblems = [
    {
      icon: <BsCheck2Circle className={scss.cardIcon} />,
      title: 'Повний аудит і виправлення помилок',
      description: 'Знаходимо і усуваємо всі проблеми в налаштуваннях кампаній',
    },
    {
      icon: <BsBullseye className={scss.cardIcon} />,
      title: 'Оптимізація CPL та збільшення ROI',
      description: 'Знижуємо вартість ліда та збільшуємо прибутковість реклами',
    },
    {
      icon: <BsBarChart className={scss.cardIcon} />,
      title: 'Конверсійне відстеження, аналітика, A/B-тести',
      description: 'Налаштовуємо точне відстеження та постійно тестуємо нові гіпотези',
    },
    {
      icon: <BsFileEarmarkText className={scss.cardIcon} />,
      title: 'Прозорі звіти та чіткі рекомендації',
      description: 'Регулярні детальні звіти з конкретними діями для покращення',
    },
  ];

  return (
    <section className={scss.decideProblemsScreen} id='decideProblems'>
      <div className={scss.container}>
        <div className={scss.header}>
          <h2>Знайомі проблеми з Google Ads?</h2>
          <p>90% бізнесів стикаються з цими труднощами при самостійній роботі з рекламою</p>
        </div>

        <div className={scss.flexBlock}>
          {decideProblems.map((problem, index) => (
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
