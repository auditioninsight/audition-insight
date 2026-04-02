import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Music, Star, Users, ArrowLeft, Info } from 'lucide-react';
import { useReviews } from '../../hooks/useReviews';
import { getAllCountries } from '../../data/orchestras';
import '../Auditions/ListView.css'; 

const StatisticsInstrumentsList: React.FC = () => {
  const { country, orchestra } = useParams<{ country: string, orchestra: string }>();
  const navigate = useNavigate();
  const { verifiedReviews } = useReviews();

  const stats = useMemo(() => {
    if (!country || !orchestra) return null;

    // Fuzzy mapping for database keys 'at' vs route params 'austria'
    const targetCountryObj = getAllCountries().find(c => 
      c.id.toLowerCase() === country?.toLowerCase() || 
      c.code.toLowerCase() === country?.toLowerCase() ||
      c.name.toLowerCase() === country?.toLowerCase()
    );
    const targetCode = targetCountryObj?.code.toLowerCase();
    const targetId = targetCountryObj?.id.toLowerCase();

    // Filter approved reviews for THIS orchestra and THIS country
    const relevantReviews = verifiedReviews.filter(r => {
      const dbCountry = r.country.toLowerCase();
      const matchCountry = dbCountry === targetCode || dbCountry === targetId || dbCountry === country?.toLowerCase();
      return matchCountry && r.orchestra.toLowerCase() === orchestra.toLowerCase();
    });

    const totalApproved = relevantReviews.length;
    if (totalApproved === 0) return { totalApproved: 0, instruments: [] };

    // Group by Instrument (ignoring position)
    const instrumentMap = new Map<string, { count: number; sum: number; yesCount: number; noCount: number }>();

    relevantReviews.forEach(rev => {
      const instrId = rev.instrument ? rev.instrument.toLowerCase() : '';
      const current = instrumentMap.get(instrId) || { count: 0, sum: 0, yesCount: 0, noCount: 0 };
      const revAvg = rev.rating;
      
      instrumentMap.set(instrId, {
        count: current.count + 1,
        sum: current.sum + revAvg,
        yesCount: current.yesCount + (rev.awarded === 'yes' ? 1 : 0),
        noCount: current.noCount + (rev.awarded === 'no' ? 1 : 0)
      });
    });

    const instruments = Array.from(instrumentMap.entries())
      .map(([name, data]) => {
        const totalKnown = data.yesCount + data.noCount;
        return {
          name,
          average: Number((data.sum / data.count).toFixed(2)),
          count: data.count,
          totalKnown,
          yesPercentage: totalKnown > 0 ? Math.round((data.yesCount / totalKnown) * 100) : null,
          noPercentage: totalKnown > 0 ? Math.round((data.noCount / totalKnown) * 100) : null
        };
      })
      .sort((a, b) => b.average - a.average);

    return { totalApproved, instruments };
  }, [country, orchestra, verifiedReviews]);

  return (
    <div className="list-view-container animate-fade-in">
      <div className="breadcrumbs">
        <button onClick={() => navigate(`/statistics/${country}`)} className="back-link" style={{ background: 'none', border: 'none', padding: 0, font: 'inherit', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-muted)' }}>
          <ArrowLeft size={16} /> Back to {country && country.replace('-', ' ')} Orchestras
        </button>
      </div>

      <div className="list-header">
        <h2 style={{textTransform: 'uppercase'}}>{orchestra} Instruments</h2>
        <p>Specific instrument performance metrics for {orchestra && orchestra.toUpperCase()}.</p>
        <div className="info-banner" style={{marginTop: 'var(--space-4)', fontSize: '0.85rem', padding: 'var(--space-3)'}}>
           Only reviews that have been manually verified and approved by the administration are counted in these statistics.
        </div>
      </div>

      {!stats || stats.totalApproved === 0 ? (
        <div className="empty-state glass-panel" style={{textAlign: 'center', padding: 'var(--space-12)'}}>
          <Info className="text-muted" size={48} style={{margin: '0 auto var(--space-4)'}} />
          <h3>No Data Available</h3>
          <p className="text-muted">There are currently no verified audition reviews for {orchestra} instruments.</p>
        </div>
      ) : (
        <div className="grid-list">
          {stats.instruments.map((inst) => (
            <div 
              onClick={() => navigate(`/statistics/${country}/${orchestra}/${inst.name}`)}
              key={inst.name} 
              className="list-card glass-panel transition-all duration-200 ease-in-out hover:-translate-y-1 hover:shadow-xl cursor-pointer"
            >
              <div className="card-content" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', width: '100%', borderBottom: '1px solid var(--border-color)', paddingBottom: 'var(--space-3)' }}>
                  <div className="card-icon" style={{background: 'rgba(37, 99, 235, 0.1)', color: 'var(--accent-gold)'}}>
                    <Music size={24} />
                  </div>
                  <h3 style={{ margin: 0, fontSize: '1.2rem', textTransform: 'capitalize' }}>{inst.name}</h3>
                </div>
                
                <div className="card-text" style={{ width: '100%', marginTop: 'var(--space-4)' }}>
                  {/* Primary Metric: Experience Rating */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Star size={20} fill="#facc15" color="#facc15" /> 
                    <span style={{ fontSize: '1.4rem', fontWeight: 600, color: '#111827' }}>{inst.average.toFixed(1)}</span>
                    <span style={{ fontSize: '0.95rem', color: '#9ca3af', fontWeight: '500' }}>Experience rating</span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', marginBottom: 'var(--space-4)', marginTop: '2px', marginLeft: '28px' }}>
                    Click to know more
                  </div>

                  {/* Secondary Metric: Outcome Highlight */}
                  {inst.yesPercentage !== null ? (
                    <div className="outcome-metrics" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)', marginBottom: 'var(--space-3)', width: '100%', borderTop: '1px solid var(--border-color)', paddingTop: 'var(--space-3)' }}>
                      <div style={{ fontSize: '0.95rem', color: 'var(--success-color, #10b981)', fontWeight: '500' }}>
                        Awarded: {inst.yesPercentage}%
                      </div>
                      <div style={{ fontSize: '0.95rem', color: 'var(--danger-color, #ef4444)', fontWeight: '500' }}>
                        Not awarded: {inst.noPercentage}%
                      </div>
                    </div>
                  ) : (
                    <div style={{ padding: 'var(--space-3) 0', fontStyle: 'italic', color: 'var(--text-muted)', marginBottom: 'var(--space-3)', borderTop: '1px solid var(--border-color)', textAlign: 'center' }}>
                      No data yet
                    </div>
                  )}

                  {/* Tertiary Metric: Review Count */}
                  <div className="text-muted" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
                    <Users size={14} /> Based on {inst.count} verified {inst.count === 1 ? 'audition' : 'auditions'}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StatisticsInstrumentsList;
