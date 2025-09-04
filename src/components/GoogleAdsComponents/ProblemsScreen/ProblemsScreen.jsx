import { BsExclamationTriangle, BsFileEarmarkX, BsGraphDownArrow, BsPeople } from 'react-icons/bs';
import scss from './ProblemsScreen.module.scss';

export default function ProblemsScreen() {
  const problems = [
    {
      icon: <BsGraphDownArrow className={scss.cardIcon} />,
      title: 'Зливається бюджет, а продажів немає',
      description: 'Ваша реклама працює вхолосту, витрачаючи гроші без результату',
    },
    {
      icon: <BsExclamationTriangle className={scss.cardIcon} />,
      title: 'Висока вартість ліда, реклама не окупається',
      description: 'CPL зростає, а ROI падає — бізнес працює в мінус',
    },
    {
      icon: <BsPeople className={scss.cardIcon} />,
      title: 'Нецільова аудиторія через неправильні ключі',
      description: 'Показуємо рекламу не тим людям, хто готовий купувати',
    },
    {
      icon: <BsFileEarmarkX className={scss.cardIcon} />,
      title: 'Немає прозорих звітів',
      description: 'Незрозуміло, на що витрачаються гроші та який реальний ефект',
    },
  ];

  return (
    <section className={scss.problemsScreen} id='problems'>
      <div className={scss.container}>
        <div className={scss.header}>
          <h2>Знайомі проблеми з Google Ads?</h2>
          <p>90% бізнесів стикаються з цими труднощами при самостійній роботі з рекламою</p>
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
