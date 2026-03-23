import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import './Layout.css';

interface LayoutProps {
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="layout-container">
      <Sidebar 
        onLogout={onLogout} 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
      
      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)} />
      )}
      
      <main className="main-content">
        <Topbar onToggleSidebar={() => setIsSidebarOpen(true)} />
        
        <div className="content-area animate-fade-in">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
