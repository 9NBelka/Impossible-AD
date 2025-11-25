import { BsCheckCircleFill } from 'react-icons/bs';
import CarContent from './CarContent/CarContent';
import scss from './OurServicesScreen.module.scss';

export default function OurServicesScreen() {
  const listTexts = [
    {
      title: '300 new clients in 3 months',
      description: 'Real inquiries from ads, without bots or fake calls.',
      id: 'exampleSite',
    },
    {
      title: 'Call cost — no more than 200 UAH',
      description: 'We monitor every single inquiry',
      id: 'exampleSite',
    },
    {
      title: 'A fully functioning website for your auto repair shop',
      description: 'A modern high-converting landing page',
      id: 'exampleSite',
    },
    {
      title: 'A Telegram bot for handling inquiries',
      description: 'All inquiries are automatically sent to your Telegram',
      id: 'exampleSite',
    },
    {
      title: 'IP telephony with call recording',
      description: 'Analyze the quality of your service',
      id: 'exampleSite',
    },
    {
      title: 'A short weekly performance report',
      description: 'A simple and easy-to-understand report',
      id: 'exampleSite',
    },
  ];

  return (
    <section className={scss.ourServicesMain} id='ourservices'>
      <div className={scss.container}>
        <div className={scss.contentMainServicesBlock}>
          <div className={scss.contentCar}>
            <CarContent />
          </div>

          <div className={scss.contentTitleAndDescription}>
            <h2 className={scss.title}>Our services</h2>
            <p className={scss.description}>
              We launch effective advertising for auto repair shops that truly brings in clients —
              no fluff, no risks, with clear numbers and transparent reports.
            </p>
            <div className={scss.listBlock}>
              {listTexts.map((info, idx) => (
                <div key={idx} className={scss.iconAndTextBlock}>
                  <div className={scss.iconBlock}>
                    <BsCheckCircleFill className={scss.iconList} />
                  </div>
                  <div className={scss.textBlockColumn}>
                    <h3 className={scss.listTitle}>{info.title}</h3>
                    <p className={scss.listDescription}> {info.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
