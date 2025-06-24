import React, { useState } from 'react';
import { register } from '../api/auth';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/AuthPages.css';

export default function RegisterPage() {
  const [form, setForm] = useState({ 
    name: '', 
    surname: '', 
    email: '', 
    password: '', 
    repeatPassword: '' 
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setPasswordError('');

    // Validate passwords match
    if (form.password !== form.repeatPassword) {
      setPasswordError('Fjalëkalimet nuk përputhen');
      return;
    }

    try {
      await register({
        name: form.name,
        surname: form.surname,
        email: form.email,
        password: form.password
      });
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      const msg = err.response?.data?.error || 'Regjistrimi dështoi';
      setError(msg);
    }
  };

  return (
    <div className="auth-container">
      {success && (
        <div className="auth-success-notification">
          ✅ Regjistrimi u krye me sukses! Po ju ridrejtojmë...
        </div>
      )}
      
      <div className={`auth-card ${success ? 'blur-effect' : ''}`}>
        <div className="auth-header">
          <h2>Krijo një llogari ✨</h2>
          <p>Plotëso të dhënat për t'u regjistruar</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <input
              type="text"
              placeholder="Emri"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Mbiemri"
              value={form.surname}
              onChange={e => setForm({ ...form, surname: e.target.value })}
              required
            />
          </div>
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
          <div className="form-group">
            <input
              type="password"
              placeholder="Përsërit fjalëkalimin"
              value={form.repeatPassword}
              onChange={e => setForm({ ...form, repeatPassword: e.target.value })}
              required
            />
            {passwordError && (
              <div className="error-message">{passwordError}</div>
            )}
          </div>
          <button type="submit" className="auth-button">Regjistrohu</button>
        </form>

        <div className="auth-footer">
          Ke tashmë një llogari? <Link to="/login">Kyçu këtu</Link>
        </div>
      </div>
    </div>
  );
}