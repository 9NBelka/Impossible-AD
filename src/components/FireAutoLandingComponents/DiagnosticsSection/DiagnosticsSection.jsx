import styles from './DiagnosticsSection.module.scss';
import { CiSearch } from 'react-icons/ci';
import { LuGauge, LuWrench } from 'react-icons/lu';
import { RiStethoscopeLine, RiTestTubeLine } from 'react-icons/ri';
import { MdOutlineCameraAlt } from 'react-icons/md';
import { IoEyeOutline } from 'react-icons/io5';

const diagnostics = [
  {
    icon: <RiStethoscopeLine className={styles.cardIcon} />,
    title: 'Комп`ютерна діагностика',
    description: 'Повна перевірка електронних систем автомобіля',
    price: 'від 500 грн',
    idCard: 'computer-diagnostics',
  },
  {
    icon: <LuWrench className={styles.cardIcon} />,
    title: 'Діагностика двигуна',
    description: 'Повна діагностика роботи двигуна',
    price: 'від 500 грн',
    idCard: 'chassis-diagnostics',
  },
  {
    icon: <LuWrench className={styles.cardIcon} />,
    title: 'Діагностика трансмісії',
    description: 'Діагностика коробки передач',
    price: 'від 500 грн',
    idCard: 'chassis-diagnostics',
  },
  {
    icon: <LuWrench className={styles.cardIcon} />,
    title: 'Діагностика електроніки',
    description: 'Перевірка електронних систем',
    price: 'від 500 грн',
    idCard: 'chassis-diagnostics',
  },
  {
    icon: <LuWrench className={styles.cardIcon} />,
    title: 'Діагностика ходової частини',
    description: 'Діагностика підвіски та рульового',
    price: 'від 500 грн',
    idCard: 'chassis-diagnostics',
  },
  {
    icon: <LuWrench className={styles.cardIcon} />,
    title: 'Діагностика підвіски',
    description: 'Повна перевірка стану ходової',
    price: 'від 500 грн',
    idCard: 'chassis-diagnostics',
  },
  {
    icon: <LuWrench className={styles.cardIcon} />,
    title: 'Перевірка амортизаторів',
    description: 'Заміна та відновлення амортизаторів',
    price: 'від 500 грн',
    idCard: 'chassis-diagnostics',
  },
  {
    icon: <LuWrench className={styles.cardIcon} />,
    title: 'Візуальний огляд двигуна',
    description: 'Зовнішня діагностика стану двигуна і навісного обладнання',
    price: 'від 500 грн',
    idCard: 'chassis-diagnostics',
  },
  {
    icon: <LuWrench className={styles.cardIcon} />,
    title: 'Перевірка автомобіля перед купівлею',
    description: 'Комплексна перевірка технічного стану автомобіля перед покупкою',
    price: 'від 500 грн',
    idCard: 'chassis-diagnostics',
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
