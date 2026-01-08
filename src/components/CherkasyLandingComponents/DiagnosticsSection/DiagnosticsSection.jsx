import styles from './DiagnosticsSection.module.scss';
import { CiSearch } from 'react-icons/ci';
import { LuGauge, LuWrench } from 'react-icons/lu';
import { RiStethoscopeLine, RiTestTubeLine } from 'react-icons/ri';
import { MdOutlineCameraAlt } from 'react-icons/md';
import { IoEyeOutline } from 'react-icons/io5';

const diagnostics = [
  {
    icon: <RiStethoscopeLine className={styles.cardIcon} />,
    title: 'Діагностика паливної системи',
    description: 'Діагностика несправності паливної системи',
    price: 'від 300 грн',
    idCard: 'fuel-system-diagnostics',
  },
  {
    icon: <LuWrench className={styles.cardIcon} />,
    title: 'Діагностика електропроводки',
    description: 'Перевірка електронних систем',
    price: 'від 300 грн',
    idCard: 'electronics-diagnostics',
  },
  {
    icon: <LuWrench className={styles.cardIcon} />,
    title: 'Діагностика двигуна',
    description: 'Діагностика несправності двигуна',
    price: 'від 500 грн',
    idCard: 'engine-diagnostics',
  },
  {
    icon: <LuWrench className={styles.cardIcon} />,
    title: 'Комплексна діагностика автомобіля',
    description: 'Комп`ютерна діагностика автомобіля, діагностика ДХЧ, ДВС',
    price: 'від 500 грн',
    idCard: 'computer-diagnostics',
  },
  {
    icon: <LuWrench className={styles.cardIcon} />,
    title: 'Діагностика гальмівної системи',
    description: 'Діагностика несправності гальмівної системи',
    price: 'від 300 грн',
    idCard: 'chassis-diagnostics',
  },
  {
    icon: <LuWrench className={styles.cardIcon} />,
    title: 'Діагностика кермового управління',
    description: 'Діагностика несправності кермового управління',
    price: 'від 300 грн',
    idCard: 'steering-diagnostics',
  },
  {
    icon: <LuWrench className={styles.cardIcon} />,
    title: 'Діагностика зчеплення',
    description: 'Заміна зчеплення у зборі або сальника приводу',
    price: 'від 300 грн',
    idCard: 'сlutch-diagnostics',
  },
  {
    icon: <LuWrench className={styles.cardIcon} />,
    title: 'Діагностика КПП',
    description: 'Діагностика несправності КПП',
    price: 'від 300 грн',
    idCard: 'transmission-diagnostics',
  },
  {
    icon: <LuWrench className={styles.cardIcon} />,
    title: 'Діагностика дизельного двигуна',
    description: 'Діагностика несправності дизельного двигуна',
    price: 'від 500 грн',
    idCard: 'diesel-engine-diagnostics',
  },
];

const DiagnosticsSection = () => {
  return (
    <section id='diagnostics' className={styles.servicesSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Діагностика перед покупкою авто</h2>
          <p className={styles.description}>
            Професійна діагностика допоможе виявити приховані дефекти та уникнути дорогих ремонтів у
            майбутньому
          </p>
        </div>

        <div className={styles.allCards}>
          {diagnostics.map((diagnostic, index) => (
            <div key={index} className={styles.card} id={diagnostic.idCard}>
              <div className={styles.cardHeader}>
                <div className={styles.iconContainer}>{diagnostic.icon}</div>
                <div className={styles.cardTitle}>{diagnostic.title}</div>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.cardDescription}>{diagnostic.description}</div>
                <div className={styles.price}>{diagnostic.price}</div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.footer}>
          <p className={styles.footerText}>
            Комплексна діагностика - найкращий спосіб переконатися у справності автомобіля перед
            покупкою
          </p>
          <button
            className={styles.ctaButton}
            onClick={() =>
              document.getElementById('contacts')?.scrollIntoView({ behavior: 'smooth' })
            }>
            Замовити діагностику →
          </button>
        </div>
      </div>
    </section>
  );
};

export default DiagnosticsSection;
