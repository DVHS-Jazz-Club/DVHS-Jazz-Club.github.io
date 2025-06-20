import { useState } from 'react';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    }

    return (
        <nav className="navbar">
            <div className="nav-container">
                <div className="nav-logo">
                    <h2>Dougherty Valley Jazz Club</h2>
                </div>
                <ul className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
                    <li className="nav-item">
                        <a href="#home" className="nav-link" onClick={closeMenu}>Home</a>
                    </li>
                    <li className="nav-item">
                        <a href="#about" className="nav-link" onClick={closeMenu}>About Us</a>
                    </li>
                    <li className="nav-item">
                        <a href="#performances" className="nav-link" onClick={closeMenu}>Performances</a>
                    </li>
                    <li className="nav-item">
                        <a href="#join" className="nav-link" onClick={closeMenu}>Get Involved</a>
                    </li>
                    <li className="nav-item">
                        <a href="#contact" className="nav-link" onClick={closeMenu}>Contact</a>
                    </li>
                </ul>
                <div className={`hamburger ${isMenuOpen ? "active" : ""}`} onClick={toggleMenu}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
            </div>
        </nav>
    );
};

export default Navbar; 