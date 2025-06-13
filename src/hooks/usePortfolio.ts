// hooks/usePortfolio.ts
import { useState, useEffect } from 'react';

export const usePortfolio = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [visibleElements, setVisibleElements] = useState(new Set<string>());
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                if (entry.target.id) {
                    if (entry.isIntersecting) {
                        console.log(`Section visible: ${entry.target.id}`);
                        setVisibleElements(prev => new Set([...prev, entry.target.id]));
                    }
                }
            });
        };

        const initializeObserver = () => {
            const observer = new IntersectionObserver(observerCallback, {
                threshold: 0.1,
                rootMargin: '50px 0px'
            });

            // Observe all sections and animate-on-scroll elements
            const elementsToObserve = document.querySelectorAll('section, .animate-on-scroll');
            elementsToObserve.forEach(element => {
                if (element.id || element.classList.contains('animate-on-scroll')) {
                    observer.observe(element);
                    console.log(`Observing: ${element.id || element.className}`);
                }
            });

            return observer;
        };

        // Initialize after component mounts
        const timer = setTimeout(() => {
            const observer = initializeObserver();
            setIsInitialized(true);
            
            // Cleanup function
            return () => {
                observer.disconnect();
            };
        }, 500);

        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(timer);
        };
    }, []);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setIsMobileMenuOpen(false);
        }
    };

    return {
        isScrolled,
        visibleElements,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        scrollToSection,
        isInitialized
    };
};