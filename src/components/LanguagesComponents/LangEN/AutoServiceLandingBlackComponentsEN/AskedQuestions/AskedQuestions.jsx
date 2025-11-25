import { useState } from 'react';
import scss from './AskedQuestions.module.scss';
import clsx from 'clsx';
import { BsChevronDown, BsChevronUp, BsQuestionCircle } from 'react-icons/bs';

export default function AskedQuestions() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'How many inquiries will I receive?',
      answer:
        'It depends on the city, competition, and budget. On average, our clients receive around 300 inquiries in 3 months.',
    },
    {
      question: 'How will I know that the advertising actually works?',
      answer:
        'We connect Binotel Call Tracking. You can see every call and every inquiry, and we provide monthly reports on the results.',
    },
    {
      question: 'Can I pay monthly?',
      answer: 'Yes, monthly payments are available.',
    },
    {
      question: 'Can I stop earlier than within 3 months?',
      answer: 'Yes, you can. But the advertising account remains on our side.',
    },
    {
      question: 'We have a small auto repair shop. Will it work for us?',
      answer: 'Yes. We adjust to your budget and capabilities.',
    },
    {
      question: 'What if clients don’t come?',
      answer:
        'We guarantee calls. And to help ensure they arrive, we provide a checklist and recommendations.',
    },
    {
      question: 'What if I already have a website?',
      answer:
        'We will conduct an audit. If the site is not suitable for advertising, we will create a new one within the package. For an additional fee, we can redesign and configure your existing website.',
    },
  ];

  return (
    <section className={scss.askedQuestionsScreen} id='askedquestions'>
      <div className={scss.container}>
        <h2 className={scss.title}>FAQ</h2>
        <div className={scss.accordion}>
          {faqs.map((faq, index) => (
            <div className={scss.accordionItem} key={index}>
              <button
                className={clsx(
                  scss.accordionButton,
                  activeIndex === index && scss.accordionButtonActive,
                )}
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}>
                <span>
                  <BsQuestionCircle className={scss.accordionIconAnswer} />
                  {faq.question}
                </span>
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
