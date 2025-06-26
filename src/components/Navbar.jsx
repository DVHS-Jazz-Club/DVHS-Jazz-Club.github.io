import React, { useState, useMemo, useCallback } from 'react';
import { useLocation, Link } from 'react-router-dom';
import SmoothScrollLink from './SmoothScrollLink';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const isAdminPage = location.pathname === '/admin';

    // Extract navigation items for better maintainability
    const navigationItems = useMemo(() => [
        { to: '#home', label: 'Home' },
        { to: '#about', label: 'About Us' },
        { to: '#performances', label: 'Performances' },
        { to: '#join', label: 'Get Involved' },
        { to: '#contact', label: 'Details' }
    ], []);

    const toggleMenu = useCallback(() => {
        setIsMenuOpen(prev => !prev);
    }, []);

    const closeMenu = useCallback(() => {
        setIsMenuOpen(false);
    }, []);

    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMenu();
        }
    }, [toggleMenu]);

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
                            <SmoothScrollLink 
                                to="#home" 
                                className="nav-logo-link" 
                                onClick={closeMenu}
                            >
                                <h2>Dougherty Valley Jazz Club</h2>
                            </SmoothScrollLink>
                        </div>
                        <ul className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
                            {navigationItems.map(({ to, label }) => (
                                <li key={label} className="nav-item">
                                    <SmoothScrollLink 
                                        to={to} 
                                        className="nav-link" 
                                        onClick={closeMenu}
                                    >
                                        {label}
                                    </SmoothScrollLink>
                                </li>
                            ))}
                        </ul>
                        <div 
                            className={`hamburger ${isMenuOpen ? "active" : ""}`} 
                            onClick={toggleMenu}
                            onKeyDown={handleKeyDown}
                            tabIndex={0}
                            role="button"
                            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                            aria-expanded={isMenuOpen}
                        >
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