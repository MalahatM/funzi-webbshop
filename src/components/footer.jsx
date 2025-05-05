import React from 'react';
import './Footer.css';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
     
        <div className="footer-left">
          <h4>Follow Us:</h4>
          <div className="footer-socials">
            <a href="https://facebook.com" className="footer-social-link">
              <FaFacebook className="footer-social-icon" />
            </a>
            <a href="https://instagram.com" className="footer-social-link">
              <FaInstagram className="footer-social-icon" />
            </a>
          </div>
        </div>

        <div className="footer-right">
          <h4>Contact Us:</h4>
          <div className="footer-contact">
            <div className="footer-item">
              <FaPhone className="footer-icon" />
              <span className="footer-text">+1 234 567 890</span>
            </div>
            <div className="footer-item">
              <FaEnvelope className="footer-icon" />
              <span className="footer-text">email@funzi.com</span>
            </div>
            <div className="footer-item">
              <FaMapMarkerAlt className="footer-icon" />
              <span className="footer-text">123 Funzi St, Gothenburg, Sweden</span>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Funzi. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
