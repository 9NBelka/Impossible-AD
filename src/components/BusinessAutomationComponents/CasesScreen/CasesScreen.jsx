import clsx from 'clsx';
import scss from './CasesScreen.module.scss';
import { BsArrowRightShort } from 'react-icons/bs';

export default function CasesScreen() {
  const promises = [
    {
      subtitle: 'E-commerce',
      problem: 'Заявки з сайту губились, конверсія була 2%',
      solution: 'Автоматизували обробку заявок + AI-чатбот для первинної кваліфікації',
      result: 'Конверсія зросла до 12%, час обробки скоротився в 5 разів',
    },
    {
      subtitle: 'Медичні послуги',
      problem: 'Запис пацієнтів займав багато часу адміністратора',
      solution: 'Інтеграція календаря з месенджерами + автоматичні нагадування',
      result: '90% записів відбувається автоматично, звільнилось 6 годин в день',
    },
    {
      subtitle: 'IT-консалтинг',
      problem: 'Клієнти чекали відповідь днями, багато заявок втрачалось',
      solution: 'CRM + автоматичні воронки продажів + миттєва кваліфікація лідів',
      result: 'Швидкість реакції 2 хвилини, продажі зросли на 40%',
    },
  ];

  return (
    <section className={scss.guaranteesScreen} id='cases'>
      <div className={scss.container}>
        <div className={scss.header}>
          <h2>Кейси автоматизації від ImpossibleAD</h2>
        </div>

        <div className={scss.flexBlock}>
          {promises.map((promise, index) => (
            <div key={index} className={scss.card}>
              <div className={scss.subTitleBlock}>
                <p className={scss.subtitleText}>{promise.subtitle}</p>
              </div>
              <div>
                <h3 className={clsx(scss.cartTitle, scss.titleRed)}>Проблема:</h3>
                <p className={scss.cartDescription}>{promise.problem}</p>
              </div>
              <div className={scss.titleAndDescriptionBlock}>
                <BsArrowRightShort className={clsx(scss.arrowLightBlue)} />
              </div>
              <div>
                <h3 className={clsx(scss.cartTitle, scss.titleLightBlue)}>Рішення:</h3>
                <p className={scss.cartDescription}>{promise.solution}</p>
              </div>
              <div className={scss.titleAndDescriptionBlock}>
                <BsArrowRightShort className={clsx(scss.arrowLightBlue, scss.arrowBlue)} />
              </div>
              <div>
                <h3 className={clsx(scss.cartTitle, scss.titleBlue)}>Результат:</h3>
                <p className={scss.cartDescription}>{promise.result}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
