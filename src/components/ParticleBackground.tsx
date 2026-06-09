'use client';

import React, { useEffect, useRef } from 'react';
import { ParticleSystem } from '../lib/particleSystem';

const ParticleBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        const isMobile = window.matchMedia('(max-width: 768px)').matches;

        const system = new ParticleSystem(canvas, {
            particleCount: isMobile ? 60 : 90,
            connectionDistance: isMobile ? 110 : 130,
            mouseRadius: isMobile ? 130 : 160,
            mouseForce: isMobile ? 0.35 : 0.45,
            particleSpeed: isMobile ? 0.18 : 0.22,
            friction: 0.965,
            particleRadius: isMobile ? 1.2 : 1.5,
            lineOpacity: 0.12,
            dotOpacity: 0.5,
            colors: {
                dot: '147, 197, 253',
                line: '96, 165, 250',
                cursorLine: '167, 139, 250',
            },
        });

        system.start();

        return () => {
            system.destroy();
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[1]"
            style={{ transform: 'translateZ(0)' }}
            aria-hidden="true"
        />
    );
};

export default ParticleBackground;
