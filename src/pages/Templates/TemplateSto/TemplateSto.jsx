// import { useCallback, useState } from 'react';
import { useEffect } from 'react';
import BenefitsB from '../../../components/TemplateSto/BenefitsB/BenefitsB';
import Cases from '../../../components/TemplateSto/Cases/Cases';
import ContactB from '../../../components/TemplateSto/ContactB/ContactB';
import FooterB from '../../../components/TemplateSto/FooterB/FooterB';
import HeaderB from '../../../components/TemplateSto/HeaderB/HeaderB';
import HeroScreenB from '../../../components/TemplateSto/HeroScreenB/HeroScreenB';
import Process from '../../../components/TemplateSto/Process/Process';
import ServicesB from '../../../components/TemplateSto/ServicesB/ServicesB';
import TrustedScreen from '../../../components/TrustedScreen/TrustedScreen';
// import { BsXLg } from 'react-icons/bs';
// import { FcSms } from 'react-icons/fc';
// import ChatBot from '../../components/MainLanding/ChatBot/ChatBot';
import './TemplateSto.scss';
import { useLocation } from 'react-router-dom';
import MapSection from '../../../components/TemplateSto/MapSection/MapSection';

export default function TemplateSto() {
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

  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#contacts') {
      // Прокрутка к элементу или рендеринг компонента
      const element = document.getElementById('contacts');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <div className='min-h-screen'>
      <HeaderB onHeaderTextLinks={onFooterAndHeaderTextLinksMain} />
      <HeroScreenB />
      {/* <TrustedScreen /> */}
      <ServicesB />
      {/* <div className={`chatBot ${isChatOpen ? 'active' : ''}`}>
        <ChatBot isChatOpen={isChatOpen} />
      </div> */}

      <BenefitsB />
      <Cases />
      {/* <Process /> */}
      <section id='contacts'>
        <ContactB />
      </section>
      <MapSection />
      <FooterB onFooterTextLinks={onFooterAndHeaderTextLinksMain} />
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
