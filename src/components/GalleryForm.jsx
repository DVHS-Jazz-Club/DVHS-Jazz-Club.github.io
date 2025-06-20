import { useState, useEffect } from 'react';

const GalleryForm = ({ item, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        type: 'image',
        category: '',
        url: '',
        embedUrl: '',
        title: '',
        performance: '',
        year: new Date().getFullYear(),
    });

    useEffect(() => {
        if (item) {
            setFormData({
                type: item.type || 'image',
                category: item.category || '',
                url: item.url || '',
                embedUrl: item.embedUrl || '',
                title: item.title || '',
                performance: item.performance || '',
                year: item.year || new Date().getFullYear(),
            });
        }
    }, [item]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        const finalData = { ...formData };
        if (finalData.type === 'image') {
            delete finalData.embedUrl;
        } else {
            finalData.url = finalData.embedUrl; // For videos, the main URL is the embed URL
            delete finalData.embedUrl;
        }
        onSave(finalData);
    };

    return (
        <div className="modal-overlay active">
            <div className="modal-content admin-form-modal">
                <h2>{item ? 'Edit' : 'Add'} Gallery Item</h2>
                <form onSubmit={handleSave}>
                    {/* Form fields will be added here in the next step */}
                    <div className="form-field">
                        <label>Type</label>
                        <select name="type" value={formData.type} onChange={handleChange}>
                            <option value="image">Image</option>
                            <option value="video">Video</option>
                        </select>
                    </div>
                    
                    {formData.type === 'image' ? (
                        <div className="form-field">
                            <label>Image URL</label>
                            <input type="text" name="url" value={formData.url} onChange={handleChange} placeholder="https://example.com/image.jpg" required />
                        </div>
                    ) : (
                        <div className="form-field">
                            <label>Video Embed URL</label>
                            <input type="text" name="embedUrl" value={formData.embedUrl} onChange={handleChange} placeholder="https://youtube.com/embed/..." required />
                        </div>
                    )}
                    
                    <div className="form-field">
                        <label>Title</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="e.g., Spring Concert Photo" required />
                    </div>

                    <div className="form-field">
                        <label>Category</label>
                        <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="e.g., performances, members" />
                    </div>

                    <div className="form-field">
                        <label>Associated Performance (optional)</label>
                        <input type="text" name="performance" value={formData.performance} onChange={handleChange} placeholder="e.g., Winter Arts Festival" />
                    </div>

                    <div className="form-field">
                        <label>Year</label>
                        <input type="number" name="year" value={formData.year} onChange={handleChange} />
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn btn-primary">Save</button>
                        <button type="button" className="btn" onClick={onCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default GalleryForm; 