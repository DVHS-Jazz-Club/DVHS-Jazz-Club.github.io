import React, { useState, useEffect, useCallback, useMemo } from 'react';
import '../styles.css';
import PerformanceForm from './PerformanceForm';
import ImageCropModal from './ImageCropModal';

const Admin = () => {
    console.log('Admin component rendering'); // Debug log
    
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [data, setData] = useState(null);
    const [originalData, setOriginalData] = useState(null);
    const [error, setError] = useState('');
    
    // Form modal state
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editingType, setEditingType] = useState(''); // 'upcoming', 'past', or 'hero'

    // State for adding a new hero image
    const [newImageUrl, setNewImageUrl] = useState('');

    // Cropping modal state
    const [isCropModalVisible, setIsCropModalVisible] = useState(false);
    const [selectedImageFile, setSelectedImageFile] = useState(null);
    const [selectedImagePreview, setSelectedImagePreview] = useState(null);

    const correctPassword = 'jazzisawesome';

    useEffect(() => {
        console.log('Admin useEffect running, isAuthenticated:', isAuthenticated); // Debug log
        if (isAuthenticated) {
            fetch('/data.json')
                .then(response => response.json())
                .then(jsonData => {
                    // Ensure the performances object exists with upcoming and past arrays
                    if (!jsonData.performances) jsonData.performances = { upcoming: [], past: [] };
                    if (!jsonData.performances.upcoming) jsonData.performances.upcoming = [];
                    if (!jsonData.performances.past) jsonData.performances.past = [];
                    
                    // Ensure the image management fields exist
                    if (!jsonData.imagePool) jsonData.imagePool = [];
                    if (!jsonData.heroImages) jsonData.heroImages = [];
                    if (!jsonData.aboutImage) jsonData.aboutImage = '';

                    setData(jsonData);
                    setOriginalData(JSON.parse(JSON.stringify(jsonData)));
                })
                .catch(err => setError('Failed to load or parse data.json.'));
        }
    }, [isAuthenticated]);

    const handlePasswordChange = useCallback((e) => setPassword(e.target.value), []);

    const handleLogin = useCallback((e) => {
        e.preventDefault();
        if (password === correctPassword) {
            setIsAuthenticated(true);
            setError('');
        } else {
            setError('Incorrect password.');
        }
    }, [password]);

    // --- Performance Handlers ---
    const handleOpenForm = useCallback((type, item = null, index = null) => {
        setEditingType(type);
        setEditingItem(item);
        setEditingIndex(index);
        setIsFormVisible(true);
    }, []);

    const handleSavePerformance = useCallback((performance) => {
        if (!data || !data.performances) return;
        
        const updatedPerformances = { ...data.performances };

        if (editingIndex !== null) {
            // Editing existing performance
            updatedPerformances[editingType][editingIndex] = performance;
        } else {
            // Adding new performance
            updatedPerformances[editingType].push(performance);
        }

        setData(prevData => ({ ...prevData, performances: updatedPerformances }));
        setIsFormVisible(false);
    }, [data, editingIndex, editingType]);
    
    const handleDeletePerformance = useCallback((index, type) => {
        if (!data || !data.performances) return;
        
        if (window.confirm("Are you sure you want to delete this performance?")) {
            const updatedPerformances = { ...data.performances };
            updatedPerformances[type].splice(index, 1);
            setData(prevData => ({ ...prevData, performances: updatedPerformances }));
        }
    }, [data]);

    // --- Image Upload and Cropping Handlers ---
    const handleImageUpload = useCallback((e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Create a preview URL for the cropping modal
        const previewUrl = URL.createObjectURL(file);
        setSelectedImageFile(file);
        setSelectedImagePreview(previewUrl);
        setIsCropModalVisible(true);
        
        // Reset the file input
        e.target.value = '';
    }, []);

    const handleCropCancel = useCallback(() => {
        setIsCropModalVisible(false);
        setSelectedImageFile(null);
        setSelectedImagePreview(null);
    }, []);

    const handleCropComplete = useCallback(async (croppedBlob) => {
        if (!data) return;
        
        try {
            // Create a file from the cropped blob
            const croppedFile = new File([croppedBlob], selectedImageFile.name, {
                type: 'image/jpeg',
                lastModified: Date.now(),
            });

            const formData = new FormData();
            formData.append('image', croppedFile);

            const response = await fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (result.success) {
                const newImage = {
                    url: result.data.url,
                    name: selectedImageFile.name
                };
                const currentPool = Array.isArray(data.imagePool) ? data.imagePool : [];
                const updatedImagePool = [...currentPool, newImage];
                setData(prevData => ({ ...prevData, imagePool: updatedImagePool }));
                alert('Image cropped and uploaded successfully!');
            } else {
                throw new Error(result.error.message);
            }
        } catch (uploadError) {
            console.error('Image upload failed:', uploadError);
            alert(`Image upload failed: ${uploadError.message}`);
        } finally {
            // Clean up
            setIsCropModalVisible(false);
            setSelectedImageFile(null);
            if (selectedImagePreview) {
                URL.revokeObjectURL(selectedImagePreview);
                setSelectedImagePreview(null);
            }
        }
    }, [selectedImageFile, selectedImagePreview, data]);

    const handleDeleteImage = useCallback((indexToDelete) => {
        if (!data || !data.imagePool) return;
        
        if (window.confirm("Are you sure you want to delete this image? It will be removed from all pages and performances.")) {
            const imageUrlToDelete = data.imagePool[indexToDelete].url;
            const updatedImagePool = data.imagePool.filter((_, index) => index !== indexToDelete);
            
            // Also remove from hero images and about image if it's used there
            const updatedHeroImages = data.heroImages.filter(url => url !== imageUrlToDelete);
            const newAboutImage = data.aboutImage === imageUrlToDelete ? '' : data.aboutImage;

            // TODO: Also remove from all performances media arrays

            setData(prevData => ({ 
                ...prevData, 
                imagePool: updatedImagePool,
                heroImages: updatedHeroImages,
                aboutImage: newAboutImage
            }));
        }
    }, [data]);

    const handleRenameImage = useCallback((index) => {
        if (!data || !data.imagePool) return;
        
        const newName = prompt("Enter a new name for this image:", data.imagePool[index].name);
        if (newName && newName.trim() !== '') {
            const updatedImagePool = [...data.imagePool];
            updatedImagePool[index].name = newName.trim();
            setData(prevData => ({ ...prevData, imagePool: updatedImagePool }));
        }
    }, [data]);

    const handleAboutImageSelect = useCallback((url) => {
        setData(prevData => ({ ...prevData, aboutImage: url }));
    }, []);

    const handleHeroImageToggle = useCallback((url) => {
        if (!data || !data.heroImages) return;
        
        const updatedHeroImages = data.heroImages.includes(url)
            ? data.heroImages.filter(heroUrl => heroUrl !== url)
            : [...data.heroImages, url];
        setData(prevData => ({ ...prevData, heroImages: updatedHeroImages }));
    }, [data]);

    const handleCopyToClipboard = useCallback(() => {
        if (!data) return;
        
        const jsonString = JSON.stringify(data, null, 2);
        navigator.clipboard.writeText(jsonString)
            .then(() => alert("JSON data copied to clipboard!"))
            .catch(() => alert("Failed to copy data. Please copy it manually."));
    }, [data]);

    // Memoize safe data arrays
    const safeUpcomingPerformances = useMemo(() => data?.performances?.upcoming || [], [data?.performances?.upcoming]);
    const safePastPerformances = useMemo(() => data?.performances?.past || [], [data?.performances?.past]);
    const safeImagePool = useMemo(() => data?.imagePool || [], [data?.imagePool]);

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
                <div style={{ textAlign: 'center', marginTop: '24px' }}>
                    <a 
                        href="/#/" 
                        style={{
                            display: 'inline-block',
                            background: 'linear-gradient(135deg, #1C3B8A, #2949a7)',
                            color: 'white',
                            borderRadius: '22px',
                            padding: '10px 24px',
                            fontWeight: 600,
                            fontSize: '1rem',
                            textDecoration: 'none',
                            boxShadow: '0 2px 8px rgba(28,59,138,0.08)',
                            transition: 'background 0.2s, color 0.2s',
                            marginTop: '10px',
                        }}
                        onMouseOver={e => { e.target.style.background = '#2949a7'; }}
                        onMouseOut={e => { e.target.style.background = 'linear-gradient(135deg, #1C3B8A, #2949a7)'; }}
                    >
                        ← Back to Website
                    </a>
                </div>
            </div>
        );
    }

    // Add a fixed back button to the main admin panel
    const backButton = (
        <a
            href="/#/"
            style={{
                position: 'fixed',
                top: 24,
                right: 24,
                zIndex: 2000,
                background: 'linear-gradient(135deg, #1C3B8A, #2949a7)',
                color: 'white',
                borderRadius: '22px',
                padding: '10px 24px',
                fontWeight: 600,
                fontSize: '1rem',
                textDecoration: 'none',
                boxShadow: '0 2px 8px rgba(28,59,138,0.08)',
                transition: 'background 0.2s, color 0.2s',
            }}
            onMouseOver={e => { e.target.style.background = '#2949a7'; }}
            onMouseOut={e => { e.target.style.background = 'linear-gradient(135deg, #1C3B8A, #2949a7)'; }}
        >
            ← Back to Website
        </a>
    );

    if (!data) {
        return (
            <div className="admin-panel-container">
                <h2>Admin Panel</h2>
                {error ? <p className="error-message">{error}</p> : <p>Loading data...</p>}
                {backButton}
            </div>
        );
    }

    return (
        <>
            {backButton}
            <div className="admin-panel-container">
                <h2>Admin Panel</h2>
                <p>Welcome! Manage your website content below.</p>

                {/* Upcoming Performances Section */}
                <div className="admin-section">
                    <h3>Upcoming Performances</h3>
                    <div className="performance-list">
                        {safeUpcomingPerformances.map((item, index) => (
                            <div key={`upcoming-${index}`} className="admin-list-item">
                                <span>{item.title}</span>
                                <div className="item-actions">
                                    <button onClick={() => handleOpenForm('upcoming', item, index)} className="btn-small btn-edit">Edit</button>
                                    <button onClick={() => handleDeletePerformance(index, 'upcoming')} className="btn-small btn-danger">Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button onClick={() => handleOpenForm('upcoming')} className="btn btn-primary">Add Upcoming Performance</button>
                </div>
                
                {/* Past Performances Section */}
                <div className="admin-section">
                    <h3>Past Performances</h3>
                     <div className="performance-list">
                        {safePastPerformances.map((item, index) => (
                            <div key={`past-${index}`} className="admin-list-item">
                                <span>{item.title}</span>
                                <div className="item-actions">
                                    <button onClick={() => handleOpenForm('past', item, index)} className="btn-small btn-edit">Edit</button>
                                    <button onClick={() => handleDeletePerformance(index, 'past')} className="btn-small btn-danger">Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button onClick={() => handleOpenForm('past')} className="btn btn-primary">Add Past Performance</button>
                </div>

                {/* Image Library Section */}
                <div className="admin-section">
                    <h3>Image Library</h3>
                    <p>Upload and manage all images for the website here. Images will be automatically cropped to 16:9 aspect ratio for consistent display across the site.</p>
                     <div className="add-image-form">
                         <label htmlFor="image-upload" className="btn btn-primary">
                            Upload New Image
                        </label>
                        <input
                            id="image-upload"
                            type="file"
                            onChange={handleImageUpload}
                            accept="image/*"
                            style={{ display: 'none' }}
                        />
                    </div>
                    <div className="image-list image-library">
                        {safeImagePool.map((image, index) => (
                            <div key={index} className="admin-list-item">
                                <span className="image-name">{image.name}</span>
                                <span className="image-url-small">{image.url}</span>
                                <div className="item-actions">
                                    <button onClick={() => handleRenameImage(index)} className="btn-small btn-edit">Rename</button>
                                    <button onClick={() => handleDeleteImage(index)} className="btn-small btn-danger">Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Page Content Section */}
                <div className="admin-section">
                    <h3>Page Content Assignment</h3>
                    
                    {/* About Us Image Assignment */}
                    <div className="assignment-section">
                        <h4>About Us Page Image</h4>
                        <p>Select one image to display on the 'About Us' section.</p>
                        <div className="image-selection-grid">
                           {safeImagePool.map((image, index) => {
                               const isSelected = data.aboutImage === image.url;
                               const isActive = originalData.aboutImage === image.url;
                               let itemClass = 'image-selection-item';
                               if (isSelected) itemClass += ' selected';
                               if (isActive) itemClass += ' active';

                               return (
                                   <div 
                                        key={index}
                                        className={itemClass}
                                        onClick={() => handleAboutImageSelect(image.url)}
                                    >
                                       <div className="image-name-overlay">{image.name}</div>
                                       <input 
                                            type="radio" 
                                            name="aboutImage"
                                            readOnly
                                            checked={isSelected}
                                       />
                                   </div>
                               );
                            })}
                        </div>
                    </div>

                    {/* Hero Image Assignment */}
                     <div className="assignment-section">
                        <h4>Homepage Hero Slideshow</h4>
                        <p>Select which images to show in the homepage slideshow.</p>
                        <div className="image-selection-grid">
                           {safeImagePool.map((image, index) => {
                               const isSelected = data.heroImages.includes(image.url);
                               const isActive = originalData.heroImages.includes(image.url);
                               let itemClass = 'image-selection-item';
                               if (isSelected) itemClass += ' selected';
                               if (isActive) itemClass += ' active';

                               return (
                                   <div 
                                        key={index}
                                        className={itemClass}
                                        onClick={() => handleHeroImageToggle(image.url)}
                                    >
                                       <div className="image-name-overlay">{image.name}</div>
                                       <input 
                                            type="checkbox"
                                            readOnly
                                            checked={isSelected} 
                                        />
                                   </div>
                               );
                            })}
                        </div>
                    </div>
                </div>

                <div className="admin-section">
                    <h3>Save Your Changes</h3>
                    <p>
                        <strong>Step 1:</strong> After making all your changes, click the button below to copy the updated data to your clipboard.
                        <br/>
                        <strong>Step 2:</strong> Open the <code>public/data.json</code> file in your code editor. Delete everything in that file and paste the new content.
                        <br/>
                        <strong>Step 3:</strong> Save the file and commit your changes to see them on the live website.
                    </p>
                    <button onClick={handleCopyToClipboard} className="btn btn-primary btn-copy-json">Copy Updated JSON</button>
                    <textarea
                        value={JSON.stringify(data, null, 2)}
                        readOnly
                        rows="30"
                    />
                </div>
            </div>
            
            {isFormVisible && (
                <PerformanceForm
                    item={editingItem}
                    onSave={handleSavePerformance}
                    onCancel={() => setIsFormVisible(false)}
                    imagePool={safeImagePool}
                />
            )}
            
            {isCropModalVisible && selectedImagePreview && (
                <ImageCropModal
                    imageSrc={selectedImagePreview}
                    onCancel={handleCropCancel}
                    onCropComplete={handleCropComplete}
                    aspect={16/9}
                />
            )}
        </>
    );
};

export default Admin; 