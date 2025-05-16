import {Routes, Route, HashRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import Cart from "./pages/Cart/Cart";
import Admin from "./pages/Admin/Admin";
import AddProduct from "./pages/AddProduct/AddProduct";
import AdminLogin from "./pages/AdminLogin/AdminLogin";
import ThankYou from "./pages/ThnakYou/ThankYou";

import Layout from "./components/Layout";

import "./App.css";

function App() {
  return (
	<HashRouter>
	<Routes>
	  <Route path="/" element={<Layout />}>
		<Route index element={<Home />} />
		<Route path="cart" element={<Cart />} />
		<Route path="products" element={<Product />} />
		<Route path="thank-you" element={<ThankYou />} />
		<Route path="admin" element={<Admin />} />
		<Route path="add-product" element={<AddProduct />} />
		<Route path="admin-login" element={<AdminLogin />} />
	  </Route>
	</Routes>
  </HashRouter>
  
  );
}

export default App;
