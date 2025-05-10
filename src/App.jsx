import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Product from './pages/Product'; 
import Header from './components/Header';
import Footer from './components/Footer';
import Cart from './pages/Cart';
import Admin from './pages/Admin';
import AddProduct from './pages/AddProduct';
import AdminLogin from './pages/AdminLogin';


import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
			<Route path="/products" element={<Product />} />
			<Route path="/admin" element={<Admin />} />
			<Route path="/add-product" element={<AddProduct />} />
			<Route path="/admin-login" element={<AdminLogin />} />
			

			
			
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

