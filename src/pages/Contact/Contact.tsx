import React, { useState } from 'react';
import { Send, CheckCircle, Mail, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './Contact.css';

const Contact: React.FC = () => {
  const { user } = useAuth();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message || !subject) return;

    setStatus('submitting');

    try {
      // Async POST target to FormSubmit AJAX endpoint mapping to the target email
      const response = await fetch('https://formsubmit.co/ajax/29969c5194778dea0738fef5d159a6a4', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: subject,
          email: user?.email || 'Unknown User',
          message: message,
          _template: 'box'
        })
      });

      if (response.ok) {
        setStatus('success');
        setSubject('');
        setMessage('');
      } else {
        throw new Error('Failed response from formsubmit');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <div className="contact-container animate-fade-in list-view-container">
      <div className="list-header" style={{ marginBottom: 'var(--space-6)' }}>
        <h2>Contact Support</h2>
        <p>Reach out to the administration for any inquiries, suggestions, or technical support.</p>
      </div>

      <div className="glass-panel" style={{ maxWidth: '600px', margin: '0 auto', padding: 'var(--space-6)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-6)', paddingBottom: 'var(--space-4)', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ padding: '0.75rem', background: 'rgba(37, 99, 235, 0.1)', borderRadius: '50%', color: 'var(--accent-blue)' }}>
            <Mail size={24} />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>Direct Email</h3>
            <p style={{ margin: 0, color: 'var(--text-muted)' }}>auditioninsightapp@gmail.com</p>
          </div>
        </div>

        {status === 'success' ? (
          <div style={{ textAlign: 'center', padding: 'var(--space-8) 0' }} className="animate-fade-in">
            <CheckCircle size={56} style={{ color: 'var(--success-color, #10b981)', margin: '0 auto var(--space-4)' }} />
            <h3 style={{ marginBottom: 'var(--space-2)' }}>Message Sent Successfully</h3>
            <p className="text-muted">Thank you for reaching out! The administration has received your message and will review it shortly. Remember to check the inbox for the very first activation link if this is your first time testing.</p>
            <button 
              className="btn btn-outline" 
              onClick={() => setStatus('idle')}
              style={{ marginTop: 'var(--space-6)' }}
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div className="input-group">
              <label>Your Contact Email</label>
              <input 
                type="email" 
                value={user?.email || ''} 
                className="input-field" 
                disabled 
                style={{ backgroundColor: 'var(--bg-tertiary)', cursor: 'not-allowed' }}
              />
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                Responses will be routed back to your verified account email.
              </span>
            </div>

            <div className="input-group">
              <label>Subject</label>
              <input 
                type="text" 
                className="input-field" 
                placeholder="What is your message about?"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                maxLength={100}
              />
            </div>

            <div className="input-group">
              <label>Message</label>
              <textarea 
                className="input-field" 
                rows={6}
                placeholder="Write your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                style={{ resize: 'vertical', minHeight: '120px' }}
              />
            </div>

            {status === 'error' && (
              <div style={{ padding: 'var(--space-3)', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <AlertCircle size={18} />
                <span style={{ fontSize: '0.9rem' }}>Something went wrong while sending. Please try again or email us directly.</span>
              </div>
            )}

            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ padding: 'var(--space-3)', marginTop: 'var(--space-2)', display: 'flex', justifyContent: 'center', gap: 'var(--space-2)' }}
              disabled={status === 'submitting'}
            >
              {status === 'submitting' ? (
                <>Sending...</>
              ) : (
                <>
                  <Send size={18} /> Send Message
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Contact;
