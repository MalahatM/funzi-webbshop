import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Product from './pages/Product'; 
import Cart from './pages/Cart';
import Admin from './pages/Admin';
import AddProduct from './pages/AddProduct';
import AdminLogin from './pages/AdminLogin';

import Layout from './components/Layout';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
	  <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="products" element={<Product />} />
        </Route>
		<Route path="/admin" element={<Admin />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/admin-login" element={<AdminLogin />} />
		</Routes>
    </Router>
  );
}

export default App;
