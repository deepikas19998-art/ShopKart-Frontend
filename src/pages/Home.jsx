import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import CategoryStrip from '../components/CategoryStrip';
import ProductCard from '../components/ProductCard';
import { useShop } from '../context/ShopContext';

const Home = () => {
  const { products, loading } = useShop();

  return (
    <main>
      <Hero />
      <CategoryStrip />

      {/* Featured Products */}
      <div className="section">
        <div className="section-header">
          <div>
            <h2>Featured Products</h2>
            <p>Handpicked just for you</p>
          </div>
          <Link to="/products" className="btn-outline" style={{ padding: '8px 20px', fontSize: 14 }}>
            View All →
          </Link>
        </div>

        {loading ? (
          <div className="loading-wrap"><div className="spinner" /></div>
        ) : (
          <div className="product-grid">
            {products.slice(0, 8).map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        )}
      </div>

      {/* Banner */}
      <div style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '60px 24px', textAlign: 'center', margin: '0 0 60px' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <p style={{ color: 'var(--orange)', fontWeight: 700, marginBottom: 12, fontSize: 13, textTransform: 'uppercase', letterSpacing: 2 }}>Limited Time Offer</p>
          <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.6rem)', marginBottom: 16 }}>Get 20% Off Your First Order</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: 28 }}>Create an account and use code SHOP20 at checkout</p>
          <Link to="/register" className="btn-primary">Claim Offer 🎁</Link>
        </div>
      </div>
    </main>
  );
};

export default Home;