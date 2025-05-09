import React from 'react';
import './Header.css';
import logo from '../assets/funzi-logo.png';
import { Link } from 'react-router-dom';
import { FaShoppingBasket, FaUserPlus, FaSearch } from 'react-icons/fa';
import useProductStore from '../store/ProductStore';


const Header = () => {
  const cart = useProductStore((state) => state.cart);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="header">
      <div className="header-left">
        {/* لینک به سبد خرید */}
        <Link to="/cart" className="cart-icon-container">
          <FaShoppingBasket className="icon" />
          {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
        </Link>

        <FaUserPlus className="icon" />
      </div>

      <div className="header-center">
        <img src={logo} alt="Funzi Logo" className="logo" />
      </div>

	  <div className="header-right">
  <Link to="/products" className="btn">Products</Link>
  <div className="search-box">
    <input type="text" placeholder="Search here" />
    <FaSearch className="search-icon" />
  </div>
</div>

    </header>
  );
};

export default Header;
