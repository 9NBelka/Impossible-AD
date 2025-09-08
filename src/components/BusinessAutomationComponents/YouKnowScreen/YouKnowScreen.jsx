import {
  BsArrowDownRight,
  BsClock,
  BsExclamationCircle,
  BsEye,
  BsLightningCharge,
} from 'react-icons/bs';
import scss from './YouKnowScreen.module.scss';

export default function YouKnowScreen() {
  const textKnow = [
    {
      icon: <BsExclamationCircle DownArrow className={scss.cardIcon} />,
      title: 'Губляються заявки',
      description: 'Клієнти залишають контакти, але вони втрачаються між різними каналами',
    },
    {
      icon: <BsClock className={scss.cardIcon} />,
      title: 'Ручна робота забирає час',
      description: 'Команда витрачає години на рутинні завдання замість розвитку бізнесу',
    },
    {
      icon: <BsArrowDownRight className={scss.cardIcon} />,
      title: 'Втрата продажів',
      description: 'Неоперативна обробка призводить до втрати потенційних клієнтів',
    },
    {
      icon: <BsLightningCharge className={scss.cardIcon} />,
      title: 'Відсутність масштабованості',
      description: 'При зростанні навантаження система дає збої та гальмує',
    },
    {
      icon: <BsEye className={scss.cardIcon} />,
      title: 'Непрозорі процеси',
      description: 'Неможливо відстежити, на якому етапі знаходиться кожен клієнт',
    },
  ];

  return (
    <section className={scss.problemsScreen} id='textKnow'>
      <div className={scss.container}>
        <div className={scss.header}>
          <h2>Знайомо?</h2>
        </div>

        <div className={scss.flexBlock}>
          {textKnow.map((text, index) => (
            <div key={index} className={scss.card}>
              <div>{text.icon}</div>
              <div className={scss.cartTitleAndDescription}>
                <h3 className={scss.cartTitle}>{text.title}</h3>
                <p className={scss.cartDescription}>{text.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
