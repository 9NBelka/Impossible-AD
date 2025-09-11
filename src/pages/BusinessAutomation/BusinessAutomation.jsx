import { useEffect, useState } from 'react';
import HeroScreen from '../../components/BusinessAutomationComponents/HeroScreen/HeroScreen';
import ProblemsScreen from '../../components/BusinessAutomationComponents/ProblemsScreen/ProblemsScreen';
import PromisesScreen from '../../components/BusinessAutomationComponents/PromisesScreen/PromisesScreen';
import StartAutoScreen from '../../components/BusinessAutomationComponents/StartAutoScreen/StartAutoScreen';
import YouKnowScreen from '../../components/BusinessAutomationComponents/YouKnowScreen/YouKnowScreen';
import scss from './BusinessAutomation.module.scss';
import CasesScreen from '../../components/BusinessAutomationComponents/CasesScreen/CasesScreen';
import FooterContactForm from '../../components/BusinessAutomationComponents/FooterContactForm/FooterContactForm';
import FooterB from '../../components/MainLandingB/FooterB/FooterB';
import HeaderB from '../../components/MainLandingB/HeaderB/HeaderB';
import { useLocation } from 'react-router-dom';

export default function BusinessAutomation() {
  const onFooterAndHeaderTextLinks = [
    {
      title: 'Проблеми',
      linkToPage: 'problems',
    },
    {
      title: 'Рішення',
      linkToPage: 'solutions',
    },
    {
      title: 'Що ви отримаєте',
      linkToPage: 'promises',
    },
    {
      title: 'Що входить',
      linkToPage: 'plan',
    },
    {
      title: 'Кейси',
      linkToPage: 'cases',
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      <HeaderB onHeaderTextLinks={onFooterAndHeaderTextLinks} />
      <HeroScreen scrollToSection={scrollToSection} />
      <YouKnowScreen />
      <ProblemsScreen />
      <PromisesScreen />
      <StartAutoScreen scrollToSection={scrollToSection} />
      <CasesScreen />
      <section id='contacts'>
        <FooterContactForm />
      </section>
      <FooterB onFooterTextLinks={onFooterAndHeaderTextLinks} />
    </div>
  );
}
