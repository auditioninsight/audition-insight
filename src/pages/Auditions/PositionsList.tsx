import React, { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, BarChart2, ChevronRight } from 'lucide-react';
import { dbMockReviews, getReviewOverallAverage } from '../../data/mockReviews';
import './ListView.css';

import { instrumentData } from '../../data/instruments';

const PositionsList: React.FC = () => {
  const { country, orchestra, instrument } = useParams<{ country: string, orchestra: string, instrument: string }>();

  const currentInstrument = useMemo(() => {
    return instrumentData.find(i => i.id === instrument);
  }, [instrument]);

  const positions = currentInstrument ? currentInstrument.positions : [];

  // Phase 3: Instrument Summary Aggregation
  const instrumentStats = useMemo(() => {
    if (!orchestra || !instrument) return null;

    // Filter approved reviews for THIS orchestra and THIS instrument (ignoring position)
    const relevantReviews = dbMockReviews.filter(r => 
      r.status === 'approved' && 
      r.orchestra_id === orchestra && 
      r.instrument === instrument
    );

    const totalApproved = relevantReviews.length;
    if (totalApproved === 0) return { totalApproved: 0 };

    // Calculate overall average
    const globalSum = relevantReviews.reduce((sum, rev) => sum + getReviewOverallAverage(rev), 0);
    const overallAverage = globalSum / totalApproved;

    // Calculate category specific averages
    const categoryTotals = relevantReviews.reduce((acc, rev) => {
      acc.punctuality += rev.ratings.punctuality;
      acc.respect += rev.ratings.respect;
      acc.transparency += rev.ratings.communicationOfResults;
      if (rev.ratings.feedbackQuality) {
        acc.feedbackSum += rev.ratings.feedbackQuality;
        acc.feedbackCount += 1;
      }
      return acc;
    }, { punctuality: 0, respect: 0, transparency: 0, feedbackSum: 0, feedbackCount: 0 });

    // Phase 7.2: Outcome Metrics
    const knownOutcomeReviews = relevantReviews.filter(r => r.outcome === 'yes' || r.outcome === 'no');
    const totalKnown = knownOutcomeReviews.length;
    const yesCount = knownOutcomeReviews.filter(r => r.outcome === 'yes').length;
    const noCount = knownOutcomeReviews.filter(r => r.outcome === 'no').length;

    const outcomeStats = totalKnown > 0 ? {
      yesPercentage: Math.round((yesCount / totalKnown) * 100),
      noPercentage: Math.round((noCount / totalKnown) * 100),
      totalKnown
    } : null;

    return {
      totalApproved,
      overallAverage: overallAverage.toFixed(1),
      outcomeStats,
      categories: {
        organization: (categoryTotals.punctuality / totalApproved).toFixed(1),
        treatment: (categoryTotals.respect / totalApproved).toFixed(1),
        transparency: (categoryTotals.transparency / totalApproved).toFixed(1),
        feedback: categoryTotals.feedbackCount > 0 
          ? (categoryTotals.feedbackSum / categoryTotals.feedbackCount).toFixed(1) 
          : 'N/A'
      }
    };
  }, [orchestra, instrument]);

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
        <div className="info-banner" style={{marginTop: 'var(--space-4)', fontSize: '0.85rem', padding: 'var(--space-3)'}}>
           Only reviews that have been manually verified and approved by the administration are counted in these statistics.
        </div>
      </div>

      {instrumentStats && instrumentStats.totalApproved > 0 && (
        <div className="instrument-summary-card glass-panel" style={{marginBottom: 'var(--space-8)'}}>
          <div className="summary-header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-4)', borderBottom: '1px solid var(--border-color)'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 'var(--space-3)'}}>
              <div className="score-badge" style={{background: 'var(--accent-gold)', color: 'var(--bg-primary)', padding: 'var(--space-2) var(--space-4)', borderRadius: 'var(--radius-lg)', fontSize: '1.5rem', fontWeight: 'bold'}}>
                {instrumentStats.overallAverage}
              </div>
              <div>
                <h3 style={{margin: 0}}>{instrument} Summary</h3>
                <span className="text-muted" style={{fontSize: '0.9rem'}}>{instrumentStats.totalApproved} verified reviews across all positions</span>
              </div>
            </div>
            <BarChart2 className="text-gold" size={32} opacity={0.5} />
          </div>
          
          <div className="category-breakdown" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 'var(--space-4)'}}>
            <div className="cat-stat">
              <div className="text-muted" style={{fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Organization</div>
              <div style={{fontSize: '1.2rem', fontWeight: '600'}}>{instrumentStats.categories && instrumentStats.categories.organization} <span className="text-muted" style={{fontSize: '0.8rem'}}>/ 5</span></div>
            </div>
            <div className="cat-stat">
              <div className="text-muted" style={{fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Treatment</div>
              <div style={{fontSize: '1.2rem', fontWeight: '600'}}>{instrumentStats.categories && instrumentStats.categories.treatment} <span className="text-muted" style={{fontSize: '0.8rem'}}>/ 5</span></div>
            </div>
            <div className="cat-stat">
              <div className="text-muted" style={{fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Transparency</div>
              <div style={{fontSize: '1.2rem', fontWeight: '600'}}>{instrumentStats.categories && instrumentStats.categories.transparency} <span className="text-muted" style={{fontSize: '0.8rem'}}>/ 5</span></div>
            </div>
            <div className="cat-stat">
              <div className="text-muted" style={{fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Feedback</div>
              <div style={{fontSize: '1.2rem', fontWeight: '600'}}>{instrumentStats.categories && instrumentStats.categories.feedback} {instrumentStats.categories && instrumentStats.categories.feedback !== 'N/A' && <span className="text-muted" style={{fontSize: '0.8rem'}}>/ 5</span>}</div>
            </div>
          </div>

          <div className="outcome-breakdown animate-fade-in" style={{ marginTop: 'var(--space-6)', paddingTop: 'var(--space-5)', borderTop: '1px solid var(--border-color)' }}>
            <h4 style={{ margin: '0 0 var(--space-4) 0', fontSize: '1.2rem', color: 'var(--text-primary)' }}>Position Outcome Insights</h4>
            {instrumentStats.outcomeStats ? (
              <div className="outcome-insights" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                <div style={{ fontSize: '0.95rem', color: 'var(--success-color, #10b981)', fontWeight: '500' }}>
                  Awarded: {instrumentStats.outcomeStats.yesPercentage}%
                </div>
                <div style={{ fontSize: '0.95rem', color: 'var(--danger-color, #ef4444)', fontWeight: '500' }}>
                  Not awarded: {instrumentStats.outcomeStats.noPercentage}%
                </div>
                <div className="text-muted" style={{ fontSize: '0.85rem', marginTop: 'var(--space-2)' }}>
                  Based on {instrumentStats.outcomeStats.totalKnown} verified {instrumentStats.outcomeStats.totalKnown === 1 ? 'audition' : 'auditions'}
                </div>
              </div>
            ) : (
              <div className="text-muted" style={{ fontSize: '0.9rem', fontStyle: 'italic', textAlign: 'center', padding: 'var(--space-2) 0' }}>No data yet</div>
            )}
          </div>
        </div>
      )}
      
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
