import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/">Головна</Link>
        </li>
        <li className="navbar-item">
          <Link to="/training">Тренування</Link>
        </li>
        <li className="navbar-item">
          <Link to="/saved">Збережене</Link>
        </li>
        <li className="navbar-item">
          <Link to="/account">Акаунт</Link>
        </li>
      </ul>
    </nav>
  );
}


export default Navbar;
