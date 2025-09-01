import React from 'react';
// import { TrendingUp, Users, DollarSign } from 'lucide-react';
import scss from './Cases.module.scss';
import { BsCurrencyDollar, BsGraphUpArrow, BsPeople } from 'react-icons/bs';

export default function Cases() {
  const cases = [
    {
      title: 'E-commerce магазин електроніки',
      industry: 'Електроніка та гаджети',
      challenge: 'Низька конверсія сайту та висока вартість кліка в Google Ads',
      solution: 'Редизайн сайту + оптимізація рекламних кампаній + впровадження AI-чатбота',
      results: [
        { metric: 'Конверсія', value: '+180%', icon: <BsGraphUpArrow className={scss.cardIcon} /> },
        {
          metric: 'Вартість ліда',
          value: '-35%',
          icon: <BsCurrencyDollar className={scss.cardIcon} />,
        },
        {
          metric: 'Кількість заявок',
          value: '+220%',
          icon: <BsPeople className={scss.cardIcon} />,
        },
      ],
      period: '4 місяці',
    },
    {
      title: 'Освітні курси з дизайну',
      industry: 'Онлайн-освіта',
      challenge: 'Низький ROI від рекламних кампаній та недостатня автоматизація',
      solution: 'Повна автоматизація через Zapier + оптимізація landing pages + ретаргетинг',
      results: [
        {
          metric: 'ROI реклами',
          value: '+275%',
          icon: <BsCurrencyDollar className={scss.cardIcon} />,
        },
        {
          metric: 'Час обробки заявок',
          value: '-80%',
          icon: <BsGraphUpArrow className={scss.cardIcon} />,
        },
        {
          metric: 'Конверсія у продаж',
          value: '+150%',
          icon: <BsPeople className={scss.cardIcon} />,
        },
      ],
      period: '6 місяців',
    },
    {
      title: 'B2B SaaS стартап',
      industry: 'Програмне забезпечення',
      challenge: 'Потрібен професійний сайт та налаштування лід-генерації з нуля',
      solution: 'Розробка корпоративного сайту + Google Ads стратегія + CRM інтеграція',
      results: [
        {
          metric: 'Кваліфіковані ліди',
          value: '+400%',
          icon: <BsPeople className={scss.cardIcon} />,
        },
        {
          metric: 'Швидкість сайту',
          value: '+65%',
          icon: <BsGraphUpArrow className={scss.cardIcon} />,
        },
        {
          metric: 'Вартість залучення',
          value: '-45%',
          icon: <BsCurrencyDollar className={scss.cardIcon} />,
        },
      ],
      period: '3 місяці',
    },
  ];

  const testimonials = [
    {
      text: 'Команда impossibleAD не просто виконує технічні завдання – вони розуміють бізнес. Завдяки їхній роботі ми збільшили продажі на 180% за перші 4 місяці.',
      author: 'Олександр Петренко',
      position: 'CEO ElectroMax',
    },
    {
      text: 'Автоматизація, яку впровадили хлопці, звільнила мені 15 годин на тиждень. Тепер я можу зосередитися на розвитку бізнесу, а не на рутині.',
      author: 'Марія Коваленко',
      position: 'Засновниця DesignPro Academy',
    },
    {
      text: 'Рекомендую impossibleAD усім, хто шукає результат, а не просто красивий сайт. Вони зробили те, чого не змогли інші агенції – принесли реальних клієнтів.',
      author: 'Дмитро Сидоренко',
      position: 'Керівник CloudSoft Solutions',
    },
  ];

  return (
    <section className={scss.cases} id='cases'>
      <div className={scss.container}>
        <div className={scss.header}>
          <h2>Реальні результати наших клієнтів</h2>
          <p>Конкретні цифри та історії успіху від партнерів impossibleAD</p>
        </div>

        <div className={scss.casesGrid}>
          {cases.map((caseItem, index) => (
            <div key={index} className={scss.caseCard}>
              <div className={scss.caseHeader}>
                <h3>{caseItem.title}</h3>
                <span className={scss.industry}>{caseItem.industry}</span>
              </div>

              <div className={scss.caseContent}>
                <div className={scss.challenge}>
                  <strong>Виклик:</strong> {caseItem.challenge}
                </div>
                <div className={scss.solution}>
                  <strong>Рішення:</strong> {caseItem.solution}
                </div>
              </div>

              <div className={scss.results}>
                {caseItem.results.map((result, resultIndex) => (
                  <div key={resultIndex} className={scss.resultItem}>
                    <div className={scss.resultIcon}>{result.icon}</div>
                    <div className={scss.resultValue}>{result.value}</div>
                    <div className={scss.resultMetric}>{result.metric}</div>
                  </div>
                ))}
              </div>

              <div className={scss.period}>
                Термін досягнення: <strong>{caseItem.period}</strong>
              </div>
            </div>
          ))}
        </div>

        <div className={scss.testimonials}>
          <h3>Відгуки клієнтів</h3>
          <div className={scss.testimonialsGrid}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className={scss.testimonialCard}>
                <p>"{testimonial.text}"</p>
                <div className={scss.author}>
                  <div>
                    <strong>{testimonial.author}</strong>
                    <span>{testimonial.position}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
