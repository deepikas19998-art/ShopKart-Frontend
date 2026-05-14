import React from 'react';
import { useShop } from '../context/ShopContext';

const Admin = () => {
  const { products, isAdmin, user } = useShop();

  if (!isAdmin) {
    return (
      <div className="empty-state" style={{ minHeight: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🔒</div>
        <h3>Admin Access Only</h3>
        <p>You don't have permission to view this page.</p>
      </div>
    );
  }

  const totalValue = products.reduce((s, p) => s + p.price * (p.stock || 0), 0);
  const inStock    = products.filter((p) => (p.stock || 0) > 0).length;
  const categories = [...new Set(products.map((p) => p.category))].length;

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Admin Dashboard 🛠️</h1>
        <p>Welcome back, {user?.name}! Here's your store overview.</p>
      </div>

      {/* Stats */}
      <div className="admin-stats">
        <div className="stat-card">
          <p className="stat-card-label">Total Products</p>
          <p className="stat-card-value orange">{products.length}</p>
        </div>
        <div className="stat-card">
          <p className="stat-card-label">In Stock</p>
          <p className="stat-card-value green">{inStock}</p>
        </div>
        <div className="stat-card">
          <p className="stat-card-label">Categories</p>
          <p className="stat-card-value cyan">{categories}</p>
        </div>
        <div className="stat-card">
          <p className="stat-card-label">Inventory Value</p>
          <p className="stat-card-value orange">₹{totalValue.toLocaleString('en-IN')}</p>
        </div>
      </div>

      {/* Products Table */}
      <div className="admin-products">
        <h3>All Products</h3>
        <div style={{ overflowX: 'auto', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id}>
                  <td><img src={p.image} alt={p.name} className="table-img" /></td>
                  <td style={{ fontWeight: 600, maxWidth: 200 }}>{p.name}</td>
                  <td style={{ color: 'var(--cyan)', fontSize: 13 }}>{p.category}</td>
                  <td style={{ color: 'var(--orange)', fontWeight: 700 }}>₹{p.price.toLocaleString('en-IN')}</td>
                  <td>
                    <span className={`stock-badge ${(p.stock || 0) > 0 ? 'in' : 'out'}`}>
                      {(p.stock || 0) > 0 ? `${p.stock} in stock` : 'Out of stock'}
                    </span>
                  </td>
                  <td style={{ color: '#ffb400' }}>{'★'.repeat(Math.round(p.rating || 0))} {p.rating || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;