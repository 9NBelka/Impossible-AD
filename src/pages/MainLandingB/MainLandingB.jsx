import BenefitsB from '../../components/MainLandingB/BenefitsB/BenefitsB';
import Cases from '../../components/MainLandingB/Cases/Cases';
import FooterB from '../../components/MainLandingB/FooterB/FooterB';
import HeaderB from '../../components/MainLandingB/HeaderB/HeaderB';
import HeroScreenB from '../../components/MainLandingB/HeroScreenB/HeroScreenB';
import Process from '../../components/MainLandingB/Process/Process';
import ServicesB from '../../components/MainLandingB/ServicesB/ServicesB';

export default function MainLandingB() {
  return (
    <div className='min-h-screen'>
      <HeaderB />
      <HeroScreenB />
      <ServicesB />
      <BenefitsB />
      <Cases />
      <Process />
      {/* <Contact /> */}
      <FooterB />
    </div>
  );
}
