import { useState, useEffect } from 'react';
import GalleryForm from './GalleryForm';

const Admin = () => {
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState('');
    
    // State for the form modal
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editingItem, setEditingItem] = useState(null); // This will be an object or null
    const [editingIndex, setEditingIndex] = useState(null); // To know which item to replace

    const correctPassword = 'jazzisawesome';

    useEffect(() => {
        if (isAuthenticated) {
            fetch('/data.json')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to load data.json. Check if the file exists in the public directory.');
                    }
                    return response.json();
                })
                .then(jsonData => setData(jsonData))
                .catch(err => setError(err.message));
        }
    }, [isAuthenticated]);

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === correctPassword) {
            setIsAuthenticated(true);
            setError('');
        } else {
            setError('Incorrect password.');
        }
    };
    
    const handleAddNew = () => {
        setEditingItem({}); // Empty object for a new item
        setEditingIndex(null);
        setIsFormVisible(true);
    };

    const handleEdit = (item, index) => {
        setEditingItem(item);
        setEditingIndex(index);
        setIsFormVisible(true);
    };

    const handleDelete = (indexToDelete) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            const updatedGallery = data.gallery.filter((_, index) => index !== indexToDelete);
            setData(prevData => ({ ...prevData, gallery: updatedGallery }));
        }
    };

    const handleSaveForm = (newItem) => {
        let updatedGallery;
        if (editingIndex !== null) {
            // Editing existing item
            updatedGallery = [...data.gallery];
            updatedGallery[editingIndex] = newItem;
        } else {
            // Adding new item
            updatedGallery = [...data.gallery, newItem];
        }
        setData(prevData => ({ ...prevData, gallery: updatedGallery }));
        setIsFormVisible(false);
        setEditingItem(null);
        setEditingIndex(null);
    };

    const handleCopyToClipboard = () => {
        const jsonString = JSON.stringify(data, null, 2);
        navigator.clipboard.writeText(jsonString)
            .then(() => alert("JSON data copied to clipboard!"))
            .catch(() => alert("Failed to copy data. Please copy it manually."));
    };

    if (!isAuthenticated) {
        return (
            <div className="admin-login-container">
                <form onSubmit={handleLogin}>
                    <h2>Admin Panel</h2>
                    <input
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder="Enter password"
                    />
                    <button type="submit">Login</button>
                    {error && <p className="error-message">{error}</p>}
                </form>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="admin-panel-container">
                <h2>Admin Panel</h2>
                {error ? <p className="error-message">{error}</p> : <p>Loading data...</p>}
            </div>
        );
    }

    return (
        <>
            <div className="admin-panel-container">
                <h2>Admin Panel</h2>
                <p>Welcome! Manage your website content below.</p>

                <div className="admin-section">
                    <h3>Gallery Management</h3>
                    <div className="gallery-item-list">
                        {data.gallery.map((item, index) => (
                            <div key={index} className="gallery-item-admin">
                                <span className="gallery-item-title">{item.title || "Untitled"} ({item.type})</span>
                                <div className="gallery-item-actions">
                                    <button onClick={() => handleEdit(item, index)} className="btn-small">Edit</button>
                                    <button onClick={() => handleDelete(index)} className="btn-small btn-danger">Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button onClick={handleAddNew} className="btn btn-primary">Add New Gallery Item</button>
                </div>
                
                <div className="admin-section">
                    <h3>Save Your Changes</h3>
                    <p>After making changes, click here to copy the updated data. Then, paste it into the <strong>public/data.json</strong> file in your project.</p>
                    <textarea
                        value={JSON.stringify(data, null, 2)}
                        readOnly
                        rows="30"
                    />
                    <button onClick={handleCopyToClipboard}>Copy Updated JSON</button>
                </div>
            </div>
            {isFormVisible && (
                <GalleryForm
                    item={editingItem}
                    onSave={handleSaveForm}
                    onCancel={() => setIsFormVisible(false)}
                />
            )}
        </>
    );
};

export default Admin; 