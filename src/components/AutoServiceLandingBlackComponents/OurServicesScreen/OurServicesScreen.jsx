import { BsCheckCircleFill } from 'react-icons/bs';
import CarContent from './CarContent/CarContent';
import scss from './OurServicesScreen.module.scss';

export default function OurServicesScreen() {
  const listTexts = [
    {
      title: '300 нових клієнтів за 3 місяці',
      description: 'Реальні заявки з реклами без ботів і фейкових дзвінків.',
      id: 'exampleSite',
    },
    {
      title: 'Ціна дзвінка — не дорожче 200 грн',
      description: 'Ми контролюємо кожну заявку',
      id: 'exampleSite',
    },
    {
      title: 'Робочий сайт для вашого СТО',
      description: 'Сучасний працюючий лендінг ',
      id: 'exampleSite',
    },
    {
      title: 'Telegram-бот для заявок',
      description: 'Усі звернення автоматично надходять у ваш Telegram',
      id: 'exampleSite',
    },
    {
      title: 'IP-телефонія з записом дзвінків',
      description: 'Аналізуйте якість обслуговування',
      id: 'exampleSite',
    },
    {
      title: 'Щотижневий короткий звіт з результатами',
      description: 'Простий і зрозумілий звіт',
      id: 'exampleSite',
    },
  ];

  return (
    <section className={scss.ourServicesMain} id='ourservices'>
      <div className={scss.container}>
        <div className={scss.contentMainServicesBlock}>
          <div className={scss.contentCar}>
            <CarContent />
          </div>

          <div className={scss.contentTitleAndDescription}>
            <h2 className={scss.title}>Наші послуги</h2>
            <p className={scss.description}>
              Ми запускаємо ефективну рекламу для СТО, яка реально приносить клієнтів — без води,
              без ризиків, з чіткими цифрами та звітами.
            </p>
            <div className={scss.listBlock}>
              {listTexts.map((info, idx) => (
                <div key={idx} className={scss.iconAndTextBlock}>
                  <div className={scss.iconBlock}>
                    <BsCheckCircleFill className={scss.iconList} />
                  </div>
                  <div className={scss.textBlockColumn}>
                    <h3 className={scss.listTitle}>{info.title}</h3>
                    <p className={scss.listDescription}> {info.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
