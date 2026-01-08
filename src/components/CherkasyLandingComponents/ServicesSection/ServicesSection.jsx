import { FaWrench, FaCog, FaBullseye, FaStethoscope, FaDotCircle, FaCar } from 'react-icons/fa';
import styles from './ServicesSection.module.scss';

const services = [
  {
    icon: <FaCog className={styles.cardIcon} />,
    title: 'Техобслуговування',
    description: 'Планове ТО згідно з регламентом виробника для продовження терміну служби авто',
    price: 'від 100 грн',
    idCard: 'maintenance',
  },
  {
    icon: <FaBullseye className={styles.cardIcon} />,
    title: 'Ремонт кермового управління',
    description: 'Обслуговування та ремонт кермового управління',
    price: 'від 750 грн',
    idCard: 'steering-control',
  },
  {
    icon: <FaDotCircle className={styles.cardIcon} />,
    title: 'Ремонт паливної системи',
    description: 'Обслуговування та ремонт паливної системи',
    price: 'від 200 грн',
    idCard: 'fuel-system-repair',
  },
  {
    icon: <FaStethoscope className={styles.cardIcon} />,
    title: 'Ремонт підвіски',
    description: 'Обслуговування та ремонт підвіски',
    price: 'від 500 грн',
    idCard: 'suspension-repair',
  },
  {
    icon: <FaCog className={styles.cardIcon} />,
    title: 'Ремонт електрики та електроустаткування',
    description: 'Повний спектр робіт з гальмівною системою для безпеки вашого автомобіля',
    price: 'від 300 грн',
    idCard: 'electrical-repair',
  },
  {
    icon: <FaCar className={styles.cardIcon} />,
    title: 'Ремонт двигуна',
    description: 'Діагностика та усунення несправностей двигуна',
    price: 'від 3000 грн',
    idCard: 'auto-engines',
  },
  {
    icon: <FaWrench className={styles.cardIcon} />,
    title: 'Ремонт гальмівної системи',
    description: 'Повний спектр робіт з гальмівною системою для безпеки вашого автомобіля',
    price: 'від 400 грн',
    idCard: 'auto-brake-system',
  },
  {
    icon: <FaWrench className={styles.cardIcon} />,
    title: 'Ремонт зчеплення',
    description: 'Діагностика несправності та ремонт зчеплення',
    price: 'від 1000 грн',
    idCard: 'auto-clutch',
  },
  {
    icon: <FaWrench className={styles.cardIcon} />,
    title: 'Ремонт КПП',
    description: 'Діагностика несправності та КПП',
    price: 'від 500 грн',
    idCard: 'auto-gearbox',
  },
  {
    icon: <FaWrench className={styles.cardIcon} />,
    title: 'Ремонт дизельних двигунів',
    description: 'Діагностика несправності та ремонт дизельних двигунів',
    price: 'від 500 грн',
    idCard: 'auto-diesel-engines',
  },
  {
    icon: <FaWrench className={styles.cardIcon} />,
    title: 'Ремонт кондиціонерів',
    description: 'Діагностика та заправка кондиціонерів',
    price: 'від 900 грн',
    idCard: 'auto-conditioners',
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
