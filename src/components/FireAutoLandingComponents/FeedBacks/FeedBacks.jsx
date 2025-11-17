import { FaStar } from 'react-icons/fa';
import styles from './FeedBacks.module.scss';

const testimonials = [
  {
    name: 'Іван',
    car: 'Volkswagen Passat',
    text: 'Дуже вдячний вашому сервісу за швидкий і якісний ремонт. Виявили і усунули проблему за один візит. Рекомендую!',
    avatar: '👨‍💼',
  },
  {
    name: 'Олена',
    car: 'Kia Sorento',
    text: 'Чудовий сервіс! Майстри все пояснили і показали старі деталі. Тепер обслуговую всі сімейні авто тільки тут.',
    avatar: '👩‍💼',
  },
  {
    name: 'Сергій',
    car: 'BMW X5',
    text: 'Професійний підхід до справи. Діагностика виявила приховані проблеми, які в інших сервісах не помітили. Дякую!',
    avatar: '👨‍🔧',
  },
];

const FeedBacks = () => {
  return (
    <section id='feedbacks' className={styles.testimonialsSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Відгуки клієнтів</h2>
          <p className={styles.description}>
            Понад 1000 задоволених клієнтів довіряють нам свої автомобілі
          </p>
        </div>

        <div className={styles.allCards}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.cardContent}>
                <p className={styles.quote}>"{testimonial.text}"</p>

                <div className={styles.author}>
                  <div className={styles.avatar}>{testimonial.avatar}</div>
                  <div className={styles.authorColumn}>
                    <div className={styles.authorName}>{testimonial.name}</div>
                    <div className={styles.authorCar}>{testimonial.car}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.footer}>
          <div className={styles.guaranteeCard}>
            <h3 className={styles.guaranteeTitle}>Гарантія якості 12 місяців</h3>
            <p className={styles.guaranteeText}>
              На всі виконані роботи у разі використання запчастин від наших постачальників. Ваш
              спокій – наш пріоритет!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeedBacks;
