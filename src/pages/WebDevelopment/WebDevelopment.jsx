import AboutUs from '../../components/WebDevelopmentComponents/AboutUs/AboutUs';
import CasesAndResults from '../../components/WebDevelopmentComponents/CasesAndResults/CasesAndResults';
import FeedBacks from '../../components/WebDevelopmentComponents/FeedBacks/FeedBacks';
import GuaranteesScreen from '../../components/WebDevelopmentComponents/GuaranteesScreen/GuaranteesScreen';
import HeroScreen from '../../components/WebDevelopmentComponents/HeroScreen/HeroScreen';
import OurApproach from '../../components/WebDevelopmentComponents/OurApproach/OurApproach';
import OurSolutions from '../../components/WebDevelopmentComponents/OurSolutions/OurSolutions';
import WebDevelopmentFormScreen from '../../components/WebDevelopmentComponents/WebDevelopmentFormScreen/WebDevelopmentFormScreen';
import scss from './WebDevelopment.module.scss';

export default function WebDevelopment() {
  return (
    <div>
      <HeroScreen />
      <OurSolutions />
      <OurApproach />
      <WebDevelopmentFormScreen />
      <GuaranteesScreen />
      <CasesAndResults />
      <FeedBacks />
      <AboutUs />
    </div>
  );
}
