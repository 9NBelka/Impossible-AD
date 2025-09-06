import scss from './AboutUs.module.scss';

import { BsArchive, BsAward, BsGlobe2, BsPeople } from 'react-icons/bs';

export default function AboutUs() {
  const info = [
    {
      icon: <BsAward className={scss.cardIcon} />,
      subtitle: '10+',
      title: 'років досвіду у веб-розробці',
      description: 'Пройшли шлях від простих сайтів до складних enterprise-рішень',
    },
    {
      icon: <BsArchive className={scss.cardIcon} />,
      subtitle: '30+',
      title: 'запущених інтернет-магазинів',
      description: 'Від стартапів до великих мереж з тисячами товарів',
    },
    {
      icon: <BsGlobe2 className={scss.cardIcon} />,
      subtitle: '3',
      title: 'континенти співпраці',
      description: 'Працюємо з бізнесами з України, ЄС та США',
    },
    {
      icon: <BsPeople className={scss.cardIcon} />,
      subtitle: '100%',
      title: 'фокус на результат',
      description: 'Орієнтир на продажі та автоматизацію бізнес-процесів',
    },
  ];

  return (
    <section className={scss.guaranteesScreen} id='guarantees'>
      <div className={scss.container}>
        <div className={scss.header}>
          <h2>Про нас</h2>
          <p>
            Ми — команда професіоналів, яка перетворює ідеї в цифрові рішення, що приносять прибуток
          </p>
        </div>

        <div className={scss.flexBlock}>
          {info.map((problem, index) => (
            <div key={index} className={scss.card}>
              <div className={scss.cardIconBlock}>{problem.icon}</div>
              <h3 className={scss.cartSubtitle}>{problem.subtitle}</h3>
              <h3 className={scss.cartTitle}>{problem.title}</h3>
              <p className={scss.cartDescription}>{problem.description}</p>
            </div>
          ))}
        </div>

        <div className={scss.footer}>
          <h3>Наша місія</h3>
          <p>
            Створювати веб-рішення, які не просто виглядають красиво, а реально працюють на ваш
            бізнес. Кожен проект — це партнерство, спрямоване на досягнення конкретних результатів.
          </p>
        </div>
      </div>
    </section>
  );
}
