const Modal = ({ show, onClose, title, images }) => {
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
                                        <img src={mediaUrl} alt={`Gallery item ${index + 1}`} />
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