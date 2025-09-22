import scss from './Sidebar.module.scss';
import { NavLink } from 'react-router-dom';
import { BsEnvelopeFill, BsFillHouseFill, BsFillPeopleFill } from 'react-icons/bs';

export default function Sidebar({ onSignOut }) {
  return (
    <div className={scss.sidebar}>
      <h3>Admin Panel</h3>
      <hr className={scss.lineSidebar}></hr>
      <ul>
        <li>
          <NavLink to='/home' className={({ isActive }) => isActive && scss.active}>
            <div className={scss.pointOnListWithIconBlock}>
              <div className={scss.iconBlock}>
                <BsFillHouseFill className={scss.icon} />
              </div>
              <p className={scss.pointText}>Dashboard</p>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to='/clients' className={({ isActive }) => isActive && scss.active}>
            <div className={scss.pointOnListWithIconBlock}>
              <div className={scss.iconBlock}>
                <BsFillPeopleFill className={scss.icon} />
              </div>
              <p className={scss.pointText}>Clients</p>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to='/contact-forms' className={({ isActive }) => isActive && scss.active}>
            <div className={scss.pointOnListWithIconBlock}>
              <div className={scss.iconBlock}>
                <BsEnvelopeFill className={scss.icon} />
              </div>
              <p className={scss.pointText}>Contact Forms</p>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to='/trello-table' className={({ isActive }) => isActive && scss.active}>
            <div className={scss.pointOnListWithIconBlock}>
              <div className={scss.iconBlock}>
                <BsEnvelopeFill className={scss.icon} />
              </div>
              <p className={scss.pointText}>trello-tables</p>
            </div>
          </NavLink>
        </li>
        <li>
          <button className={scss.tableAddButton} onClick={onSignOut}>
            Exit
          </button>
          {/* <button onClick={onSignOut}>exit</button> */}
        </li>
      </ul>
    </div>
  );
}
