import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Search } from 'lucide-react';
import './ListView.css';

import { getAllCountries, getAllOrchestras, type OrchestraWithCountry } from '../../data/orchestras';

const CountriesList: React.FC = () => {
  const countries = getAllCountries();
  const [searchQuery, setSearchQuery] = useState('');
  const [allOrchestras, setAllOrchestras] = useState<OrchestraWithCountry[]>([]);

  useEffect(() => {
    setAllOrchestras(getAllOrchestras());
  }, []);

  const filteredOrchestras = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return allOrchestras.filter(orch => orch.name.toLowerCase().includes(query));
  }, [allOrchestras, searchQuery]);

  return (
    <div className="list-view-container animate-fade-in">
      <div className="list-header">
        <h2>Browse by Country</h2>
        <p>Select a region to view available orchestra auditions and ratings, or search globally.</p>

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
      
      {searchQuery.trim() ? (
        filteredOrchestras.length === 0 ? (
          <div className="empty-state glass-panel" style={{ textAlign: 'center', padding: 'var(--space-8)' }}>
            <p>No orchestras found</p>
          </div>
        ) : (
          <div className="grid-list">
            {filteredOrchestras.map((orchestra) => (
              <Link to={`/auditions/${orchestra.countryCode}/${orchestra.id}`} key={orchestra.id} className="grid-card glass-panel transition-all duration-200 ease-in-out hover:-translate-y-1 hover:shadow-xl cursor-pointer">
                <div className="card-content">
                  <div>
                    <h3>{orchestra.name}</h3>
                    <span className="card-meta" style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{orchestra.countryName}</span>
                  </div>
                </div>
                <ChevronRight className="card-arrow" />
              </Link>
            ))}
          </div>
        )
      ) : (
        <div className="grid-list">
          {countries.map((country) => (
            <Link to={`/auditions/${country.code.toLowerCase()}`} key={country.id} className="grid-card glass-panel transition-all duration-200 ease-in-out hover:-translate-y-1 hover:shadow-xl cursor-pointer">
              <div className="card-content">
                <div className="card-icon">{country.code}</div>
                <h3>{country.name}</h3>
              </div>
              <ChevronRight className="card-arrow" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CountriesList;
