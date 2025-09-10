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

  return (
    <div>
      <HeaderB onHeaderTextLinks={onFooterAndHeaderTextLinks} />
      <HeroScreen />
      <ProblemsScreen />
      <DecideProblemsScreen />
      <GoogleAuditFormScreen />
      <GuaranteesScreen />
      <WhyWeScreen />
      <FooterContactForm />
      <FooterB onFooterTextLinks={onFooterAndHeaderTextLinks} />
    </div>
  );
}
