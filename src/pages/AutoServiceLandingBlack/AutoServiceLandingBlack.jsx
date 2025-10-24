import { useLocation } from 'react-router-dom';
import Header from '../../components/AutoServiceLandingBlackComponents/Header/Header';
import scss from './AutoServiceLandingBlack.module.scss';
import { useEffect, useState } from 'react';
import HeroScreen from '../../components/AutoServiceLandingBlackComponents/HeroScreen/HeroScreen';
import WhyUsScreen from '../../components/AutoServiceLandingBlackComponents/WhyUsScreen/WhyUsScreen';
import OurServicesScreen from '../../components/AutoServiceLandingBlackComponents/OurServicesScreen/OurServicesScreen';
import PortalContactForm from '../../components/AutoServiceLandingBlackComponents/PortalContactForm/PortalContactForm';
import CostScreen from '../../components/AutoServiceLandingBlackComponents/CostScreen/CostScreen';
import AskedQuestions from '../../components/AutoServiceLandingBlackComponents/AskedQuestions/AskedQuestions';

export default function AutoServiceLandingBlack() {
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
      setIsScrolled(window.scrollY > 100);
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
      <WhyUsScreen />
      <OurServicesScreen />
      <PortalContactForm />
      <CostScreen />
      <AskedQuestions />
    </div>
  );
}
