import React from 'react';
import scss from './BenefitsB.module.scss';
import {
  BsAward,
  BsBullseye,
  BsGlobe,
  BsGraphUpArrow,
  BsLightbulb,
  BsPeople,
} from 'react-icons/bs';

export default function BenefitsB() {
  const benefits = [
    {
      icon: <BsAward className={scss.cardIcon} />,
      title: '8+ років досвіду',
      description:
        'З 2017 року ми допомагаємо бізнесу зростати онлайн. Працювали з різними нішами та знаємо, що працює.',
    },
    {
      icon: <BsBullseye className={scss.cardIcon} />,
      title: 'Фокус на ROI',
      description:
        'Ми не працюємо заради метрик тщеславства. Наша мета – збільшити ваш прибуток та оптимізувати витрати.',
    },
    {
      icon: <BsLightbulb className={scss.cardIcon} />,
      title: 'AI та інновації',
      description:
        'Використовуємо найсучасніші технології: від AI-автоматизації до передових рекламних стратегій.',
    },
    {
      icon: <BsPeople className={scss.cardIcon} />,
      title: 'Комплексний підхід',
      description:
        'Веб-розробка + реклама + автоматизація. Все під одним дахом для максимального ефекту.',
    },
    {
      icon: <BsGlobe className={scss.cardIcon} />,
      title: 'Повністю онлайн',
      description:
        "Працюємо з клієнтами по всьому світу. Гнучкий графік, швидкий зв'язок, результат без географічних обмежень.",
    },
    {
      icon: <BsGraphUpArrow className={scss.cardIcon} />,
      title: 'Гарантія результату',
      description:
        'Середній ріст конверсії наших клієнтів – 150%. Ми не просто робимо, ми досягаємо цілей.',
    },
  ];

  return (
    <section className={scss.benefits} id='benefits'>
      <div className={scss.container}>
        <div className={scss.header}>
          <h2>Чому обирають impossibleAD</h2>
          <p>Ми не просто виконавці – ми партнери у вашому бізнес-зростанні</p>
        </div>

        <div className={scss.flexBlock}>
          {benefits.map((benefit, index) => (
            <div key={index} className={scss.card}>
              <div className={scss.cardIconBlock}>{benefit.icon}</div>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className={scss.cta}>
          <h3>Готові почати співпрацю?</h3>
          <p>Залиште заявку та отримайте персональну стратегію росту</p>
          <button
            className={scss.ctaButton}
            onClick={() => {
              const element = document.getElementById('contacts');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}>
            Замовити консультацію
          </button>
        </div>
      </div>
    </section>
  );
}
