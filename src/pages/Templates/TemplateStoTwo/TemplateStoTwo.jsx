import DiagnosticsSection from '../../../components/TemplateStoTwo/DiagnosticsSection/DiagnosticsSection';
import FeedBacks from '../../../components/TemplateStoTwo/FeedBacks/FeedBacks';
import Header from '../../../components/TemplateStoTwo/Header/Header';
import HeroSection from '../../../components/TemplateStoTwo/HeroSection/HeroSection';
import ServicesSection from '../../../components/TemplateStoTwo/ServicesSection/ServicesSection';
import MapSection from '../../../components/TemplateStoTwo/MapSection/MapSection';
import './TemplateStoTwo.module.scss';
import ContactFormSection from '../../../components/TemplateStoTwo/ContactFormSection/ContactFormSection';
import Footer from '../../../components/TemplateStoTwo/Footer/Footer';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export default function TemplateStoTwo() {
  const onFooterAndHeaderTextLinksMain = [
    {
      title: 'Послуги',
      linkToPage: 'services',
    },
    {
      title: 'Діагностика',
      linkToPage: 'diagnostics',
    },
    {
      title: 'Відгуки',
      linkToPage: 'feedbacks',
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

  function ScrollToHash() {
    const { hash } = useLocation();

    useEffect(() => {
      if (hash) {
        const targetElement = document.getElementById(hash.replace('#', ''));
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, [hash]);

    return null;
  }

  return (
    <div>
      <Header onHeaderTextLinks={onFooterAndHeaderTextLinksMain} />
      <ScrollToHash />
      <HeroSection />
      <ServicesSection />
      <DiagnosticsSection />
      <FeedBacks />
      <ContactFormSection />
      <MapSection />
      <Footer onHeaderTextLinks={onFooterAndHeaderTextLinksMain} />
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
