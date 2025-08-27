import scss from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={scss.footer}>
      <div className={scss.container}>
        <div className={scss.footerContent}>
          <div className={scss.footerSection}>
            <h3>Impossible AD</h3>
            <p>Ваш надежный партнер для успеха в цифровом маркетинге по всей Европе.</p>
          </div>
          <div className={scss.footerSectionBlock}>
            <div className={scss.footerSection}>
              <h4>Услуги</h4>
              <ul>
                <a href='#'>
                  <li>Реклама в социальных сетях</li>
                </a>
                <a href='#'>
                  <li>Реклама на веб-сайтах</li>
                </a>
                <a href='#'>
                  <li>Google ADs</li>
                </a>
                <a href='#'>
                  <li>Лендинг-страницы</li>
                </a>
              </ul>
            </div>
            <div className={scss.footerSection}>
              <h4>Компания</h4>
              <ul>
                <a href='#'>
                  <li>О нас</li>
                </a>
                <a href='#'>
                  <li>Политика конфиденциальности</li>
                </a>
                <a href='#'>
                  <li>Условия обслуживания</li>
                </a>
                <a href='#'>
                  <li>Контакты</li>
                </a>
              </ul>
            </div>
          </div>
        </div>
        <div className={scss.footerBottom}>
          <p>&copy; 2025 Impossible AD. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}
