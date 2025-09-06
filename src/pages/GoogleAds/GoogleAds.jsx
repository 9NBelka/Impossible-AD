import DecideProblemsScreen from '../../components/GoogleAdsComponents/DecideProblemsScreen/DecideProblemsScreen';
import FooterContactForm from '../../components/GoogleAdsComponents/FooterContactForm/FooterContactForm';
import GoogleAuditFormScreen from '../../components/GoogleAdsComponents/GoogleAuditFormScreen/GoogleAuditFormScreen';
import GuaranteesScreen from '../../components/GoogleAdsComponents/GuaranteesScreen/GuaranteesScreen';
import HeroScreen from '../../components/GoogleAdsComponents/HeroScreen/HeroScreen';
import ProblemsScreen from '../../components/GoogleAdsComponents/ProblemsScreen/ProblemsScreen';
import WhyWeScreen from '../../components/GoogleAdsComponents/WhyWeScreen/WhyWeScreen';
import scss from './GoogleAds.module.scss';

export default function GoogleAds() {
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
