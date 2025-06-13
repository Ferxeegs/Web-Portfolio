// page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import FloatingElements from '../components/FloatingElements';
import SplashScreen from '../components/SplashScreen';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import PortfolioSection from '../components/PortfolioSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import { usePortfolio } from '../hooks/usePortfolio';

const Portfolio: React.FC = () => {
    const [showSplash, setShowSplash] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);
    
    const {
        isScrolled,
        visibleElements,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        scrollToSection,
        isInitialized
    } = usePortfolio();

    const handleSplashFinish = () => {
        setShowSplash(false);
        // Add a small delay to ensure smooth transition
        setTimeout(() => {
            setIsLoaded(true);
        }, 100);
    };

    // Initialize scroll observer after splash
    useEffect(() => {
        if (!showSplash && isLoaded) {
            // Force a scroll event to check initial visibility
            const timer = setTimeout(() => {
                window.dispatchEvent(new Event('scroll'));
            }, 300);
            
            return () => clearTimeout(timer);
        }
    }, [showSplash, isLoaded]);

    if (showSplash) {
        return <SplashScreen onFinish={handleSplashFinish} />;
    }

    return (
        <div className={`bg-black text-white transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
        }`}>
            <FloatingElements />
            
            <Navigation 
                isScrolled={isScrolled}
                isMobileMenuOpen={isMobileMenuOpen}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
                scrollToSection={scrollToSection}
            />

            <main className="relative">
                <HeroSection scrollToSection={scrollToSection} />
                <AboutSection visibleElements={visibleElements} />
                <PortfolioSection visibleElements={visibleElements} />
                <ContactSection visibleElements={visibleElements} />
            </main>

            <Footer />
        </div>
    );
};

export default Portfolio;