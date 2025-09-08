import DecideProblemsScreen from '../../components/GoogleAdsAuditComponents/DecideProblemsScreen/DecideProblemsScreen';
import FooterContactForm from '../../components/GoogleAdsAuditComponents/FooterContactForm/FooterContactForm';
import GoogleAuditFormScreen from '../../components/GoogleAdsAuditComponents/GoogleAuditFormScreen/GoogleAuditFormScreen';
import GuaranteesScreen from '../../components/GoogleAdsAuditComponents/GuaranteesScreen/GuaranteesScreen';
import HeroScreen from '../../components/GoogleAdsAuditComponents/HeroScreen/HeroScreen';
import ProblemsScreen from '../../components/GoogleAdsAuditComponents/ProblemsScreen/ProblemsScreen';
import WhyWeScreen from '../../components/GoogleAdsAuditComponents/WhyWeScreen/WhyWeScreen';
import scss from './GoogleAdsAudit.module.scss';

export default function GoogleAdsAudit() {
  return (
    <div>
      <HeroScreen />
      <ProblemsScreen />
      <DecideProblemsScreen />
      <GoogleAuditFormScreen />
      <GuaranteesScreen />
      <WhyWeScreen />
      <FooterContactForm />
    </div>
  );
}
