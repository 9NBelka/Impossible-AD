import { FaWrench, FaCog, FaBullseye, FaStethoscope, FaDotCircle, FaCar } from 'react-icons/fa';
import styles from './ServicesSection.module.scss';

const services = [
  {
    icon: <FaCog className={styles.cardIcon} />,
    title: 'Ремонт двигуна',
    description: 'Діагностика та усунення несправностей двигуна',
    price: 'від 40000 грн',
    idCard: 'engine-repair',
  },
  {
    icon: <FaBullseye className={styles.cardIcon} />,
    title: 'Ремонт трансмісії',
    description: 'Обслуговування та ремонт коробки передач',
    price: 'від 14000 грн',
    idCard: 'gearbox-repair',
  },
  {
    icon: <FaDotCircle className={styles.cardIcon} />,
    title: 'Ремонт підвіски',
    description: 'Відновлення ходової частини автомобіля',
    price: 'від 400 грн',
    idCard: 'tire-fitting',
  },
  {
    icon: <FaStethoscope className={styles.cardIcon} />,
    title: 'Ремонт електрики',
    description: 'Діагностика та ремонт електрообладнання',
    price: 'від 900 грн',
    idCard: 'computer-diagnostics',
  },
  {
    icon: <FaCog className={styles.cardIcon} />,
    title: 'Ремонт та обслуговування гальмівної системи',
    description: 'Повний спектр робіт з гальмівною системою для безпеки вашого автомобіля',
    price: 'від 1200 грн',
    idCard: 'replacing-brake-pads',
  },
  {
    icon: <FaCar className={styles.cardIcon} />,
    title: 'Технічне обслуговування',
    description: 'Планове ТО згідно з регламентом виробника для продовження терміну служби авто',
    price: 'від 1800 грн',
    idCard: 'comprehensive-diagnostics',
  },
  {
    icon: <FaWrench className={styles.cardIcon} />,
    title: 'Автозапчастини',
    description: 'Продаж оригінальних та якісних аналогових запчастин для всіх марок авто',
    price: 'від 600 грн',
    idCard: 'changing-engine-oil',
  },
];

const ServicesSection = () => {
  return (
    <section id='services' className={styles.servicesSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Наші послуги</h2>
          <p className={styles.description}>
            Професійне обслуговування автомобілів будь-якої марки з використанням сучасного
            обладнання та оригінальних запчастин
          </p>
        </div>

        <div className={styles.allCards}>
          {services.map((service, index) => (
            <div key={index} className={styles.card} id={service.idCard}>
              <div className={styles.cardHeader}>
                <div className={styles.iconContainer}>{service.icon}</div>
                <div className={styles.cardTitle}>{service.title}</div>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.cardDescription}>{service.description}</div>
                <div className={styles.price}>{service.price}</div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.footer}>
          <p className={styles.footerText}>
            Не знайшли потрібну послугу? Зв'яжіться з нами – ми обслуговуємо автомобілі будь-якої
            складності!
          </p>
          <button
            className={styles.ctaButton}
            onClick={() =>
              document.getElementById('contacts')?.scrollIntoView({ behavior: 'smooth' })
            }>
            Записатися на консультацію →
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
