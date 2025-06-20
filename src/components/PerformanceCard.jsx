const PerformanceCard = ({ perf, onClick }) => {
    return (
        <div className="performance-card" onClick={() => onClick(perf.title)}>
            <div className="performance-date">
                <span className="day">{perf.day}</span>
                <span className="month">{perf.month}</span>
                <span className="year">{perf.year}</span>
            </div>
            <div className="performance-details">
                <h3>{perf.title}</h3>
                <p className="performance-time"><i className="far fa-clock"></i> {perf.time}</p>
                <p className="performance-location"><i className="fas fa-map-marker-alt"></i> {perf.location}</p>
                <p className="performance-description">{perf.description}</p>
                <div className="performance-tags">
                    {perf.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                </div>
            </div>
        </div>
    );
};

export default PerformanceCard; 