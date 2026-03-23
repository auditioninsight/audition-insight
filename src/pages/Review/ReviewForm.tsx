import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Star, Info, CheckCircle2, ChevronDown } from 'lucide-react';
import { notifyAdmin } from '../../utils/notifications';
import './ReviewForm.css';
import './VerificationAdditions.css';

const ReviewForm: React.FC = () => {
  const { country, orchestra, instrument, position } = useParams<{ 
    country: string, orchestra: string, instrument: string, position: string 
  }>();

  // New Data Structure State
  const [formData, setFormData] = useState({
    // Organization
    punctuality: 0,
    scheduleDistribution: 0,
    invitationReceived: null as boolean | null,
    invitationTiming: '',
    // Treatment
    respect: 0,
    atmosphere: 0,
    // Transparency
    communicationOfResults: 0,
    tr_screenUsed: null as boolean | null,
    // Feedback
    feedbackGiven: null as boolean | null,
    feedbackQuality: 0,
    feedbackTiming: '',
    // Logistics
    warmUpRoom: null as boolean | null,
    warmUpType: '',
    preStageRoom: null as boolean | null,
    called10MinBefore: null as boolean | null,
    log_screenUsed: null as boolean | null,
    numberOfRounds: 1,
    outcome: '',
    fileProof: null as File | null,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleRating = (field: keyof typeof formData, value: number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleToggle = (field: keyof typeof formData, value: boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSelect = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate linking ratings to composite key for statistics
    const submissionId = `${orchestra}_${instrument}_${position}`;
    console.log("Submitting pending data for:", submissionId, {
      ...formData,
      status: 'pending'
    });
    
    notifyAdmin({
      orchestra: orchestra || 'Unknown',
      instrument: instrument || 'Unknown',
      position: position || 'Unknown',
      createdAt: new Date().toISOString(),
      proofImage: formData.fileProof ? formData.fileProof.name : 'None',
    });

    setSubmitted(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData(prev => ({ ...prev, fileProof: e.target.files![0] }));
    }
  };

  const renderStars = (field: keyof typeof formData) => {
    return (
      <div className="stars-input">
        {[1, 2, 3, 4, 5].map(star => {
          const isActive = ((formData[field] as number) || 0) >= star;
          return (
            <button
              key={star}
              type="button"
              className={`star-btn ${isActive ? 'active' : ''}`}
              onClick={() => handleRating(field, star)}
            >
              <Star fill={isActive ? 'currentColor' : 'none'} size={28} />
            </button>
          );
        })}
      </div>
    );
  };

  const renderToggle = (field: keyof typeof formData) => {
    const value = formData[field] as boolean | null;
    return (
      <div className="toggle-group-small">
        <button
          type="button"
          className={`toggle-btn-small ${value === true ? 'active-yes' : ''}`}
          onClick={() => handleToggle(field, true)}
        >
          Yes
        </button>
        <button
          type="button"
          className={`toggle-btn-small ${value === false ? 'active-no' : ''}`}
          onClick={() => handleToggle(field, false)}
        >
          No
        </button>
      </div>
    );
  };

  if (submitted) {
    return (
      <div className="review-container animate-fade-in success-state">
        <div className="success-card glass-panel">
          <CheckCircle2 size={64} className="success-icon text-gold" />
          <h2>Review Submitted</h2>
          <p>Your review has been submitted. The <strong>administration has been notified</strong>.</p>
          <p className="text-muted" style={{fontSize: '0.9rem'}}>It will be included in the anonymous statistics for <strong>{instrument} • {position} ({orchestra})</strong> once approved.</p>
          <Link to={`/auditions/${country}/${orchestra}/${instrument}`} className="back-btn mt-6">
            <ArrowLeft size={16} /> Return to Positions
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="review-container animate-fade-in">
      <div className="breadcrumbs">
        <Link to={`/auditions/${country}/${orchestra}/${instrument}`} className="breadcrumb-back">
          <ArrowLeft size={16} /> Back to Positions
        </Link>
      </div>

      <div className="review-header">
        <h2>Submit Structured Data</h2>
        <div className="context-badge">
          {orchestra} • {instrument} • {position}
        </div>
        <div className="info-banner">
          <Info size={16} />
          <p>Text comments are disabled. All data points below aggregate into objective statistics for this specific instrument and orchestra.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="review-form glass-panel complex-form">
        
        {/* Organization */}
        <div className="form-section">
          <h3 className="section-title">Organization</h3>
          <div className="form-row">
            <div className="form-label">Punctuality</div>
            {renderStars('punctuality')}
          </div>
          <div className="form-row">
            <div className="form-label">Schedule Distribution</div>
            {renderStars('scheduleDistribution')}
          </div>
          <div className="form-row">
            <div className="form-label">Did you receive an invitation?</div>
            {renderToggle('invitationReceived')}
          </div>
          {formData.invitationReceived && (
            <div className="form-row nested-row animate-fade-in">
              <div className="form-label text-muted">↳ When did you receive the invitation?</div>
              <div className="select-wrapper">
                <select 
                  value={formData.invitationTiming} 
                  onChange={(e) => handleSelect('invitationTiming', e.target.value)}
                  required
                >
                  <option value="" disabled>Select Timing</option>
                  <option value="More than one month before">More than one month before</option>
                  <option value="About one month before">About one month before</option>
                  <option value="Between 2 weeks and 1 month">Between 2 weeks and 1 month</option>
                  <option value="Less than 2 weeks before">Less than 2 weeks before</option>
                </select>
                <ChevronDown className="select-icon" size={16} />
              </div>
            </div>
          )}
        </div>

        {/* Treatment */}
        <div className="form-section">
          <h3 className="section-title">Treatment</h3>
          <div className="form-row">
            <div className="form-label">Respect</div>
            {renderStars('respect')}
          </div>
          <div className="form-row">
            <div className="form-label">Atmosphere</div>
            {renderStars('atmosphere')}
          </div>
        </div>

        {/* Transparency */}
        <div className="form-section">
          <h3 className="section-title">Transparency</h3>
          <div className="form-row">
            <div className="form-label">Communication of Results</div>
            {renderStars('communicationOfResults')}
          </div>
          <div className="form-row">
            <div className="form-label">Screen Used</div>
            {renderToggle('tr_screenUsed')}
          </div>
        </div>

        {/* Feedback */}
        <div className="form-section">
          <h3 className="section-title">Feedback</h3>
          <div className="form-row">
            <div className="form-label">Feedback Given</div>
            {renderToggle('feedbackGiven')}
          </div>
          {formData.feedbackGiven && (
            <>
              <div className="form-row nested-row animate-fade-in">
                <div className="form-label text-muted">↳ When was the feedback given?</div>
                <div className="select-wrapper">
                  <select 
                    value={formData.feedbackTiming} 
                    onChange={(e) => handleSelect('feedbackTiming', e.target.value)}
                    required
                  >
                    <option value="" disabled>Select Timing</option>
                    <option value="After first round">After first round</option>
                    <option value="After second round">After second round</option>
                    <option value="After third round">After third round</option>
                    <option value="By email">By email</option>
                    <option value="After the audition">After the audition</option>
                  </select>
                  <ChevronDown className="select-icon" size={16} />
                </div>
              </div>
              <div className="form-row nested-row animate-fade-in">
                <div className="form-label text-muted">↳ Feedback Quality</div>
                {renderStars('feedbackQuality')}
              </div>
            </>
          )}
        </div>

        {/* Logistics */}
        <div className="form-section">
          <h3 className="section-title">Logistics</h3>
          
          {/* Call Method removed */}
          
          <div className="form-row">
            <div className="form-label">Warm-up Room Provided</div>
            {renderToggle('warmUpRoom')}
          </div>

          <div className="form-row">
            <div className="form-label">Warm-up Type</div>
            <div className="select-wrapper">
              <select 
                value={formData.warmUpType} 
                onChange={(e) => handleSelect('warmUpType', e.target.value)}
                required
              >
                <option value="" disabled>Select Type</option>
                <option value="individual">Individual</option>
                <option value="group">Group</option>
                <option value="none">None</option>
              </select>
              <ChevronDown className="select-icon" size={16} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-label">Pre-stage Room</div>
            {renderToggle('preStageRoom')}
          </div>

          <div className="form-row">
            <div className="form-label">Called 10 Minutes Before</div>
            {renderToggle('called10MinBefore')}
          </div>

          <div className="form-row">
            <div className="form-label">Screen Used (Logistics)</div>
            {renderToggle('log_screenUsed')}
          </div>

          <div className="form-row">
            <div className="form-label">Number of Rounds</div>
            <div className="number-input-wrapper">
              <button 
                type="button" 
                className="number-btn"
                onClick={() => handleRating('numberOfRounds', Math.max(1, formData.numberOfRounds - 1))}
              >-</button>
              <span className="number-display">{formData.numberOfRounds}</span>
              <button 
                type="button" 
                className="number-btn"
                onClick={() => handleRating('numberOfRounds', formData.numberOfRounds + 1)}
              >+</button>
            </div>
          </div>
        </div>

        {/* Outcome */}
        <div className="form-section">
          <h3 className="section-title">Outcome</h3>
          <div className="form-row">
            <div className="form-label">Was the position awarded?</div>
            <div className="select-wrapper">
              <select 
                value={formData.outcome} 
                onChange={(e) => handleSelect('outcome', e.target.value)}
                required
              >
                <option value="" disabled>Select Outcome</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
                <option value="unknown">I don't know</option>
              </select>
              <ChevronDown className="select-icon" size={16} />
            </div>
          </div>
        </div>

        {/* Verification */}
        <div className="form-section">
          <h3 className="section-title">Verification</h3>
          <div className="form-row file-upload-row">
            <div className="form-label">
              Upload audition invitation (required)
              <span className="form-hint" style={{display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)'}}>
                Accepted formats: .pdf, .jpg, .png. This file is strictly for manual verification and will not be displayed publicly.
              </span>
            </div>
            <div className="file-input-wrapper">
              <input 
                type="file" 
                accept=".pdf, image/jpeg, image/png" 
                onChange={handleFileChange}
                required
                className="file-input"
              />
            </div>
          </div>
        </div>

        <div className="form-actions border-top-actions">
          <Link to={`/auditions/${country}/${orchestra}/${instrument}`} className="cancel-btn">
            Cancel
          </Link>
          <button type="submit" className="submit-btn text-gold">
            Submit Objective Data
          </button>
        </div>

      </form>
    </div>
  );
};

export default ReviewForm;
