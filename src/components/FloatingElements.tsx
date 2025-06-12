// components/FloatingElements.tsx
import React from 'react';

const FloatingElements: React.FC = () => {
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {/* Animated gradient orbs - responsive positioning */}
            <div 
                className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-violet-600/6 sm:bg-violet-600/8 rounded-full blur-3xl animate-pulse"
                style={{ animationDuration: '4s' }} 
            />
            <div 
                className="absolute top-3/4 right-1/4 w-40 h-40 sm:w-64 sm:h-64 lg:w-80 lg:h-80 bg-purple-600/6 sm:bg-purple-600/8 rounded-full blur-3xl animate-pulse"
                style={{ animationDuration: '6s', animationDelay: '2s' }} 
            />
            <div 
                className="absolute bottom-1/4 left-1/3 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-fuchsia-600/6 sm:bg-fuchsia-600/8 rounded-full blur-3xl animate-pulse"
                style={{ animationDuration: '5s', animationDelay: '1s' }} 
            />

            {/* Floating particles - hidden on mobile for performance */}
            <div 
                className="hidden sm:block absolute top-20 left-10 w-2 h-2 bg-violet-400/20 rounded-full animate-bounce"
                style={{ animationDuration: '3s' }} 
            />
            <div 
                className="hidden sm:block absolute top-40 right-20 w-1 h-1 bg-purple-400/25 rounded-full animate-bounce"
                style={{ animationDuration: '4s', animationDelay: '1s' }} 
            />
            <div 
                className="hidden sm:block absolute bottom-40 left-1/4 w-1.5 h-1.5 bg-fuchsia-400/20 rounded-full animate-bounce"
                style={{ animationDuration: '5s', animationDelay: '2s' }} 
            />
        </div>
    );
};

export default FloatingElements;