const Contact = ({ officers }) => {
    if (!officers) {
        return null; // or a loading indicator
    }

    const officerList = (
        <>
            <strong>Vice President:</strong> {officers.vicePresident}<br />
            <strong>Conductor:</strong> {officers.conductor}<br />
            <strong>Secretary:</strong> {officers.secretary}<br />
            <strong>Treasurer:</strong> {officers.treasurer}<br />
            <strong>PR Officer:</strong> {officers.prOfficer}
        </>
    );

    return (
        <section id="contact" className="contact">
            <div className="container">
                <div className="section-header">
                    <h2>Club Details</h2>
                    <p>Learn more about our team and where to find us.</p>
                </div>
                <div className="contact-content">
                    <div className="contact-info" id="contact-info">
                        <div className="contact-item">
                            <i className="fas fa-map-marker-alt"></i>
                            <div>
                                <h4>Meetings</h4>
                                <p>Fridays at Lunch, P124 (Band Room)</p>
                            </div>
                        </div>
                        <div className="contact-item">
                            <i className="fas fa-user-tie"></i>
                            <div>
                                <h4>Faculty Advisor</h4>
                                <p>{officers.facultyAdvisor}</p>
                            </div>
                        </div>
                        <div className="contact-item">
                            <i className="fas fa-user-graduate"></i>
                            <div>
                                <h4>President</h4>
                                <p>{officers.president}</p>
                            </div>
                        </div>
                        <div className="contact-item">
                            <i className="fas fa-users"></i>
                            <div>
                                <h4>Club Officers</h4>
                                <p className="officer-list">{officerList}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact; 