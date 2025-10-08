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
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d195396.29217114515!2d36.35812139570484!3d49.94922796004898!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4127a6cd428fa91b%3A0xc1eeead81d445bbe!2z0KHQsNGA0LbQuNC9INCv0YA!5e0!3m2!1sru!2sua!4v1759149799981!5m2!1sru!2sua'
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
                <p>вулиця Вацлава Гавела, 4 (на території БЦ Silver Cetre)</p>
              </div>
            </div>

            <div className={scss.textsBlockAndIcon}>
              <div className={scss.iconBlock}>
                <FiPhoneCall className={scss.icon} />
              </div>
              <div>
                <h3>Телефони</h3>
                <a
                  href='tel:+380633349467'
                  class='hover:text-brand-blue transition-colors binct-phone-number-4'
                  data-binct-original='2'>
                  +38 (090) 000-00-00
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
                  <p>Субота: за домовленістю</p>
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
