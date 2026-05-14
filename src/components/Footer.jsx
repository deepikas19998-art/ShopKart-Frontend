import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="footer">
    <div className="footer-inner">
      <div className="footer-top">
        <div className="footer-brand">
          <h3>🛒 ShopKart</h3>
          <p>India's premium  e-commerce platform. Shop smart, live better.</p>
        </div>
        <div className="footer-col">
          <h4>Shop</h4>
          <ul>
            <li><Link to="/products">All Products</Link></li>
            <li><Link to="/products?category=Electronics">Electronics</Link></li>
            <li><Link to="/products?category=Fashion">Fashion</Link></li>
            <li><Link to="/products?category=Accessories">Accessories</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Account</h4>
          <ul>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/cart">My Cart</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Support</h4>
          <ul>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Returns</a></li>
            <li><a href="#">Track Order</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 ShopKart. Made with ❤️ in India.</p>
        <p>🔒 Secure payments | 🚚 Free delivery | ↩️ Easy returns</p>
      </div>
    </div>
  </footer>
);

export default Footer;