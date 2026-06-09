'use client';

import React, { useEffect, useRef } from 'react';

interface BgStar {
    x: number;
    y: number;
    size: number;
    baseOpacity: number;
    twinkleSpeed: number;
    twinklePhase: number;
}

interface Planet {
    orbitRatio: number;
    size: number;
    color: string;
    highlight: string;
    shadow: string;
    orbitSpeed: number;
    spinSpeed: number;
    ringType?: 'saturn' | 'uranus';
    moonsCount?: number;
    angle: number;
    spin: number;
}

interface SceneMetrics {
    width: number;
    height: number;
    cx: number;
    cy: number;
    maxOrbit: number;
}

const MIN_SIZE = 48;
const STAR_COUNT = 50;
const PARALLAX_LERP = 0.06;

const PLANET_DEFS: Omit<Planet, 'angle' | 'spin'>[] = [
    // 1. Mercury (Merkurius): Grey, closest, fast orbit, slow rotation
    {
        orbitRatio: 0.20,
        size: 1.8,
        color: '#8c8c8c',
        highlight: '#c0c0c0',
        shadow: '#404040',
        orbitSpeed: 1.63,
        spinSpeed: 0.025
    },
    // 2. Venus: Yellow-orange atmosphere, slow retrograde (clockwise) rotation
    {
        orbitRatio: 0.28,
        size: 2.5,
        color: '#e3bb76',
        highlight: '#fce9c8',
        shadow: '#7d5a23',
        orbitSpeed: 1.02,
        spinSpeed: -0.006
    },
    // 3. Earth (Bumi): Blue marble, 1 moon, moderate rotation
    {
        orbitRatio: 0.36,
        size: 3.0,
        color: '#2b82c9',
        highlight: '#8bc4f2',
        shadow: '#103b6b',
        orbitSpeed: 0.8,
        spinSpeed: 1.5,
        moonsCount: 1
    },
    // 4. Mars: Red planet, 2 moons, moderate rotation
    {
        orbitRatio: 0.45,
        size: 2.4,
        color: '#c1440e',
        highlight: '#e77d52',
        shadow: '#5c1903',
        orbitSpeed: 0.58,
        spinSpeed: 1.47,
        moonsCount: 2
    },
    // 5. Jupiter: Banded gas giant, 3 moons (visual representation), fast rotation
    {
        orbitRatio: 0.58,
        size: 6.2,
        color: '#b07f35',
        highlight: '#e8c48f',
        shadow: '#523610',
        orbitSpeed: 0.23,
        spinSpeed: 3.63,
        moonsCount: 3
    },
    // 6. Saturn (Saturnus): Golden ringed gas giant, rings, 2 moons, fast rotation
    {
        orbitRatio: 0.72,
        size: 4.8,
        color: '#e2bf7d',
        highlight: '#f9ebcd',
        shadow: '#6e552a',
        orbitSpeed: 0.14,
        spinSpeed: 3.36,
        ringType: 'saturn',
        moonsCount: 2
    },
    // 7. Uranus: Pale cyan gas giant, vertical rings, 2 moons, retrograde (clockwise) rotation
    {
        orbitRatio: 0.85,
        size: 3.8,
        color: '#6ca8d8',
        highlight: '#b4e1fa',
        shadow: '#2b5075',
        orbitSpeed: 0.09,
        spinSpeed: -2.10,
        ringType: 'uranus',
        moonsCount: 2
    },
    // 8. Neptune (Neptunus): Deep blue ice giant, 1 moon, fast rotation
    {
        orbitRatio: 0.98,
        size: 3.6,
        color: '#274687',
        highlight: '#5c86db',
        shadow: '#0f1c3d',
        orbitSpeed: 0.062,
        spinSpeed: 2.24,
        moonsCount: 1
    }
];

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const isReady = (w: number, h: number) => w >= MIN_SIZE && h >= MIN_SIZE;

class SolarSystemRenderer {
    private stars: BgStar[] = [];
    private planets: Planet[] = PLANET_DEFS.map((p) => ({
        ...p,
        angle: Math.random() * Math.PI * 2,
        spin: Math.random() * Math.PI * 2,
    }));
    private time = 0;

    resize(metrics: SceneMetrics) {
        this.stars = Array.from({ length: STAR_COUNT }, () => ({
            x: Math.random() * metrics.width,
            y: Math.random() * metrics.height,
            size: 0.3 + Math.random() * 0.9,
            baseOpacity: 0.15 + Math.random() * 0.35,
            twinkleSpeed: 0.4 + Math.random() * 1.2,
            twinklePhase: Math.random() * Math.PI * 2,
        }));
    }

    update(delta: number) {
        this.time += delta;
        for (const planet of this.planets) {
            planet.angle += planet.orbitSpeed * delta;
            planet.spin += planet.spinSpeed * delta;
        }
    }

    draw(ctx: CanvasRenderingContext2D, metrics: SceneMetrics, parallax: { x: number; y: number }) {
        const { width, height, cx, cy, maxOrbit } = metrics;
        const px = parallax.x * 4;
        const py = parallax.y * 3;
        const sunCx = cx + px;
        const sunCy = cy + py;

        ctx.clearRect(0, 0, width, height);
        this.drawBackground(ctx, width, height);
        this.drawStars(ctx);
        this.drawOrbits(ctx, sunCx, sunCy, maxOrbit);
        this.drawSun(ctx, sunCx, sunCy, maxOrbit * 0.1);

        for (const planet of this.planets) {
            this.drawPlanet(ctx, sunCx, sunCy, maxOrbit, planet);
        }
    }

    private drawBackground(ctx: CanvasRenderingContext2D, width: number, height: number) {
        const radius = Math.max(width, height) * 0.55;
        const bg = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, radius);
        bg.addColorStop(0, 'rgba(20, 40, 90, 0.22)');
        bg.addColorStop(0.45, 'rgba(10, 22, 55, 0.1)');
        bg.addColorStop(0.75, 'rgba(6, 14, 35, 0.04)');
        bg.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, width, height);
    }

    private drawStars(ctx: CanvasRenderingContext2D) {
        for (const star of this.stars) {
            const twinkle = 0.55 + Math.sin(this.time * star.twinkleSpeed + star.twinklePhase) * 0.45;
            ctx.globalAlpha = star.baseOpacity * twinkle;
            ctx.fillStyle = '#e8f0ff';
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.globalAlpha = 1;
    }

    private drawOrbits(ctx: CanvasRenderingContext2D, cx: number, cy: number, maxOrbit: number) {
        for (const planet of this.planets) {
            const r = maxOrbit * planet.orbitRatio;
            ctx.beginPath();
            ctx.arc(cx, cy, r, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(90, 130, 210, 0.07)';
            ctx.lineWidth = 0.6;
            ctx.stroke();
        }
    }

    private drawSun(ctx: CanvasRenderingContext2D, cx: number, cy: number, radius: number) {
        const pulse = 1 + Math.sin(this.time * 1.4) * 0.04;
        const glowRadius = radius * 3 * pulse;

        // 1. Solar Rays (Cahaya yang memancar)
        const rayCount = 12;
        ctx.save();
        ctx.translate(cx, cy);
        for (let i = 0; i < rayCount; i++) {
            const baseAngle = (i / rayCount) * Math.PI * 2;
            const angleOffset = this.time * 0.12 + Math.sin(this.time * 0.7 + i) * 0.03;
            const angle = baseAngle + angleOffset;
            
            const length = radius * (3.8 + Math.sin(this.time * 1.8 + i * 1.3) * 0.6);
            const spread = 0.12 + Math.sin(this.time * 0.8 + i * 1.7) * 0.02;
            
            const angle1 = angle - spread;
            const angle2 = angle + spread;
            
            const x1 = Math.cos(angle1) * radius * 0.65;
            const y1 = Math.sin(angle1) * radius * 0.65;
            const x2 = Math.cos(angle) * length;
            const y2 = Math.sin(angle) * length;
            const x3 = Math.cos(angle2) * radius * 0.65;
            const y3 = Math.sin(angle2) * radius * 0.65;
            
            const rayGrad = ctx.createLinearGradient(0, 0, x2, y2);
            rayGrad.addColorStop(0, 'rgba(255, 235, 150, 0.28)');
            rayGrad.addColorStop(0.35, 'rgba(255, 160, 45, 0.10)');
            rayGrad.addColorStop(0.7, 'rgba(255, 90, 10, 0.03)');
            rayGrad.addColorStop(1, 'rgba(255, 50, 0, 0)');
            
            ctx.fillStyle = rayGrad;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.lineTo(x3, y3);
            ctx.closePath();
            ctx.fill();
        }
        ctx.restore();

        // 2. Solar Prominences / Magnetic Loops
        const loopCount = 4;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.strokeStyle = 'rgba(255, 130, 35, 0.45)';
        ctx.shadowColor = '#ff6c00';
        ctx.shadowBlur = 6 * pulse;
        ctx.lineWidth = 1.0;
        for (let i = 0; i < loopCount; i++) {
            const loopAngle = (i / loopCount) * Math.PI * 2 + this.time * 0.07;
            const startAngle = loopAngle - 0.14;
            const endAngle = loopAngle + 0.14;
            
            const x1 = Math.cos(startAngle) * radius * pulse;
            const y1 = Math.sin(startAngle) * radius * pulse;
            const x2 = Math.cos(endAngle) * radius * pulse;
            const y2 = Math.sin(endAngle) * radius * pulse;
            
            const ctrlDist = radius * (1.18 + Math.sin(this.time * 2.2 + i) * 0.08);
            const cx1 = Math.cos(loopAngle) * ctrlDist;
            const cy1 = Math.sin(loopAngle) * ctrlDist;
            
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.quadraticCurveTo(cx1, cy1, x2, y2);
            ctx.stroke();
        }
        ctx.shadowBlur = 0;
        ctx.restore();

        // 3. Radial Glow Layers
        const outerGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowRadius);
        outerGlow.addColorStop(0, 'rgba(255, 230, 140, 0.45)');
        outerGlow.addColorStop(0.35, 'rgba(255, 170, 50, 0.16)');
        outerGlow.addColorStop(0.7, 'rgba(255, 100, 15, 0.03)');
        outerGlow.addColorStop(1, 'rgba(255, 60, 0, 0)');
        ctx.fillStyle = outerGlow;
        ctx.beginPath();
        ctx.arc(cx, cy, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        const innerGlowRadius = radius * 1.5 * pulse;
        const innerGlow = ctx.createRadialGradient(cx, cy, radius * 0.5, cx, cy, innerGlowRadius);
        innerGlow.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
        innerGlow.addColorStop(0.2, 'rgba(255, 230, 100, 0.7)');
        innerGlow.addColorStop(0.6, 'rgba(255, 130, 20, 0.25)');
        innerGlow.addColorStop(1, 'rgba(255, 50, 0, 0)');
        ctx.fillStyle = innerGlow;
        ctx.beginPath();
        ctx.arc(cx, cy, innerGlowRadius, 0, Math.PI * 2);
        ctx.fill();

        // 4. Hot Core
        const core = ctx.createRadialGradient(cx - radius * 0.18, cy - radius * 0.18, 0, cx, cy, radius * pulse);
        core.addColorStop(0, '#ffffff');
        core.addColorStop(0.25, '#fff4cc');
        core.addColorStop(0.6, '#ffd54f');
        core.addColorStop(1, '#e65100');
        ctx.fillStyle = core;
        ctx.beginPath();
        ctx.arc(cx, cy, radius * pulse, 0, Math.PI * 2);
        ctx.fill();
    }

    private drawPlanet(
        ctx: CanvasRenderingContext2D,
        cx: number,
        cy: number,
        maxOrbit: number,
        planet: Planet,
    ) {
        const orbitR = maxOrbit * planet.orbitRatio;
        const x = cx + Math.cos(planet.angle) * orbitR;
        const y = cy + Math.sin(planet.angle) * orbitR;

        ctx.save();
        ctx.translate(x, y);

        // 1. Draw 3D Shading Gradient (always facing the Sun at the center)
        const lx = -Math.cos(planet.angle) * planet.size * 0.35;
        const ly = -Math.sin(planet.angle) * planet.size * 0.35;
        const body = ctx.createRadialGradient(lx, ly, 0, 0, 0, planet.size);
        body.addColorStop(0, planet.highlight);
        body.addColorStop(0.55, planet.color);
        body.addColorStop(1, planet.shadow);
        ctx.fillStyle = body;
        ctx.beginPath();
        ctx.arc(0, 0, planet.size, 0, Math.PI * 2);
        ctx.fill();

        // 2. Draw rotating atmospheric details (clipped to the planet sphere)
        ctx.save();
        ctx.beginPath();
        ctx.arc(0, 0, planet.size, 0, Math.PI * 2);
        ctx.clip();
        
        ctx.rotate(planet.spin);
        
        ctx.globalAlpha = 0.22;
        ctx.fillStyle = planet.shadow;
        ctx.beginPath();
        ctx.ellipse(0, -planet.size * 0.15, planet.size * 0.55, planet.size * 0.18, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(planet.size * 0.35, planet.size * 0.1, planet.size * 0.2, planet.size * 0.12, 0.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
        
        ctx.restore();

        // 3. Draw Rings (not spinning with the planet, constant beautiful tilt)
        if (planet.ringType === 'saturn') {
            ctx.save();
            ctx.rotate(Math.PI / 8); // Tilted relative to orbit plane
            
            // Outer ring
            ctx.beginPath();
            ctx.ellipse(0, 0, planet.size * 2.1, planet.size * 0.55, 0, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(225, 200, 160, 0.4)';
            ctx.lineWidth = 1.8;
            ctx.stroke();

            // Inner ring
            ctx.beginPath();
            ctx.ellipse(0, 0, planet.size * 1.6, planet.size * 0.42, 0, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(195, 170, 130, 0.5)';
            ctx.lineWidth = 2.2;
            ctx.stroke();
            
            ctx.restore();
        } else if (planet.ringType === 'uranus') {
            ctx.save();
            ctx.rotate(Math.PI / 2.3); // Vertical ring tilt
            ctx.beginPath();
            ctx.ellipse(0, 0, planet.size * 1.7, planet.size * 0.25, 0, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(170, 220, 240, 0.35)';
            ctx.lineWidth = 0.8;
            ctx.stroke();
            
            ctx.restore();
        }

        ctx.restore();

        if (planet.moonsCount && planet.moonsCount > 0) {
            for (let m = 0; m < planet.moonsCount; m++) {
                const moonSpeedMultiplier = 2.0 + m * 0.8;
                const moonAngle = planet.angle * moonSpeedMultiplier + this.time * (1.2 + m * 0.5) + (m * Math.PI * 0.6);
                const moonR = planet.size + 4.5 + m * 3.5;
                const mx = x + Math.cos(moonAngle) * moonR;
                const my = y + Math.sin(moonAngle) * moonR;
                const moonSize = Math.max(0.8, 1.3 - m * 0.25);
                
                const moonGrad = ctx.createRadialGradient(mx - moonSize * 0.3, my - moonSize * 0.3, 0, mx, my, moonSize);
                moonGrad.addColorStop(0, '#e8e8e8');
                moonGrad.addColorStop(1, '#707070');
                ctx.fillStyle = moonGrad;
                ctx.beginPath();
                ctx.arc(mx, my, moonSize, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }

}

const HeroSolarSystem: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rendererRef = useRef<SolarSystemRenderer | null>(null);
    const metricsRef = useRef<SceneMetrics>({ width: 0, height: 0, cx: 0, cy: 0, maxOrbit: 0 });
    const mouseRef = useRef({ x: 0.5, y: 0.5 });
    const parallaxRef = useRef({ x: 0, y: 0 });
    const animationRef = useRef(0);
    const lastTimeRef = useRef(0);
    const pageVisibleRef = useRef(true);

    useEffect(() => {
        const container = containerRef.current;
        const canvas = canvasRef.current;
        if (!container || !canvas) return;

        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        const getMotionScale = () => (motionQuery.matches ? 0.35 : 1);
        const renderer = new SolarSystemRenderer();
        rendererRef.current = renderer;

        const updateMetrics = (width: number, height: number): SceneMetrics => {
            const minDim = Math.min(width, height);
            const metrics: SceneMetrics = {
                width,
                height,
                cx: width / 2,
                cy: height / 2,
                maxOrbit: minDim * 0.47,
            };
            metricsRef.current = metrics;
            return metrics;
        };

        const resize = () => {
            const width = container.offsetWidth || container.clientWidth;
            const height = container.offsetHeight || container.clientHeight;
            if (!isReady(width, height)) return;

            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            renderer.resize(updateMetrics(width, height));
        };

        const draw = (timestamp: number) => {
            animationRef.current = requestAnimationFrame(draw);

            const metrics = metricsRef.current;
            if (!isReady(metrics.width, metrics.height)) {
                resize();
                return;
            }

            if (!pageVisibleRef.current) return;

            const delta = lastTimeRef.current
                ? Math.min((timestamp - lastTimeRef.current) / 1000, 0.05)
                : 0.016;
            lastTimeRef.current = timestamp;

            parallaxRef.current = {
                x: lerp(parallaxRef.current.x, mouseRef.current.x - 0.5, PARALLAX_LERP),
                y: lerp(parallaxRef.current.y, mouseRef.current.y - 0.5, PARALLAX_LERP),
            };

            renderer.update(delta * getMotionScale());
            renderer.draw(ctx, metrics, parallaxRef.current);
        };

        const onVisibilityChange = () => {
            pageVisibleRef.current = !document.hidden;
            if (pageVisibleRef.current) {
                lastTimeRef.current = 0;
            }
        };

        const handlePointer = (clientX: number, clientY: number) => {
            const rect = container.getBoundingClientRect();
            if (rect.width <= 0 || rect.height <= 0) return;
            mouseRef.current = {
                x: clamp((clientX - rect.left) / rect.width, 0, 1),
                y: clamp((clientY - rect.top) / rect.height, 0, 1),
            };
        };

        const onMouseMove = (e: MouseEvent) => handlePointer(e.clientX, e.clientY);
        const onTouchMove = (e: TouchEvent) => {
            if (e.touches[0]) handlePointer(e.touches[0].clientX, e.touches[0].clientY);
        };

        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(container);
        document.addEventListener('visibilitychange', onVisibilityChange);
        window.addEventListener('mousemove', onMouseMove, { passive: true });
        window.addEventListener('touchmove', onTouchMove, { passive: true });

        resize();
        lastTimeRef.current = 0;
        animationRef.current = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(animationRef.current);
            resizeObserver.disconnect();
            document.removeEventListener('visibilitychange', onVisibilityChange);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('touchmove', onTouchMove);
            rendererRef.current = null;
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative mx-auto aspect-square w-full min-h-[320px] max-w-[420px] sm:min-h-[400px] sm:max-w-[480px] lg:min-h-[460px] lg:max-w-[560px]"
        >
            <div className="pointer-events-none absolute inset-[-4%] rounded-full bg-[radial-gradient(circle,rgba(59,100,220,0.08)_0%,transparent_72%)] blur-3xl" />

            <canvas
                ref={canvasRef}
                className="absolute inset-0 h-full w-full"
                style={{ transform: 'translateZ(0)' }}
                aria-hidden="true"
            />
        </div>
    );
};

export default HeroSolarSystem;
