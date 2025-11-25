import { useLocation } from 'react-router-dom';
import Header from '../../../../components/AutoServiceLandingComponents/Header/Header';
import { useEffect, useState } from 'react';
import HeroScreen from '../../../../components/AutoServiceLandingComponents/HeroScreen/HeroScreen';
import WhyWeScreen from '../../../../components/AutoServiceLandingComponents/WhyWeScreen/WhyWeScreen';
import OurSolutions from '../../../../components/AutoServiceLandingComponents/OurSolutions/OurSolutions';
import WhatWillYouGet from '../../../../components/AutoServiceLandingComponents/WhatWillYouGet/WhatWillYouGet';
import CostScreen from '../../../../components/AutoServiceLandingComponents/CostScreen/CostScreen';
import AskedQuestions from '../../../../components/AutoServiceLandingComponents/AskedQuestions/AskedQuestions';
import WeSpeakWithResults from '../../../../components/AutoServiceLandingComponents/WeSpeakWithResults/WeSpeakWithResults';
import ContactScreen from '../../../../components/AutoServiceLandingComponents/ContactScreen/ContactScreen';
import AutoServiceFormScreen from '../../../../components/AutoServiceLandingComponents/AutoServiceFormScreen/AutoServiceFormScreen';
import FooterB from '../../../../components/MainLandingB/FooterB/FooterB';
import './AutoServiceLandingEN.scss';
import LiveChatForAuto from '../../../../components/LiveChatForAuto/LiveChatForAuto';
import PopupOnSto from '../../../../components/PopupOnSto/PopupOnSto';

export default function AutoServiceLanding() {
  const onFooterAndHeaderTextLinksMain = [
    {
      title: 'Які результати?',
      linkToPage: 'results',
    },
    {
      title: 'Чому саме ми?',
      linkToPage: 'whatwillyouget',
    },
    {
      title: 'Чому зараз?',
      linkToPage: 'solutions',
    },
    {
      title: 'Ціна',
      linkToPage: 'price',
    },
    {
      title: 'Контакти',
      linkToPage: 'contacts',
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

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // бургер

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div>
      <Header
        onHeaderTextLinks={onFooterAndHeaderTextLinksMain}
        isScrolled={isScrolled}
        scrollToSection={scrollToSection}
        setIsMenuOpen={setIsMenuOpen}
        isMenuOpen={isMenuOpen}
      />
      <HeroScreen scrollToSection={scrollToSection} />
      <WeSpeakWithResults />
      <WhatWillYouGet scrollToSection={scrollToSection} />
      {/* <WhyWeScreen /> */}
      <OurSolutions />
      <AutoServiceFormScreen />

      <CostScreen scrollToSection={scrollToSection} />
      <AskedQuestions />

      <ContactScreen />

      <FooterB onFooterTextLinks={onFooterAndHeaderTextLinksMain} />
      {/* <PopupOnSto /> */}
    </div>
  );
}
