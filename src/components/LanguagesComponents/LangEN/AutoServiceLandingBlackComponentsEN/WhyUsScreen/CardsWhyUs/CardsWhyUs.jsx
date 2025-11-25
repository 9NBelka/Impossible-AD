import { BsGlobe } from 'react-icons/bs';
import scss from './CardsWhyUs.module.scss';
import clsx from 'clsx';
import { GiRotaryPhone } from 'react-icons/gi';
import { VscGraph, VscRobot } from 'react-icons/vsc';
import {
  FcAndroidOs,
  FcComboChart,
  FcGlobe,
  FcMultipleSmartphones,
  FcPhoneAndroid,
  FcPositiveDynamic,
  FcSms,
  FcStatistics,
  FcTodoList,
} from 'react-icons/fc';

export default function CardsWhyUs() {
  const cards = [
    {
      icon: <FcGlobe className={scss.icon} />,
      title: 'Landing Page',
      description: 'A newly configured website for a quick launch',
      id: 'exampleSite',
    },
    {
      icon: <FcMultipleSmartphones className={clsx(scss.icon, scss.redIcon)} />,
      title: 'Telephony',
      description: 'We connect IP telephony to your advertising campaigns',
      id: 'binotellaTable',
    },
    {
      icon: <FcAndroidOs className={scss.icon} />,
      title: 'Bot',
      description: 'We connect a Telegram bot to your website',
      id: 'botOnTelegram',
    },
    {
      icon: <FcStatistics className={scss.icon} />,
      title: 'Reporting',
      description: 'A short weekly performance report',
      id: 'excelTable',
    },
    {
      icon: <FcComboChart className={scss.icon} />,
      title: 'Analytics',
      description: 'We track advertising performance in real time',
      id: 'excelTable',
    },
    // {
    //   icon: <FcSms className={scss.icon} />,
    //   title: 'Лендінг',
    //   description: 'Новий налаштований сайт для швидкого старту',
    //   id: 'excelTable',
    // },
  ];

  return (
    <>
      {cards.map((info, idx) => (
        <div key={idx} className={scss.backgroundCard}>
          <div className={scss.iconBlock}>
            <div
              className={clsx(
                scss.backgroundIcon,
                idx == 1 && scss.backgroundIconBrown,
                idx == 2 && scss.backgroundIconLightBlue,
                idx == 3 && scss.backgroundIconGreen,
                idx == 4 && scss.backgroundIconOrange,
                idx == 5 && scss.backgroundIconPink,
              )}>
              {info.icon}
            </div>
          </div>
          <h3 className={scss.titleCard}>{info.title}</h3>
          <p className={scss.descriptionCard}>{info.description}</p>
        </div>
      ))}
    </>
  );
}
