import { FaWrench, FaCog, FaBullseye, FaStethoscope, FaDotCircle, FaCar } from 'react-icons/fa';
import styles from './ServicesSection.module.scss';

const services = [
  {
    icon: <FaWrench className={styles.cardIcon} />,
    title: 'Заміна моторної оливи',
    description: 'Повна заміна масла + фільтра за 30 хвилин',
    price: 'від 600 грн',
    idCard: 'changing-engine-oil',
  },
  {
    icon: <FaStethoscope className={styles.cardIcon} />,
    title: "Комп'ютерна діагностика",
    description: 'Перевірка 50+ пунктів вашого авто',
    price: 'від 900 грн',
    idCard: 'computer-diagnostics',
  },
  {
    icon: <FaCog className={styles.cardIcon} />,
    title: 'Заміна гальмівних колодок',
    description: 'Повна заміна з перевіркою гальмівної системи',
    price: 'від 1200 грн',
    idCard: 'replacing-brake-pads',
  },
  {
    icon: <FaCog className={styles.cardIcon} />,
    title: 'Ремонт двигуна',
    description: 'Повний ремонт двигуна з діагностикою та гарантією',
    price: 'від 40000 грн',
    idCard: 'engine-repair',
  },
  {
    icon: <FaBullseye className={styles.cardIcon} />,
    title: 'Ремонт коробки передач',
    description: 'Ремонт механічних та автоматичних коробок передач',
    price: 'від 14000 грн',
    idCard: 'gearbox-repair',
  },
  {
    icon: <FaCar className={styles.cardIcon} />,
    title: 'Комплексна діагностика',
    description: 'Повна перевірка всіх систем автомобіля',
    price: 'від 1800 грн',
    idCard: 'comprehensive-diagnostics',
  },
  {
    icon: <FaDotCircle className={styles.cardIcon} />,
    title: 'Шиномонтаж',
    description: 'Заміна, балансування, ремонт коліс',
    price: 'від 400 грн',
    idCard: 'tire-fitting',
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
              document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
            }>
            Записатися на консультацію →
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
