import React from 'react';
// import { Search, Code, Zap, BarChart, Globe } from 'lucide-react';
import scss from './ServicesB.module.scss';
import { BsBarChart, BsCode, BsGlobe, BsLightningCharge, BsSearch } from 'react-icons/bs';
import ContactFormForDownload from './ContactFormForDownload/ContactFormForDownload';

export default function ServicesB() {
  const services = [
    {
      icon: <BsSearch className={scss.cardIcon} />,
      title: 'Google Ads',
      description:
        'Налаштування та ведення рекламних кампаній з акцентом на продажі та мінімізацію вартості ліда.',
      features: ['Пошукова реклама', 'Медійна реклама', 'YouTube Ads', 'Shopping кампанії'],
      linkToPage: '/google-ads-audit',
    },
    {
      icon: <BsCode className={scss.cardIcon} />,
      title: 'Веб-розробка',
      description: 'Розробка сайтів від лендінгів і сайтів-візиток до інтернет-магазинів.',
      features: ['Лендінги', 'Корпоративні сайти', 'Інтернет-магазини', 'Web додатки'],
      linkToPage: '/web-development',
    },
    {
      icon: <BsLightningCharge className={scss.cardIcon} />,
      title: 'Бізнес-івтоматизація',
      description: 'Інтеграція AI- та Zapier-рішень для автоматизації бізнес-процесів.',
      features: ['AI чат-боти', 'CRM інтеграції', 'Email автоматизація', 'Workflow оптимізація'],
      linkToPage: '/business-automation',
    },
    {
      icon: <BsBarChart className={scss.cardIcon} />,
      title: 'Аудит реклами',
      description: 'Детальний аналіз кампаній Google/соцмереж, виявлення втрат та точок росту.',
      features: [
        'Аналіз ефективності',
        'Оптимізація бюджету',
        'A/B тестування',
        'Звіти з рекомендаціями',
      ],
      linkToPage: '/google-ads',
    },
    // {
    //   icon: <BsGlobe className={scss.cardIcon} />,
    //   title: 'Аудит сайту',
    //   description:
    //     'Оцінка юзабіліті, швидкості, SEO + покрокові рекомендації для підвищення конверсії.',
    //   features: ['SEO аналіз', 'UX/UI аудит', 'Технічна оптимізація', 'Конверсійний аналіз'],
    //   linkToPage: '/google-ads',
    // },
  ];

  return (
    <section className={scss.services} id='services'>
      <div className={scss.container}>
        <div className={scss.header}>
          <h2>Наші послуги</h2>
          <p>Комплексні рішення для росту вашого бізнесу онлайн</p>
        </div>

        <div className={scss.flexBlock}>
          {services.map((service, index) => (
            <div key={index} className={scss.card}>
              <div className={scss.cardIconBlock}>{service.icon}</div>
              <h3 className={scss.cartTitle}>{service.title}</h3>
              <p className={scss.cartDescription}>{service.description}</p>
              <ul className={scss.features}>
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex}>{feature}</li>
                ))}
              </ul>
              <a href={service.linkToPage}>
                <button className={scss.learnMore}>Детальніше</button>
              </a>
            </div>
          ))}
        </div>
      </div>
      <ContactFormForDownload />
    </section>
  );
}
