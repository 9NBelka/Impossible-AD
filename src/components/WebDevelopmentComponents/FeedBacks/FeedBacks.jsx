import scss from './FeedBacks.module.scss';

export default function FeedBacks() {
  const testimonials = [
    {
      text: 'Наш інтернет-магазин тепер вантажиться за 1,5 сек. Конверсія зросла майже вдвічі. Команда знає, як робити правильно.',
      author: 'Іван Петренко',
      position: 'CEO, TechPro',
    },
    {
      text: 'Лендінг під запуск реклами зробили за 9 днів. PageSpeed — 91. Результати відчули вже в перший тиждень.',
      author: 'Марія Іваненко',
      position: 'Маркетолог, GreenHome',
    },
    {
      text: 'Після редизайну інтернет-магазину продажі зросли на 85%. Клієнти тепер легко знаходять потрібні товари.',
      author: 'Андрій Коваленко',
      position: 'Власник, SportStore',
    },
  ];

  return (
    <section className={scss.feedBacksScreen} id='feedbacks'>
      <div className={scss.container}>
        <div className={scss.header}>
          <h2>Відгуки клієнтів</h2>
          <p>Реальні результати та відгуки від наших клієнтів, які довіряють нам свій бізнес</p>
        </div>

        <div className={scss.testimonials}>
          <div className={scss.testimonialsGrid}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className={scss.testimonialCard}>
                <p>"{testimonial.text}"</p>
                <div className={scss.author}>
                  <div>
                    <strong>{testimonial.author}</strong>
                    <span>{testimonial.position}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
