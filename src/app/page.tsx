// page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
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
    const [mounted, setMounted] = useState(false);
    
    const {
        isScrolled,
        visibleElements,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        scrollToSection,
    } = usePortfolio();

    useEffect(() => {
        setMounted(true);
        const hasVisited = sessionStorage.getItem('hasVisited');
        if (hasVisited) {
            setShowSplash(false);
            setIsLoaded(true);
        }
    }, []);

    const handleSplashFinish = () => {
        setShowSplash(false);
        sessionStorage.setItem('hasVisited', 'true');
        setTimeout(() => setIsLoaded(true), 100);
    };

    // FIX: Logika Scroll Dinamis untuk menangani hash apa pun
    useEffect(() => {
        if (!showSplash && mounted) {
            // Ambil hash dari URL (misal: #contact)
            const currentHash = window.location.hash;

            if (currentHash) {
                // Beri delay sedikit lebih lama (200ms-300ms) 
                // agar transisi opacity isLoaded selesai dan DOM stabil
                const timer = setTimeout(() => {
                    const id = currentHash.replace('#', '');
                    const element = document.getElementById(id);
                    
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 300); 

                return () => clearTimeout(timer);
            }
        }
    }, [showSplash, mounted]);

    if (!mounted || showSplash) {
        return <SplashScreen onFinish={handleSplashFinish} />;
    }

    return (
        <div className={`bg-black text-white transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
        }`}>
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