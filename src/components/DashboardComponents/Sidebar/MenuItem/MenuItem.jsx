import { NavLink } from 'react-router-dom';
import scss from './MenuItem.module.scss';
import React from 'react';

export default function MenuItem({ to, text, icon }) {
  return (
    <li>
      <NavLink to={to} className={({ isActive }) => (isActive ? scss.active : undefined)}>
        <div className={scss.pointOnListWithIconBlock}>
          <div className={scss.iconBlock}>
            {React.cloneElement(icon, { className: scss.icon })} {/* Добавляем класс .icon */}
          </div>
          <p className={scss.pointText}>{text}</p>
        </div>
      </NavLink>
    </li>
  );
}
