import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import SmoothScrollLink from './SmoothScrollLink';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const isAdminPage = location.pathname === '/admin';

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav className="navbar">
            <div className="nav-container">
                {isAdminPage ? (
                    <div className="nav-logo-admin">
                        <Link to="/" className="nav-logo-link">
                            <h1>Dougherty Valley Jazz Club</h1>
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="nav-logo">
                            <SmoothScrollLink to="#home" className="nav-logo-link" onClick={closeMenu}>
                                <h2>Dougherty Valley Jazz Club</h2>
                            </SmoothScrollLink>
                        </div>
                        <ul className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
                            <li className="nav-item">
                                <SmoothScrollLink to="#home" className="nav-link" onClick={closeMenu}>Home</SmoothScrollLink>
                            </li>
                            <li className="nav-item">
                                <SmoothScrollLink to="#about" className="nav-link" onClick={closeMenu}>About Us</SmoothScrollLink>
                            </li>
                            <li className="nav-item">
                                <SmoothScrollLink to="#performances" className="nav-link" onClick={closeMenu}>Performances</SmoothScrollLink>
                            </li>
                            <li className="nav-item">
                                <SmoothScrollLink to="#join" className="nav-link" onClick={closeMenu}>Get Involved</SmoothScrollLink>
                            </li>
                            <li className="nav-item">
                                <SmoothScrollLink to="#contact" className="nav-link" onClick={closeMenu}>Details</SmoothScrollLink>
                            </li>
                        </ul>
                        <div className={`hamburger ${isMenuOpen ? "active" : ""}`} onClick={toggleMenu}>
                            <span className="bar"></span>
                            <span className="bar"></span>
                            <span className="bar"></span>
                        </div>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar; 