import React, { useState } from 'react';
import { login } from '../api/auth';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/AuthPages.css';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await login(form);
      localStorage.setItem('userEmail', form.email);
      navigate('/dashboard');
    } catch (err) {
      const errorMsg = err.response?.data?.error?.toLowerCase() || 'Gabim gjatë kyçjes';

      if (errorMsg.includes('not found') || errorMsg.includes('no user')) {
        setError('Ju nuk keni akont. Ju lutemi regjistrohuni.');
      } else if (errorMsg.includes('password')) {
        setError('Fjalëkalimi është i pasaktë.');
      } else {
        setError('Kyçja dështoi. Ju lutemi provoni përsëri.');
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Mirë se vini👋</h2>
          <p>Kyçu me llogarinë tënde për të vazhduar</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Fjalëkalimi"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="auth-button">Kyçu</button>
        </form>

        <div className="auth-footer">
          Nuk ke llogari? <Link to="/Register">Regjistrohu këtu</Link>
        </div>
      </div>
    </div>
  );
}
