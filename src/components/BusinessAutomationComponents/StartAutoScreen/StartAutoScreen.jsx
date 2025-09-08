import { BsCheck2Circle, BsClock } from 'react-icons/bs';
import scss from './StartAutoScreen.module.scss';
import clsx from 'clsx';

export default function StartAutoScreen({ scrollToSection }) {
  const auditText = [
    {
      title: 'Інтеграція ключових процесів',
    },
    {
      title: 'Налаштування автоматичних сценаріїв',
    },
    {
      title: 'Створення AI-чатботів',
    },
    {
      title: 'Навчання вашої команди',
    },
    {
      title: 'Технічна підтримка 30 днів',
    },
  ];

  return (
    <section className={scss.guaranteesScreen} id='promises'>
      <div className={scss.container}>
        <div className={scss.header}>
          <h2>Запускаємо автоматизацію за 14 днів</h2>
          <p>
            Ми інтегруємо ваші ключові процеси, налаштуємо автоматичні сценарії, створимо
            AI-чатботів та навчимо вашу команду працювати з новою системою.
          </p>
        </div>

        <div className={scss.flexBlock}>
          <div className={scss.infoForAuditBlocks}>
            <div className={scss.infoBlock}>
              <h6>Що входить в пакет:</h6>
              <div className={scss.iconAndTextBlock}>
                <div className={scss.containerText}>
                  {auditText.map((text, idx) => (
                    <div className={scss.iconAndText} key={idx}>
                      <BsCheck2Circle className={scss.iconAudit} />
                      <p>{text.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className={clsx(scss.infoBlock, scss.infoBlockSettings)}>
              <h6 className={scss.anotherText}>Гарантія результату</h6>
              <div className={scss.iconAndTextBlock}>
                <p className={scss.infoBlockSettingsText}>
                  Якщо протягом 30 днів після запуску ви не відчуєте скорочення ручної роботи — ми
                  повернемо 30% вартості.
                </p>
              </div>
            </div>
          </div>
          <div className={scss.ctaBlock}>
            <button className={scss.ctaButton} onClick={() => scrollToSection('contacts')}>
              Отримати план автоматизації
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
