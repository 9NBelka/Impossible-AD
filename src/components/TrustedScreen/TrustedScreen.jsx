import Marquee from 'react-fast-marquee';
import scss from './TrustedScreen.module.scss';
import clsx from 'clsx';

export default function TrustedScreen({ right, MainLandingA }) {
  const imageTrusted = {
    trustedScreenImages: [
      '/images/arhitectureLogoCube.png',
      '/images/teamLeadLogoCube.png',
      '/images/unitTestLogoCube.png',
      '/images/adressabblesLogoCube.png',
      '/images/ecsLogoCube.png',
      '/images/crmMech.png',
      '/images/logo_kyiv_term.png',

      '/images/arhitectureLogoCube.png',
      '/images/teamLeadLogoCube.png',
      '/images/unitTestLogoCube.png',
      '/images/adressabblesLogoCube.png',
      '/images/ecsLogoCube.png',
      '/images/crmMech.png',
      '/images/logo_kyiv_term.png',
    ],
  };

  return (
    <div className={clsx(scss.trustedScreen, MainLandingA && scss.trustedScreenA)}>
      {!MainLandingA && (
        <div className={scss.header}>
          <h2>Нам довіряють</h2>
          <p>Нас знають, нам довіряють і рекомендують наші послуги.</p>
        </div>
      )}
      <Marquee
        direction={right}
        speed={50}
        gradient={false}
        className={clsx(scss.trustedScreenBlocks, MainLandingA && scss.trustedScreenBlocksA)}>
        {imageTrusted.trustedScreenImages.map((img, index) => (
          <div key={index} className={scss.trustedScreenBlock}>
            <img src={img} alt='Scrolling' className={scss.trustedScreenImages} />
          </div>
        ))}
      </Marquee>
    </div>
  );
}
