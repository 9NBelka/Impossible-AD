import { useLocation } from 'react-router-dom';
import Header from '../../components/AutoServiceLandingComponents/Header/Header';
import { useEffect } from 'react';
import HeroScreen from '../../components/AutoServiceLandingComponents/HeroScreen/HeroScreen';
import WhyWeScreen from '../../components/AutoServiceLandingComponents/WhyWeScreen/WhyWeScreen';
import OurSolutions from '../../components/AutoServiceLandingComponents/OurSolutions/OurSolutions';
import WhatWillYouGet from '../../components/AutoServiceLandingComponents/WhatWillYouGet/WhatWillYouGet';
import CostScreen from '../../components/AutoServiceLandingComponents/CostScreen/CostScreen';
import AskedQuestions from '../../components/AutoServiceLandingComponents/AskedQuestions/AskedQuestions';
import WeSpeakWithResults from '../../components/AutoServiceLandingComponents/WeSpeakWithResults/WeSpeakWithResults';
import ContactForm from '../../components/AutoServiceLandingComponents/ContactForm/ContactForm';

export default function AutoServiceLanding() {
  const onFooterAndHeaderTextLinksMain = [
    {
      title: 'Які результати?',
      linkToPage: 'contacts',
    },
    {
      title: 'Що входить?',
      linkToPage: 'contacts',
    },
    {
      title: 'Кроки роботи',
      linkToPage: 'contacts',
    },
    {
      title: 'Кейси',
      linkToPage: 'cases',
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

  return (
    <div>
      <Header onHeaderTextLinks={onFooterAndHeaderTextLinksMain} />
      <HeroScreen />
      <WhyWeScreen />
      <OurSolutions />
      <WhatWillYouGet />
      <WeSpeakWithResults />
      <CostScreen />
      <AskedQuestions />
      <ContactForm />
    </div>
  );
}
