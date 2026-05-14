import React from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

const Hero = () => {
  const { products } = useShop();
  const featured = products.slice(0, 4);

  return (
    <section className="hero">
      <div className="hero-bg" />
      <div className="hero-grid">
        {/* Left — Text */}
        <div>
          <div className="hero-tag">🚀 India's No 1 Shopping Destination</div>
          <h1>
            Shop the <span>Future</span>,<br />
            Feel the Difference
          </h1>
          <p className="hero-desc">
            Premium products, unbeatable prices, lightning-fast delivery.
            Your ultimate shopping destination .
          </p>
          <div className="hero-actions">
            <Link to="/products" className="btn-primary">
              🛍️ Shop Now
            </Link>
            <Link to="/register" className="btn-outline">
              Create Account
            </Link>
          </div>

         
          <div style={{ display: 'flex', gap: 24, marginTop: 36, flexWrap: 'wrap' }}>
            {[
              { icon: '🚚', text: 'Free Delivery' },
              { icon: '🔒', text: 'Secure Payment' },
              { icon: '↩️',  text: 'Easy Returns' },
              { icon: '⭐', text: '4.8★ Rated' },
            ].map((b) => (
              <div key={b.text} style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)', fontSize: 13 }}>
                <span>{b.icon}</span>
                <span>{b.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Product Cards */}
        <div className="hero-visual">
          {featured.map((p) => (
            <div key={p._id} className="hero-card">
              <img src={p.image} alt={p.name} />
              <div className="hero-card-info">
                <h4>{p.name}</h4>
                <p>₹{p.price.toLocaleString('en-IN')}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;