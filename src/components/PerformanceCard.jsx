import React, { memo, useCallback } from 'react';

const PerformanceCard = memo(({ perf, onClick }) => {
    const handleClick = useCallback(() => {
        onClick(perf);
    }, [onClick, perf]);

    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
        }
    }, [handleClick]);

    return (
        <div 
            className="performance-card" 
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="button"
            aria-label={`View details for ${perf.title}`}
        >
            <div className="performance-date">
                <span className="day">{perf.day}</span>
                <span className="month">{perf.month}</span>
                <span className="year">{perf.year}</span>
            </div>
            <div className="performance-details">
                <h3>{perf.title}</h3>
                <p className="performance-time">
                    <i className="far fa-clock" aria-hidden="true"></i> {perf.time}
                </p>
                <p className="performance-location">
                    <i className="fas fa-map-marker-alt" aria-hidden="true"></i> {perf.location}
                </p>
                <p className="performance-description">{perf.description}</p>
                <div className="performance-tags">
                    {perf.tags?.map(tag => (
                        <span key={tag} className="tag">{tag}</span>
                    )) || null}
                </div>
            </div>
        </div>
    );
});

PerformanceCard.displayName = 'PerformanceCard';

export default PerformanceCard; 