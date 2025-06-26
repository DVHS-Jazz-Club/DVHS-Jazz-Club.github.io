import { useState, useEffect } from 'react';

const Modal = ({ show, onClose, title, images }) => {
    const [loadedImages, setLoadedImages] = useState(new Set());
    const [errorImages, setErrorImages] = useState(new Set());

    useEffect(() => {
        if (show && images) {
            setLoadedImages(new Set());
            setErrorImages(new Set());
            
            const mediaItems = Array.isArray(images) ? images : [];
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
    }, [show, images]);

    if (!show) {
        return null;
    }

    const mediaItems = Array.isArray(images) ? images : [];

    return (
        <div className="modal-overlay active" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onClose}>&times;</button>
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
                                                onLoad={() => setLoadedImages(prev => new Set([...prev, index]))}
                                                onError={() => setErrorImages(prev => new Set([...prev, index]))}
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
};

export default Modal; 