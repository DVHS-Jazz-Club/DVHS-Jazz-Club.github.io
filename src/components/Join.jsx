import React, { memo, useMemo } from 'react';

const Join = memo(() => {
    // Extract benefits for better maintainability
    const benefits = useMemo(() => [
        'Learn music theory and improvisation',
        'Join a close-knit, welcoming community',
        'Perform at school and community events',
        'Participate in fun summer jam sessions',
        'Develop your musical skills and confidence',
        'Have fun making music together'
    ], []);

    // Extract detail items for better maintainability
    const detailItems = useMemo(() => [
        {
            icon: 'fas fa-calendar',
            title: 'Meeting Times (School Year)',
            content: 'Every Wednesday, after school<br />Location: P124 (Band Room)'
        },
        {
            icon: 'fas fa-sun',
            title: 'Summer Meetings',
            content: 'We hold casual jam sessions during the summer. <br />Sign up to get notified!'
        },
        {
            icon: 'fas fa-user-graduate',
            title: 'Requirements',
            content: 'Open to all DVHS students<br />No experience required!'
        }
    ], []);

    // Extract social links for better maintainability
    const socialLinks = useMemo(() => [
        {
            href: 'https://discord.gg/ap65wjgm4k',
            icon: 'fab fa-discord',
            label: 'Join our Discord Server',
            className: 'discord'
        },
        {
            href: 'https://www.instagram.com/dvhsjazzclub',
            icon: 'fab fa-instagram',
            label: 'Follow on Instagram',
            className: 'instagram'
        },
        {
            href: 'mailto:dvjazzclub@gmail.com',
            icon: 'fas fa-envelope',
            label: 'Email the Club',
            className: 'email'
        }
    ], []);

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
                            {benefits.map((benefit, index) => (
                                <li key={index}>
                                    <i className="fas fa-check" aria-hidden="true"></i> {benefit}
                                </li>
                            ))}
                        </ul>
                        <div className="join-details">
                            {detailItems.map(({ icon, title, content }) => (
                                <div key={title} className="detail-item">
                                    <i className={icon} aria-hidden="true"></i>
                                    <div>
                                        <h4>{title}</h4>
                                        <p dangerouslySetInnerHTML={{ __html: content }}></p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="contact-socials">
                        <h3>Join our Community</h3>
                        <p>Connect with us on our platforms!</p>
                        <div className="social-links-contact">
                            {socialLinks.map(({ href, icon, label, className }) => (
                                <a 
                                    key={label}
                                    href={href} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className={`social-btn ${className}`}
                                    aria-label={label}
                                >
                                    <i className={icon} aria-hidden="true"></i>
                                    <span>{label}</span>
                                </a>
                            ))}
                        </div>
                        <p className="contact-email-display">
                            Or, email us directly at: <strong>dvjazzclub@gmail.com</strong>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
});

Join.displayName = 'Join';

export default Join; 