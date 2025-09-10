import scss from './OurSolutions.module.scss';

import { BsCart, BsCode, BsDisplay, BsGlobe2 } from 'react-icons/bs';

export default function OurSolutions() {
  const solutions = [
    {
      icon: <BsDisplay className={scss.cardIcon} />,
      title: 'Лендінги',
      description:
        'Ідеальний старт для реклами й швидких продажів. Адаптивний дизайн, висока швидкість завантаження та акцент на конверсії.',
    },
    {
      icon: <BsGlobe2 className={scss.cardIcon} />,
      title: 'Корпоративні сайти',
      description:
        'Репутація вашої компанії онлайн. Стильний дизайн, зрозуміла структура, SEO-оптимізація та зручна панель керування.',
    },
    {
      icon: <BsCart className={scss.cardIcon} />,
      title: 'Інтернет-магазини',
      description:
        'Від десятків до тисяч товарів. Зручний каталог, інтеграції з CRM та службами доставки, онлайн-оплата й аналітика.',
    },
    {
      icon: <BsCode className={scss.cardIcon} />,
      title: 'Web-додатки',
      description:
        'Кастомні рішення під бізнес-процеси: від внутрішніх CRM-модулів до SaaS-продуктів.Масштабування без обмежень.',
    },
  ];

  return (
    <section className={scss.guaranteesScreen} id='solutions'>
      <div className={scss.container}>
        <div className={scss.header}>
          <h2>Наші рішення</h2>
          <p>
            Комплексні веб-рішення для будь-якого бізнесу — від простих лендінгів до складних
            додатків
          </p>
        </div>

        <div className={scss.flexBlock}>
          {solutions.map((problem, index) => (
            <div key={index} className={scss.card}>
              <div className={scss.cardIconBlock}>{problem.icon}</div>
              <h3 className={scss.cartTitle}>{problem.title}</h3>
              <p className={scss.cartDescription}>{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
