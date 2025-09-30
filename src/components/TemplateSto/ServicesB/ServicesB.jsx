import React from 'react';
// import { Search, Code, Zap, BarChart, Globe } from 'lucide-react';
import scss from './ServicesB.module.scss';
import {
  BsBarChart,
  BsCode,
  BsGlobe,
  BsLightningCharge,
  BsSearch,
  BsWrenchAdjustable,
} from 'react-icons/bs';

import { LuStethoscope } from 'react-icons/lu';
import { IoMdSettings } from 'react-icons/io';

export default function ServicesB() {
  const services = [
    {
      icon: <BsWrenchAdjustable className={scss.cardIcon} />,
      title: 'Заміна моторної оливи',
      description: 'Повна заміна масла + фільтра за 30 хвилин',
      // features: ['Пошукова реклама', 'Медійна реклама', 'YouTube Ads', 'Shopping кампанії'],

      price: 'від 600 грн',
    },
    {
      icon: <LuStethoscope className={scss.cardIcon} />,
      title: 'Комп`ютерна діагностика',
      description: 'Перевірка 50+ пунктів вашого авто',
      // features: ['Лендінги', 'Корпоративні сайти', 'Інтернет-магазини', 'Web додатки'],

      price: 'від 900 грн',
    },
    {
      icon: <IoMdSettings className={scss.cardIcon} />,
      title: 'Заміна гальмівних колодок',
      description: 'Повна заміна з перевіркою гальмівної системи',
      // features: ['AI чат-боти', 'CRM інтеграції', 'Email автоматизація', 'Workflow оптимізація'],

      price: 'від 1200 грн',
    },
    {
      icon: <IoMdSettings className={scss.cardIcon} />,
      title: 'Ваш текст',
      description: 'Ваш текст Ваш текст Ваш текст Ваш текст Ваш текст',
      // features: [
      //   'Аналіз ефективності',
      //   'Оптимізація бюджету',
      //   'A/B тестування',
      //   'Звіти з рекомендаціями',
      // ],

      price: 'від сума',
    },
    {
      icon: <IoMdSettings className={scss.cardIcon} />,
      title: 'Ваш текст',
      description: 'Ваш текст Ваш текст Ваш текст Ваш текст Ваш текст',
      // features: [
      //   'Аналіз ефективності',
      //   'Оптимізація бюджету',
      //   'A/B тестування',
      //   'Звіти з рекомендаціями',
      // ],

      price: 'від сума',
    },
    {
      icon: <IoMdSettings className={scss.cardIcon} />,
      title: 'Ваш текст',
      description: 'Ваш текст Ваш текст Ваш текст Ваш текст Ваш текст',
      // features: [
      //   'Аналіз ефективності',
      //   'Оптимізація бюджету',
      //   'A/B тестування',
      //   'Звіти з рекомендаціями',
      // ],

      price: 'від сума',
    },
    {
      icon: <IoMdSettings className={scss.cardIcon} />,
      title: 'Ваш текст',
      description: 'Ваш текст Ваш текст Ваш текст Ваш текст Ваш текст',
      // features: [
      //   'Аналіз ефективності',
      //   'Оптимізація бюджету',
      //   'A/B тестування',
      //   'Звіти з рекомендаціями',
      // ],

      price: 'від сума',
    },
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={scss.services} id='services'>
      <div className={scss.container}>
        <div className={scss.header}>
          <h2>Наші послуги</h2>
          <p>
            Професійне обслуговування автомобілів будь-якої марки з використанням сучасного
            обладнання та оригінальних запчастин
          </p>
        </div>

        <div className={scss.flexBlock}>
          {services.map((service, index) => (
            <div key={index} className={scss.card}>
              <div className={scss.cardIconBlock}>{service.icon}</div>
              <h3 className={scss.cartTitle}>{service.title}</h3>
              <p className={scss.cartDescription}>{service.description}</p>
              {/* <ul className={scss.features}>
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex}>{feature}</li>
                ))}
              </ul> */}
              <p className={scss.cartPrice}>{service.price}</p>
            </div>
          ))}
        </div>

        <div className={scss.buttonAndTextForForm}>
          <p className={scss.textForForm}>
            Не знайшли потрібну послугу? Зв'яжіться з нами – ми обслуговуємо автомобілі будь-якої
            складності!
          </p>
          <div>
            <button className={scss.buttonForForm} onClick={() => scrollToSection('contacts')}>
              Записатися на консультацію →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
