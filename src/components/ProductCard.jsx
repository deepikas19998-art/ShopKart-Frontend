import React from 'react';
import { useShop } from '../context/ShopContext';

const Stars = ({ rating }) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span className="stars">
      {'★'.repeat(full)}
      {half ? '½' : ''}
      {'☆'.repeat(5 - full - (half ? 1 : 0))}
    </span>
  );
};

const ProductCard = ({ product }) => {
  const { addToCart } = useShop();

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="product-card">
      <div className="product-img-wrap">
        <img src={product.image} alt={product.name} loading="lazy" />
        {discount > 0 && (
          <span className="product-badge">{discount}% OFF</span>
        )}
      </div>

      <div className="product-info">
        <p className="product-cat">{product.category}</p>
        <h3 className="product-name">{product.name}</h3>

        {product.rating > 0 && (
          <div className="product-rating">
            <Stars rating={product.rating} />
            <span className="rating-count">({product.reviews || 0})</span>
          </div>
        )}

        <div className="product-price-row">
          <span className="product-price">₹{product.price.toLocaleString('en-IN')}</span>
          {product.originalPrice && (
            <span className="product-original">₹{product.originalPrice.toLocaleString('en-IN')}</span>
          )}
          {discount > 0 && (
            <span className="product-discount">Save {discount}%</span>
          )}
        </div>
      </div>

      <div className="product-actions">
        <button
          className="add-cart-btn"
          onClick={() => addToCart(product)}
          disabled={product.stock === 0}
        >
          {product.stock === 0 ? 'Out of Stock' : '🛒 Add to Cart'}
        </button>
        <button className="wishlist-btn" title="Wishlist">♡</button>
      </div>
    </div>
  );
};

export default ProductCard;