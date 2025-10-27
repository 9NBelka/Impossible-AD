import { useState, useEffect } from 'react';
import scss from './PopupOnSto.module.scss'; // Предполагается, что стили будут в отдельном файле
import { BsXLg } from 'react-icons/bs';

export default function PopupOnSto() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // const popupShown = sessionStorage.getItem('popupShown');
    // if (popupShown) {
    //   setHasShown(true);
    //   return;
    // }

    const timer = setTimeout(() => {
      setIsOpen(true);
      setHasShown(true);
      sessionStorage.setItem('popupShown', 'true');
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains(scss.popupOverlaySto)) {
      handleClose();
    }
  };

  if (hasShown && !isOpen) return null;

  return (
    <>
      {isOpen && (
        <div className={scss.popupOverlaySto} onClick={handleOverlayClick}>
          <div className={scss.popupContentSto}>
            <button className={scss.popupCloseSto} onClick={handleClose}>
              <BsXLg className={scss.popupCloseStoIcon} />
            </button>
            <h2>Добро пожаловать!</h2>
            <p>Это всплывающее окно появилось через 45 секунд.</p>
          </div>
        </div>
      )}
    </>
  );
}
