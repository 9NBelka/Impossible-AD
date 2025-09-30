import { useState } from 'react';
import scss from './AskedQuestions.module.scss';
import clsx from 'clsx';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';

export default function AskedQuestions() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'А якщо клієнти не приїдуть?',
      answer: 'Ми гарантуємо дзвінки. А щоб вони доїхали — даємо чек-лист і поради.',
    },
    {
      question: 'Можна зупинити раніше ніж через 3 місяці?',
      answer: 'Можна. Але акаунт реклами лишається у нас.',
    },
    {
      question: 'У нас маленьке СТО. Підійде?',
      answer: 'Так. Ми підлаштовуємось під ваш бюджет і можливості.',
    },
    {
      question: 'Як я зрозумію, що реклама реально працює?',
      answer:
        'Ми підключаємо Binotel Call Tracking. Ви бачите кожен дзвінок і кожну заявку, а ми щомісяця звітуємо про результати.',
    },
    {
      question: 'Чи можна оплатити щомісяця?',
      answer: 'Так, можна сплачувати помісячно',
    },
    {
      question: 'А якщо в мене вже є сайт?',
      answer:
        'Ми проведемо аудит. Якщо сайт не підходить для реклами — створимо новий у рамках пакету. За окрему оплату ми переробимо і налаштуємо Ваш старий сайт.',
    },
    {
      question: 'Скільки заявок я отримаю?',
      answer:
        'Залежить від міста, конкуренції й бюджету. У середньому наші клієнти отримують від 300 заявок за 3 місяці.',
    },
  ];

  return (
    <section className={scss.problemsScreen} id='askedquestions'>
      <div className={scss.container}>
        <div className={scss.header}>
          <h2>Часті питання</h2>
        </div>
        <div className={scss.accordion}>
          {faqs.map((faq, index) => (
            <div className={scss.accordionItem} key={index}>
              <button
                className={clsx(
                  scss.accordionButton,
                  activeIndex === index && scss.accordionButtonActive,
                )}
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}>
                {faq.question}
                {activeIndex === index ? (
                  <BsChevronUp className={scss.accordionIcon} />
                ) : (
                  <BsChevronDown className={scss.accordionIcon} />
                )}
              </button>
              <div className={clsx(scss.accordionContent, activeIndex === index && scss.active)}>
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
