import React, { useState } from 'react';
import { Mail, Lock, Music } from 'lucide-react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import './Login.css';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errorMSG, setErrorMSG] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setErrorMSG('');
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        setErrorMSG(error.message);
      } else {
        const from = (location.state && location.state.from && location.state.from.pathname) || '/';
        navigate(from, { replace: true });
      }
    } catch (err: any) {
      setErrorMSG(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
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
          {errorMSG && <div style={{color: 'var(--danger-color)', marginBottom: 'var(--space-4)', fontSize: '0.9rem', textAlign: 'center'}}>{errorMSG}</div>}
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

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
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
