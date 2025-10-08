import DiagnosticsSection from '../../../components/TemplateStoTwo/DiagnosticsSection/DiagnosticsSection';
import FeedBacks from '../../../components/TemplateStoTwo/FeedBacks/FeedBacks';
import Header from '../../../components/TemplateStoTwo/Header/Header';
import HeroSection from '../../../components/TemplateStoTwo/HeroSection/HeroSection';
import ServicesSection from '../../../components/TemplateStoTwo/ServicesSection/ServicesSection';
import MapSection from '../../../components/TemplateStoTwo/MapSection/MapSection';
import './TemplateStoTwo.module.scss';
import ContactFormSection from '../../../components/TemplateStoTwo/ContactFormSection/ContactFormSection';
import Footer from '../../../components/TemplateStoTwo/Footer/Footer';

export default function TemplateStoTwo() {
  const onFooterAndHeaderTextLinksMain = [
    {
      title: 'Послуги',
      linkToPage: 'services',
    },
    {
      title: 'Діагностика',
      linkToPage: 'benefits',
    },
    {
      title: 'Відгуки',
      linkToPage: 'cases',
    },
    {
      title: 'Запис',
      linkToPage: 'contacts',
    },
    {
      title: 'Контакти',
      linkToPage: 'map',
    },
  ];

  return (
    <div>
      <Header onHeaderTextLinks={onFooterAndHeaderTextLinksMain} />
      <HeroSection />
      <ServicesSection />
      <DiagnosticsSection />
      <FeedBacks />
      <ContactFormSection />
      <MapSection />
      <Footer />
      {/* <TrustedScreen /> */}
      {/* <ServicesB /> */}
      {/* <div className={`chatBot ${isChatOpen ? 'active' : ''}`}>
        <ChatBot isChatOpen={isChatOpen} />
      </div> */}

      {/* <BenefitsB /> */}
      {/* <Cases /> */}
      {/* <Process /> */}
      {/* <section id='contacts'>
        <ContactB />
      </section>
      <MapSection />
      <FooterB onFooterTextLinks={onFooterAndHeaderTextLinksMain} /> */}
      {/* <div className='floatingButton' onClick={handleChatToggle}>
        {isChatOpen ? (
          <BsXLg className='floatingButtonIcon buttonX' />
        ) : (
          <FcSms className='floatingButtonIcon' />
        )}
      </div> */}
      {/* <script
        src='https://cdn.pulse.is/livechat/loader.js'
        data-live-chat-id='68b9856b3e0f26e6880d9815'
        async></script> */}
    </div>
  );
}
