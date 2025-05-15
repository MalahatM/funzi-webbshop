import React from 'react';
import './Header.css';
import logo from '../assets/funzi-logo.png';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaShoppingBasket, FaSearch } from 'react-icons/fa';
import useProductStore from '../store/ProductStore';

const Header = () => {
  const cart = useProductStore((state) => state.cart);
  const setSearchTerm = useProductStore((state) => state.setSearchTerm);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (location.pathname !== '/products') {
      navigate('/products');
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/cart" className="cart-icon-container">
          <FaShoppingBasket className="basket-icon" />
          {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
        </Link>
      </div>

      <div className="header-center">
        <img src={logo} alt="Funzi Logo" className="logo" />
      </div>

      <div className="header-right">
        <Link to="/products" className="btn">Products</Link>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search here"
            onChange={handleSearch}
          />
          <FaSearch className="search-icon" />
        </div>
      </div>
    </header>
  );
};

export default Header;
