import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import './ListView.css';

import { instrumentData } from '../../data/instruments';

const InstrumentsList: React.FC = () => {
  const { country, orchestra } = useParams<{ country: string, orchestra: string }>();

  return (
    <div className="list-view-container animate-fade-in">
      <div className="breadcrumbs">
        <Link to={`/auditions/${country}`} className="breadcrumb-back">
          <ArrowLeft size={16} /> Back to Orchestras
        </Link>
      </div>

      <div className="list-header">
        <h2>Instruments ({orchestra})</h2>
        <p>Select an instrument family to see specific positions.</p>
      </div>
      
      <div className="grid-list">
        {instrumentData.map((inst) => (
          <Link to={`/auditions/${country}/${orchestra}/${inst.id}`} key={inst.id} className="grid-card glass-panel transition-all duration-200 ease-in-out hover:-translate-y-1 hover:shadow-xl cursor-pointer">
            <div className="card-content">
              <div>
                <h3>{inst.name}</h3>
                {inst.positions.length > 0 ? (
                  <span className="card-meta">{inst.positions.length} Positions</span>
                ) : (
                  <span className="card-meta" style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>No data yet</span>
                )}
              </div>
            </div>
            <ChevronRight className="card-arrow" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default InstrumentsList;
