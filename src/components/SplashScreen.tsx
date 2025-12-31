import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
    onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // If user has already visited in this session, skip animation entirely
        const hasVisited = typeof window !== 'undefined' && sessionStorage.getItem('hasVisited') === 'true';
        if (hasVisited) {
            setIsVisible(false);
            setProgress(100);
            // Immediately notify parent that splash is finished
            onFinish();
            return;
        }

        // Animate progress bar
        let progressInterval: ReturnType<typeof setInterval> | null = null;
        let timer: ReturnType<typeof setTimeout> | null = null;

        progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    if (progressInterval) clearInterval(progressInterval);
                    return 100;
                }
                return prev + 2; // Increase by 2% every interval
            });
        }, 60); // Update every 60ms for smooth animation

        // Hide splash screen after progress completes
        timer = setTimeout(() => {
            if (progressInterval) clearInterval(progressInterval);
            setIsVisible(false);
            // After fade out delay, mark session as visited and call onFinish
            setTimeout(() => {
                try {
                    sessionStorage.setItem('hasVisited', 'true');
                } catch {
                    // ignore storage errors
                }
                onFinish();
            }, 500); // Wait for fade out animation
        }, 3200); // Show splash for 3.2 seconds (slightly longer to see 100%)

        return () => {
            if (timer) clearTimeout(timer);
            if (progressInterval) clearInterval(progressInterval);
        };
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
                    <div 
                        className="splash-loader-bar" 
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                
                {/* Progress percentage display */}
                <div className="splash-progress-text">
                    {progress}%
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