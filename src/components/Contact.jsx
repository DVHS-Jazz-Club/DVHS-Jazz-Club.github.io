import React, { memo, useMemo } from 'react';

const Contact = memo(({ officers }) => {
    if (!officers) {
        return null;
    }

    // Extract officer data for better maintainability
    const officerData = useMemo(() => [
        { title: 'Vice President', name: officers.vicePresident },
        { title: 'Conductor', name: officers.conductor },
        { title: 'Secretary', name: officers.secretary },
        { title: 'Treasurer', name: officers.treasurer },
        { title: 'PR Officer', name: officers.prOfficer }
    ], [officers]);

    const officerList = useMemo(() => (
        <>
            {officerData.map(({ title, name }) => (
                <React.Fragment key={title}>
                    <strong>{title}:</strong> {name}<br />
                </React.Fragment>
            ))}
        </>
    ), [officerData]);

    // Extract contact items for better maintainability
    const contactItems = useMemo(() => [
        {
            icon: 'fas fa-map-marker-alt',
            title: 'Meetings',
            content: 'Fridays at Lunch, P124 (Band Room)'
        },
        {
            icon: 'fas fa-user-tie',
            title: 'Faculty Advisor',
            content: officers.facultyAdvisor
        },
        {
            icon: 'fas fa-user-graduate',
            title: 'President',
            content: officers.president
        },
        {
            icon: 'fas fa-users',
            title: 'Club Officers',
            content: officerList,
            className: 'officer-list'
        }
    ], [officers.facultyAdvisor, officers.president, officerList]);

    return (
        <section id="contact" className="contact">
            <div className="container">
                <div className="section-header">
                    <h2>Club Details</h2>
                    <p>Learn more about our team and where to find us.</p>
                </div>
                <div className="contact-content">
                    <div className="contact-info" id="contact-info">
                        {contactItems.map(({ icon, title, content, className }) => (
                            <div key={title} className="contact-item">
                                <i className={icon} aria-hidden="true"></i>
                                <div>
                                    <h4>{title}</h4>
                                    <p className={className}>{content}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
});

Contact.displayName = 'Contact';

export default Contact; 