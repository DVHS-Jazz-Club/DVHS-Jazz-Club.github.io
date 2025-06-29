import React, { memo, useMemo } from 'react';
import PerformanceCard from './PerformanceCard';

const Performances = memo(({ upcoming, past, onPerformanceClick }) => {
    // Helper function to parse date from day/month/year fields
    const parsePerformanceDate = useMemo(() => (perf) => {
        if (!perf.day || !perf.month || !perf.year) {
            return new Date(0); // Invalid date
        }
        
        // Convert month abbreviation to number
        const monthMap = {
            'JAN': 0, 'FEB': 1, 'MAR': 2, 'APR': 3, 'MAY': 4, 'JUN': 5,
            'JUL': 6, 'AUG': 7, 'SEP': 8, 'OCT': 9, 'NOV': 10, 'DEC': 11
        };
        
        const month = monthMap[perf.month.toUpperCase()];
        if (month === undefined) {
            return new Date(0); // Invalid month
        }
        
        return new Date(parseInt(perf.year), month, parseInt(perf.day));
    }, []);

    // Helper function to check if a performance is in the past
    const isPerformancePast = useMemo(() => (perf) => {
        const perfDate = parsePerformanceDate(perf);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time to start of day for fair comparison
        return perfDate < today;
    }, [parsePerformanceDate]);

    // Automatically categorize and sort performances
    const categorizedPerformances = useMemo(() => {
        const allPerformances = [...(upcoming || []), ...(past || [])];
        const now = new Date();
        now.setHours(0, 0, 0, 0);

        const upcomingPerformances = [];
        const pastPerformances = [];

        allPerformances.forEach(perf => {
            const perfDate = parsePerformanceDate(perf);
            if (perfDate >= now) {
                upcomingPerformances.push(perf);
            } else {
                pastPerformances.push(perf);
            }
        });

        // Sort upcoming performances by date (earliest first)
        upcomingPerformances.sort((a, b) => {
            const dateA = parsePerformanceDate(a);
            const dateB = parsePerformanceDate(b);
            return dateA - dateB;
        });

        // Sort past performances by date (most recent first)
        pastPerformances.sort((a, b) => {
            const dateA = parsePerformanceDate(a);
            const dateB = parsePerformanceDate(b);
            return dateB - dateA;
        });

        return { upcoming: upcomingPerformances, past: pastPerformances };
    }, [upcoming, past, parsePerformanceDate]);

    // Memoize performance sections for better performance
    const upcomingSection = useMemo(() => (
        <section id="upcoming-performances" className="performances">
            <div className="container">
                <div className="section-header">
                    <h2>Upcoming Performances</h2>
                    <p>Catch us live at our next event!</p>
                </div>
                <div id="upcoming-performances-grid" className="performances-grid">
                    {categorizedPerformances.upcoming.length > 0 ? (
                        categorizedPerformances.upcoming.map(perf => (
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
    ), [categorizedPerformances.upcoming, onPerformanceClick]);

    const pastSection = useMemo(() => (
        <section id="past-performances" className="past-performances">
            <div className="container">
                <div className="section-header">
                    <h2>Past Performances</h2>
                    <p>A look back at our memorable events. Click any event to see photos!</p>
                </div>
                <div id="past-performances-grid" className="past-performances-grid">
                    {categorizedPerformances.past.map(perf => (
                        <PerformanceCard 
                            key={`past-${perf.title}`} 
                            perf={perf} 
                            onClick={onPerformanceClick} 
                        />
                    ))}
                </div>
            </div>
        </section>
    ), [categorizedPerformances.past, onPerformanceClick]);

    return (
        <section id="performances">
            {upcomingSection}
            {pastSection}
        </section>
    );
});

Performances.displayName = 'Performances';

export default Performances; 