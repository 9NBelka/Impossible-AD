import { LuMapPin } from 'react-icons/lu';
import scss from './MapSection.module.scss';
import { FiPhoneCall } from 'react-icons/fi';
import { BsClock } from 'react-icons/bs';

export default function MapSection() {
  return (
    <section className={scss.benefits} id='map'>
      <div className={scss.container}>
        <div className={scss.header}>
          <h2>Контакти та розташування</h2>
          <p>Знайдіть нас у зручному місці Черкасах</p>
        </div>
        <div className={scss.mapAndTextBlocks}>
          <div className={scss.mapBlock}>
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2595.181513268216!2d32.039502299999995!3d49.4243823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d14b351921e0f9%3A0x4891c492b069b76b!2z0KHQotCeIEF2dG9BdG1vc2ZlcmE!5e0!3m2!1sru!2sua!4v1767884155802!5m2!1sru!2sua'
              allowfullscreen=''
              loading='lazy'></iframe>
          </div>
          <div className={scss.textsBlock}>
            <div className={scss.textsBlockAndIcon}>
              <div className={scss.iconBlock}>
                <LuMapPin className={scss.icon} />
              </div>
              <div className={scss.blockTextColumn}>
                <h3>Адреса</h3>
                <p>м. Черкаси, вул. Луценко, 6</p>
              </div>
            </div>

            <div className={scss.textsBlockAndIcon}>
              <div className={scss.iconBlock}>
                <FiPhoneCall className={scss.icon} />
              </div>
              <div>
                <h3>Телефон</h3>
                <a href='tel:+380673341749'>+380 67 334 17 49</a>
                {/* <a href='tel:+380933312299'>+380 93 331 22 99</a> */}
              </div>
            </div>
            <div className={scss.textsBlockAndIcon}>
              <div className={scss.iconBlock}>
                <BsClock className={scss.icon} />
              </div>
              <div>
                <h3>Графік роботи</h3>
                <div>
                  <p>Понеділок - П'ятниця: 09:00 - 18:00</p>
                  <p>Субота: 09:00 - 15:00</p>
                  <p>Неділя: вихідний</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
