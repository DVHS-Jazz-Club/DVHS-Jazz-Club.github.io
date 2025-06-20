const Modal = ({ show, onClose, title, images }) => {
    if (!show) {
        return null;
    }

    const renderGalleryItem = (item) => {
        if (item.type === 'video') {
            return (
                <div className="gallery-item" key={item.url}>
                    <div className="video-container">
                        <iframe
                            src={item.url}
                            title={item.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen>
                        </iframe>
                    </div>
                </div>
            );
        }
        
        // Default to photo
        return (
            <div className="gallery-item" key={item.url}>
                <img src={item.url} alt={item.title} />
            </div>
        );
    };

    return (
        <div className="modal-overlay active" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onClose}>&times;</button>
                <h3 className="modal-title">{title} - Gallery</h3>
                <div id="modal-gallery-grid" className="modal-gallery-grid">
                    {images && images.length > 0 ? (
                        images.map(item => renderGalleryItem(item))
                    ) : (
                        <p>No images available for this performance yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Modal; 