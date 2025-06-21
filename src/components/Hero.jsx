import { useState, useEffect, useCallback } from 'react';
import SmoothScrollLink from './SmoothScrollLink';

const Hero = ({ heroImages }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const showImage = useCallback((index) => {
        const heroElement = document.querySelector('.hero');
        if (heroElement && heroImages.length > 0) {
            heroElement.style.backgroundImage = `linear-gradient(rgba(28, 59, 138, 0.3), rgba(28, 59, 138, 0.3)), url('${heroImages[index]}')`;
        }
    }, [heroImages]);

    const nextImage = useCallback(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % heroImages.length);
    }, [heroImages.length]);

    const prevImage = () => {
        setCurrentIndex(prevIndex => (prevIndex - 1 + heroImages.length) % heroImages.length);
    };

    useEffect(() => {
        if (heroImages.length > 0) {
            heroImages.forEach(url => {
                const img = new Image();
                img.src = url;
            });
            showImage(currentIndex);
        }
    }, [currentIndex, heroImages, showImage]);

    useEffect(() => {
        if (heroImages.length > 1) {
            const intervalId = setInterval(nextImage, 7000);
            return () => clearInterval(intervalId);
        }
    }, [heroImages.length, nextImage]);

    return (
        <section id="home" className="hero">
            <div className="hero-content">
                <h1 className="hero-title">Dougherty Valley High School Jazz Club</h1>
                <p className="hero-subtitle">Where Music Meets Passion</p>
                <p className="hero-description">Join our talented student musicians as we explore the world of jazz, perform amazing music, and create unforgettable experiences together.</p>
                <div className="hero-buttons">
                    <SmoothScrollLink to="#performances" className="btn btn-primary">View Performances</SmoothScrollLink>
                    <SmoothScrollLink to="#join" className="btn btn-secondary">Join The Club</SmoothScrollLink>
                </div>
            </div>
            <div className="hero-overlay"></div>
            
            {heroImages.length > 1 && (
                <>
                    <button id="hero-prev" className="hero-nav-btn prev" onClick={prevImage}>&lt;</button>
                    <button id="hero-next" className="hero-nav-btn next" onClick={nextImage}>&gt;</button>
                </>
            )}
        </section>
    );
};

export default Hero; 