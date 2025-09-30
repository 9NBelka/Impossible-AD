import React from 'react';
import scss from './Process.module.scss';
import { BsCode, BsHeadphones, BsLightbulb, BsSearch } from 'react-icons/bs';

export default function Process() {
  const steps = [
    {
      icon: <BsSearch className={scss.stepIcon} />,
      title: 'Аналіз та аудит',
      description:
        'Детально вивчаємо ваш бізнес, конкурентів, цільову аудиторію. Виявляємо точки росту та вузькі місця.',
      duration: '2-3 дні',
    },
    {
      icon: <BsLightbulb className={scss.stepIcon} />,
      title: 'Стратегія та планування',
      description:
        'Розробляємо персональну стратегію досягнення ваших цілей з чіткими KPI та термінами.',
      duration: '3-5 днів',
    },
    {
      icon: <BsCode className={scss.stepIcon} />,
      title: 'Реалізація та запуск',
      description:
        'Створюємо сайт, налаштовуємо рекламу, впроваджуємо автоматизацію. Все під контролем.',
      duration: '2-4 тижні',
    },
    {
      icon: <BsHeadphones className={scss.stepIcon} />,
      title: 'Підтримка та оптимізація',
      description:
        'Постійний моніторинг результатів, щомісячна оптимізація та звіти. Ваш успіх – наша відповідальність.',
      duration: 'Постійно',
    },
  ];

  return (
    <section className={scss.process} id='process'>
      <div className={scss.container}>
        <div className={scss.header}>
          <h2>Як ми працюємо</h2>
          <p>Прозорий процес від ідеї до результату</p>
        </div>

        <div className={scss.timeline}>
          {steps.map((step, index) => (
            <div key={index} className={scss.step}>
              <div className={scss.stepNumber}>
                <span>{index + 1}</span>
              </div>
              <div className={scss.stepContent}>
                <div className={scss.stepIconBlock}>{step.icon}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                <div className={scss.duration}>
                  Тривалість: <strong>{step.duration}</strong>
                </div>
              </div>
              {index < steps.length - 1 && <div className={scss.connector}></div>}
            </div>
          ))}
        </div>

        <div className={scss.guarantee}>
          <h3>Наша гарантія</h3>
          <p>
            Якщо за перші 30 днів ви не побачите покращення в метриках, ми повернемо 100% коштів або
            працюватимемо безкоштовно до досягнення результату.
          </p>
          <button
            className={scss.startButton}
            onClick={() => {
              const element = document.getElementById('contacts');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}>
            Почати співпрацю
          </button>
        </div>
      </div>
    </section>
  );
}
