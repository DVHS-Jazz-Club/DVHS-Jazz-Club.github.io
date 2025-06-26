import React, { memo, useMemo } from 'react';
import PerformanceCard from './PerformanceCard';

const Performances = memo(({ upcoming, past, onPerformanceClick }) => {
    // Memoize sorted past performances to avoid re-sorting on every render
    const sortedPastPerformances = useMemo(() => {
        return [...past].sort((a, b) => {
            // Create date objects for comparison, fallback to title if date is missing
            const dateA = a.date ? new Date(a.date) : new Date(0);
            const dateB = b.date ? new Date(b.date) : new Date(0);
            return dateB - dateA;
        });
    }, [past]);

    // Memoize performance sections for better performance
    const upcomingSection = useMemo(() => (
        <section id="upcoming-performances" className="performances">
            <div className="container">
                <div className="section-header">
                    <h2>Upcoming Performances</h2>
                    <p>Catch us live at our next event!</p>
                </div>
                <div id="upcoming-performances-grid" className="performances-grid">
                    {upcoming.length > 0 ? (
                        upcoming.map(perf => (
                            <PerformanceCard 
                                key={`upcoming-${perf.title}`} 
                                perf={perf} 
                                onClick={onPerformanceClick} 
                            />
                        ))
                    ) : (
                        <p className="no-events-message">
                            No upcoming performances scheduled. Check back soon!
                        </p>
                    )}
                </div>
            </div>
        </section>
    ), [upcoming, onPerformanceClick]);

    const pastSection = useMemo(() => (
        <section id="past-performances" className="past-performances">
            <div className="container">
                <div className="section-header">
                    <h2>Past Performances</h2>
                    <p>A look back at our memorable events. Click any event to see photos!</p>
                </div>
                <div id="past-performances-grid" className="past-performances-grid">
                    {sortedPastPerformances.map(perf => (
                        <PerformanceCard 
                            key={`past-${perf.title}`} 
                            perf={perf} 
                            onClick={onPerformanceClick} 
                        />
                    ))}
                </div>
            </div>
        </section>
    ), [sortedPastPerformances, onPerformanceClick]);

    return (
        <section id="performances">
            {upcomingSection}
            {pastSection}
        </section>
    );
});

Performances.displayName = 'Performances';

export default Performances; 