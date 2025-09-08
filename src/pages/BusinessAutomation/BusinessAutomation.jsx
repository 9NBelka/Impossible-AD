import HeroScreen from '../../components/BusinessAutomationComponents/HeroScreen/HeroScreen';
import ProblemsScreen from '../../components/BusinessAutomationComponents/ProblemsScreen/ProblemsScreen';
import YouKnowScreen from '../../components/BusinessAutomationComponents/YouKnowScreen/YouKnowScreen';
import scss from './BusinessAutomation.module.scss';

export default function BusinessAutomation() {
  return (
    <div>
      <HeroScreen />
      <YouKnowScreen />
      <ProblemsScreen />
    </div>
  );
}
