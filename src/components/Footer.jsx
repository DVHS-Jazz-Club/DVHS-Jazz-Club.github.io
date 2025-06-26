import { useMemo } from 'react';
import SmoothScrollLink from './SmoothScrollLink';

const Footer = () => {
    // Extract social links for better maintainability
    const socialLinks = useMemo(() => [
        {
            href: 'https://www.instagram.com/dvhsjazzclub',
            icon: 'fab fa-instagram',
            label: 'Instagram'
        },
        {
            href: 'https://www.youtube.com/@dvjazzclub',
            icon: 'fab fa-youtube',
            label: 'YouTube'
        },
        {
            href: 'https://discord.gg/ap65wjgm4k',
            icon: 'fab fa-discord',
            label: 'Discord'
        },
        {
            href: 'mailto:dvjazzclub@gmail.com',
            icon: 'fas fa-envelope',
            label: 'Email'
        }
    ], []);

    // Extract navigation links for better maintainability
    const navigationLinks = useMemo(() => [
        { to: '#home', label: 'Home' },
        { to: '#about', label: 'About Us' },
        { to: '#performances', label: 'Performances' },
        { to: '#join', label: 'Get Involved' },
        { to: '#contact', label: 'Details' }
    ], []);

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>Dougherty Valley High School Jazz Club</h3>
                        <p>Where music meets passion and friendships are forged through jazz.</p>
                        <div className="social-links">
                            {socialLinks.map(({ href, icon, label }) => (
                                <a 
                                    key={label}
                                    href={href} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                >
                                    <i className={icon}></i>
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="footer-section">
                        <h4>Quick Links</h4>
                        <ul>
                            {navigationLinks.map(({ to, label }) => (
                                <li key={label}>
                                    <SmoothScrollLink to={to}>{label}</SmoothScrollLink>
                                </li>
                            ))}
                            <li>
                                <a href="/#/admin" className="admin-link-footer">Admin</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 