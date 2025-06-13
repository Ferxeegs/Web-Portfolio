// components/SplashScreen.tsx
import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
    onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onFinish, 500); // Wait for fade out animation
        }, 3000); // Show splash for 3 seconds

        return () => clearTimeout(timer);
    }, [onFinish]);

    return (
        <div className={`splash-screen ${!isVisible ? 'splash-fadeout' : ''}`}>
            <div className="splash-content">
                <div className="splash-logo">
                    <div className="splash-circle">
                        <div className="splash-inner-circle"></div>
                    </div>
                </div>
                
                <div className="splash-text">
                    <h1 className="splash-title">
                        <span className="splash-welcome">Welcome To My</span>
                        <span className="splash-portfolio">Portfolio Website</span>
                    </h1>
                    <p className="splash-subtitle">Loading amazing experiences...</p>
                </div>
                
                <div className="splash-loader">
                    <div className="splash-loader-bar"></div>
                </div>
            </div>
            
            {/* Floating particles */}
            <div className="splash-particles">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className={`splash-particle splash-particle-${i + 1}`}></div>
                ))}
            </div>
        </div>
    );
};

export default SplashScreen;