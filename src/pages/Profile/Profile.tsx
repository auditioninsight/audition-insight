import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import { User as UserIcon, CheckCircle, Edit2, Save, X, Music, GraduationCap, Calendar, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../Auditions/ListView.css';

const Profile: React.FC = () => {
  const { user, login } = useAuth();
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isEditing, setIsEditing] = useState(false);
  const [editInstrument, setEditInstrument] = useState('');
  const [editEducationStatus, setEditEducationStatus] = useState('');
  const [editBirthDate, setEditBirthDate] = useState('');
  const [editNationality, setEditNationality] = useState('');
  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    
    const fetchMyReviews = async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('user_email', user.email)
        .order('created_at', { ascending: false });
        
      if (!error && data) {
        setReviews(data);
      }
      setLoading(false);
    };

    fetchMyReviews();
  }, [user]);

  useEffect(() => {
    if (user) {
      setEditInstrument(user.instrument || '');
      setEditEducationStatus(user.education_status || '');
      setEditBirthDate(user.birth_date || '');
      setEditNationality(user.nationality || '');
    }
  }, [user, isEditing]);

  const handleSaveProfile = async () => {
    if (!user) return;
    setSaveLoading(true);
    
    const { error } = await supabase
      .from('profiles')
      .update({
        instrument: editInstrument || null,
        education_status: editEducationStatus || null,
        birth_date: editBirthDate || null,
        nationality: editNationality || null
      })
      .eq('id', user.id);
      
    if (!error) {
      // Update local context
      login({
        ...user,
        instrument: editInstrument || undefined,
        education_status: editEducationStatus || undefined,
        birth_date: editBirthDate || undefined,
        nationality: editNationality || undefined
      });
      setIsEditing(false);
    }
    setSaveLoading(false);
  };

  const getEducationLabel = (status?: string) => {
    switch(status) {
      case 'bachelor': return 'Bachelor Student';
      case 'master': return 'Master Student';
      case 'finished': return 'Finished Studies';
      default: return 'Not specified';
    }
  };

  if (!user) return null;

  return (
    <div className="list-container animate-fade-in">
      <div className="list-header" style={{ marginBottom: '2rem' }}>
        <h1 className="list-title">
          <UserIcon className="title-icon" style={{ color: 'var(--accent-blue)' }} />
          My Profile
        </h1>
        <p className="list-subtitle">Manage your account and view your audition feedback history.</p>
      </div>

      <div className="overview-grid" style={{ marginBottom: '2rem' }}>
        <div className="stat-card glass-panel" style={{ gridColumn: '1 / -1' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
            <h2 style={{ fontSize: '1.2rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <UserIcon size={20} style={{ color: 'var(--accent-blue)' }} />
              Account Info
            </h2>
            
            {!isEditing ? (
              <button 
                onClick={() => setIsEditing(true)}
                className="secondary-btn"
                style={{ padding: '0.4rem 0.8rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
              >
                <Edit2 size={16} /> Edit Profile
              </button>
            ) : (
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button 
                  onClick={() => setIsEditing(false)}
                  className="secondary-btn"
                  style={{ padding: '0.4rem 0.8rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                  disabled={saveLoading}
                >
                  <X size={16} /> Cancel
                </button>
                <button 
                  onClick={handleSaveProfile}
                  className="primary-btn"
                  style={{ padding: '0.4rem 0.8rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                  disabled={saveLoading}
                >
                  <Save size={16} /> {saveLoading ? 'Saving...' : 'Save'}
                </button>
              </div>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            <div>
              <p className="stat-label" style={{ marginBottom: '0.4rem' }}>Email Address</p>
              <p style={{ fontWeight: '500', color: 'var(--text-color)' }}>{user.email}</p>
            </div>
            
            <div>
              <p className="stat-label" style={{ marginBottom: '0.4rem' }}>Role</p>
              <p style={{ fontWeight: '500', color: 'var(--text-color)' }}>{user.role === 'admin' ? 'Administrator' : 'Musician'}</p>
            </div>

            <div>
              <p className="stat-label" style={{ marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Music size={14} /> Instrument
              </p>
              {!isEditing ? (
                <p style={{ fontWeight: '500', color: 'var(--text-color)' }}>{user.instrument || 'Not specified'}</p>
              ) : (
                <input 
                  type="text" 
                  value={editInstrument}
                  onChange={(e) => setEditInstrument(e.target.value)}
                  placeholder="e.g. Violin"
                  style={{
                    width: '100%', padding: '0.5rem', borderRadius: '8px', 
                    border: '1px solid var(--border-color)', backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    fontFamily: 'inherit', fontSize: '0.95rem'
                  }}
                />
              )}
            </div>

            <div>
              <p className="stat-label" style={{ marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <GraduationCap size={14} /> Education Status
              </p>
              {!isEditing ? (
                <p style={{ fontWeight: '500', color: 'var(--text-color)' }}>{getEducationLabel(user.education_status)}</p>
              ) : (
                <select 
                  value={editEducationStatus}
                  onChange={(e) => setEditEducationStatus(e.target.value)}
                  style={{
                    width: '100%', padding: '0.5rem', borderRadius: '8px', 
                    border: '1px solid var(--border-color)', backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    fontFamily: 'inherit', fontSize: '0.95rem'
                  }}
                >
                  <option value="">Not specified</option>
                  <option value="bachelor">Bachelor Student</option>
                  <option value="master">Master Student</option>
                  <option value="finished">Finished Studies</option>
                </select>
              )}
            </div>

            <div>
              <p className="stat-label" style={{ marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Calendar size={14} /> Date of Birth
              </p>
              {!isEditing ? (
                <p style={{ fontWeight: '500', color: 'var(--text-color)' }}>{user.birth_date ? new Date(user.birth_date).toLocaleDateString() : 'Not specified'}</p>
              ) : (
                <input 
                  type="date" 
                  value={editBirthDate}
                  onChange={(e) => setEditBirthDate(e.target.value)}
                  style={{
                    width: '100%', padding: '0.5rem', borderRadius: '8px', 
                    border: '1px solid var(--border-color)', backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    fontFamily: 'inherit', fontSize: '0.95rem'
                  }}
                />
              )}
            </div>

            <div>
              <p className="stat-label" style={{ marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Globe size={14} /> Nationality
              </p>
              {!isEditing ? (
                <p style={{ fontWeight: '500', color: 'var(--text-color)' }}>{user.nationality || 'Not specified'}</p>
              ) : (
                <input 
                  type="text" 
                  value={editNationality}
                  onChange={(e) => setEditNationality(e.target.value)}
                  placeholder="e.g. Spanish"
                  style={{
                    width: '100%', padding: '0.5rem', borderRadius: '8px', 
                    border: '1px solid var(--border-color)', backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    fontFamily: 'inherit', fontSize: '0.95rem'
                  }}
                />
              )}
            </div>
          </div>
        </div>
        
        <div className="stat-card glass-panel" style={{ alignSelf: 'start' }}>
          <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.1)', color: 'var(--accent-gold)' }}>
            <CheckCircle size={24} />
          </div>
          <div className="stat-content">
            <h3 className="stat-value">{reviews.filter(r => r.verified).length}</h3>
            <p className="stat-label">Verified Reviews</p>
          </div>
        </div>
      </div>

      <h2 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: 'var(--text-light)' }}>Submission History</h2>
      
      {loading ? (
        <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
          <p>Loading your reviews...</p>
        </div>
      ) : reviews.length === 0 ? (
        <div className="empty-state glass-panel">
          <p>You haven't submitted any reviews yet.</p>
          <Link to="/auditions" className="primary-btn" style={{ marginTop: '1rem', display: 'inline-block' }}>
            Explore Orchestras
          </Link>
        </div>
      ) : (
        <div className="countries-grid">
          {reviews.map(review => (
            <Link 
              to={`/auditions/${review.country}/${review.orchestra}/${review.instrument}`} 
              key={review.id} 
              className="country-card glass-panel"
            >
              <div className="country-info">
                <h3>{review.orchestra?.replace(/-/g, ' ') || 'Unknown Orchestra'}</h3>
                <p style={{ marginTop: '0.5rem', textTransform: 'capitalize', color: 'var(--text-muted)' }}>
                  {review.instrument} Position
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                <span className={`status-badge ${review.verified ? 'status-approved' : 'status-pending'}`}>
                  {review.verified ? 'Verified' : 'Pending'}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {new Date(review.created_at).toLocaleDateString()}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
