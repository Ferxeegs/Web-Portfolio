"use client";

import React from 'react';
import Navigation from '../components/Navigation';
import FloatingElements from '../components/FloatingElements';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import PortfolioSection from '../components/PortfolioSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import { usePortfolio } from '../hooks/usePortfolio';
import './globals.css';

const Portfolio: React.FC = () => {
    const {
        isScrolled,
        visibleElements,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        scrollToSection
    } = usePortfolio();

    return (
        <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
            <FloatingElements />

            <Navigation 
                isScrolled={isScrolled}
                isMobileMenuOpen={isMobileMenuOpen}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
                scrollToSection={scrollToSection}
            />

            <HeroSection 
                visibleElements={visibleElements}
                scrollToSection={scrollToSection}
            />

            <AboutSection visibleElements={visibleElements} />

            <PortfolioSection visibleElements={visibleElements} />

            <ContactSection visibleElements={visibleElements} />

            <Footer />
        </div>
    );
};

export default Portfolio;