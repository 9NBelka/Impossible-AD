import { useEffect, useState } from 'react';
import HeroScreen from '../../components/GoogleAdsComponents/HeroScreen/HeroScreen';
import scss from './GoogleAds.module.scss';
import WhyWeScreen from '../../components/GoogleAdsComponents/WhyWeScreen/WhyWeScreen';
import WhyImpossibleAD from '../../components/GoogleAdsComponents/WhyImpossibleAD/WhyImpossibleAD';
import CasesScreen from '../../components/GoogleAdsComponents/CasesScreen/CasesScreen';
import GoogleAdsFormScreen from '../../components/GoogleAdsComponents/GoogleAdsFormScreen/GoogleAdsFormScreen';
import CostScreen from '../../components/GoogleAdsComponents/CostScreen/CostScreen';
import HowToMeWork from '../../components/GoogleAdsComponents/HowToMeWork/HowToMeWork';
import FooterContactForm from '../../components/GoogleAdsComponents/FooterContactForm/FooterContactForm';
import FooterB from '../../components/MainLandingB/FooterB/FooterB';
import HeaderB from '../../components/MainLandingB/HeaderB/HeaderB';
import { useLocation } from 'react-router-dom';

export default function GoogleAds() {
  const onFooterAndHeaderTextLinks = [
    {
      title: 'Комплексний підхід',
      linkToPage: 'whywescreen',
    },
    {
      title: 'Послуги',
      linkToPage: 'services',
    },
    {
      title: 'Вартість',
      linkToPage: 'cost',
    },
    {
      title: 'Чому ми?',
      linkToPage: 'whywescreen2',
    },
    {
      title: 'Рішення',
      linkToPage: 'solution',
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
      <WhyWeScreen />
      <CasesScreen />
      <GoogleAdsFormScreen />
      <CostScreen scrollToSection={scrollToSection} />
      <WhyImpossibleAD />
      <HowToMeWork />
      <section id='contacts'>
        <FooterContactForm />
      </section>
      <FooterB onFooterTextLinks={onFooterAndHeaderTextLinks} />
    </div>
  );
}
