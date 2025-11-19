import scss from './ThanksPageOnFormFireAuto.module.scss';
// import ThanksPageContactForm from './ThanksPageContactForm/ThanksPageContactForm';
import { BsArrowLeftShort, BsBoxArrowInDown } from 'react-icons/bs';

export default function ThanksPageOnFormFireAuto() {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className={scss.backgroundBlock}>
      <div className={scss.container}>
        <div className={scss.thanksPageBlock}>
          <img src='/images/imageForThanksPageDownload.png' alt='imageForThanksPageDownload' />
          <h2>
            <span className={scss.titleBig}>🎉 Дякуємо!</span>
          </h2>
        </div>
      </div>
      <button onClick={handleBack} className={scss.backButton}>
        <BsArrowLeftShort className={scss.iconBack} />
        Повернутись
      </button>
    </div>
  );
}
