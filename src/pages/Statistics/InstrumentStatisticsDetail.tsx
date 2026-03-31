import React, { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Star, ArrowLeft, Info } from 'lucide-react';
import { dbMockReviews, getReviewOverallAverage } from '../../data/mockReviews';

const InstrumentStatisticsDetail: React.FC = () => {
  const { country, orchestra, instrument } = useParams<{ country: string, orchestra: string, instrument: string }>();

  const stats = useMemo(() => {
    if (!country || !orchestra || !instrument) return null;

    // Filter approved reviews for THIS orchestra and instrument
    const relevantReviews = dbMockReviews.filter(r => 
      r.status === 'approved' && 
      r.orchestra_id.toLowerCase() === orchestra.toLowerCase() &&
      r.country.toLowerCase() === country.toLowerCase() &&
      r.instrument.toLowerCase() === instrument.toLowerCase()
    );

    const count = relevantReviews.length;
    if (count === 0) return { count: 0 };

    let totalScore = 0;
    let yesCount = 0;
    let noCount = 0;

    // Aggregations
    const agg = {
      // Organization
      punctuality: { sum: 0 },
      scheduleDistribution: { sum: 0 },
      invitationReceived: { yes: 0, no: 0 },
      invitationTiming: {} as Record<string, number>,
      
      // Treatment
      respect: { sum: 0 },
      atmosphere: { sum: 0 },
      
      // Transparency
      communicationOfResults: { sum: 0 },
      tr_screenUsed: { yes: 0, no: 0 },
      
      // Feedback
      feedbackGiven: { yes: 0, no: 0 },
      feedbackQuality: { sum: 0, count: 0 },
      feedbackTiming: {} as Record<string, number>,
      
      // Logistics
      warmUpRoom: { yes: 0, no: 0 },
      warmUpType: {} as Record<string, number>,
      preStageRoom: { yes: 0, no: 0 },
      called10MinBefore: { yes: 0, no: 0 },
      log_screenUsed: { yes: 0, no: 0 },
      numberOfRounds: { sum: 0 }
    };

    relevantReviews.forEach(rev => {
      totalScore += getReviewOverallAverage(rev);
      
      if (rev.outcome === 'yes') yesCount++;
      if (rev.outcome === 'no') noCount++;

      agg.punctuality.sum += rev.ratings.punctuality;
      agg.scheduleDistribution.sum += rev.ratings.scheduleDistribution;
      
      if (rev.logistics.invitationReceived !== undefined) {
        if (rev.logistics.invitationReceived) agg.invitationReceived.yes++;
        else agg.invitationReceived.no++;
        
        if (rev.logistics.invitationTiming) {
          agg.invitationTiming[rev.logistics.invitationTiming] = (agg.invitationTiming[rev.logistics.invitationTiming] || 0) + 1;
        }
      }

      agg.respect.sum += rev.ratings.respect;
      agg.atmosphere.sum += rev.ratings.atmosphere;

      agg.communicationOfResults.sum += rev.ratings.communicationOfResults;
      if (rev.logistics.screenUsedTransparency !== undefined) {
        if (rev.logistics.screenUsedTransparency) agg.tr_screenUsed.yes++;
        else agg.tr_screenUsed.no++;
      }

      if (rev.logistics.feedbackGiven !== undefined) {
        if (rev.logistics.feedbackGiven) {
          agg.feedbackGiven.yes++;
          if (rev.ratings.feedbackQuality !== null) {
            agg.feedbackQuality.sum += rev.ratings.feedbackQuality;
            agg.feedbackQuality.count++;
          }
          if (rev.logistics.feedbackTiming) {
            agg.feedbackTiming[rev.logistics.feedbackTiming] = (agg.feedbackTiming[rev.logistics.feedbackTiming] || 0) + 1;
          }
        } else {
          agg.feedbackGiven.no++;
        }
      }

      if (rev.logistics.warmUpRoom !== undefined) {
        if (rev.logistics.warmUpRoom) agg.warmUpRoom.yes++; else agg.warmUpRoom.no++;
      }
      if (rev.logistics.warmUpType) {
        agg.warmUpType[rev.logistics.warmUpType] = (agg.warmUpType[rev.logistics.warmUpType] || 0) + 1;
      }
      if (rev.logistics.preStageRoom !== undefined) {
        if (rev.logistics.preStageRoom) agg.preStageRoom.yes++; else agg.preStageRoom.no++;
      }
      if (rev.logistics.called10MinBefore !== undefined) {
        if (rev.logistics.called10MinBefore) agg.called10MinBefore.yes++; else agg.called10MinBefore.no++;
      }
      if (rev.logistics.screenUsedLogistics !== undefined) {
        if (rev.logistics.screenUsedLogistics) agg.log_screenUsed.yes++; else agg.log_screenUsed.no++;
      }
      if (rev.logistics.numberOfRounds) {
        agg.numberOfRounds.sum += rev.logistics.numberOfRounds;
      }
    });

    return {
      count,
      average: Number((totalScore / count).toFixed(2)),
      totalKnown: yesCount + noCount,
      yesPercentage: (yesCount + noCount) > 0 ? Math.round((yesCount / (yesCount + noCount)) * 100) : null,
      noPercentage: (yesCount + noCount) > 0 ? Math.round((noCount / (yesCount + noCount)) * 100) : null,
      detailed: agg
    };

  }, [country, orchestra, instrument]);

  const renderBar = (totalSum: number, count: number, label: string) => {
    if (count === 0) return null;
    const score = totalSum / count;
    const percentage = (score / 5) * 100;
    return (
      <div style={{ marginBottom: 'var(--space-3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-1)', fontSize: '0.95rem' }}>
          <span style={{ fontWeight: 500 }}>{label}</span>
          <span style={{ fontWeight: 600 }}>{score.toFixed(1)}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '100%' }}>
          <div style={{ flex: 1, height: '6px', background: 'var(--border-color)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ width: `${percentage}%`, height: '100%', background: 'var(--accent-gold)', borderRadius: '3px' }} />
          </div>
        </div>
      </div>
    );
  };

  const renderPercentageBar = (yes: number, no: number, label: string) => {
    const total = yes + no;
    if (total === 0) return null;
    const percentage = Math.round((yes / total) * 100);
    return (
      <div style={{ marginBottom: 'var(--space-3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-1)', fontSize: '0.95rem' }}>
          <span style={{ fontWeight: 500 }}>{label}</span>
          <span style={{ fontWeight: 600 }}>{percentage}%</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '100%' }}>
          <div style={{ flex: 1, height: '6px', background: 'var(--border-color)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ width: `${percentage}%`, height: '100%', background: 'var(--accent-gold)', borderRadius: '3px' }} />
          </div>
        </div>
      </div>
    );
  };

  const renderBreakdown = (record: Record<string, number>, label: string) => {
    const entries = Object.entries(record);
    if (entries.length === 0) return null;
    const total = entries.reduce((acc, [_, count]) => acc + count, 0);
    
    return (
      <div style={{ padding: 'var(--space-2) 0', marginBottom: 'var(--space-2)' }}>
        <div style={{ fontSize: '0.95rem', fontWeight: 500, marginBottom: 'var(--space-3)' }}>{label}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          {entries.sort((a,b) => b[1] - a[1]).map(([name, count]) => {
            const pct = Math.round((count / total) * 100);
            return (
              <div key={name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  <span style={{ textTransform: 'capitalize' }}>{name}</span>
                  <span>{pct}%</span>
                </div>
                <div style={{ width: '100%', height: '4px', background: 'var(--border-color)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ width: `${pct}%`, height: '100%', background: 'var(--text-muted)', borderRadius: '2px' }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderAvgNumber = (sum: number, count: number, label: string) => {
    if (count === 0) return null;
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-2) 0', borderBottom: '1px solid var(--border-color)' }}>
        <span style={{ fontSize: '0.95rem' }}>{label}</span>
        <span style={{ fontWeight: 600 }}>{(sum / count).toFixed(1)}</span>
      </div>
    );
  }

  return (
    <div className="list-view-container animate-fade-in">
      <div className="breadcrumbs">
        <Link to={`/statistics/${country}/${orchestra}`} className="back-link">
          <ArrowLeft size={16} /> Back to {orchestra && orchestra.toUpperCase()} Instruments
        </Link>
      </div>

      <div className="list-header" style={{ marginBottom: 'var(--space-6)' }}>
        <h2 style={{textTransform: 'uppercase'}}>{orchestra} • {instrument}</h2>
        <p>Comprehensive overview and detailed insights based on verified reviews.</p>
      </div>

      {!stats || stats.count === 0 ? (
        <div className="empty-state glass-panel" style={{textAlign: 'center', padding: 'var(--space-12)'}}>
          <Info className="text-muted" size={48} style={{margin: '0 auto var(--space-4)'}} />
          <h3>No Data Available</h3>
          <p className="text-muted">There are currently no verified audition reviews for {instrument} in this orchestra.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          {/* Basic Info Card */}
          <div className="glass-panel" style={{ padding: 'var(--space-6)', borderRadius: 'var(--radius-lg)' }}>
            <h3 style={{ marginBottom: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <Star size={20} className="text-gold" /> Overall Experience
            </h3>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: 700, lineHeight: 1 }}>{stats.average?.toFixed(1) || '0.0'}</span>
              <div style={{ display: 'flex', color: 'var(--accent-gold)' }}>
                {[1,2,3,4,5].map(i => (
                  <Star key={i} size={20} fill={(stats.average ?? 0) >= i ? 'currentColor' : 'none'} color="currentColor" />
                ))}
              </div>
            </div>
            
            <p className="text-muted" style={{ marginBottom: 'var(--space-6)' }}>Based on {stats.count} verified {stats.count === 1 ? 'review' : 'reviews'}</p>

            {stats.yesPercentage !== null ? (
              <div style={{ display: 'flex', gap: 'var(--space-6)', borderTop: '1px solid var(--border-color)', paddingTop: 'var(--space-4)' }}>
                <div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: 'var(--space-1)' }}>Awarded</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--success-color, #10b981)' }}>{stats.yesPercentage}%</div>
                </div>
              </div>
            ) : (
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 'var(--space-4)', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                Outcome data not available
              </div>
            )}
          </div>

          {/* Individual Breakdowns */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-6)' }}>
            
            {/* Organization */}
            <div className="glass-panel" style={{ padding: 'var(--space-5)', borderRadius: 'var(--radius-lg)' }}>
              <h4 style={{ marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-color)', color: 'var(--accent-blue)' }}>Organization</h4>
              {renderBar(stats.detailed?.punctuality?.sum ?? 0, stats.count, 'Punctuality')}
              {renderBar(stats.detailed?.scheduleDistribution?.sum ?? 0, stats.count, 'Schedule Distribution')}
              <div style={{ marginTop: 'var(--space-4)' }}>
                {renderPercentageBar(stats.detailed?.invitationReceived?.yes ?? 0, stats.detailed?.invitationReceived?.no ?? 0, 'Invitation Rate')}
                {renderBreakdown(stats.detailed?.invitationTiming ?? {}, 'Invitation Timing')}
              </div>
            </div>

            {/* Treatment */}
            <div className="glass-panel" style={{ padding: 'var(--space-5)', borderRadius: 'var(--radius-lg)' }}>
              <h4 style={{ marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-color)', color: 'var(--accent-blue)' }}>Treatment</h4>
              {renderBar(stats.detailed?.respect?.sum ?? 0, stats.count, 'Respect')}
              {renderBar(stats.detailed?.atmosphere?.sum ?? 0, stats.count, 'Atmosphere')}
            </div>

            {/* Transparency */}
            <div className="glass-panel" style={{ padding: 'var(--space-5)', borderRadius: 'var(--radius-lg)' }}>
              <h4 style={{ marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-color)', color: 'var(--accent-blue)' }}>Transparency</h4>
              {renderBar(stats.detailed?.communicationOfResults?.sum ?? 0, stats.count, 'Communication of Results')}
              <div style={{ marginTop: 'var(--space-4)' }}>
                {renderPercentageBar(stats.detailed?.tr_screenUsed?.yes ?? 0, stats.detailed?.tr_screenUsed?.no ?? 0, 'Blind Audition (Screen)')}
              </div>
            </div>

            {/* Logistics */}
            <div className="glass-panel" style={{ padding: 'var(--space-5)', borderRadius: 'var(--radius-lg)' }}>
              <h4 style={{ marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-color)', color: 'var(--accent-blue)' }}>Logistics</h4>
              {renderPercentageBar(stats.detailed?.warmUpRoom?.yes ?? 0, stats.detailed?.warmUpRoom?.no ?? 0, 'Warm-up Room Provided')}
              {renderBreakdown(stats.detailed?.warmUpType ?? {}, 'Warm-up Type')}
              {renderPercentageBar(stats.detailed?.preStageRoom?.yes ?? 0, stats.detailed?.preStageRoom?.no ?? 0, 'Pre-stage Room')}
              {renderPercentageBar(stats.detailed?.called10MinBefore?.yes ?? 0, stats.detailed?.called10MinBefore?.no ?? 0, 'Called 10 min before playing')}
              {renderPercentageBar(stats.detailed?.log_screenUsed?.yes ?? 0, stats.detailed?.log_screenUsed?.no ?? 0, 'Screen Used (Logistics)')}
              {renderAvgNumber(stats.detailed?.numberOfRounds?.sum ?? 0, stats.count, 'Average Rounds')}
            </div>

            {/* Feedback */}
            <div className="glass-panel" style={{ padding: 'var(--space-5)', borderRadius: 'var(--radius-lg)' }}>
              <h4 style={{ marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-color)', color: 'var(--accent-blue)' }}>Feedback</h4>
              {renderPercentageBar(stats.detailed?.feedbackGiven?.yes ?? 0, stats.detailed?.feedbackGiven?.no ?? 0, 'Feedback Given')}
              {(stats.detailed?.feedbackGiven?.yes ?? 0) > 0 && (
                <div style={{ marginTop: 'var(--space-4)' }}>
                  {renderBreakdown(stats.detailed?.feedbackTiming ?? {}, 'Feedback Timing')}
                  {renderBar(stats.detailed?.feedbackQuality?.sum ?? 0, stats.detailed?.feedbackQuality?.count ?? 0, 'Feedback Quality')}
                </div>
              )}
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default InstrumentStatisticsDetail;
