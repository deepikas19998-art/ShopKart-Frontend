import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

const Login = () => {
  const { login, isLoggedIn } = useShop();
  const navigate = useNavigate();
 const [form, setForm]     = useState({ email: '', password: '' });
  const [error, setError]   = useState('');
  const [loading, setLoading] = useState(false);

  
  if (isLoggedIn) { navigate('/'); return null; }

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setError('');
    if (!form.email || !form.password) {
      setError('Email and password are required');
      return;
    }
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Welcome Back! 👋</h2>
        <p>Login to your ShopKart account</p>

        {error && <div className="error-msg">⚠️ {error}</div>}

        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input
            className="form-input"
            type="email"
            name="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            className="form-input"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        <button
          className="btn-primary btn-full"
          onClick={handleSubmit}
          disabled={loading}
          style={{ marginTop: 8 }}
        >
          {loading ? '⏳ Logging in...' : '🔐 Login'}
        </button>

        <div className="auth-divider">— OR —</div>

        <p style={{ textAlign: 'center', fontSize: 14, color: 'var(--text-muted)' }}>
          Don't have an account?{' '}
          <Link to="/register" className="auth-link">Create one free →</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;