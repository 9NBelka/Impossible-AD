import { BsBarChart, BsDiagram3, BsRobot } from 'react-icons/bs';
import scss from './ProblemsScreen.module.scss';

export default function ProblemsScreen() {
  const problems = [
    {
      icon: <BsDiagram3 className={scss.cardIcon} />,
      title: 'Зливається бюджет, а продажів немає',
      description: 'Ваша реклама працює вхолосту, витрачаючи гроші без результату',
    },
    {
      icon: <BsRobot className={scss.cardIcon} />,
      title: 'Висока вартість ліда, реклама не окупається',
      description: 'CPL зростає, а ROI падає — бізнес працює в мінус',
    },
    {
      icon: <BsBarChart className={scss.cardIcon} />,
      title: 'Нецільова аудиторія через неправильні ключі',
      description: 'Показуємо рекламу не тим людям, хто готовий купувати',
    },
  ];

  return (
    <section className={scss.problemsScreen} id='solutions'>
      <div className={scss.container}>
        <div className={scss.header}>
          <h2>Як ми вирішуємо ці проблеми</h2>
        </div>

        <div className={scss.flexBlockRow}>
          <div className={scss.flexBlock}>
            {problems.map((text, index) => (
              <div key={index} className={scss.card}>
                <div className={scss.cardIconBlock}>{text.icon}</div>
                <div className={scss.cartTitleAndDescription}>
                  <h3 className={scss.cartTitle}>{text.title}</h3>
                  <p className={scss.cartDescription}>{text.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className={scss.flexBlockImage}>
            <img className={scss.imagePc} src='/images/automatizationProblemImage.png' />
            <img className={scss.imagePhone} src='/images/automatizationProblemImage2.jpg' />
          </div>
        </div>
      </div>
    </section>
  );
}
