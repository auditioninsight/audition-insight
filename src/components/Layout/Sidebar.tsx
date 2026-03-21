import React from 'react';
import { NavLink } from 'react-router-dom';
import { Map, BarChart2, LogOut, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './Sidebar.css';

interface SidebarProps {
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {
  const { user } = useAuth();

  return (
    <aside className="sidebar">
      <div className="sidebar-header" style={{ justifyContent: 'center' }}>
        <img src="/logo.png" alt="Audition Insight" className="sidebar-logo-image" />
      </div>
      
      <nav className="sidebar-nav">
        <NavLink 
          to="/auditions" 
          className={({ isActive }) => `nav-link ${isActive || window.location.pathname === '/' ? 'active' : ''}`}
        >
          <Map className="nav-icon" size={20} />
          <span>Auditions</span>
        </NavLink>
        
        <NavLink 
          to="/statistics" 
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          <BarChart2 className="nav-icon" size={20} />
          <span>Statistics</span>
        </NavLink>
        
        {user && user.role === 'admin' && (
          <NavLink 
            to="/verification" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <Shield className="nav-icon" size={20} />
            <span>Verification</span>
          </NavLink>
        )}
      </nav>
      
      <div className="sidebar-footer">
        <button className="nav-link logout-btn" onClick={onLogout}>
          <LogOut className="nav-icon" size={20} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
