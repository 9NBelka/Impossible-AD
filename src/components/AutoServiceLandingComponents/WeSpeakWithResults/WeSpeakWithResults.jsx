import { BsArrowUpRight, BsPeople, BsPlay, BsTelephone } from 'react-icons/bs';
import scss from './WeSpeakWithResults.module.scss';
import clsx from 'clsx';

export default function WeSpeakWithResults() {
  return (
    <section className={scss.problemsScreen} id='results'>
      <div className={scss.container}>
        <div className={scss.header}>
          <h2>Реальний результат</h2>
        </div>
        <div className={scss.caseBlockMain}>
          <div className={scss.caseBlock}>
            <div className={scss.iconBlockPlay}>
              <BsPlay className={scss.iconPlay} />
            </div>
            <h3 className={scss.caseBlockTitle}>📹 Кейс просування СТО в Україні</h3>
            <p className={scss.caseBlockText}>Зростання кількості клієнтів на 72% за 3 місяці</p>
          </div>
          <div className={scss.infoBlock}>
            <div className={scss.infoBlockRow}>
              <div className={scss.infoBlockColumn}>
                <BsArrowUpRight className={scss.infoIconTop} />
                <h4>від 1€</h4>
                <p>Вартість ліда</p>
              </div>
              <div className={scss.infoBlockColumn}>
                <BsPeople className={clsx(scss.infoIconTop, scss.blueIcon)} />
                <h4 className={scss.blueText}>250+</h4>
                <p>Маршрутів на місяць</p>
              </div>
            </div>
            <div className={scss.infoBlockList}>
              <div className={scss.infoIconAndText}>
                <BsTelephone className={scss.infoIcon} />
                <p>Результат на 4-му місяці:</p>
              </div>
              <ul>
                <li>Понад 250 користувачів проклали маршрут до СТО за місяць</li>
                <li>Клієнт отримує стабільний потік звернень: і дзвінки, і заявки</li>
                <li>Прозорий облік кожного контакту через Апі телефонію</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
