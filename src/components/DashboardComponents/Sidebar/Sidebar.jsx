import scss from './Sidebar.module.scss';
import { BsEnvelopeFill, BsFillHouseFill, BsFillPeopleFill } from 'react-icons/bs';
import MenuItem from './MenuItem/MenuItem';

export default function Sidebar({ onSignOut }) {
  return (
    <div className={scss.sidebar}>
      <h3>Admin Panel</h3>
      <hr className={scss.lineSidebar}></hr>
      <ul>
        <MenuItem to='/home' text='Dashboard' icon={<BsFillHouseFill />} /> {/* Без className */}
        <MenuItem to='/clients' text='Clients' icon={<BsFillPeopleFill />} />
        <MenuItem to='/contact-forms' text='Contact Forms' icon={<BsEnvelopeFill />} />
        <MenuItem to='/trello-table' text='Trello Tables' icon={<BsEnvelopeFill />} />
        <li>
          <button className={scss.tableAddButton} onClick={onSignOut}>
            Exit
          </button>
        </li>
      </ul>
    </div>
  );
}
