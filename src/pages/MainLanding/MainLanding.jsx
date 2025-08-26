import './MainLanding.scss';
import Header from '../../components/MainLanding/Header/Header';
import HeroScreen from '../../components/MainLanding/HeroScreen/HeroScreen';
import Services from '../../components/MainLanding/Services/Services';
import ChatBot from '../../components/MainLanding/ChatBot/ChatBot';
import Benefits from '../../components/MainLanding/Benefits/Benefits';
import Footer from '../../components/MainLanding/Footer/Footer';
import Contact from '../../components/MainLanding/Contact/Contact';

export default function MainLanding() {
  return (
    <div className='appa'>
      <Header />

      <HeroScreen />

      <Services />

      <div className='chatBot'>
        <ChatBot />
      </div>

      <Benefits />

      <Contact />

      <Footer />
    </div>
  );
}
