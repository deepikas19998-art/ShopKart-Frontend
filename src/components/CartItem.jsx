import React from 'react';
import { useShop } from '../context/ShopContext';

const CartItem = ({ item }) => {
  const { updateQty, removeFromCart } = useShop();

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} />
      <div className="cart-item-info">
        <p className="cat">{item.category}</p>
        <h4>{item.name}</h4>
        <p className="price">₹{(item.price * item.qty).toLocaleString('en-IN')}</p>
      </div>

      <div className="cart-item-controls">
        <div className="qty-box">
          <button className="qty-btn" onClick={() => updateQty(item._id, item.qty - 1)}>−</button>
          <span className="qty-val">{item.qty}</span>
          <button className="qty-btn" onClick={() => updateQty(item._id, item.qty + 1)}>+</button>
        </div>
        <button className="remove-btn" onClick={() => removeFromCart(item._id)} title="Remove">
          🗑
        </button>
      </div>
    </div>
  );
};

export default CartItem;