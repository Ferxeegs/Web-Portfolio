// components/Navigation.tsx
"use client"; // Pastikan ini ada di paling atas

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { navigationItems } from '../constants/Data';

interface NavigationProps {
    isScrolled: boolean;
    isMobileMenuOpen: boolean;
    setIsMobileMenuOpen: (open: boolean) => void;
    scrollToSection: (sectionId: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({
    isScrolled,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    scrollToSection
}) => {
    const [isMounted, setIsMounted] = useState(false);
    
    // FIX: Paksa nilai awal SAMA dengan server (scrolledFalse)
    const scrolledTrue = 'bg-black/80 backdrop-blur-2xl shadow-2xl border-b border-gray-800/50';
    const scrolledFalse = 'bg-transparent border-transparent';
    const [scrolledClass, setScrolledClass] = useState(scrolledFalse);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Update kelas HANYA setelah mount dan isScrolled berubah
    useEffect(() => {
        if (!isMounted) return;
        setScrolledClass(isScrolled ? scrolledTrue : scrolledFalse);
    }, [isScrolled, isMounted]);

    return (
        <nav 
            suppressHydrationWarning
            className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolledClass}`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4 sm:py-6">
                    <div className="relative text-xl sm:text-2xl font-bold">
                        <span className="relative z-10 bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent inline-block animate-gradient">
                            Ferxcode
                        </span>
                        <div className="absolute inset-0 blur-xl bg-gradient-to-r from-violet-400/20 via-purple-400/20 to-fuchsia-400/20 animate-glow" />
                    </div>
                    
                    <div className="hidden md:flex space-x-6 lg:space-x-8">
                        {navigationItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className="relative text-gray-300 hover:text-violet-400 transition-all duration-300 capitalize group text-sm lg:text-base font-bold"
                            >
                                {item.label}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-400 to-purple-400 transition-all duration-300 group-hover:w-full" />
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 text-gray-300 hover:text-violet-400 transition-colors duration-300"
                    >
                        {isMounted && isMobileMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>

                {isMounted && isMobileMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-2xl border-b border-gray-800/50">
                        <div className="px-4 py-6 space-y-4">
                            {navigationItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        scrollToSection(item.id);
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="block w-full text-left text-gray-300 hover:text-violet-400 transition-all duration-300 capitalize text-base font-bold py-1"
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navigation;