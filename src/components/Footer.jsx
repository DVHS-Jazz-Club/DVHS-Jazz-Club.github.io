const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>Dougherty Valley High School Jazz Club</h3>
                        <p>Where music meets passion and friendships are forged through jazz.</p>
                        <div className="social-links">
                            <a href="https://www.instagram.com/dvhsjazzclub" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
                            <a href="https://www.youtube.com/@dvjazzclub" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube"></i></a>
                            <a href="https://discord.gg/ap65wjgm4k" target="_blank" rel="noopener noreferrer"><i className="fab fa-discord"></i></a>
                            <a href="mailto:dvjazzclub@gmail.com"><i className="fas fa-envelope"></i></a>
                        </div>
                    </div>
                    <div className="footer-section">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><a href="#home">Home</a></li>
                            <li><a href="#about">About Us</a></li>
                            <li><a href="#performances">Performances</a></li>
                            <li><a href="#join">Get Involved</a></li>
                            <li><a href="#contact">Contact</a></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h4>Contact Info</h4>
                        <p>Fridays at Lunch, P124 (Band Room)</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 