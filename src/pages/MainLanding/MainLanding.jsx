import './MainLanding.scss';
import Header from '../../components/MainLanding/Header/Header';
import HeroScreen from '../../components/MainLanding/HeroScreen/HeroScreen';
import Services from '../../components/MainLanding/Services/Services';
import React, { Suspense, useCallback, useState, memo } from 'react';
import { BsXLg } from 'react-icons/bs';
import { FcSms } from 'react-icons/fc';

const ChatBot = React.lazy(() => import('../../components/MainLanding/ChatBot/ChatBot'));
const Benefits = React.lazy(() => import('../../components/MainLanding/Benefits/Benefits'));
const Contact = React.lazy(() => import('../../components/MainLanding/Contact/Contact'));
const Footer = React.lazy(() => import('../../components/MainLanding/Footer/Footer'));

// const FcSms = memo(() => <FcSms className='floatingButtonIcon' />);
// const BsXLg = memo(() => <BsXLg className='floatingButtonIcon buttonX' />);

export default function MainLanding() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleChatToggle = useCallback(() => {
    setIsChatOpen((prev) => !prev);
  }, []);

  return (
    <div className='appa'>
      <Header />
      <HeroScreen />
      <Services />
      <Suspense fallback={<div aria-live='polite'>Загрузка...</div>}>
        <div className={`chatBot ${isChatOpen ? 'active' : ''}`}>
          <ChatBot isChatOpen={isChatOpen} />
        </div>
        <Benefits />
        <Contact />
        <Footer />
      </Suspense>
      <div className='floatingButton' onClick={handleChatToggle}>
        {isChatOpen ? (
          <BsXLg className='floatingButtonIcon buttonX' />
        ) : (
          <FcSms className='floatingButtonIcon' />
        )}
      </div>
    </div>
  );
}
