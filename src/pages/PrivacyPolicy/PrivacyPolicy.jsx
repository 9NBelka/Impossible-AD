import { BsArrowLeftShort } from 'react-icons/bs';
import scss from './PrivacyPolicy.module.scss';

export default function PrivacyPolicy() {
  const handleBack = () => {
    window.location.href = '/';
  };

  return (
    <section className={scss.privacyPolicy}>
      <div className={scss.container}>
        <button onClick={handleBack} className={scss.backButton}>
          <BsArrowLeftShort className={scss.iconBack} />
          Повернутись
        </button>
        <h1 className={scss.title}>Політика конфіденційності</h1>
        <div className={scss.content}>
          <h2 className={scss.sectionTitle}>1. Загальні положення</h2>
          <p className={scss.text}>
            Ми поважаємо вашу конфіденційність і зобов’язуємося захищати ваші персональні дані
            відповідно до Загального регламенту захисту даних (GDPR) та інших застосовних законів.
            Ця Політика конфіденційності пояснює, як ми збираємо, використовуємо, зберігаємо та
            захищаємо вашу інформацію.
          </p>

          <h2 className={scss.sectionTitle}>2. Які дані ми збираємо</h2>
          <p className={scss.text}>
            Ми можемо збирати такі персональні дані, коли ви взаємодієте з нашим сайтом:
          </p>
          <ul className={scss.list}>
            <li>Ім’я, електронна пошта та номер телефону, надані через контактні форми.</li>
            <li>
              Дані про використання сайту, зібрані за допомогою файлів cookie (наприклад, IP-адреса,
              тип браузера, сторінки, які ви відвідуєте).
            </li>
            <li>
              Інформація, надана добровільно під час заповнення форм, наприклад, для замовлення
              аудиту Google Ads.
            </li>
          </ul>

          <h2 className={scss.sectionTitle}>3. Як ми використовуємо ваші дані</h2>
          <p className={scss.text}>Зібрані дані використовуються для:</p>
          <ul className={scss.list}>
            <li>Обробки ваших запитів, таких як замовлення аудиту Google Ads.</li>
            <li>Покращення нашого сайту та послуг шляхом аналізу даних про використання.</li>
            <li>Відправки інформаційних повідомлень, якщо ви дали на це згоду.</li>
          </ul>

          <h2 className={scss.sectionTitle}>4. Передача даних третім особам</h2>
          <p className={scss.text}>
            Ми не передаємо ваші персональні дані третім особам, за винятком:
          </p>
          <ul className={scss.list}>
            <li>
              Ситуацій, коли це необхідно для виконання ваших запитів (наприклад, обробка платежів).
            </li>
            <li>Випадків, передбачених законом, наприклад, за вимогою державних органів.</li>
          </ul>

          <h2 className={scss.sectionTitle}>5. Ваші права</h2>
          <p className={scss.text}>Відповідно до GDPR, ви маєте право:</p>
          <ul className={scss.list}>
            <li>Доступу до ваших персональних даних.</li>
            <li>Виправлення або видалення ваших даних.</li>
            <li>Обмеження або заперечення проти обробки ваших даних.</li>
            <li>На перенесення даних.</li>
            <li>Відкликати згоду на обробку даних у будь-який час.</li>
          </ul>
          <p className={scss.text}>
            Для реалізації цих прав звертайтесь до нас через контактну інформацію, наведену нижче.
          </p>

          <h2 className={scss.sectionTitle}>6. Захист даних</h2>
          <p className={scss.text}>
            Ми використовуємо сучасні технічні та організаційні заходи для захисту ваших даних,
            включаючи шифрування та обмеження доступу до інформації.
          </p>

          <h2 className={scss.sectionTitle}>7. Файли cookie</h2>
          <p className={scss.text}>
            Наш сайт використовує файли cookie для покращення користувацького досвіду. Ви можете
            керувати налаштуваннями cookie через ваш браузер.
          </p>

          <h2 className={scss.sectionTitle}>8. Зміни до політики</h2>
          <p className={scss.text}>
            Ми можемо періодично оновлювати цю Політику конфіденційності. Про зміни ми повідомимо на
            цій сторінці.
          </p>

          <h2 className={scss.sectionTitle}>9. Контактна інформація</h2>
          <p className={scss.text}>
            Якщо у вас є питання щодо цієї Політики конфіденційності, зв’яжіться з нами:
          </p>
          <ul className={scss.list}>
            <li>
              Електронна пошта:{' '}
              <a href='mailto:support@yourdomain.com' className={scss.link}>
                support@yourdomain.com
              </a>
            </li>
            <li>Телефон: +380 123 456 789</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
