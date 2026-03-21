import React, { useState } from 'react';
import { Mail, Lock, Music } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Login.css';

const Register: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!email || !password) return;
    
    // Auto-detect role for mock application
    const ADMIN_EMAILS = ["tuemail@gmail.com"];
    const role = ADMIN_EMAILS.includes(email) ? 'admin' : 'user';
    
    login({
      id: Math.random().toString(36).substr(2, 9),
      email: email,
      role: role
    });

    navigate('/');
  };

  return (
    <div className="login-container">
      <div className="login-card glass-panel animate-fade-in">
        <div className="login-header">
          <div className="logo-icon-large">
            <Music size={40} className="music-icon" />
          </div>
          <h1>Create Account</h1>
          <p>Register to contribute anonymous audition feedback</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div style={{color: 'var(--danger-color)', marginBottom: 'var(--space-4)', fontSize: '0.9rem', textAlign: 'center'}}>{error}</div>}
          
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-with-icon">
              <Mail className="input-icon" size={20} />
              <input 
                id="email"
                type="email" 
                placeholder="musician@orchestra.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="input-with-icon">
              <Lock className="input-icon" size={20} />
              <input 
                id="password"
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="input-with-icon">
              <Lock className="input-icon" size={20} />
              <input 
                id="confirmPassword"
                type="password" 
                placeholder="••••••••" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
          </div>

          <button type="submit" className="login-btn">
            Register Securely
          </button>
        </form>
        
        <div className="login-footer">
          <p>Already have an account? <Link to="/login">Sign In</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
