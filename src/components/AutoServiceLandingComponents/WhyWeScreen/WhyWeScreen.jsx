import { BsBullseye, BsChat, BsPeople, BsShield } from 'react-icons/bs';
import scss from './WhyWeScreen.module.scss';

export default function WhyWeScreen() {
  const problems = [
    {
      icon: <BsPeople className={scss.cardIcon} />,
      title: 'Ми самі власники СТО',
      description: 'Перевірили систему на собі.',
    },
    {
      icon: <BsBullseye className={scss.cardIcon} />,
      title: 'Все «під ключ»',
      description: 'Запускаємо сайт, рекламу, бот, телефонію, аналітику.',
    },
    {
      icon: <BsChat className={scss.cardIcon} />,
      title: 'Завжди на зв’язку',
      description: 'Щодня у Telegram, щотижня — короткий звіт з цифрами.',
    },
    {
      icon: <BsShield className={scss.cardIcon} />,
      title: 'Повна прозорість',
      description: 'Ви бачите всі дзвінки й заявки. Жодних секретів.',
    },
  ];

  return (
    <section className={scss.problemsScreen} id='whywescreen'>
      <div className={scss.container}>
        <div className={scss.header}>
          <h2>🛠 Чому саме ми?</h2>
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
