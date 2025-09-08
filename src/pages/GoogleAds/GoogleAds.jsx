import { useEffect, useState } from 'react';
import HeroScreen from '../../components/GoogleAdsComponents/HeroScreen/HeroScreen';
import scss from './GoogleAds.module.scss';

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
    </div>
  );
}
