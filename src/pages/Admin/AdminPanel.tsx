import React, { useState } from 'react';
import { Check, X, FileText } from 'lucide-react';
import type { ReviewStatus } from '../../types';
import { useReviews } from '../../hooks/useReviews';
import { getOrchestraById } from '../../data/orchestras';
import './AdminPanel.css';

const AdminPanel: React.FC = () => {
  const { allReviews, loading, updateReviewVerification } = useReviews();
  const [filter, setFilter] = useState<ReviewStatus | 'all'>('pending');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleStatusChange = async (id: string, newStatus: ReviewStatus) => {
    // Map status into boolean `verified`
    const isVerified = newStatus === 'approved';
    await updateReviewVerification(id, isVerified);
  };

  const reviewsWithStatus = allReviews.map(r => ({
    ...r,
    status: r.verified ? 'approved' as ReviewStatus : 'pending' as ReviewStatus
  }));

  const filteredReviews = reviewsWithStatus.filter(rev => filter === 'all' || rev.status === filter);

  const getStatusBadgeClass = (status: ReviewStatus) => {
    switch(status) {
      case 'approved': return 'badge-success';
      case 'rejected': return 'badge-danger';
      default: return 'badge-warning';
    }
  };

  return (
    <div className="admin-container animate-fade-in">
      <div className="admin-header">
        <div>
          <h2>Administration Center</h2>
          <p>Verify audition proofs to release anonymous statistics into the public dataset.</p>
        </div>
        <div className="filter-group">
          {(['all', 'pending', 'approved', 'rejected'] as const).map(f => (
            <button 
              key={f}
              className={`filter-btn ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
              {f === 'pending' && <span className="count-badge">{reviewsWithStatus.filter(r => r.status === 'pending').length}</span>}
            </button>
          ))}
        </div>
      </div>

      <div className="submissions-list">
        {loading ? (
          <div className="empty-state glass-panel">
            <h3>Loading reviews...</h3>
            <p className="text-muted">Connecting to database</p>
          </div>
        ) : filteredReviews.length === 0 ? (
          <div className="empty-state glass-panel">
            <Check size={48} className="text-muted" />
            <h3>No {filter !== 'all' ? filter : ''} reviews found</h3>
            <p className="text-muted">You're all caught up!</p>
          </div>
        ) : (
          filteredReviews.map(review => (
            <div key={review.id} className="submission-card glass-panel">
              
              <div className="submission-context">
                <div className="card-header">
                  <span className={`status-badge ${getStatusBadgeClass(review.status)}`}>
                    {review.status.toUpperCase()}
                  </span>
                  {review.status === 'pending' && (
                    <span className="new-badge animate-pulse">NEW</span>
                  )}
                  <span className="date-submitted">{new Date(review.created_at).toLocaleDateString()}</span>
                </div>
                {(() => {
                  const orch = getOrchestraById(review.orchestra);
                  return <h3>{(orch && orch.name) || review.orchestra.toUpperCase()}</h3>;
                })()}
                <div className="meta-info">
                  <span className="instrument-tag">{review.instrument}</span>
                  <span className="position-tag">Unknown Position</span>
                </div>
                <div className="submission-id text-muted">ID: {review.id}</div>
                
                {/* Surface Applicant Ratings */}
                <div className="admin-ratings-preview" style={{ marginTop: 'var(--space-4)', padding: 'var(--space-3)', background: 'rgba(255, 255, 255, 0.03)', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 'var(--space-2)' }}>APPLICANT RATINGS</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-2)', fontSize: '0.9rem' }}>
                    <div>Punctuality: <span className="text-gold">{review.organization?.punctuality || '-'}/5</span></div>
                    <div>Respect: <span className="text-gold">{review.treatment?.respect || '-'}/5</span></div>
                    <div>Transparency: <span className="text-gold">{review.transparency?.communicationOfResults || '-'}/5</span></div>
                    <div>Schedules: <span className="text-gold">{review.organization?.timeSchedulesAssigned ? 'Yes' : 'No'}</span></div>
                  </div>
                </div>
              </div>

              <div className="submission-proof">
                <div 
                  className="proof-preview-frame" 
                  onClick={() => setPreviewUrl(`/proof-placeholder.pdf`)}
                  style={{ 
                    width: '100%', 
                    height: '160px', 
                    background: 'var(--bg-primary)', 
                    borderRadius: 'var(--radius-md)', 
                    overflow: 'hidden',
                    border: '1px solid var(--border-color)', 
                    marginBottom: 'var(--space-3)',
                    cursor: 'pointer',
                    transition: 'transform 0.2s, filter 0.2s'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.filter = 'brightness(1.1)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.filter = 'brightness(1)'; }}
                >
                  {true ? (
                    <iframe src={`/proof-placeholder.pdf`} style={{ width: '100%', height: '100%', border: 'none', pointerEvents: 'none' }} title="PDF Preview" />
                  ) : false ? (
                    <img src={`/proof-placeholder.png`} alt="Proof Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                      <FileText size={32} />
                    </div>
                  )}
                </div>
                <div className="proof-box" style={{ background: 'transparent', padding: 0 }}>
                  <div className="proof-details" style={{ flex: 1 }}>
                    <span className="file-name" style={{ fontWeight: '600' }}>proof-placeholder.pdf</span>
                  </div>
                </div>
              </div>

              <div className="submission-actions">
                {review.status === 'pending' ? (
                  <>
                    <button 
                      className="action-btn approve-btn"
                      onClick={() => handleStatusChange(review.id, 'approved')}
                    >
                      <Check size={18} /> Approve
                    </button>
                    <button 
                      className="action-btn reject-btn"
                      onClick={() => handleStatusChange(review.id, 'rejected')}
                    >
                      <X size={18} /> Reject
                    </button>
                  </>
                ) : (
                  <div style={{ width: '100%', textAlign: 'center', padding: 'var(--space-2)' }}>
                    <span className={`status-badge ${getStatusBadgeClass(review.status)}`}>
                      {review.status.toUpperCase()}
                    </span>
                  </div>
                )}
              </div>

            </div>
          ))
        )}
      </div>

      {previewUrl && (
        <div 
          className="proof-modal-overlay" 
          onClick={() => setPreviewUrl(null)}
          style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', 
            background: 'rgba(0,0,0,0.85)', zIndex: 9999, 
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}
        >
          <div 
            className="proof-modal-content animate-fade-in" 
            onClick={e => e.stopPropagation()} 
            style={{ position: 'relative', width: '90%', maxWidth: '1000px', height: '90vh', background: 'var(--bg-primary)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}
          >
            <button 
              onClick={() => setPreviewUrl(null)} 
              style={{ position: 'absolute', top: '16px', right: '16px', color: 'var(--text-primary)', background: 'rgba(0,0,0,0.5)', border: 'none', cursor: 'pointer', borderRadius: '50%', padding: '8px', zIndex: 10 }}
            >
              <X size={24}/>
            </button>
            {previewUrl.match(/\.pdf$/i) ? (
              <iframe src={previewUrl} style={{ width: '100%', height: '100%', border: 'none', background: 'white' }} title="PDF Full Preview" />
            ) : (
              <img src={previewUrl} style={{ width: '100%', height: '100%', objectFit: 'contain' }} alt="Full Proof" />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
