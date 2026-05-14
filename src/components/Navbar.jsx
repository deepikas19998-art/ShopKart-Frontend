import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

const Navbar = () => {
  const { cartCount, isLoggedIn, user, logout } = useShop();
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/products?search=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <header className="navbar">
      <div className="nav-inner">
        {/* Brand */}
        <Link to="/" className="brand">
          <span className="brand-dot" />
          ShopKart
        </Link>

        {/* Search */}
        <form className="nav-search" onSubmit={handleSearch}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products, brands and more..."
          />
          <button type="submit" className="search-btn">🔍 Search</button>
        </form>

        {/* Links */}
        <nav className="nav-links">
          <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''} end>Home</NavLink>
          <NavLink to="/products" className={({ isActive }) => isActive ? 'active' : ''}>Products</NavLink>
          {isLoggedIn && user?.isAdmin && (
            <NavLink to="/admin" className={({ isActive }) => isActive ? 'active' : ''}>Admin</NavLink>
          )}
        </nav>

        {/* Actions */}
        <div className="nav-actions">
          {/* Cart */}
          <Link to="/cart" className="cart-btn">
            🛒 Cart
            <span className="cart-badge">{cartCount}</span>
          </Link>

          {/* Auth */}
          {isLoggedIn ? (
            <div style={{ display: 'flex', gap: 8 }}>
              <span className="user-btn">👤 {user?.name?.split(' ')[0]}</span>
              <button className="login-btn" onClick={logout}>Logout</button>
            </div>
          ) : (
            <Link to="/login" className="login-btn">Login</Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;