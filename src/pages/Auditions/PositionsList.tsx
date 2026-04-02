import React, { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import './ListView.css';

import { instrumentData } from '../../data/instruments';

const PositionsList: React.FC = () => {
  const { country, orchestra, instrument } = useParams<{ country: string, orchestra: string, instrument: string }>();

  const currentInstrument = useMemo(() => {
    return instrumentData.find(i => i.id === instrument);
  }, [instrument]);

  const positions = currentInstrument ? currentInstrument.positions : [];

  return (
    <div className="list-view-container animate-fade-in">
      <div className="breadcrumbs">
        <Link to={`/auditions/${country}/${orchestra}`} className="breadcrumb-back">
          <ArrowLeft size={16} /> Back to Instruments
        </Link>
      </div>

      <div className="list-header">
        <h2>{(currentInstrument && currentInstrument.name) || instrument} Positions ({orchestra})</h2>
        <p>Specific positions for this instrument. Select one to view detailed ratings or submit a new review.</p>
      </div>
      
      <div className="grid-list">
        {positions.map((pos) => (
          <Link to={`/auditions/${country}/${orchestra}/${instrument}/${pos.id}`} key={pos.id} className="grid-card glass-panel transition-all duration-200 ease-in-out hover:-translate-y-1 hover:shadow-xl cursor-pointer">
            <div className="card-content position-card-content">
              <div>
                <h3>{pos.name}</h3>
              </div>
            </div>
            <ChevronRight className="card-arrow" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PositionsList;
