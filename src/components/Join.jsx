const Join = () => {
    return (
        <section id="join" className="join">
            <div className="container">
                <div className="section-header">
                    <h2>Get Involved</h2>
                    <p>The best way to get involved is to join our community on Discord or follow us on social media. Feel free to send us an email as well!</p>
                </div>
                <div className="join-content">
                    <div className="join-info">
                        <h3>Why Join?</h3>
                        <ul className="join-benefits">
                            <li><i className="fas fa-check"></i> Learn music theory and improvisation</li>
                            <li><i className="fas fa-check"></i> Join a close-knit, welcoming community</li>
                            <li><i className="fas fa-check"></i> Perform at school and community events</li>
                            <li><i className="fas fa-check"></i> Participate in fun summer jam sessions</li>
                            <li><i className="fas fa-check"></i> Develop your musical skills and confidence</li>
                            <li><i className="fas fa-check"></i> Have fun making music together</li>
                        </ul>
                        <div className="join-details">
                            <div className="detail-item">
                                <i className="fas fa-calendar"></i>
                                <div>
                                    <h4>Meeting Times (School Year)</h4>
                                    <p>Every Wednesday, after school<br />Location: P124 (Band Room)</p>
                                </div>
                            </div>
                            <div className="detail-item">
                                <i className="fas fa-sun"></i>
                                <div>
                                    <h4>Summer Meetings</h4>
                                    <p>We hold casual jam sessions during the summer. <br />Sign up to get notified!</p>
                                </div>
                            </div>
                            <div className="detail-item">
                                <i className="fas fa-user-graduate"></i>
                                <div>
                                    <h4>Requirements</h4>
                                    <p>Open to all DVHS students<br />No experience required!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="contact-socials">
                        <h3>Join our Community</h3>
                        <p>Connect with us on our platforms!</p>
                        <div className="social-links-contact">
                            <a href="https://discord.gg/ap65wjgm4k" target="_blank" rel="noopener noreferrer" className="social-btn discord">
                                <i className="fab fa-discord"></i>
                                <span>Join our Discord Server</span>
                            </a>
                            <a href="https://www.instagram.com/dvhsjazzclub" target="_blank" rel="noopener noreferrer" className="social-btn instagram">
                                <i className="fab fa-instagram"></i>
                                <span>Follow on Instagram</span>
                            </a>
                            <a href="mailto:dvjazzclub@gmail.com" className="social-btn email">
                                <i className="fas fa-envelope"></i>
                                <span>Email the Club</span>
                            </a>
                        </div>
                        <p className="contact-email-display">Or, email us directly at: <strong>dvjazzclub@gmail.com</strong></p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Join; 