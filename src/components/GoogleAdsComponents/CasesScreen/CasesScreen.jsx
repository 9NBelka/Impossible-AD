import scss from './CasesScreen.module.scss';

import { BsCaretRight, BsCart, BsSearch, BsTv } from 'react-icons/bs';

export default function CasesScreen() {
  const cases = [
    {
      icon: <BsSearch className={scss.cardIcon} />,
      title: 'Пошукова реклама',
      description:
        'Гарячі ліди через комерційні запити. Показуємось тим, хто вже шукає ваш товар чи послугу.',
      list: ['Пошук по ключовим словам', 'Реклама на карточках товарів', 'Геотаргетинг'],
    },
    {
      icon: <BsTv className={scss.cardIcon} />,
      title: 'Медійна реклама',
      description:
        'Збільшення впізнаваності бренду, ремаркетинг і залучення нової аудиторії через банери.',
      list: ['Ремаркетинг відвідувачів', 'Look-alike аудиторії', 'Кросплатформенний охват'],
    },
    {
      icon: <BsCaretRight className={scss.cardIcon} />,
      title: 'YouTube Ads',
      description: 'Відеореклама для створення довіри та демонстрації переваг продукту в дії.',
      list: ['Skippable та Non-skippable', 'YouTube Shorts реклама', 'Відео для конверсій'],
    },
    {
      icon: <BsCart className={scss.cardIcon} />,
      title: 'Shopping кампанії',
      description:
        'Ідеально для e-commerce: товари з фотографіями, цінами та відгуками прямо в пошуку.',
      list: ['Товарні оголошення', 'Smart Shopping', 'Performance Max'],
    },
  ];

  return (
    <section className={scss.guaranteesScreen} id='guarantees'>
      <div className={scss.container}>
        <div className={scss.header}>
          <h2>Наші послуги</h2>
          <p>Повний спектр Google Ads для максимального охоплення вашої цільової аудиторії</p>
        </div>

        <div className={scss.flexBlock}>
          {cases.map((problem, index) => (
            <div key={index} className={scss.card}>
              <div className={scss.cardIconBlock}>{problem.icon}</div>
              <h3 className={scss.cartTitle}>{problem.title}</h3>
              <p className={scss.cartDescription}>{problem.description}</p>

              <ul className={scss.list}>
                {problem.list.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
