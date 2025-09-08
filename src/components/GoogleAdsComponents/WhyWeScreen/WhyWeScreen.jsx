import { BsBarChart, BsBullseye, BsCheck2Circle, BsFileEarmarkText } from 'react-icons/bs';
import scss from './WhyWeScreen.module.scss';

export default function WhyWeScreen() {
  const problems = [
    {
      icon: <BsCheck2Circle className={scss.cardIcon} />,
      title: 'Реклама під продажі',
      description: 'Ми будуємо кампанії під ваші бізнес-цілі.',
    },
    {
      icon: <BsBullseye className={scss.cardIcon} />,
      title: 'Прозорість',
      description: 'Щомісячні звіти без «води»',
    },
    {
      icon: <BsBarChart className={scss.cardIcon} />,
      title: 'Оптимізація витрат',
      description: 'Прибираємо нерелевантні кліки, знижуємо CPL',
    },
    {
      icon: <BsFileEarmarkText className={scss.cardIcon} />,
      title: 'Постійне ведення',
      description: 'Тестуємо, аналізуємо, покращуємо',
    },
  ];

  return (
    <section className={scss.problemsScreen} id='whywescreen'>
      <div className={scss.container}>
        <div className={scss.header}>
          <h2>Чому Google Ads з нами працює?</h2>
          <p>Комплексний підхід до налаштування та ведення Google Ads</p>
        </div>

        <div className={scss.flexBlock}>
          {problems.map((problem, index) => (
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
