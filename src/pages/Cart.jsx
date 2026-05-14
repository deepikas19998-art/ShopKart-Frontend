import React from 'react';
import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';
import { useShop } from '../context/ShopContext';

const Cart = () => {
  const { cart, total, clearCart } = useShop();

  const savings = cart.reduce((s, i) => {
    const orig = i.originalPrice || i.price;
    return s + (orig - i.price) * i.qty;
  }, 0);

  if (cart.length === 0) {
    return (
      <div className="empty-state" style={{ minHeight: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>🛒</div>
        <h3>Your cart is empty!</h3>
        <p style={{ marginBottom: 24 }}>Add some products to get started</p>
        <Link to="/products" className="btn-primary">Shop Now</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>🛒 My Cart <span style={{ fontSize: 18, color: 'var(--text-muted)', fontWeight: 400 }}>({cart.length} items)</span></h1>

      <div className="cart-layout">
        {/* Items */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 14 }}>
            <button onClick={clearCart} style={{ fontSize: 13, color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}>
              🗑 Clear All
            </button>
          </div>
          <div className="cart-items">
            {cart.map((item) => (
              <CartItem key={item._id} item={item} />
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal ({cart.length} items)</span>
            <span>₹{(total + savings).toLocaleString('en-IN')}</span>
          </div>
          {savings > 0 && (
            <div className="summary-row">
              <span>Discount</span>
              <span style={{ color: '#22c55e' }}>−₹{savings.toLocaleString('en-IN')}</span>
            </div>
          )}
          <div className="summary-row">
            <span>Delivery</span>
            <span style={{ color: '#22c55e' }}>FREE</span>
          </div>
          <div className="summary-row total">
            <span>Total Amount</span>
            <span>₹{total.toLocaleString('en-IN')}</span>
          </div>
          {savings > 0 && (
            <p className="summary-savings">🎉 You save ₹{savings.toLocaleString('en-IN')} on this order!</p>
          )}
          <Link to="/checkout" className="btn-primary btn-full" style={{ marginTop: 16 }}>
            Proceed to Checkout →
          </Link>
          <Link to="/products" className="btn-outline btn-full" style={{ marginTop: 10 }}>
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;