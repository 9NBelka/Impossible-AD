import DecideProblemsScreen from '../../components/GoogleAdsAuditComponents/DecideProblemsScreen/DecideProblemsScreen';
import FooterContactForm from '../../components/GoogleAdsAuditComponents/FooterContactForm/FooterContactForm';
import GoogleAuditFormScreen from '../../components/GoogleAdsAuditComponents/GoogleAuditFormScreen/GoogleAuditFormScreen';
import GuaranteesScreen from '../../components/GoogleAdsAuditComponents/GuaranteesScreen/GuaranteesScreen';
import HeroScreen from '../../components/GoogleAdsAuditComponents/HeroScreen/HeroScreen';
import ProblemsScreen from '../../components/GoogleAdsAuditComponents/ProblemsScreen/ProblemsScreen';
import WhyWeScreen from '../../components/GoogleAdsAuditComponents/WhyWeScreen/WhyWeScreen';
import FooterB from '../../components/MainLandingB/FooterB/FooterB';
import scss from './GoogleAdsAudit.module.scss';
import HeaderB from '../../components/MainLandingB/HeaderB/HeaderB';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export default function GoogleAdsAudit() {
  const onFooterAndHeaderTextLinks = [
    {
      title: 'Проблеми',
      linkToPage: 'problems',
    },
    {
      title: 'Рішення',
      linkToPage: 'decideProblems',
    },
    {
      title: 'Гарантії',
      linkToPage: 'guarantees',
    },
    {
      title: 'Чому ми?',
      linkToPage: 'whywescreen',
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
      <ProblemsScreen />
      <DecideProblemsScreen />
      <GoogleAuditFormScreen />
      <GuaranteesScreen />
      <WhyWeScreen />
      <section id='contacts'>
        <FooterContactForm />
      </section>
      <FooterB onFooterTextLinks={onFooterAndHeaderTextLinks} />
    </div>
  );
}
