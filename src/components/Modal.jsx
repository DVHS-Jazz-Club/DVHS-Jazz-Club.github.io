import React, { useState, useEffect, memo, useCallback, useMemo } from 'react';

const Modal = memo(({ show, onClose, title, images }) => {
    const [loadedImages, setLoadedImages] = useState(new Set());
    const [errorImages, setErrorImages] = useState(new Set());

    // Memoize media items array
    const mediaItems = useMemo(() => Array.isArray(images) ? images : [], [images]);

    // Memoize close handler
    const handleClose = useCallback(() => {
        onClose();
    }, [onClose]);

    // Memoize overlay click handler
    const handleOverlayClick = useCallback((e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }, [onClose]);

    // Memoize content click handler
    const handleContentClick = useCallback((e) => {
        e.stopPropagation();
    }, []);

    useEffect(() => {
        if (show && mediaItems.length > 0) {
            setLoadedImages(new Set());
            setErrorImages(new Set());
            
            mediaItems.forEach((mediaUrl, index) => {
                if (!mediaUrl.includes('youtube.com/embed') && !mediaUrl.includes('drive.google.com/file')) {
                    const img = new window.Image();
                    img.onload = () => {
                        setLoadedImages(prev => new Set([...prev, index]));
                    };
                    img.onerror = () => {
                        setErrorImages(prev => new Set([...prev, index]));
                    };
                    img.src = mediaUrl;
                }
            });
        }
    }, [show, mediaItems]);

    // Memoize image load handlers
    const handleImageLoad = useCallback((index) => {
        setLoadedImages(prev => new Set([...prev, index]));
    }, []);

    const handleImageError = useCallback((index) => {
        setErrorImages(prev => new Set([...prev, index]));
    }, []);

    if (!show) {
        return null;
    }

    return (
        <div className="modal-overlay active" onClick={handleOverlayClick}>
            <div className="modal-content" onClick={handleContentClick}>
                <button className="modal-close-btn" onClick={handleClose}>&times;</button>
                <h3 className="modal-title">{title}</h3>
                <div className="modal-gallery-grid">
                    {mediaItems.length > 0 ? (
                        mediaItems.map((mediaUrl, index) => {
                            const isVideo = mediaUrl.includes('youtube.com/embed') || mediaUrl.includes('drive.google.com/file');
                            const isImageLoaded = loadedImages.has(index);
                            const isImageError = errorImages.has(index);
                            
                            return (
                                <div key={index} className="gallery-item">
                                    {isVideo ? (
                                        <div className="video-container">
                                            <iframe
                                                src={mediaUrl}
                                                title={`Media ${index + 1}`}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            ></iframe>
                                        </div>
                                    ) : (
                                        <>
                                            {!isImageLoaded && !isImageError && (
                                                <div className="skeleton-gallery-item"></div>
                                            )}
                                            <img 
                                                src={mediaUrl} 
                                                alt={`Gallery item ${index + 1}`} 
                                                loading="lazy"
                                                style={{ 
                                                    display: isImageLoaded ? 'block' : 'none',
                                                    opacity: isImageLoaded ? 1 : 0,
                                                    transition: 'opacity 0.3s ease-in'
                                                }}
                                                onLoad={() => handleImageLoad(index)}
                                                onError={() => handleImageError(index)}
                                            />
                                            {isImageError && (
                                                <div className="image-placeholder" style={{ height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5', borderRadius: '8px' }}>
                                                    <div style={{ textAlign: 'center' }}>
                                                        <i className="fas fa-image" style={{ fontSize: '2rem', color: '#ccc', marginBottom: '0.5rem' }}></i>
                                                        <p style={{ color: '#999', margin: 0 }}>Image failed to load</p>
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            );
                        })
                    ) : (
                        <p>No images or videos available for this performance.</p>
                    )}
                </div>
            </div>
        </div>
    );
});

Modal.displayName = 'Modal';

export default Modal; 