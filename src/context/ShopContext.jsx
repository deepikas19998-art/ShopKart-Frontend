import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getProducts, loginUser, registerUser } from '../api';

const ShopContext = createContext();

const demoProducts = [
  { _id: 'd1', name: 'Nebula Headset',   price: 2499, originalPrice: 3499, category: 'Electronics', description: 'Premium wireless headset with noise cancellation.', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80', stock: 10, rating: 4.5, reviews: 120 },
  { _id: 'd2', name: 'Astra Sneakers',   price: 1999, originalPrice: 2999, category: 'Fashion',     description: 'Lightweight and stylish sneakers for everyday wear.', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80', stock: 25, rating: 4.2, reviews: 88 },
  { _id: 'd3', name: 'Luna Smart Watch', price: 3299, originalPrice: 4999, category: 'Accessories', description: 'Elegant smart watch with health tracking.', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80', stock: 15, rating: 4.7, reviews: 200 },
  { _id: 'd4', name: 'Orbit Speaker',    price: 1499, originalPrice: 2199, category: 'Electronics', description: '360° surround sound Bluetooth speaker.', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80', stock: 30, rating: 4.0, reviews: 55 },
  { _id: 'd5', name: 'Zen Backpack',     price: 1299, originalPrice: 1999, category: 'Fashion',     description: 'Minimalist travel backpack with USB port.', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80', stock: 20, rating: 4.3, reviews: 67 },
  { _id: 'd6', name: 'Holo Sunglasses',  price: 899,  originalPrice: 1499, category: 'Accessories', description: 'UV400 polarized holographic sunglasses.', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80', stock: 50, rating: 4.1, reviews: 34 },
  { _id: 'd7', name: 'Flux Keyboard',    price: 3999, originalPrice: 5499, category: 'Electronics', description: 'Mechanical RGB keyboard with custom switches.', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&q=80', stock: 12, rating: 4.8, reviews: 310 },
  { _id: 'd8', name: 'Nova Perfume',     price: 799,  originalPrice: 1299, category: 'Beauty',      description: 'Long-lasting woody fragrance with citrus top notes.', image: 'https://particlegoods.com/cdn/shop/files/RollerNova_grande.jpg?v=1696529295', stock: 40, rating: 4.4, reviews: 92 },
];

export function ShopProvider({ children }) {
  // ─── Products ────────────────────────────────────────────
  const [products, setProducts]     = useState([]);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState(null);

  // ─── Auth ────────────────────────────────────────────────
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('user')); }
    catch { return null; }
  });

  // ─── Cart ────────────────────────────────────────────────
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem('cart')) || []; }
    catch { return []; }
  });

  // ─── Toast ───────────────────────────────────────────────
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  };

  // ─── Fetch Products ──────────────────────────────────────
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data } = await getProducts();
        setProducts(data.length > 0 ? data : demoProducts);
      } catch {
        setError('Backend is down please try again later.');
        setProducts(demoProducts);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // ─── Persist Cart ────────────────────────────────────────
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // ─── Auth Functions ──────────────────────────────────────
  const login = async (email, password) => {
    const { data } = await loginUser({ email, password });
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    setUser(data.user);
    showToast(`Welcome back, ${data.user.name}! 🎉`);
    return data;
  };

  const register = async (name, email, password) => {
    const { data } = await registerUser({ name, email, password });
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    setUser(data.user);
    showToast(`Account created! Welcome ${data.user.name} 🚀`);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setCart([]);
    showToast('Logged out successfully!', 'info');
  };

  // ─── Cart Functions ──────────────────────────────────────
  const addToCart = (product) => {
    setCart((prev) => {
      const found = prev.find((i) => i._id === product._id);
      if (found) {
        showToast(`${product.name} quantity updated! 🛒`);
        return prev.map((i) => i._id === product._id ? { ...i, qty: i.qty + 1 } : i);
      }
      showToast(`${product.name} added to cart! 🛒`);
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((i) => i._id !== id));
    showToast('Item removed from cart', 'info');
  };

  const updateQty = (id, qty) => {
    if (qty < 1) return;
    setCart((prev) => prev.map((i) => i._id === id ? { ...i, qty } : i));
  };

  const clearCart = () => setCart([]);

  // ─── Derived ─────────────────────────────────────────────
  const total = useMemo(
    () => cart.reduce((s, i) => s + i.price * i.qty, 0), [cart]
  );
  const cartCount = useMemo(
    () => cart.reduce((s, i) => s + i.qty, 0), [cart]
  );

  return (
    <ShopContext.Provider value={{
      products, loading, error,
      user, login, register, logout,
      isLoggedIn: !!user,
      isAdmin: user?.isAdmin || false,
      cart, total, cartCount,
      addToCart, removeFromCart, updateQty, clearCart,
      toast, showToast,
    }}>
      {children}
    </ShopContext.Provider>
  );
}

export const useShop = () => useContext(ShopContext);