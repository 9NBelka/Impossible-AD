import { useLocation } from 'react-router-dom';
import Header from '../../../../components/LanguagesComponents/LangEN/AutoServiceLandingBlackComponentsEN/Header/Header';
import scss from './AutoServiceLandingBlackEN.module.scss';
import { useEffect, useState } from 'react';
import HeroScreen from '../../../../components/LanguagesComponents/LangEN/AutoServiceLandingBlackComponentsEN/HeroScreen/HeroScreen';
import WhyUsScreen from '../../../../components/LanguagesComponents/LangEN/AutoServiceLandingBlackComponentsEN/WhyUsScreen/WhyUsScreen';
import OurServicesScreen from '../../../../components/LanguagesComponents/LangEN/AutoServiceLandingBlackComponentsEN/OurServicesScreen/OurServicesScreen';
import PortalContactForm from '../../../../components/LanguagesComponents/LangEN/AutoServiceLandingBlackComponentsEN/PortalContactForm/PortalContactForm';
import CostScreen from '../../../../components/LanguagesComponents/LangEN/AutoServiceLandingBlackComponentsEN/CostScreen/CostScreen';
import AskedQuestions from '../../../../components/LanguagesComponents/LangEN/AutoServiceLandingBlackComponentsEN/AskedQuestions/AskedQuestions';
import Footer from '../../../../components/LanguagesComponents/LangEN/AutoServiceLandingBlackComponentsEN/Footer/Footer';
import ContactFormScreen from '../../../../components/LanguagesComponents/LangEN/AutoServiceLandingBlackComponentsEN/ContactFormScreen/ContactFormScreen';

export default function AutoServiceLandingBlack() {
  const onFooterAndHeaderTextLinksMain = [
    // {
    //   title: 'What Results?',
    //   linkToPage: 'results',
    // },
    {
      title: 'Why Us?',
      linkToPage: 'whyus',
    },
    {
      title: 'Services',
      linkToPage: 'ourservices',
    },
    {
      title: 'Pricing',
      linkToPage: 'price',
    },
    {
      title: 'Contacts',
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
      <ContactFormScreen />
      <Footer onFooterTextLinks={onFooterAndHeaderTextLinksMain} />
    </div>
  );
}
