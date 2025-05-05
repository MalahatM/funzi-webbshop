import React from 'react';
import './Header.css';
import logo from '../assets/funzi-logo.png';

import { FaShoppingBasket, FaUserPlus, FaSearch } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <FaShoppingBasket className="icon" />
        <FaUserPlus className="icon" />
      </div>
      <div className="header-center">
        <img src={logo} alt="Funzi Logo" className="logo" />
      </div>
	 
      <div className="header-right">
        <button className="btn">Products</button>
        <div className="search-box">
          <input type="text" placeholder="Search here" />
          <FaSearch className="search-icon" />
        </div>
      </div>
    </header>
  );
};

export default Header;
