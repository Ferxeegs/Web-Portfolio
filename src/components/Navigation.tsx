// components/Navigation.tsx
import React from 'react';
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
    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-500 
            ${isScrolled 
                ? 'bg-black/80 backdrop-blur-2xl shadow-2xl border-b border-gray-800/50' 
                : 'bg-transparent border-b border-transparent'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4 sm:py-6">
                    <div className="relative text-xl sm:text-2xl font-bold">
                        <span className="relative z-10 bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent inline-block animate-gradient">
                            Ferxcode
                        </span>
                        <div className="absolute inset-0 blur-xl bg-gradient-to-r from-violet-400/20 via-purple-400/20 to-fuchsia-400/20 animate-glow" />
                    </div>
                    
                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-6 lg:space-x-8">
                        {navigationItems.map((item, index) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className="relative text-gray-300 hover:text-violet-400 transition-all duration-300 capitalize group text-sm lg:text-base font-bold"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {item.label}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-400 to-purple-400 transition-all duration-300 group-hover:w-full" />
                                <span className="absolute inset-0 bg-violet-400/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 -z-10" />
                            </button>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 text-gray-300 hover:text-violet-400 transition-colors duration-300"
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-2xl border-b border-gray-800/50">
                        <div className="px-4 py-6 space-y-4">
                            {navigationItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => scrollToSection(item.id)}
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