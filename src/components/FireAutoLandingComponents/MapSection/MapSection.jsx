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
          <p>Знайдіть нас у зручному місці в центрі Києва</p>
        </div>
        <div className={scss.mapAndTextBlocks}>
          <div className={scss.mapBlock}>
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1271.6551616919164!2d30.476107!3d50.398054!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4c9ab36078da9%3A0xbb5a762a3dee4c4!2sFire%20Auto%20Service!5e0!3m2!1sru!2sua!4v1763390899917!5m2!1sru!2sua'
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
                <p>м. Київ, вул. Охтирська, 8</p>
              </div>
            </div>

            <div className={scss.textsBlockAndIcon}>
              <div className={scss.iconBlock}>
                <FiPhoneCall className={scss.icon} />
              </div>
              <div>
                <h3>Телефони</h3>
                <a
                  href='tel:+380733312299'
                  class='hover:text-brand-blue transition-colors binct-phone-number-4'
                  data-binct-original='2'>
                  +380 73 331 22 99
                </a>
                <a
                  href='tel:+380933312299'
                  class='hover:text-brand-blue transition-colors binct-phone-number-4'
                  data-binct-original='2'>
                  +380 93 331 22 99
                </a>
              </div>
            </div>
            <div className={scss.textsBlockAndIcon}>
              <div className={scss.iconBlock}>
                <BsClock className={scss.icon} />
              </div>
              <div>
                <h3>Графік роботи</h3>
                <div>
                  <p>Понеділок - П'ятниця: 09:00 - 19:00</p>
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
