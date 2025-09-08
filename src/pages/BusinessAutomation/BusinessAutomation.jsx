import { useEffect, useState } from 'react';
import HeroScreen from '../../components/BusinessAutomationComponents/HeroScreen/HeroScreen';
import ProblemsScreen from '../../components/BusinessAutomationComponents/ProblemsScreen/ProblemsScreen';
import PromisesScreen from '../../components/BusinessAutomationComponents/PromisesScreen/PromisesScreen';
import StartAutoScreen from '../../components/BusinessAutomationComponents/StartAutoScreen/StartAutoScreen';
import YouKnowScreen from '../../components/BusinessAutomationComponents/YouKnowScreen/YouKnowScreen';
import scss from './BusinessAutomation.module.scss';
import CasesScreen from '../../components/BusinessAutomationComponents/CasesScreen/CasesScreen';
import FooterContactForm from '../../components/BusinessAutomationComponents/FooterContactForm/FooterContactForm';

export default function BusinessAutomation() {
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
      <HeroScreen scrollToSection={scrollToSection} />
      <YouKnowScreen />
      <ProblemsScreen />
      <PromisesScreen />
      <StartAutoScreen scrollToSection={scrollToSection} />
      <CasesScreen />
      <FooterContactForm />
    </div>
  );
}
