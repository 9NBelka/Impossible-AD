// import { useCallback, useState } from 'react';
import BenefitsB from '../../components/MainLandingB/BenefitsB/BenefitsB';
import Cases from '../../components/MainLandingB/Cases/Cases';
import ContactB from '../../components/MainLandingB/ContactB/ContactB';
import FooterB from '../../components/MainLandingB/FooterB/FooterB';
import HeaderB from '../../components/MainLandingB/HeaderB/HeaderB';
import HeroScreenB from '../../components/MainLandingB/HeroScreenB/HeroScreenB';
import Process from '../../components/MainLandingB/Process/Process';
import ServicesB from '../../components/MainLandingB/ServicesB/ServicesB';
import TrustedScreen from '../../components/TrustedScreen/TrustedScreen';
// import { BsXLg } from 'react-icons/bs';
// import { FcSms } from 'react-icons/fc';
// import ChatBot from '../../components/MainLanding/ChatBot/ChatBot';
import './MainLandingB.scss';

export default function MainLandingB() {
  // const [isChatOpen, setIsChatOpen] = useState(false);

  // const handleChatToggle = useCallback(() => {
  //   setIsChatOpen((prev) => !prev);
  // }, []);

  const onFooterAndHeaderTextLinksMain = [
    {
      title: 'Переваги',
      linkToPage: 'benefits',
    },
    {
      title: 'Кейси',
      linkToPage: 'cases',
    },
    {
      title: 'Процес',
      linkToPage: 'process',
    },
    {
      title: 'Контакти',
      linkToPage: 'contacts',
    },
  ];

  return (
    <div className='min-h-screen'>
      <HeaderB onHeaderTextLinks={onFooterAndHeaderTextLinksMain} />
      <HeroScreenB />
      <TrustedScreen />
      <ServicesB />
      {/* <div className={`chatBot ${isChatOpen ? 'active' : ''}`}>
        <ChatBot isChatOpen={isChatOpen} />
      </div> */}
      <script
        src='https://cdn.pulse.is/livechat/loader.js'
        data-live-chat-id='68b9856b3e0f26e6880d9815'
        async></script>
      <BenefitsB />
      <Cases />
      <Process />
      <ContactB />
      <FooterB onFooterTextLinks={onFooterAndHeaderTextLinksMain} />
      {/* <div className='floatingButton' onClick={handleChatToggle}>
        {isChatOpen ? (
          <BsXLg className='floatingButtonIcon buttonX' />
        ) : (
          <FcSms className='floatingButtonIcon' />
        )}
      </div> */}
    </div>
  );
}
