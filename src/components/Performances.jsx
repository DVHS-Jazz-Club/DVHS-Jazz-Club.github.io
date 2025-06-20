import PerformanceCard from './PerformanceCard';

const Performances = ({ upcoming, past, onPerformanceClick }) => {
    return (
        <section id="performances">
            {/* Upcoming Performances Section */}
            <section id="upcoming-performances" className="performances">
                <div className="container">
                    <div className="section-header">
                        <h2>Upcoming Performances</h2>
                        <p>Catch us live at our next event!</p>
                    </div>
                    <div id="upcoming-performances-grid" className="performances-grid">
                        {upcoming.length > 0 ? (
                            upcoming.map(perf => <PerformanceCard key={perf.title} perf={perf} onClick={onPerformanceClick} />)
                        ) : (
                            <p className="no-events-message">No upcoming performances scheduled. Check back soon!</p>
                        )}
                    </div>
                </div>
            </section>

            {/* Past Performances Section */}
            <section id="past-performances" className="past-performances">
                <div className="container">
                    <div className="section-header">
                        <h2>Past Performances</h2>
                        <p>A look back at our memorable events. Click any event to see photos!</p>
                    </div>
                    <div id="past-performances-grid" className="past-performances-grid">
                        {past
                            .sort((a, b) => new Date(b.date) - new Date(a.date))
                            .map(perf => <PerformanceCard key={perf.title} perf={perf} onClick={onPerformanceClick} />)}
                    </div>
                </div>
            </section>
        </section>
    );
};

export default Performances; 