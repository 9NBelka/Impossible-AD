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
    icon: <IoEyeOutline className={styles.cardIcon} />,
    title: 'Перевірка лакофарбового покриття',
    description: 'Виявлення шпаклівки, перефарбування та ДТП',
    price: 'від 800 грн',
    idCard: 'paintwork-inspection',
  },
  {
    icon: <LuGauge className={styles.cardIcon} />,
    title: 'Перевірка компресії ДВЗ',
    description: 'Діагностика стану циліндро-поршневої групи',
    price: 'від 300 грн за циліндр',
    idCard: 'checking-combustion-engine',
  },
  {
    icon: <MdOutlineCameraAlt className={styles.cardIcon} />,
    title: 'Ендоскопія двигуна',
    description: 'Внутрішній огляд двигуна без розбирання',
    price: 'від 500 грн за циліндр',
    idCard: 'engine-endoscopy',
  },
  {
    icon: <RiTestTubeLine className={styles.cardIcon} />,
    title: 'Перевірка газів в охолоджуючій рідині',
    description: 'Діагностика пробою прокладки головки блоку',
    price: 'від 1200 грн',
    idCard: 'checking-coolant',
  },
  {
    icon: <LuWrench className={styles.cardIcon} />,
    title: 'Діагностика ходової',
    description: 'Повна перевірка підвіски та рульового управління',
    price: 'від 500 грн',
    idCard: 'chassis-diagnostics',
  },
  {
    icon: <CiSearch className={styles.cardIcon} />,
    title: 'Візуальний огляд двигуна',
    description: 'Зовнішня діагностика стану двигуна і навісного обладнання',
    price: 'від 500 грн',
    idCard: 'inspection-engine',
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
              document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
            }>
            Замовити діагностику →
          </button>
        </div>
      </div>
    </section>
  );
};

export default DiagnosticsSection;
