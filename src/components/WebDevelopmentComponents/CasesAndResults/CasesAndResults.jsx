import { BsArrowUpRight, BsBullseye, BsSearch } from 'react-icons/bs';
import scss from './CasesAndResults.module.scss';

export default function CasesAndResults() {
  const casesAndResults = [
    {
      icon: <BsArrowUpRight className={scss.cardIcon} />,
      title: '+120% продажів за 3 місяці',
      subtitle: 'після редизайну інтернет-магазину',
      description:
        'Повністю перероблений UX/UI, оптимізація швидкості та checkout-процесу привели до подвоєння конверсій.',
      number: ['Конверсія: 1.2% → 2.8%', 'Швидкість: 4.2с → 1.8с', 'Відмов: 68% → 42%'],
    },
    {
      icon: <BsBullseye className={scss.cardIcon} />,
      title: 'CPL у 2,3 рази нижчий',
      subtitle: 'за середній у ніші',
      description:
        'Лендінг з фокусом на конверсії та A/B тестування елементів дозволив значно знизити вартість ліда.',
      number: ['CPL: $45 → $19', 'CR: 2.1% → 5.8%', 'ROI: +340%'],
    },
    {
      icon: <BsSearch className={scss.cardIcon} />,
      title: 'Топ-3 у Google за 6 місяців',
      subtitle: 'корпоративний сайт із SEO-оптимізацією',
      description:
        'Технічна оптимізація, контент-стратегія та link building привели сайт у топ за конкурентними запитами.',
      number: ['Позиції: 50+ → 3', 'Трафік: +280%', 'Заявки: +190%'],
    },
  ];

  return (
    <section className={scss.problemsScreen} id='casesAndResults'>
      <div className={scss.container}>
        <div className={scss.header}>
          <h2>Кейси та результати</h2>
          <p>Конкретні цифри наших успішних проектів — результати, які говорять самі за себе</p>
        </div>

        <div className={scss.flexBlock}>
          {casesAndResults.map((problem, index) => (
            <div key={index} className={scss.card}>
              <div className={scss.cardIconBlockAndDescription}>
                <div className={scss.cardIconBlock}>{problem.icon}</div>
                <div className={scss.cartTitleAndDescription}>
                  <h3 className={scss.cartTitle}>{problem.title}</h3>
                  <p className={scss.subtitle}>{problem.subtitle}</p>
                </div>
              </div>
              <p className={scss.cartDescription}>{problem.description}</p>
              <div className={scss.greenTextBlocks}>
                {problem.number.map((numb, idx) => (
                  <div key={idx} className={scss.greenTextBlock}>
                    <p className={scss.greenText}>{numb}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className={scss.buttonBlock}>
          <button className={scss.ctaButton}>Дивитися всі кейси</button>
        </div>
      </div>
    </section>
  );
}
