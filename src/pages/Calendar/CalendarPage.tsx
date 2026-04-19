import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, X, Trash2, MapPin } from 'lucide-react';
import { usePersonalAuditions } from '../../hooks/usePersonalAuditions';
import { useAuth } from '../../context/AuthContext';
import './CalendarPage.css';

const MOCK_ORCHESTRAS = [
  'Berlin Philharmonic',
  'Vienna Philharmonic',
  'London Symphony Orchestra',
  'Chicago Symphony Orchestra',
  'Royal Concertgebouw',
  'Bavarian Radio Symphony'
];

const CalendarPage: React.FC = () => {
  const { user } = useAuth();
  const { auditions, addAudition, removeAudition } = usePersonalAuditions();
  
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
  // Form state
  const [title, setTitle] = useState('');
  const [orchestra, setOrchestra] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calendar logic
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  // Adjust so Monday is the first day of the week (0)
  const startDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; 

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    setSelectedDate(null);
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    setSelectedDate(null);
  };

  const handleDayClick = (day: number) => {
    const newSelectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(newSelectedDate);
    setTitle('');
    setOrchestra('');
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !title || !orchestra) return;

    setIsSubmitting(true);
    // Format YYYY-MM-DD
    const localDateStr = new Date(selectedDate.getTime() - (selectedDate.getTimezoneOffset() * 60000))
      .toISOString()
      .split('T')[0];
      
    await addAudition(localDateStr, title, orchestra);
    setIsSubmitting(false);
    setTitle('');
    setOrchestra('');
  };

  // Get events for selected date
  const selectedDateEvents = useMemo(() => {
    if (!selectedDate) return [];
    const localStr = new Date(selectedDate.getTime() - (selectedDate.getTimezoneOffset() * 60000))
      .toISOString()
      .split('T')[0];
    return auditions.filter(a => a.date === localStr);
  }, [selectedDate, auditions]);

  if (!user) {
    return (
      <div className="page-container flex-center">
        <p className="text-muted">You must be logged in to view your calendar.</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">My Calendar</h1>
          <p className="page-subtitle">Manage your upcoming auditions and travel dates.</p>
        </div>
      </div>

      <div className="calendar-page-layout">
        <div className="calendar-main-view glass-panel">
          <div className="calendar-header-large">
            <h2>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
            <div className="calendar-nav-large">
              <button className="nav-btn-large" onClick={handlePrevMonth}><ChevronLeft size={24} /></button>
              <button className="nav-btn-large" onClick={handleNextMonth}><ChevronRight size={24} /></button>
            </div>
          </div>

          <div className="calendar-grid-large">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
              <div key={day} className="calendar-day-header-large">{day}</div>
            ))}
            
            {/* Empty slots before first day */}
            {Array.from({ length: startDay }).map((_, i) => (
              <div key={`empty-${i}`} className="calendar-day-large empty" />
            ))}
            
            {/* Days of the month */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const dayNum = i + 1;
              const thisDateStr = new Date(currentDate.getFullYear(), currentDate.getMonth(), dayNum, 12)
                .toISOString()
                .split('T')[0];
              
              const dayEvents = auditions.filter(a => a.date === thisDateStr);
              const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), dayNum).toDateString();
              const isSelected = selectedDate && selectedDate.getDate() === dayNum && selectedDate.getMonth() === currentDate.getMonth();

              return (
                <div 
                  key={dayNum} 
                  className={`calendar-day-large ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleDayClick(dayNum)}
                >
                  <span className="day-number">{dayNum}</span>
                  <div className="day-events-container">
                    {dayEvents.slice(0, 3).map(event => (
                      <div key={event.id} className="mini-event-pill">
                        {event.orchestra}
                      </div>
                    ))}
                    {dayEvents.length > 3 && (
                      <div className="mini-event-pill more">+{dayEvents.length - 3} more</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {selectedDate && (
          <div className="calendar-inspector glass-panel animate-fade-in">
            <div className="inspector-header">
              <h3>{selectedDate.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</h3>
              <button className="close-inspector-btn" onClick={() => setSelectedDate(null)}><X size={20} /></button>
            </div>

            {selectedDateEvents.length > 0 ? (
              <div className="inspector-events">
                {selectedDateEvents.map(event => (
                  <div key={event.id} className="inspector-event-card">
                    <div className="event-primary-info">
                      <h4>{event.title}</h4>
                      <p><MapPin size={14} className="inline-icon"/> {event.orchestra}</p>
                    </div>
                    <button 
                      className="delete-event-btn" 
                      onClick={() => removeAudition(event.id)}
                      title="Remove Audition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state-micro">
                <p>No auditions scheduled for this day.</p>
              </div>
            )}

            <div className="add-event-section">
              <h4>Add New Audition</h4>
              <form className="add-event-form" onSubmit={handleAddSubmit}>
                <div className="form-group">
                  <label>Description</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 1st Round Cello" 
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Orchestra</label>
                  <input 
                    type="text" 
                    placeholder="e.g. London Symphony" 
                    value={orchestra}
                    onChange={e => setOrchestra(e.target.value)}
                    list="orchestra-suggestions"
                    required
                  />
                  <datalist id="orchestra-suggestions">
                    {MOCK_ORCHESTRAS.map(o => <option key={o} value={o} />)}
                  </datalist>
                </div>
                <button type="submit" className="btn-primary w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : 'Add to Calendar'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarPage;
