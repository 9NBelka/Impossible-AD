// import { ArrowUp, PhoneCall, MapPin } from 'lucide-react';
import { IoArrowUp } from 'react-icons/io5';
import styles from './HeroSection.module.scss';
import { MdOutlinePhoneInTalk } from 'react-icons/md';
import { LuMapPin } from 'react-icons/lu';

const HeroSection = () => {
  return (
    <section id='hero' className={styles.heroSection}>
      {/* Background Image */}
      <div className={styles.background}>
        <div className={styles.overlay}></div>
      </div>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.card}>
          <h1 className={styles.title}>
            <span className={styles.titleHighlight}>FireAuto</span> – ваш надійний автосервіс у
            Місті
          </h1>

          <p className={styles.subtitle}>
            Обслуговування авто будь-якої марки з гарантією <strong>3 місяці або 20 000 км</strong>
          </p>
          <p className={styles.secondaryText}>Потрібен ремонт авто, дзвони нам!</p>

          {/* Special Offer Banner */}
          <div className={styles.offerBanner}>
            <h2 className={styles.offerTitle}>
              🔥 -15% на перший візит для нових клієнтів до кінця місяця!
            </h2>
            <p className={styles.offerDescription}>
              Знижка діє на всі види послуг при першому відвідуванні
            </p>
          </div>

          <div className={styles.buttonGroup}>
            <a href='tel:+380733312299' className={styles.primaryButton}>
              <MdOutlinePhoneInTalk className={styles.buttonIcon} />
              Записатися зараз
            </a>
          </div>

          <div className={styles.locationBlock}>
            <LuMapPin className={styles.locationIcon} />
            <p
              className={styles.locationText}
              onClick={() =>
                document.getElementById('map')?.scrollIntoView({ behavior: 'smooth' })
              }>
              м. Київ, вул. Охтирська, 8
            </p>
          </div>
        </div>
      </div>

      <div
        className={styles.scrollUpButtonContainer}
        onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })}>
        <button className={styles.scrollUpButton}>
          <IoArrowUp className={styles.scrollUpIcon} />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
