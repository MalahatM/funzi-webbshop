import React from 'react';
import './Home.css'
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home">
      <div className="home-overlay">
        <h1>Welcome to Funzi!</h1>
        <p>At Funzi, we believe that choosing the right toy 
		can be one of the most joyful and magical experiences.<br></br> Let’s create unforgettable summer memories together.</p>
		<Link to="/Products">
  <button className="button">See Our Products</button>
</Link>

      </div>
	 
    </div>
  );
}

export default Home;
