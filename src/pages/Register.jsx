import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

const Register = () => {
  const { register, isLoggedIn } = useShop();
  const navigate = useNavigate();

  const [form, setForm]       = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);

  if (isLoggedIn) { navigate('/'); return null; }

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setError('');
    if (!form.name || !form.email || !form.password) {
      setError('All fields are required');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (form.password !== form.confirm) {
      setError('Passwords do not match!');
      return;
    }
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Create Account 🚀</h2>
        <p>Join ShopKart and start shopping today!</p>

        {error && <div className="error-msg">⚠️ {error}</div>}

        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input
            className="form-input"
            name="name"
            placeholder=""
            value={form.name}
            onChange={handleChange}
          />
        </div>
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
            placeholder="Min. 6 characters"
            value={form.password}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Confirm Password</label>
          <input
            className="form-input"
            type="password"
            name="confirm"
            placeholder="Re-enter password"
            value={form.confirm}
            onChange={handleChange}
          />
        </div>

        <button
          className="btn-primary btn-full"
          onClick={handleSubmit}
          disabled={loading}
          style={{ marginTop: 8 }}
        >
          {loading ? '⏳ Creating account...' : '✅ Create Account'}
        </button>

        <div className="auth-divider">— OR —</div>

        <p style={{ textAlign: 'center', fontSize: 14, color: 'var(--text-muted)' }}>
          Already have an account?{' '}
          <Link to="/login" className="auth-link">Login here →</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;