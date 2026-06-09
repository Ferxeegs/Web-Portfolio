'use client';

import React, { useEffect, useRef, useState } from 'react';

interface SplashScreenProps {
    onFinish: () => void;
}

interface PortalParticle {
    x: number;
    y: number;
    z: number;
    angle: number;
    radius: number;
    speed: number;
    color: { r: number; g: number; b: number };
    size: number;
}

const updateOverlayProgress = (
    progress: number,
    contentRef: React.RefObject<HTMLDivElement | null>,
    loaderBarRef: React.RefObject<HTMLDivElement | null>,
    progressTextRef: React.RefObject<HTMLDivElement | null>,
) => {
    if (loaderBarRef.current) {
        loaderBarRef.current.style.width = `${progress}%`;
    }
    if (progressTextRef.current) {
        progressTextRef.current.textContent = `${Math.round(progress)}%`;
    }
    if (contentRef.current) {
        contentRef.current.style.opacity = progress > 75
            ? String(Math.max(0, (95 - progress) / 20))
            : '1';
    }
};

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
    const [isVisible, setIsVisible] = useState(true);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const loaderBarRef = useRef<HTMLDivElement>(null);
    const progressTextRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef(0);
    const onFinishRef = useRef(onFinish);

    useEffect(() => {
        onFinishRef.current = onFinish;
    }, [onFinish]);

    useEffect(() => {
        const hasVisited = typeof window !== 'undefined' && sessionStorage.getItem('hasVisited') === 'true';
        if (hasVisited) {
            setIsVisible(false);
            progressRef.current = 100;
            onFinishRef.current();
            return;
        }

        let progressInterval: ReturnType<typeof setInterval> | null = null;

        progressInterval = setInterval(() => {
            const prev = progressRef.current;

            if (prev >= 100) {
                if (progressInterval) clearInterval(progressInterval);

                setTimeout(() => {
                    setIsVisible(false);

                    setTimeout(() => {
                        try {
                            sessionStorage.setItem('hasVisited', 'true');
                        } catch {
                            // ignore storage errors
                        }
                        onFinishRef.current();
                    }, 500);
                }, 250);

                return;
            }

            const step = prev > 75 ? 3.0 : 1.2;
            const next = Math.min(100, prev + step);
            progressRef.current = next;
            updateOverlayProgress(next, contentRef, loaderBarRef, progressTextRef);
        }, 50);

        // 2. Galaxy Portal Canvas Animation
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: false });
        if (!ctx) return;

        let animationFrameId = 0;
        let dpr = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2);
        let width = window.innerWidth;
        let height = window.innerHeight;
        
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const handleResize = () => {
            if (!canvas || !ctx) return;
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };
        window.addEventListener('resize', handleResize);

        // Particle configuration
        const PARTICLE_COUNT = 850;
        const particles: PortalParticle[] = [];

        // Color palettes (RGB values for blending)
        const PALETTE = [
            { r: 139, g: 92, b: 246 },  // Violet
            { r: 236, g: 72, b: 153 },  // Pink/Magenta
            { r: 6, g: 182, b: 212 },   // Cyan
            { r: 59, g: 130, b: 246 },  // Blue
        ];

        // Initialize particles in a 3D spiral galaxy shape
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const angle = Math.random() * Math.PI * 2;
            const arm = Math.floor(Math.random() * 3) * (Math.PI * 2 / 3);
            const radius = 20 + Math.pow(Math.random(), 1.5) * 380;
            const spiralAngle = angle + arm + (radius * 0.008);
            
            particles.push({
                x: Math.cos(spiralAngle) * radius,
                y: Math.sin(spiralAngle) * radius,
                z: 100 + Math.random() * 900, // Depth
                angle: spiralAngle,
                radius: radius,
                speed: 0.15 + (1 / radius) * 5 + Math.random() * 0.05, // Orbit speed
                color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
                size: 0.8 + Math.random() * 2.2,
            });
        }

        let cameraZ = 0;

        const renderLoop = () => {
            animationFrameId = requestAnimationFrame(renderLoop);

            const currentProgress = progressRef.current;
            const cx = width / 2;
            const cy = height / 2;

            // Clear screen (with trail effect during hyperdrive, or solid clear)
            if (currentProgress > 75) {
                // Dimmer opacity clear to create beautiful warp speed trails
                ctx.fillStyle = 'rgba(3, 1, 10, 0.18)';
                ctx.fillRect(0, 0, width, height);
                
                // Accelerate camera movement into the portal
                const zoomFactor = Math.pow((currentProgress - 75) / 25, 2.5); // accelerating curve
                cameraZ += 12 * zoomFactor + 1.2;
            } else {
                ctx.fillStyle = '#03010a';
                ctx.fillRect(0, 0, width, height);
            }

            // Draw Background Cosmic Glow
            const glowSize = Math.min(width, height) * (currentProgress > 75 ? 0.35 + (currentProgress - 75) * 0.05 : 0.35);
            const cosmicGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowSize);
            cosmicGlow.addColorStop(0, 'rgba(88, 28, 135, 0.22)');
            cosmicGlow.addColorStop(0.5, 'rgba(124, 58, 237, 0.06)');
            cosmicGlow.addColorStop(1, 'rgba(3, 1, 10, 0)');
            ctx.fillStyle = cosmicGlow;
            ctx.beginPath();
            ctx.arc(cx, cy, glowSize, 0, Math.PI * 2);
            ctx.fill();

            // Render particles
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                const p = particles[i];

                // Orbit motion
                p.angle += p.speed * 0.03;
                
                // Pull slowly inwards to the portal center
                if (currentProgress <= 75) {
                    p.radius -= 0.15;
                    if (p.radius < 5) {
                        p.radius = 280 + Math.random() * 100;
                    }
                }
                
                // Update X and Y coordinates based on orbit
                p.x = Math.cos(p.angle) * p.radius;
                p.y = Math.sin(p.angle) * p.radius;

                // Adjust depth Z relative to camera
                let relZ = p.z - cameraZ;
                let didReset = false;
                
                // If particle is behind camera, wrap it to the far background
                if (relZ <= 0) {
                    p.z = cameraZ + 900 + Math.random() * 100;
                    relZ = p.z - cameraZ;
                    didReset = true;
                }

                // 3D projection
                const fov = 420;
                const scale = fov / relZ;
                const px = cx + p.x * scale;
                const py = cy + p.y * scale;

                // Only draw if within bounds
                if (px >= 0 && px <= width && py >= 0 && py <= height) {
                    const alpha = Math.min(1, scale * 0.25);
                    ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${alpha})`;

                    if (currentProgress > 75) {
                        // Skip warp streak drawing on wrap-around frame to prevent screen-spanning flickers
                        if (!didReset) {
                            const prevRelZ = p.z - (cameraZ - (10 * Math.pow((currentProgress - 75) / 25, 2) + 1));
                            const prevScale = fov / Math.max(1, prevRelZ);
                            const prevPx = cx + p.x * prevScale;
                            const prevPy = cy + p.y * prevScale;

                            ctx.strokeStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${alpha * 0.6})`;
                            ctx.lineWidth = Math.min(8, p.size * scale * 0.65);
                            ctx.beginPath();
                            ctx.moveTo(prevPx, prevPy);
                            ctx.lineTo(px, py);
                            ctx.stroke();
                        }
                    } else {
                        // Draw soft circular particles (capped size to prevent GPU drawing stutters/flickers)
                        ctx.beginPath();
                        ctx.arc(px, py, Math.min(12, p.size * scale * 0.5), 0, Math.PI * 2);
                        ctx.fill();
                    }
                }
            }

            // Draw Core Portal Light (expands to fill screen at 92%-100% progress)
            if (currentProgress > 50) {
                let coreRadius = Math.min(width, height) * 0.015;
                let coreAlpha = (currentProgress - 50) / 42; // fades in up to 92%
                
                if (currentProgress > 92) {
                    // Accelerating expansion to swallow the viewer
                    const expansionProgress = (currentProgress - 92) / 8; // 0 to 1
                    coreRadius += Math.max(width, height) * 1.5 * Math.pow(expansionProgress, 3);
                    coreAlpha = 1;
                }

                const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(1, coreRadius));
                if (currentProgress > 92) {
                    // Blinding white-blue transition
                    coreGrad.addColorStop(0, '#ffffff');
                    coreGrad.addColorStop(0.4, 'rgba(235, 243, 255, 1)');
                    coreGrad.addColorStop(0.7, 'rgba(139, 92, 246, 0.8)');
                    coreGrad.addColorStop(1, 'rgba(3, 1, 10, 0)');
                } else {
                    // Standard glowing core portal
                    coreGrad.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
                    coreGrad.addColorStop(0.2, 'rgba(167, 139, 250, 0.8)');
                    coreGrad.addColorStop(0.6, 'rgba(139, 92, 246, 0.25)');
                    coreGrad.addColorStop(1, 'rgba(3, 1, 10, 0)');
                }

                ctx.fillStyle = coreGrad;
                ctx.globalAlpha = Math.min(1, Math.max(0, coreAlpha));
                ctx.beginPath();
                ctx.arc(cx, cy, coreRadius, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalAlpha = 1.0; // Reset alpha
            }
        };

        renderLoop();

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
            if (progressInterval) clearInterval(progressInterval);
        };
    }, []);

    return (
        <div className={`splash-screen ${!isVisible ? 'splash-fadeout' : ''}`}>
            <canvas
                ref={canvasRef}
                className="splash-portal-canvas"
                aria-hidden="true"
            />

            <div
                ref={contentRef}
                className="splash-content pointer-events-none select-none"
            >
                <div className="splash-text">
                    <h1 className="splash-title">
                        <span className="splash-welcome">Welcome To My</span>
                        <span className="splash-portfolio">Portfolio Website</span>
                    </h1>
                    <p className="splash-subtitle">Get ready to explore my world!</p>
                </div>

                <div className="splash-loader">
                    <div ref={loaderBarRef} className="splash-loader-bar" />
                </div>

                <div ref={progressTextRef} className="splash-progress-text">
                    0%
                </div>
            </div>
        </div>
    );
};

export default SplashScreen;