import scss from './Benefits.module.scss';

export default function Benefits() {
  return (
    <section className={scss.benefits} id='about'>
      <div className={scss.container}>
        <div className={scss.benefitsContent}>
          <div className={scss.benefitsText}>
            <h2>Почему выбирают Impossible AD?</h2>
            <div className={scss.benefitItem}>
              <h4>Экспертиза европейского рынка</h4>
              <p>
                Глубокое понимание поведения европейских потребителей, регулирования и рыночной
                динамики в разных странах.
              </p>
            </div>
            <div className={scss.benefitItem}>
              <h4>Соответствие GDPR</h4>
              <p>
                Все наши кампании и стратегии полностью соответствуют европейским нормам защиты
                данных.
              </p>
            </div>
            <div className={scss.benefitItem}>
              <h4>Многоязычная поддержка</h4>
              <p>
                Носители языка доступны для кампаний на основных европейских языках для обеспечения
                аутентичной коммуникации.
              </p>
            </div>
            <div className={scss.benefitItem}>
              <h4>Доказанные результаты</h4>
              <p>
                Опыт увеличения ROI в среднем на 240% для наших европейских клиентов в течение 6
                месяцев.
              </p>
            </div>
          </div>
          <div className={scss.benefitsStats}>
            <div className={scss.statItem}>
              <div className={scss.statNumber}>500+</div>
              <div className={scss.statLabel}>Успешных кампаний</div>
            </div>
            <div className={scss.statItem}>
              <div className={scss.statNumber}>98%</div>
              <div className={scss.statLabel}>Удовлетворенность клиентов</div>
            </div>
            <div className={scss.statItem}>
              <div className={scss.statNumber}>25+</div>
              <div className={scss.statLabel}>Европейских стран</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
