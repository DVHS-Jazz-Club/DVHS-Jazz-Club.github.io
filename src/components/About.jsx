import React, { useState, useEffect, memo, useMemo } from 'react';

const About = memo(({ aboutImage }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        if (aboutImage) {
            const img = new window.Image();
            img.onload = () => {
                setImageLoaded(true);
                setImageError(false);
            };
            img.onerror = () => {
                setImageError(true);
                setImageLoaded(false);
            };
            img.src = aboutImage;
        }
    }, [aboutImage]);

    // Extract features for better maintainability
    const features = useMemo(() => [
        {
            icon: 'fas fa-book-reader',
            title: 'Music Theory',
            description: 'Learn the fundamentals of jazz music theory! From chords, chord progressions, alterations, scales, and improv lessons, the basics!'
        },
        {
            icon: 'fas fa-users',
            title: 'Community Feel',
            description: 'A welcoming group of musicians, we appreciate all students of all skill levels.'
        },
        {
            icon: 'fas fa-star',
            title: 'Performance Opportunities',
            description: 'There are plenty of opportunities to express yourself and play as a group!'
        }
    ], []);

    return (
        <section id="about" className="about">
            <div className="container">
                <div className="section-header">
                    <h2>About Jazz Club</h2>
                    <p>Through building a tight-knit community, we spread the love of jazz.</p>
                </div>
                <div className="about-content">
                    <div className="about-text">
                        <h3>Our Mission & Vibe</h3>
                        <p>Founded in 2020, The DVHS Jazz Club is a vibrant, close, and active community of student musicians passionate about jazz. We are focused on creating an environment dedicated to learning and playing. We believe that only through developing a space for all walks of life, from new soloists to jazz band seniors, we all learn a little something and have a bit of fun.</p>
                        <p>It's not a huge club, and we like it that way. Although we welcome anybody, we especially value those who help contribute to the overall greater good of the club.</p>
                        <div className="features">
                            {features.map(({ icon, title, description }) => (
                                <div key={title} className="feature">
                                    <i className={icon} aria-hidden="true"></i>
                                    <div>
                                        <div className="feature-title">{title}</div>
                                        <div className="feature-description">{description}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="about-image">
                        {aboutImage ? (
                            <>
                                {!imageLoaded && !imageError && (
                                    <div className="skeleton-about-image"></div>
                                )}
                                <img 
                                    src={aboutImage} 
                                    alt="Dougherty Valley Jazz Club" 
                                    loading="lazy"
                                    style={{ 
                                        display: imageLoaded ? 'block' : 'none',
                                        opacity: imageLoaded ? 1 : 0,
                                        transition: 'opacity 0.3s ease-in'
                                    }}
                                    onLoad={() => setImageLoaded(true)}
                                    onError={() => setImageError(true)}
                                />
                                {imageError && (
                                    <div className="image-placeholder">
                                        <i className="fas fa-image"></i>
                                        <p>Jazz Club Rehearsal</p>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="image-placeholder">
                                <i className="fas fa-image"></i>
                                <p>Jazz Club Rehearsal</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
});

About.displayName = 'About';

export default About; 
