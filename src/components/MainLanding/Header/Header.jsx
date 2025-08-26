import scss from './Header.module.scss';

export default function Header() {
  return (
    <header className={scss.header}>
      <div className={scss.container}>
        <a href='#'>
          <div className={scss.logoBlock}>
            <h2>Impossible AD</h2>
          </div>
        </a>
        <nav className={scss.nav}>
          <ul className={scss.navList}>
            <a href='#services'>
              <li>Услуги</li>
            </a>
            <a href='#about'>
              <li>О нас</li>
            </a>
            <a href='#contact'>
              <li>Контакты</li>
            </a>
          </ul>
        </nav>
      </div>
    </header>
  );
}
