import Marquee from 'react-fast-marquee';
import scss from './DiscountBlock.module.scss';

export default function DiscountBlock({ right }) {
  const textsTrusted = {
    texts: [
      'на перше замовлення знижка -15%',
      'на перше замовлення знижка -15%',
      'на перше замовлення знижка -15%',
      'на перше замовлення знижка -15%',
      'на перше замовлення знижка -15%',
      'на перше замовлення знижка -15%',
    ],
  };
  return (
    <div className={scss.discountBlock}>
      <Marquee direction={right} speed={50} gradient={false}>
        {textsTrusted.texts.map((text, index) => (
          <div key={index} className={scss.trustedScreenBlock}>
            <p>{text}</p>
          </div>
        ))}
      </Marquee>
    </div>
  );
}
