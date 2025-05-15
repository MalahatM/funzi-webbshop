import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ThankYou.css';

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <div className="thank-you-page">
      <h2>Thank you for your order!</h2>
      <p>You will receive an update when your product is on its way.💜</p>
      <button className="back-home-btn" onClick={() => navigate('/')}>
        ⬅️ Back to Home
      </button>
    </div>
  );
};

export default ThankYou;
