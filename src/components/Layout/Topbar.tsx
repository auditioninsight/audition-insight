import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Bell, Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../hooks/useNotifications';
import './Topbar.css';

interface TopbarProps { 
  onToggleSidebar: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ onToggleSidebar }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const displayName = user && user.email ? user.email.split('@')[0] : 'Musician';
  const displayRole = user && user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'User';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="action-btn hamburger-btn" onClick={onToggleSidebar}>
          <Menu size={24} />
        </button>
      </div>
      <div className="topbar-center">
        <img src="/logo.png" alt="Audition Insight Logo" className="topbar-logo" />
      </div>

      <div className="topbar-actions">
        
        <div style={{ position: 'relative' }} ref={dropdownRef}>
          <button className="action-btn" onClick={() => setShowNotifications(!showNotifications)}>
            <Bell size={20} />
            {unreadCount > 0 && <span className="notification-dot"></span>}
          </button>

          {showNotifications && (
            <div className="notification-dropdown glass-panel animate-fade-in" style={{
              position: 'absolute', top: 'calc(100% + 5px)', right: 0, width: '320px', 
              backgroundColor: 'var(--bg-primary)', zIndex: 1000, 
              display: 'flex', flexDirection: 'column',
              maxHeight: '400px', overflowY: 'auto',
              boxShadow: 'var(--shadow-lg)',
              borderRadius: 'var(--radius-lg)'
            }}>
              <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, fontSize: '1rem', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>Notifications</h3>
                {unreadCount > 0 && (
                  <button onClick={markAllAsRead} style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', fontWeight: 500, padding: 0 }}>
                    Mark all as read
                  </button>
                )}
              </div>
              
              <div style={{ flex: 1 }}>
                {notifications.length === 0 ? (
                  <div style={{ padding: '2.5rem 1rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    You have no new notifications.
                  </div>
                ) : (
                  notifications.map(notif => (
                    <div 
                      key={notif.id} 
                      style={{ 
                        padding: '1rem 1rem 1rem 1.4rem', 
                        borderBottom: '1px solid var(--border-color)',
                        backgroundColor: notif.read ? 'transparent' : 'rgba(37, 99, 235, 0.03)',
                        cursor: notif.read ? 'default' : 'pointer',
                        transition: 'background-color 0.2s',
                        position: 'relative'
                      }}
                      onClick={() => {
                        if (!notif.read) markAsRead(notif.id);
                      }}
                    >
                      {!notif.read && (
                        <div style={{ position: 'absolute', left: 0, top: '1rem', width: '3px', height: '1.2rem', backgroundColor: 'var(--accent-gold)', borderRadius: '0 2px 2px 0' }} />
                      )}
                      <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: notif.read ? 400 : 500, lineHeight: 1.4 }}>
                        {notif.message}
                      </p>
                      <p style={{ margin: '0.3rem 0 0 0', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {new Date(notif.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <div 
          className="user-profile" 
          onClick={() => navigate('/profile')} 
          style={{ cursor: 'pointer', transition: 'opacity 0.2s' }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          <div className="avatar">
            <User size={20} />
          </div>
          <div className="user-info">
            <span className="user-name">{displayName}</span>
            <span className="user-role">{displayRole}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
