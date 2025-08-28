import './MainLanding.scss';
import Header from '../../components/MainLanding/Header/Header';
import HeroScreen from '../../components/MainLanding/HeroScreen/HeroScreen';
import Services from '../../components/MainLanding/Services/Services';
import ChatBot from '../../components/MainLanding/ChatBot/ChatBot';
import Benefits from '../../components/MainLanding/Benefits/Benefits';
import Footer from '../../components/MainLanding/Footer/Footer';
import Contact from '../../components/MainLanding/Contact/Contact';
import { useState } from 'react';
import { FcSms } from 'react-icons/fc';
import { BsXLg } from 'react-icons/bs';

export default function MainLanding() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className='appa'>
      <Header />

      <HeroScreen />

      <Services />

      <div className={`chatBot ${isChatOpen ? 'active' : ''}`}>
        <ChatBot />
      </div>

      <Benefits />

      <Contact />

      <Footer />

      <div className='floatingButton' onClick={() => setIsChatOpen(!isChatOpen)}>
        {isChatOpen ? (
          <BsXLg className='floatingButtonIcon buttonX' />
        ) : (
          <FcSms className='floatingButtonIcon' />
        )}
      </div>
    </div>
  );
}
