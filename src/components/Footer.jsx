import SmoothScrollLink from './SmoothScrollLink';

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
                            <li><SmoothScrollLink to="#home">Home</SmoothScrollLink></li>
                            <li><SmoothScrollLink to="#about">About Us</SmoothScrollLink></li>
                            <li><SmoothScrollLink to="#performances">Performances</SmoothScrollLink></li>
                            <li><SmoothScrollLink to="#join">Get Involved</SmoothScrollLink></li>
                            <li><SmoothScrollLink to="#contact">Details</SmoothScrollLink></li>
                            <li><a href="/#/admin" className="admin-link-footer">Admin</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 