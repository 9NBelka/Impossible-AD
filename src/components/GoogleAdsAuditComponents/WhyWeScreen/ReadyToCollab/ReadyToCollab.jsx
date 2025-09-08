import { BsCheck } from 'react-icons/bs';
import scss from './ReadyToCollab.module.scss';

export default function ReadyToCollab() {
  return (
    <div className={scss.readyToCollab}>
      <h4 className={scss.readyToCollabTitle}>Готові до співпраці?</h4>
      <p className={scss.readyToCollabDescription}>
        Маємо вільні місця для 3 нових клієнтів цього місяця
      </p>
      <div className={scss.iconAndTextBlocks}>
        <div className={scss.iconAndTextBlockBackground}>
          <BsCheck className={scss.iconCheck} />
          <p>Вільно</p>
        </div>
        <div className={scss.iconAndTextBlockBackground}>
          <BsCheck className={scss.iconCheck} />
          <p>Вільно</p>
        </div>
        <div className={scss.iconAndTextBlockBackground}>
          <BsCheck className={scss.iconCheck} />
          <p>Вільно</p>
        </div>
      </div>
    </div>
  );
}
