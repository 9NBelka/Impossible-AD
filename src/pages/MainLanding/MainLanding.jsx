import './MainLanding.scss';
import Header from '../../components/MainLanding/Header/Header';
import HeroScreen from '../../components/MainLanding/HeroScreen/HeroScreen';
import Services from '../../components/MainLanding/Services/Services';
import ChatBot from '../../components/MainLanding/ChatBot/ChatBot';
// import Benefits from '../../components/MainLanding/Benefits/Benefits';
// import Footer from '../../components/MainLanding/Footer/Footer';
// import Contact from '../../components/MainLanding/Contact/Contact';
import React, { Suspense, useCallback, useState } from 'react';
import { FcSms } from 'react-icons/fc';
import { BsXLg } from 'react-icons/bs';

const Benefits = React.lazy(() => import('../../components/MainLanding/Benefits/Benefits'));
const Contact = React.lazy(() => import('../../components/MainLanding/Contact/Contact'));
const Footer = React.lazy(() => import('../../components/MainLanding/Footer/Footer'));

export default function MainLanding() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Мемоизация обработчика клика для предотвращения лишних рендеров
  const handleChatToggle = useCallback(() => {
    setIsChatOpen((prev) => !prev);
  }, []);

  return (
    <div className='appa'>
      <Header />
      <HeroScreen />
      <Services />
      <div className={`chatBot ${isChatOpen ? 'active' : ''}`}>
        <ChatBot />
      </div>
      <Suspense fallback={<div>Загрузка...</div>}>
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
