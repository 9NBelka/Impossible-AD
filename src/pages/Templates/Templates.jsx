import { BsFillHouseFill } from 'react-icons/bs';
import scss from './Templates.module.scss';
import { NavLink } from 'react-router-dom';

const cardWidthExamples = [
  {
    title: 'Name Template',
    description:
      ' text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text',
    image: 'images/screenshot-heroScreen-example.png',
    link: '/templateSto',
  },
  {
    title: 'Name Template',
    description:
      ' text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text',
    image: 'images/screenshot-heroScreen-example2.png',
    link: '/templateStoTwo',
  },
];

export default function Templates() {
  return (
    <div className={scss.mainFlexRow}>
      <div className={scss.sidebarBlcok}>
        <h3>List Templates</h3>
        <ul>
          <li>
            <NavLink to='/for-sto' className={({ isActive }) => isActive && scss.active}>
              <div className={scss.pointOnListWithIconBlock}>
                <div className={scss.iconBlock}>
                  <BsFillHouseFill className={scss.icon} />
                </div>
                <p className={scss.pointText}>Для сто</p>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to='/another' className={({ isActive }) => isActive && scss.active}>
              <div className={scss.pointOnListWithIconBlock}>
                <div className={scss.iconBlock}>
                  <BsFillHouseFill className={scss.icon} />
                </div>
                <p className={scss.pointText}>Другие</p>
              </div>
            </NavLink>
          </li>
        </ul>
      </div>
      {cardWidthExamples.map((info, idx) => (
        <div key={idx} className={scss.contentImagesAndTextBlock}>
          <div className={scss.contentImage}>
            <img src={info.image} />
          </div>
          <h4>{info.title}</h4>
          <p>{info.description}</p>
          <a href={info.link}>
            <button className={scss.buttonLink}>Перейти</button>
          </a>
        </div>
      ))}
    </div>
  );
}
