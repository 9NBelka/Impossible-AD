import { useEffect, useState } from 'react';
import HeroScreen from '../../components/GoogleAdsComponents/HeroScreen/HeroScreen';
import scss from './GoogleAds.module.scss';
import WhyWeScreen from '../../components/GoogleAdsComponents/WhyWeScreen/WhyWeScreen';
import WhyImpossibleAD from '../../components/GoogleAdsComponents/WhyImpossibleAD/WhyImpossibleAD';
import CasesScreen from '../../components/GoogleAdsComponents/CasesScreen/CasesScreen';
import GoogleAdsFormScreen from '../../components/GoogleAdsComponents/GoogleAdsFormScreen/GoogleAdsFormScreen';
import CostScreen from '../../components/GoogleAdsComponents/CostScreen/CostScreen';

export default function GoogleAds() {
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
      <WhyWeScreen />
      <CasesScreen />
      <GoogleAdsFormScreen />
      <CostScreen scrollToSection={scrollToSection} />
      <WhyImpossibleAD />
    </div>
  );
}
