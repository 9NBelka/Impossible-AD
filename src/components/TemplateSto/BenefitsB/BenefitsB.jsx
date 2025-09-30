import React from 'react';
import scss from './BenefitsB.module.scss';
import {
  BsAward,
  BsBullseye,
  BsCamera,
  BsGlobe,
  BsGraphUpArrow,
  BsLightbulb,
  BsPeople,
} from 'react-icons/bs';
import { LuGauge, LuStethoscope } from 'react-icons/lu';
import { IoEyeOutline } from 'react-icons/io5';

export default function BenefitsB() {
  const benefits = [
    {
      icon: <LuStethoscope className={scss.cardIcon} />,
      title: 'Комп`ютерна діагностика',
      description: 'Повна перевірка електронних систем автомобіля',
      price: 'від 500 грн',
    },
    {
      icon: <IoEyeOutline className={scss.cardIcon} />,
      title: 'Перевірка лакофарбового покриття',
      description: 'Виявлення шпаклівки, перефарбування та ДТП',
      price: 'від 800 грн',
    },
    {
      icon: <LuGauge className={scss.cardIcon} />,
      title: 'Перевірка компресії ДВЗ',
      description: 'Діагностика стану циліндро-поршневої групи',
      price: 'від 300 грн за циліндр',
    },
    {
      icon: <BsCamera className={scss.cardIcon} />,
      title: 'Ваш текст',
      description: 'Ваш текст Ваш текст Ваш текст Ваш текст Ваш текст',
    },
    {
      icon: <BsCamera className={scss.cardIcon} />,
      title: 'Ваш текст',
      description: 'Ваш текст Ваш текст Ваш текст Ваш текст Ваш текст',
    },
    {
      icon: <BsCamera className={scss.cardIcon} />,
      title: 'Ваш текст',
      description: 'Ваш текст Ваш текст Ваш текст Ваш текст Ваш текст',
    },
  ];

  return (
    <section className={scss.benefits} id='benefits'>
      <div className={scss.container}>
        <div className={scss.header}>
          <h2>Діагностика перед покупкою авто</h2>
          <p>
            Професійна діагностика допоможе виявити приховані дефекти та уникнути дорогих ремонтів у
            майбутньому
          </p>
        </div>

        <div className={scss.flexBlock}>
          {benefits.map((benefit, index) => (
            <div key={index} className={scss.card}>
              <div className={scss.cardIconBlock}>{benefit.icon}</div>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
              <p className={scss.cartPrice}>{benefit.price}</p>
            </div>
          ))}
        </div>

        <div className={scss.cta}>
          <h3>Готові почати співпрацю?</h3>
          <p>
            Комплексна діагностика - найкращий спосіб переконатися у справності автомобіля перед
            покупкою
          </p>
          <button
            className={scss.ctaButton}
            onClick={() => {
              const element = document.getElementById('contacts');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}>
            Замовити діагностику →
          </button>
        </div>
      </div>
    </section>
  );
}
