import FooterB from '../../components/MainLandingB/FooterB/FooterB';
import AboutUs from '../../components/WebDevelopmentComponents/AboutUs/AboutUs';
import CasesAndResults from '../../components/WebDevelopmentComponents/CasesAndResults/CasesAndResults';
import FeedBacks from '../../components/WebDevelopmentComponents/FeedBacks/FeedBacks';
import FooterContactForm from '../../components/WebDevelopmentComponents/FooterContactForm/FooterContactForm';
import GuaranteesScreen from '../../components/WebDevelopmentComponents/GuaranteesScreen/GuaranteesScreen';
import HeroScreen from '../../components/WebDevelopmentComponents/HeroScreen/HeroScreen';
import OurApproach from '../../components/WebDevelopmentComponents/OurApproach/OurApproach';
import OurSolutions from '../../components/WebDevelopmentComponents/OurSolutions/OurSolutions';
import WebDevelopmentFormScreen from '../../components/WebDevelopmentComponents/WebDevelopmentFormScreen/WebDevelopmentFormScreen';
import HeaderB from '../../components/MainLandingB/HeaderB/HeaderB';
import scss from './WebDevelopment.module.scss';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export default function WebDevelopment() {
  const onFooterAndHeaderTextLinks = [
    {
      title: 'Рішення',
      linkToPage: 'solutions',
    },
    {
      title: 'Підхід',
      linkToPage: 'approach',
    },
    {
      title: 'Гарантії',
      linkToPage: 'guarantees',
    },
    {
      title: 'Кейси',
      linkToPage: 'casesAndResults',
    },
    {
      title: 'О нас',
      linkToPage: 'aboutus',
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

  return (
    <div>
      <HeaderB onHeaderTextLinks={onFooterAndHeaderTextLinks} />
      <HeroScreen />
      <OurSolutions />
      <OurApproach />
      <WebDevelopmentFormScreen />
      <GuaranteesScreen />
      <CasesAndResults />
      <FeedBacks />
      <AboutUs />
      <section id='contacts'>
        <FooterContactForm />
      </section>
      <FooterB onFooterTextLinks={onFooterAndHeaderTextLinks} />
    </div>
  );
}
