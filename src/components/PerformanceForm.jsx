import { useState, useEffect } from 'react';

const PerformanceForm = ({ item, onSave, onCancel, imagePool }) => {
  const [performance, setPerformance] = useState({
    day: '',
    month: '',
    year: '',
    title: '',
    time: '',
    location: '',
    description: '',
    tags: [],
    media: [], // For images or videos associated with the performance
  });

  useEffect(() => {
    if (item) {
      // If we are editing, populate the form with the item's data
      setPerformance({
        ...item,
        tags: Array.isArray(item.tags) ? item.tags.join(', ') : '', // Convert array to string for editing
        media: item.media || [],
      });
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPerformance(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...performance,
      tags: performance.tags.split(',').map(tag => tag.trim()), // Convert string back to array
    });
  };

  const handleMediaToggle = (url) => {
    const updatedMedia = performance.media.includes(url)
        ? performance.media.filter(mediaUrl => mediaUrl !== url)
        : [...performance.media, url];
    setPerformance(prev => ({...prev, media: updatedMedia}));
  };

  return (
    <div className="modal-overlay active">
      <div className="modal-content admin-form-modal">
        <button type="button" onClick={onCancel} className="modal-close-btn">&times;</button>
        <form onSubmit={handleSubmit}>
          <h3>{item ? 'Edit Performance' : 'Add New Performance'}</h3>
          
          <div className="form-field">
            <label>Title</label>
            <input name="title" value={performance.title} onChange={handleChange} placeholder="e.g., Spring Jazz Concert" required />
          </div>

          <div className="form-row">
            <div className="form-field">
              <label>Day (DD)</label>
              <input name="day" value={performance.day} onChange={handleChange} placeholder="15" required />
            </div>
            <div className="form-field">
              <label>Month (MMM)</label>
              <input name="month" value={performance.month} onChange={handleChange} placeholder="JUL" required />
            </div>
            <div className="form-field">
              <label>Year (YYYY)</label>
              <input name="year" value={performance.year} onChange={handleChange} placeholder="2025" required />
            </div>
          </div>
          
          <div className="form-field">
            <label>Time</label>
            <input name="time" value={performance.time} onChange={handleChange} placeholder="7:00 PM - 9:00 PM" />
          </div>

          <div className="form-field">
            <label>Location</label>
            <input name="location" value={performance.location} onChange={handleChange} placeholder="DVHS Auditorium" />
          </div>

          <div className="form-field">
            <label>Description</label>
            <textarea name="description" value={performance.description} onChange={handleChange} rows="4"></textarea>
          </div>

          <div className="form-field">
            <label>Tags (comma-separated)</label>
            <input name="tags" value={performance.tags} onChange={handleChange} placeholder="Major Event, All Welcome" />
          </div>

          <div className="form-field">
            <h4>Performance Images</h4>
            <p>Select images from your library to associate with this performance.</p>
            <div className="image-selection-grid">
                {(imagePool || []).map((image, index) => (
                    <div 
                        key={index}
                        className={`image-selection-item ${performance.media.includes(image.url) ? 'selected' : ''}`}
                        onClick={() => handleMediaToggle(image.url)}
                    >
                        <div className="image-name-overlay">{image.name}</div>
                        <input 
                            type="checkbox"
                            readOnly
                            checked={performance.media.includes(image.url)}
                        />
                    </div>
                ))}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={onCancel} className="btn btn-secondary btn-light-bg">Cancel</button>
            <button type="submit" className="btn btn-primary">Save Performance</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PerformanceForm; 