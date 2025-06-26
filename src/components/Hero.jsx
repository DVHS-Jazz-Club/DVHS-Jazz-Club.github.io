import React, { useState, useEffect, useCallback, useRef, memo } from 'react';
import SmoothScrollLink from './SmoothScrollLink';

const Hero = memo(({ heroImages }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [allLoaded, setAllLoaded] = useState(false);
    const [firstImageLoaded, setFirstImageLoaded] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const loadedCount = useRef(0);
    const preloadedImages = useRef(new Set());

    const showImage = useCallback((index) => {
        const heroElement = document.querySelector('.hero');
        if (heroElement && heroImages.length > 0) {
            setIsTransitioning(true);
            
            // Set the new background image
            heroElement.style.backgroundImage = `linear-gradient(rgba(28, 59, 138, 0.3), rgba(28, 59, 138, 0.3)), url('${heroImages[index]}')`;
            
            // Remove transition state after animation completes
            setTimeout(() => {
                setIsTransitioning(false);
            }, 300);
        }
    }, [heroImages]);

    const nextImage = useCallback(() => {
        if (!isTransitioning) {
            setCurrentIndex(prevIndex => (prevIndex + 1) % heroImages.length);
        }
    }, [heroImages.length, isTransitioning]);

    const prevImage = useCallback(() => {
        if (!isTransitioning) {
            setCurrentIndex(prevIndex => (prevIndex - 1 + heroImages.length) % heroImages.length);
        }
    }, [heroImages.length, isTransitioning]);

    // Preload image function
    const preloadImage = useCallback((url, index) => {
        return new Promise((resolve, reject) => {
            const img = new window.Image();
            img.onload = () => {
                preloadedImages.current.add(index);
                loadedCount.current += 1;
                
                // Show first image immediately when it loads
                if (index === 0) {
                    setFirstImageLoaded(true);
                    showImage(0);
                }
                
                // Start rotation when all images are loaded
                if (loadedCount.current === heroImages.length) {
                    setAllLoaded(true);
                }
                resolve();
            };
            img.onerror = () => {
                loadedCount.current += 1;
                // Show first image even if it fails to load
                if (index === 0) {
                    setFirstImageLoaded(true);
                    showImage(0);
                }
                if (loadedCount.current === heroImages.length) {
                    setAllLoaded(true);
                }
                reject();
            };
            img.src = url;
        });
    }, [heroImages.length, showImage]);

    useEffect(() => {
        if (heroImages.length > 0) {
            loadedCount.current = 0;
            setAllLoaded(false);
            setFirstImageLoaded(false);
            setIsTransitioning(false);
            preloadedImages.current.clear();
            
            // Preload all images
            const preloadPromises = heroImages.map((url, index) => preloadImage(url, index));

            // Wait for all images to preload
            Promise.allSettled(preloadPromises).then(() => {
                // All images have been processed (success or failure)
                if (preloadedImages.current.size > 0) {
                    setAllLoaded(true);
                }
            });
        }
    }, [heroImages, preloadImage]);

    useEffect(() => {
        if (allLoaded && preloadedImages.current.has(currentIndex)) {
            showImage(currentIndex);
        }
    }, [currentIndex, allLoaded, showImage]);

    useEffect(() => {
        if (heroImages.length > 1 && allLoaded) {
            const intervalId = setInterval(nextImage, 3000);
            return () => clearInterval(intervalId);
        }
    }, [heroImages.length, nextImage, allLoaded]);

    return (
        <section id="home" className={`hero ${!firstImageLoaded ? 'hero-loading' : ''} ${isTransitioning ? 'hero-transitioning' : ''}`}>
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
            
            {heroImages.length > 1 && allLoaded && (
                <>
                    <button id="hero-prev" className="hero-nav-btn prev" onClick={prevImage}>&lt;</button>
                    <button id="hero-next" className="hero-nav-btn next" onClick={nextImage}>&gt;</button>
                </>
            )}
        </section>
    );
});

Hero.displayName = 'Hero';

export default Hero; 