import React from 'react';
import { User, Bell, Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './Topbar.css';

interface TopbarProps { 
  onToggleSidebar: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ onToggleSidebar }) => {
  const { user } = useAuth();
  const displayName = user && user.email ? user.email.split('@')[0] : 'Musician';
  const displayRole = user && user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'User';

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
        <button className="action-btn">
          <Bell size={20} />
          <span className="notification-dot"></span>
        </button>

        <div className="user-profile">
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
