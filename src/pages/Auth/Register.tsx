import React, { useState } from 'react';
import { Mail, Lock, Music, GraduationCap, Calendar, Globe } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import './Login.css';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [instrument, setInstrument] = useState('');
  const [educationStatus, setEducationStatus] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [nationality, setNationality] = useState('');
  const [error, setError] = useState('');

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!email || !password) return;
    setLoading(true);

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password
      });

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      if (data.user) {
        const ADMIN_EMAILS = ["auditioninsightapp@gmail.com"];
        const role = ADMIN_EMAILS.includes(email) ? 'admin' : 'user';

        await supabase.from('profiles').upsert({
          id: data.user.id,
          email: email,
          role: role,
          instrument: instrument || null,
          education_status: educationStatus || null,
          birth_date: birthDate || null,
          nationality: nationality || null
        });
      }

      navigate('/');
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred while registering.');
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

          <div className="input-group">
            <label htmlFor="instrument">Instrument (Instrumento)</label>
            <div className="input-with-icon">
              <Music className="input-icon" size={20} />
              <input 
                id="instrument"
                type="text" 
                placeholder="Violin, Cello, Flute..." 
                value={instrument}
                onChange={(e) => setInstrument(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="educationStatus">Studies (Estudios)</label>
            <div className="input-with-icon">
              <GraduationCap className="input-icon" size={20} />
              <select
                id="educationStatus"
                value={educationStatus}
                onChange={(e) => setEducationStatus(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem 0.75rem 2.75rem',
                  border: '1px solid var(--border-color)',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '1rem',
                  outline: 'none',
                  color: 'inherit',
                  fontFamily: 'inherit'
                }}
              >
                <option value="">Select status...</option>
                <option value="bachelor">Bachelor Student</option>
                <option value="master">Master Student</option>
                <option value="finished">Finished Studies</option>
              </select>
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="birthDate">Date of Birth (Fecha de Nacimiento)</label>
            <div className="input-with-icon">
              <Calendar className="input-icon" size={20} />
              <input 
                id="birthDate"
                type="date" 
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="nationality">Nationality (Nacionalidad)</label>
            <div className="input-with-icon">
              <Globe className="input-icon" size={20} />
              <input 
                id="nationality"
                type="text" 
                placeholder="e.g. Spanish, German..." 
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Registering...' : 'Register Securely'}
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
