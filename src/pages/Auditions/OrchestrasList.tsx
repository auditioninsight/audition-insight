import React, { useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronRight, ArrowLeft, Search } from 'lucide-react';
import './ListView.css';

import { getOrchestrasByCountry, getCountryNameByCode } from '../../data/orchestras';

const OrchestrasList: React.FC = () => {
  const { country } = useParams<{ country: string }>();
  const [searchQuery, setSearchQuery] = useState('');
  
  const baseOrchestras = getOrchestrasByCountry(country || '');
  const countryName = getCountryNameByCode(country || '');

  const orchestras = useMemo(() => {
    if (!searchQuery.trim()) return baseOrchestras;
    const query = searchQuery.toLowerCase();
    return baseOrchestras.filter(orch => orch.name.toLowerCase().includes(query));
  }, [baseOrchestras, searchQuery]);

  return (
    <div className="list-view-container animate-fade-in">
      <div className="breadcrumbs">
        <Link to="/auditions" className="breadcrumb-back">
          <ArrowLeft size={16} /> Back to Countries
        </Link>
      </div>

      <div className="list-header">
        <h2>Orchestras in {countryName}</h2>
        <p>Select an orchestra to view instruments with rated positions.</p>
        
        <div className="search-container" style={{ marginTop: 'var(--space-4)', position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Search orchestra..." 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '12px 12px 12px 40px', 
              borderRadius: 'var(--radius-lg)', 
              border: '1px solid var(--border-color)', 
              background: 'var(--bg-secondary)', 
              color: 'var(--text-primary)',
              fontSize: '1rem',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
          />
        </div>
      </div>
      
      {orchestras.length === 0 ? (
        <div className="empty-state glass-panel" style={{ textAlign: 'center', padding: 'var(--space-8)' }}>
          <p>No orchestras found</p>
        </div>
      ) : (
        <div className="grid-list">
          {orchestras.map((orchestra) => (
            <Link to={`/auditions/${country}/${orchestra.id}`} key={orchestra.id} className="grid-card glass-panel transition-all duration-200 ease-in-out hover:-translate-y-1 hover:shadow-xl cursor-pointer">
              <div className="card-content">
                <div>
                  <h3>{orchestra.name}</h3>
                </div>
              </div>
              <ChevronRight className="card-arrow" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrchestrasList;
