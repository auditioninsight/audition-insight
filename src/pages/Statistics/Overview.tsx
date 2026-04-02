import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Users, Map as MapIcon, ChevronRight, Star } from 'lucide-react';
import { useReviews } from '../../hooks/useReviews';
import { getAllCountries } from '../../data/orchestras';
import '../Auditions/ListView.css'; 
import './Overview.css';

const Overview: React.FC = () => {
  const { verifiedReviews } = useReviews();

  // Aggregate Advanced Statistics efficiently using useMemo and enforcing manual verification rules
  const stats = useMemo(() => {
    // Phase 3 Core Rule: ONLY INCLUDE APPROVED REVIEWS
    const totalApproved = verifiedReviews.length;

    // 3. Country-Level Aggregation
    const countryMap = new Map<string, { count: number; sum: number }>();

    verifiedReviews.forEach(rev => {
      const countryId = rev.country ? rev.country.toLowerCase() : '';
      const current = countryMap.get(countryId) || { count: 0, sum: 0 };
      const revAvg = rev.rating;
      
      countryMap.set(countryId, {
        count: current.count + 1,
        sum: current.sum + revAvg
      });
    });

    const allCountries = getAllCountries();
    const rankedCountries = allCountries.map(country => {
      const dbCode = country.code.toLowerCase();
      const dbId = country.id.toLowerCase();
      const data = countryMap.get(dbCode) || countryMap.get(dbId) || { count: 0, sum: 0 };
      return {
        id: country.id,
        name: country.name,
        average: data.count > 0 ? Number((data.sum / data.count).toFixed(2)) : 0,
        count: data.count
      };
    }).sort((a, b) => {
      if (b.count !== a.count) return b.count - a.count;
      if (b.average !== a.average) return b.average - a.average;
      return a.name.localeCompare(b.name);
    });

    return {
      totalApproved,
      rankedCountries
    };
  }, [verifiedReviews]);

  return (
    <div className="list-view-container animate-fade-in">
      <div className="list-header">
        <h2>Regional Statistics</h2>
        <p>Explore aggregated audition experiences organized hierarchically by Country, Orchestra, and Instrument.</p>
        <div className="info-banner" style={{marginTop: 'var(--space-4)', fontSize: '0.85rem', padding: 'var(--space-3)'}}>
           Data integrity is paramount. All statistics below are derived <strong>strictly from manually verified and approved</strong> audition reviews.
        </div>
      </div>
      
      <div className="stats-grid" style={{gridTemplateColumns: 'minmax(300px, 1fr)'}}>
        <div className="stat-card glass-panel transition-all duration-200 ease-in-out hover:-translate-y-1 hover:shadow-xl cursor-pointer" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'}}>
          <div className="stat-header" style={{justifyContent: 'center', marginBottom: 'var(--space-2)'}}>
            <Users className="stat-icon" />
            <h3 style={{fontSize: '1.2rem'}}>Total Verified Reviews</h3>
          </div>
          <div className="stat-value" style={{fontSize: '3rem', color: 'var(--accent-gold)'}}>{stats.totalApproved}</div>
        </div>
      </div>

      <div className="country-exploration-section glass-panel" style={{marginBottom: 'var(--space-8)'}}>
        <div className="ranking-header">
          <MapIcon className="text-gold" size={24} />
          <h3>Countries</h3>
        </div>
        <p className="ranking-subtitle">Begin your search by selecting a country.</p>
        
        <div className="country-grid">
          {stats.rankedCountries && stats.rankedCountries.map(country => (
            <Link key={country.id} to={`/statistics/${country.id}`} className="country-card glass-panel interactive-card transition-all duration-200 ease-in-out hover:-translate-y-1 hover:shadow-xl cursor-pointer">
              <div className="country-card-content">
                <h4>{country.name}</h4>
                <div className="country-stats">
                  {country.count > 0 ? (
                    <>
                      <div className="stat-pill">
                        <Star size={16} fill="#facc15" color="#facc15" style={{marginRight: '4px'}} />
                        <span>{country.average.toFixed(1)}</span>
                      </div>
                      <div className="stat-pill text-muted">
                        <Users size={14} style={{marginRight: '4px'}} />
                        <span>{country.count} verified reviews</span>
                      </div>
                    </>
                  ) : (
                    <div style={{ width: '100%', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem', fontStyle: 'italic', padding: 'var(--space-1) 0' }}>
                      No data yet
                    </div>
                  )}
                </div>
              </div>
              <ChevronRight className="chevron-icon text-muted" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Overview;
