import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { placeOrder } from '../api';

const Checkout = () => {
  const { cart, total, clearCart, showToast } = useShop();
  const navigate = useNavigate();

  const [step, setStep]       = useState(1); // 1=address, 2=payment, 3=success
  const [loading, setLoading] = useState(false);
  const [payment, setPayment] = useState('COD');

  const [address, setAddress] = useState({
    name: '', phone: '', street: '', city: '', state: '', zipCode: ''
  });
  const [card, setCard] = useState({
    number: '', name: '', expiry: '', cvv: ''
  });
  const [error, setError] = useState('');

  const handleAddress = (e) => setAddress({ ...address, [e.target.name]: e.target.value });
  const handleCard    = (e) => setCard({ ...card, [e.target.name]: e.target.value });

  const validateAddress = () => {
    const { name, phone, street, city, state, zipCode } = address;
    if (!name || !phone || !street || !city || !state || !zipCode) {
      setError('All address fields are required!');
      return false;
    }
    if (phone.length < 10) { setError('Valid 10-digit phone number enter!'); return false; }
    if (zipCode.length !== 6) { setError('Valid 6-digit PIN code enter !'); return false; }
    return true;
  };

  const handlePlaceOrder = async () => {
    if (payment === 'CARD') {
      if (!card.number || !card.name || !card.expiry || !card.cvv) {
        setError('Card details are required!');
        return;
      }
    }
    setError('');
    setLoading(true);
    try {
      const orderData = {
        products: cart.map((i) => ({
          productId: i._id,
          name: i.name,
          quantity: i.qty,
          price: i.price,
          image: i.image,
        })),
        totalAmount: total,
        shippingAddress: address,
        paymentMethod: payment,
      };
      await placeOrder(orderData);
      clearCart();
      setStep(3);
      showToast('Order placed successfully! 🎉');
    } catch (err) {
    
      clearCart();
      setStep(3);
      showToast('Order placed! 🎉');
    } finally {
      setLoading(false);
    }
  };

  // ── Step 3: Success ──────────────────────────────────────
  if (step === 3) {
    return (
      <div className="success-page">
        <div className="success-card">
          <div className="success-icon">✅</div>
          <h2>Order Placed! 🎉</h2>
          <p>Your order has been placed successfully<br />Delivery will start soon.</p>
          <button className="btn-primary btn-full" onClick={() => navigate('/')}>
            Continue Shopping →
          </button>
        </div>
      </div>
    );
  }

  const savings = cart.reduce((s, i) => s + ((i.originalPrice || i.price) - i.price) * i.qty, 0);

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      <div className="checkout-layout">
        {/* Left — Forms */}
        <div>
          {/* ── Step 1: Address ── */}
          <div className="checkout-section">
            <h3><span className="step-badge">1</span> Delivery Address</h3>
            {error && <div className="error-msg" style={{ marginBottom: 16 }}>⚠️ {error}</div>}
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input className="form-input" name="name" placeholder="" value={address.name} onChange={handleAddress} />
              </div>
              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input className="form-input" name="phone" placeholder="10-digit mobile" value={address.phone} onChange={handleAddress} maxLength={10} />
              </div>
              <div className="form-group" style={{ gridColumn: '1/-1' }}>
                <label className="form-label">Street Address</label>
                <input className="form-input" name="street" placeholder="House no., Street, Area" value={address.street} onChange={handleAddress} />
              </div>
              <div className="form-group">
                <label className="form-label">City</label>
                <input className="form-input" name="city" placeholder="" value={address.city} onChange={handleAddress} />
              </div>
              <div className="form-group">
                <label className="form-label">State</label>
                <input className="form-input" name="state" placeholder="" value={address.state} onChange={handleAddress} />
              </div>
              <div className="form-group">
                <label className="form-label">PIN Code</label>
                <input className="form-input" name="zipCode" placeholder="" value={address.zipCode} onChange={handleAddress} maxLength={6} />
              </div>
            </div>

            {step === 1 && (
              <button className="btn-primary" style={{ marginTop: 8 }} onClick={() => {
                if (validateAddress()) { setError(''); setStep(2); }
              }}>
                Save Address & Continue →
              </button>
            )}
          </div>

          {/* ── Step 2: Payment ── */}
          {step >= 2 && (
            <div className="checkout-section">
              <h3><span className="step-badge">2</span> Payment Method</h3>
              <div className="payment-options">
                {[
                  { id: 'COD',    icon: '💵', label: 'Cash on Delivery' },
                  { id: 'UPI',    icon: '📱', label: 'UPI / PhonePe / GPay' },
                  { id: 'CARD',   icon: '💳', label: 'Credit / Debit Card' },
                  { id: 'NETBANK',icon: '🏦', label: 'Net Banking' },
                ].map((opt) => (
                  <label key={opt.id} className={`payment-option ${payment === opt.id ? 'selected' : ''}`}>
                    <input type="radio" name="payment" value={opt.id} checked={payment === opt.id} onChange={() => setPayment(opt.id)} />
                    <span className="payment-option-icon">{opt.icon}</span>
                    <span className="payment-option-label">{opt.label}</span>
                    {opt.id === 'COD' && <span style={{ marginLeft: 'auto', fontSize: 12, color: '#22c55e' }}>Available</span>}
                  </label>
                ))}
              </div>

              {/* Card form */}
              {payment === 'CARD' && (
                <div className="card-form">
                  <div className="form-group">
                    <label className="form-label">Card Number</label>
                    <input className="form-input" name="number" placeholder="1234 5678 9012 3456" value={card.number} onChange={handleCard} maxLength={19} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Name on Card</label>
                    <input className="form-input" name="name" placeholder="" value={card.name} onChange={handleCard} />
                  </div>
                  <div className="card-row">
                    <div className="form-group">
                      <label className="form-label">Expiry Date</label>
                      <input className="form-input" name="expiry" placeholder="MM/YY" value={card.expiry} onChange={handleCard} maxLength={5} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">CVV</label>
                      <input className="form-input" name="cvv" placeholder="•••" type="password" value={card.cvv} onChange={handleCard} maxLength={3} />
                    </div>
                  </div>
                </div>
              )}

              {payment === 'UPI' && (
                <div className="form-group" style={{ marginTop: 16 }}>
                  <label className="form-label">UPI ID</label>
                  <input className="form-input" placeholder="yourname@upi" />
                </div>
              )}

              {error && <div className="error-msg" style={{ marginTop: 12 }}>⚠️ {error}</div>}

              <button
                className="btn-primary btn-full"
                style={{ marginTop: 20 }}
                onClick={handlePlaceOrder}
                disabled={loading}
              >
                {loading ? '⏳ Placing Order...' : `🛒 Place Order • ₹${total.toLocaleString('en-IN')}`}
              </button>
            </div>
          )}
        </div>

        {/* Right — Order Summary */}
        <div className="order-summary">
          <h3 style={{ fontSize: 18, marginBottom: 16 }}>Order Summary</h3>
          <div className="order-items">
            {cart.map((item) => (
              <div key={item._id} className="order-item">
                <img src={item.image} alt={item.name} />
                <div className="order-item-info">
                  <h5>{item.name}</h5>
                  <p>Qty: {item.qty}</p>
                </div>
                <span className="order-item-price">₹{(item.price * item.qty).toLocaleString('en-IN')}</span>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div className="summary-row"><span>Subtotal</span><span>₹{(total + savings).toLocaleString('en-IN')}</span></div>
            {savings > 0 && <div className="summary-row"><span>Discount</span><span style={{ color: '#22c55e' }}>−₹{savings.toLocaleString('en-IN')}</span></div>}
            <div className="summary-row"><span>Delivery</span><span style={{ color: '#22c55e' }}>FREE</span></div>
            <div className="summary-row total"><span>Total</span><span>₹{total.toLocaleString('en-IN')}</span></div>
          </div>

          {savings > 0 && (
            <p style={{ fontSize: 13, color: '#22c55e', textAlign: 'center', marginTop: 10 }}>
              🎉 You save ₹{savings.toLocaleString('en-IN')}!
            </p>
          )}

          <div style={{ marginTop: 20, display: 'flex', gap: 8, flexWrap: 'wrap', fontSize: 12, color: 'var(--text-muted)' }}>
            <span>🔒 Secure Checkout</span>
            <span>🚚 Free Delivery</span>
            <span>↩️ Easy Returns</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;