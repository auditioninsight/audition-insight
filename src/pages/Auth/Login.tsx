import React, { useState } from 'react';
import { Mail, Lock, Music } from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Login.css';

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    // Auto-detect role for mock application
    const ADMIN_EMAILS = ["tuemail@gmail.com"];
    const role = ADMIN_EMAILS.includes(email) ? 'admin' : 'user';
    
    login({
      id: Math.random().toString(36).substr(2, 9),
      email: email,
      role: role
    });
    
    const from = (location.state && location.state.from && location.state.from.pathname) || '/';
    navigate(from, { replace: true });
  };

  return (
    <div className="login-container">
      <div className="login-card glass-panel animate-fade-in">
        <div className="login-header">
          <div className="logo-icon-large">
            <Music size={40} className="music-icon" />
          </div>
          <h1>Orchestral Auditions</h1>
          <p>Login to access and review anonymous audition feedback</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
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
              />
            </div>
          </div>

          <button type="submit" className="login-btn">
            Sign In
          </button>
        </form>
        
        <div className="login-footer">
          <p>Don't have an account? <Link to="/register">Create Account</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
