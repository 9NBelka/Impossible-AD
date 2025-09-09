import { Navigate } from 'react-router-dom';
import scss from './NotFoundPage.module.scss';

export default function NotFoundPage() {
  const handleBack = () => {
    window.location.href = '/';
  };
  return (
    <div className={scss.backgroundBlock}>
      <div className={scss.container}>
        <div className={scss.notFoundPageBlock}>
          <img src='/images/NotFoundPage.png' alt='NotFoundPageImage' />
          <h2>Сторінку не знайдено</h2>
          <p className={scss.notFoundPageDescriptionOrange}>
            Здається, ми загубили слід. Повернімося на головну?
          </p>
          <button className={scss.notFoundPageButton} onClick={handleBack}>
            На головну
          </button>
        </div>
      </div>
    </div>
  );
}
