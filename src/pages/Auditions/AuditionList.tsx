import React from 'react';
import { useReviews } from '../../hooks/useReviews';
import { Star, Music, Building2 } from 'lucide-react';
import './ListView.css'; // Reusing existing list styles

const AuditionList: React.FC = () => {
  const { verifiedReviews: reviews, loading } = useReviews();

  return (
    <div className="list-view-container animate-fade-in">
      <div className="list-header" style={{ marginBottom: 'var(--space-6)' }}>
        <h2>Verified Audition Feed</h2>
        <p>A live feed of transparent, verified audition experiences across all instruments and orchestras.</p>
      </div>

      {loading && (
        <div className="empty-state glass-panel" style={{ textAlign: 'center', padding: 'var(--space-8)' }}>
          <h3>Cargando reseñas...</h3>
        </div>
      )}

      {!loading && reviews.length === 0 && (
        <div className="empty-state glass-panel" style={{ textAlign: 'center', padding: 'var(--space-8)' }}>
           <h3>No hay reseñas verificadas aún</h3>
        </div>
      )}

      {!loading && reviews.length > 0 && (
        <div className="feed-list" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {reviews.map((rev) => (
            <div key={rev.id} className="feed-card glass-panel" style={{ padding: 'var(--space-5)', borderRadius: 'var(--radius-lg)' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-color)', paddingBottom: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
                <div>
                  {/* Map orchestra_name to orchestra title */}
                  <h3 style={{ margin: 0, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                    <Building2 size={18} className="text-muted" /> 
                    {rev.orchestra || 'Unknown Orchestra'}
                  </h3>
                  
                  {/* Map instrument to the instrument tag */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginTop: 'var(--space-2)' }}>
                    <span className="instrument-tag" style={{ background: 'var(--accent-blue)', color: 'white', padding: '2px 8px', borderRadius: '12px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Music size={12} /> {rev.instrument || 'Unknown Instrument'}
                    </span>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {new Date(rev.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {/* Map rating to star component */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
                <div style={{ display: 'flex', color: 'var(--accent-gold)' }}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star 
                      key={star} 
                      size={18} 
                      fill={(rev.rating || 0) >= star ? 'currentColor' : 'none'} 
                      color="currentColor" 
                    />
                  ))}
                </div>
                <span style={{ fontWeight: '600' }}>{(rev.rating || 0).toFixed(1)} / 5.0</span>
              </div>

              {/* Map comment to the review text (Fallback to objective data since comment doesn't exist natively) */}
              <div className="review-text" style={{ background: 'var(--bg-secondary)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', fontSize: '0.95rem', color: 'var(--text-primary)', fontStyle: 'italic', lineHeight: '1.5' }}>
                "Audition result: {rev.awarded === 'yes' ? 'Awarded' : 'Not awarded'}. Atmosphere rating: {rev.treatment?.atmosphere || '-'}/5. Punctuality: {rev.organization?.punctuality || '-'}/5."
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AuditionList;
