import React, { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Building2, Star, Users, ArrowLeft, ChevronRight, Info } from 'lucide-react';
import { dbMockReviews, getReviewOverallAverage } from '../../data/mockReviews';
import { getOrchestrasByCountry, getCountryNameByCode } from '../../data/orchestras';
import '../Auditions/ListView.css'; 

const StatisticsOrchestrasList: React.FC = () => {
  const { country } = useParams<{ country: string }>();

  const countryName = getCountryNameByCode(country || '');

  const stats = useMemo(() => {
    if (!country) return null;

    // Filter approved reviews for THIS country
    const relevantReviews = dbMockReviews.filter(r => 
      r.status === 'approved' && 
      r.country.toLowerCase() === country.toLowerCase()
    );

    const totalApproved = relevantReviews.length;

    // Group by Orchestra (ignoring instrument/position)
    const orchestraMap = new Map<string, { count: number; sum: number }>();

    relevantReviews.forEach(rev => {
      const current = orchestraMap.get(rev.orchestra_id) || { count: 0, sum: 0 };
      const revAvg = getReviewOverallAverage(rev);
      
      orchestraMap.set(rev.orchestra_id, {
        count: current.count + 1,
        sum: current.sum + revAvg
      });
    });

    const dbOrchs = getOrchestrasByCountry(country);
    const orchestras = dbOrchs.map(orch => {
      const data = orchestraMap.get(orch.id) || { count: 0, sum: 0 };
      return {
        id: orch.id,
        name: orch.name,
        average: data.count > 0 ? Number((data.sum / data.count).toFixed(2)) : 0,
        count: data.count
      };
    }).sort((a, b) => {
      if (b.count !== a.count) return b.count - a.count;
      if (b.average !== a.average) return b.average - a.average;
      return a.name.localeCompare(b.name);
    });

    return { totalApproved, orchestras };
  }, [country]);

  return (
    <div className="list-view-container animate-fade-in">
      <div className="breadcrumbs">
        <Link to="/statistics" className="back-link">
          <ArrowLeft size={16} /> Back to Global Statistics
        </Link>
      </div>

      <div className="list-header">
        <h2 style={{textTransform: 'capitalize'}}>{countryName} Orchestras</h2>
        <p>Comparison of top-tier orchestras within this region based on verified audition experiences.</p>
        <div className="info-banner" style={{marginTop: 'var(--space-4)', fontSize: '0.85rem', padding: 'var(--space-3)'}}>
           Only reviews that have been manually verified and approved by the administration are counted in these statistics.
        </div>
      </div>

      {!stats || stats.orchestras.length === 0 ? (
        <div className="empty-state glass-panel" style={{textAlign: 'center', padding: 'var(--space-12)'}}>
          <Info className="text-muted" size={48} style={{margin: '0 auto var(--space-4)'}} />
          <h3>No Orchestras Available</h3>
          <p className="text-muted">There are currently no orchestras listed in this country.</p>
        </div>
      ) : (
        <div className="grid-list">
          {stats.orchestras.map((orch) => (
            <Link 
              key={orch.id} 
              to={`/statistics/${country}/${orch.id}`}
              className="list-card glass-panel transition-all duration-200 ease-in-out hover:-translate-y-1 hover:shadow-xl cursor-pointer"
            >
              <div className="card-content">
                <div className="card-icon" style={{background: 'rgba(37, 99, 235, 0.1)', color: 'var(--accent-gold)'}}>
                  <Building2 size={24} />
                </div>
                <div className="card-text">
                  <h3>{orch.name}</h3>
                  <div className="meta-info" style={{display: 'flex', flexDirection: 'column', gap: 'var(--space-1)', marginTop: 'var(--space-2)'}}>
                    {orch.count > 0 ? (
                      <>
                        <span style={{display: 'flex', alignItems: 'center', gap: '6px', fontSize: '1.2rem', fontWeight: 600, color: '#111827'}}>
                          <Star size={18} fill="#facc15" color="#facc15" /> {orch.average.toFixed(1)} <span style={{fontSize: '0.85rem', fontWeight: 'normal', color: '#9ca3af'}}>Overall Score</span>
                        </span>
                        <span style={{display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', color: 'var(--text-muted)'}}>
                          <Users size={14} /> {orch.count} verified reviews
                        </span>
                      </>
                    ) : (
                      <div style={{ fontStyle: 'italic', color: 'var(--text-muted)', textAlign: 'center', fontSize: '0.9rem', padding: 'var(--space-2) 0' }}>
                        No data yet
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <ChevronRight className="card-arrow text-muted" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default StatisticsOrchestrasList;
