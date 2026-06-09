export interface ParticleSystemConfig {
    particleCount: number;
    connectionDistance: number;
    mouseRadius: number;
    mouseForce: number;
    particleSpeed: number;
    friction: number;
    particleRadius: number;
    lineOpacity: number;
    dotOpacity: number;
    colors: {
        dot: string;
        line: string;
        cursorLine: string;
    };
}

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    baseRadius: number;
}

const DEFAULT_CONFIG: ParticleSystemConfig = {
    particleCount: 90,
    connectionDistance: 130,
    mouseRadius: 160,
    mouseForce: 0.45,
    particleSpeed: 0.22,
    friction: 0.965,
    particleRadius: 1.5,
    lineOpacity: 0.12,
    dotOpacity: 0.55,
    colors: {
        dot: '147, 197, 253',
        line: '96, 165, 250',
        cursorLine: '167, 139, 250',
    },
};

function getParticleCount(width: number, height: number, isMobile: boolean, configured: number): number {
    const area = width * height;
    const density = isMobile ? 1 / 12000 : 1 / 8000;
    const adaptive = Math.floor(area * density);
    const min = isMobile ? 50 : 70;
    const max = isMobile ? 90 : 130;
    return Math.max(min, Math.min(max, Math.max(configured, adaptive)));
}

export class ParticleSystem {
    private ctx: CanvasRenderingContext2D;
    private particles: Particle[] = [];
    private mouse = { x: -9999, y: -9999, active: false };
    private width = 0;
    private height = 0;
    private dpr = 1;
    private isMobile = false;
    private animationId = 0;
    private running = false;
    private connectionDistanceSq = 0;
    private mouseRadiusSq = 0;
    private grid: number[][] = [];
    private gridCols = 0;
    private gridRows = 0;
    private cellSize = 0;
    private resizeTimer = 0;
    private lastTimestamp = 0;

    private readonly onResize: () => void;
    private readonly onMouseMove: (event: MouseEvent) => void;
    private readonly onMouseLeave: () => void;
    private readonly onTouchMove: (event: TouchEvent) => void;
    private readonly onTouchEnd: () => void;
    private readonly onVisibilityChange: () => void;

    constructor(
        private canvas: HTMLCanvasElement,
        private config: ParticleSystemConfig = DEFAULT_CONFIG,
    ) {
        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) {
            throw new Error('Could not get 2D canvas context');
        }
        this.ctx = ctx;

        this.connectionDistanceSq = config.connectionDistance ** 2;
        this.mouseRadiusSq = config.mouseRadius ** 2;
        this.cellSize = config.connectionDistance;

        this.isMobile = window.matchMedia('(max-width: 768px)').matches;

        this.onResize = () => this.debouncedResize();
        this.onMouseMove = (event) => {
            this.mouse.x = event.clientX;
            this.mouse.y = event.clientY;
            this.mouse.active = true;
        };
        this.onMouseLeave = () => {
            this.mouse.active = false;
        };
        this.onTouchMove = (event) => {
            if (event.touches.length > 0) {
                this.mouse.x = event.touches[0].clientX;
                this.mouse.y = event.touches[0].clientY;
                this.mouse.active = true;
            }
        };
        this.onTouchEnd = () => {
            this.mouse.active = false;
        };
        this.onVisibilityChange = () => {
            if (document.hidden) {
                this.pause();
            } else if (!this.running) {
                this.resume();
            }
        };
    }

    start(): void {
        this.handleResize();
        window.addEventListener('resize', this.onResize, { passive: true });
        window.addEventListener('mousemove', this.onMouseMove, { passive: true });
        document.addEventListener('mouseleave', this.onMouseLeave);
        window.addEventListener('touchmove', this.onTouchMove, { passive: true });
        window.addEventListener('touchend', this.onTouchEnd, { passive: true });
        document.addEventListener('visibilitychange', this.onVisibilityChange);

        this.running = true;
        this.lastTimestamp = 0;
        this.animationId = requestAnimationFrame(this.tick);
    }

    destroy(): void {
        this.running = false;
        cancelAnimationFrame(this.animationId);
        clearTimeout(this.resizeTimer);
        window.removeEventListener('resize', this.onResize);
        window.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseleave', this.onMouseLeave);
        window.removeEventListener('touchmove', this.onTouchMove);
        window.removeEventListener('touchend', this.onTouchEnd);
        document.removeEventListener('visibilitychange', this.onVisibilityChange);
    }

    private pause(): void {
        this.running = false;
        cancelAnimationFrame(this.animationId);
    }

    private resume(): void {
        if (this.running) return;
        this.running = true;
        this.lastTimestamp = 0;
        this.animationId = requestAnimationFrame(this.tick);
    }

    private handleResize(): void {
        this.isMobile = window.matchMedia('(max-width: 768px)').matches;
        this.dpr = Math.min(window.devicePixelRatio || 1, 2);
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.canvas.width = Math.floor(this.width * this.dpr);
        this.canvas.height = Math.floor(this.height * this.dpr);
        this.canvas.style.width = `${this.width}px`;
        this.canvas.style.height = `${this.height}px`;
        this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);

        this.initParticles();
        this.initGrid();
    }

    private debouncedResize = (): void => {
        clearTimeout(this.resizeTimer);
        this.resizeTimer = window.setTimeout(() => this.handleResize(), 150);
    };

    private initParticles(): void {
        const count = getParticleCount(this.width, this.height, this.isMobile, this.config.particleCount);
        const { particleSpeed } = this.config;

        this.particles = Array.from({ length: count }, () => ({
            x: Math.random() * this.width,
            y: Math.random() * this.height,
            vx: (Math.random() - 0.5) * particleSpeed,
            vy: (Math.random() - 0.5) * particleSpeed,
            baseRadius: this.config.particleRadius,
        }));
    }

    private initGrid(): void {
        this.gridCols = Math.ceil(this.width / this.cellSize) + 1;
        this.gridRows = Math.ceil(this.height / this.cellSize) + 1;
        this.grid = Array.from({ length: this.gridCols * this.gridRows }, () => []);
    }

    private buildSpatialGrid(): void {
        for (let i = 0; i < this.grid.length; i++) {
            this.grid[i].length = 0;
        }

        for (let i = 0; i < this.particles.length; i++) {
            const particle = this.particles[i];
            const col = Math.floor(particle.x / this.cellSize);
            const row = Math.floor(particle.y / this.cellSize);

            if (col >= 0 && col < this.gridCols && row >= 0 && row < this.gridRows) {
                this.grid[row * this.gridCols + col].push(i);
            }
        }
    }

    private getMouseProximity(distSq: number): number {
        if (!this.mouse.active || distSq >= this.mouseRadiusSq) return 0;
        const dist = Math.sqrt(distSq);
        return 1 - dist / this.config.mouseRadius;
    }

    private updateParticles(delta: number): void {
        const { friction, mouseForce, mouseRadius, particleSpeed } = this.config;
        const mouseRadiusSq = this.mouseRadiusSq;
        const drift = delta * 60;

        for (let i = 0; i < this.particles.length; i++) {
            const particle = this.particles[i];

            if (this.mouse.active) {
                const dx = particle.x - this.mouse.x;
                const dy = particle.y - this.mouse.y;
                const distSq = dx * dx + dy * dy;

                if (distSq < mouseRadiusSq && distSq > 1) {
                    const dist = Math.sqrt(distSq);
                    const proximity = 1 - dist / mouseRadius;
                    const force = mouseForce * proximity * proximity * drift;

                    particle.vx += (dx / dist) * force;
                    particle.vy += (dy / dist) * force;
                }
            }

            particle.vx += (Math.random() - 0.5) * 0.015 * drift;
            particle.vy += (Math.random() - 0.5) * 0.015 * drift;

            const speed = Math.hypot(particle.vx, particle.vy);
            const maxSpeed = particleSpeed * 2.2;
            if (speed > maxSpeed) {
                particle.vx = (particle.vx / speed) * maxSpeed;
                particle.vy = (particle.vy / speed) * maxSpeed;
            }

            const damp = Math.pow(friction, drift);
            particle.vx *= damp;
            particle.vy *= damp;

            particle.x += particle.vx * drift;
            particle.y += particle.vy * drift;

            const margin = 20;
            if (particle.x < margin) {
                particle.x = margin;
                particle.vx *= -0.5;
            } else if (particle.x > this.width - margin) {
                particle.x = this.width - margin;
                particle.vx *= -0.5;
            }
            if (particle.y < margin) {
                particle.y = margin;
                particle.vy *= -0.5;
            } else if (particle.y > this.height - margin) {
                particle.y = this.height - margin;
                particle.vy *= -0.5;
            }
        }
    }

    private drawLine(x1: number, y1: number, x2: number, y2: number, opacity: number, color: string): void {
        if (opacity <= 0.01) return;
        this.ctx.strokeStyle = `rgba(${color}, ${opacity})`;
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
    }

    private connectParticles(
        a: Particle,
        b: Particle,
        connectionDistance: number,
        lineOpacity: number,
        color: string,
        boost = 1,
    ): void {
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distSq = dx * dx + dy * dy;

        if (distSq >= this.connectionDistanceSq) return;

        const dist = Math.sqrt(distSq);
        const opacity = lineOpacity * boost * (1 - dist / connectionDistance);
        this.drawLine(a.x, a.y, b.x, b.y, opacity, color);
    }

    private draw(): void {
        const { ctx, width, height } = this;
        const { connectionDistance, lineOpacity, dotOpacity, colors } = this.config;

        ctx.clearRect(0, 0, width, height);
        this.buildSpatialGrid();

        ctx.lineWidth = 0.8;

        for (let row = 0; row < this.gridRows; row++) {
            for (let col = 0; col < this.gridCols; col++) {
                const cell = this.grid[row * this.gridCols + col];
                if (cell.length === 0) continue;

                for (let ci = 0; ci < cell.length; ci++) {
                    const i = cell[ci];
                    const a = this.particles[i];

                    for (let dj = ci + 1; dj < cell.length; dj++) {
                        this.connectParticles(a, this.particles[cell[dj]], connectionDistance, lineOpacity, colors.line);
                    }

                    for (let nr = row; nr <= row + 1; nr++) {
                        for (let nc = col + (nr === row ? 1 : 0); nc <= col + 1; nc++) {
                            if (nr >= this.gridRows || nc >= this.gridCols) continue;
                            const neighborCell = this.grid[nr * this.gridCols + nc];

                            for (let ni = 0; ni < neighborCell.length; ni++) {
                                const j = neighborCell[ni];
                                if (j <= i) continue;
                                this.connectParticles(a, this.particles[j], connectionDistance, lineOpacity, colors.line);
                            }
                        }
                    }

                    if (this.mouse.active) {
                        const dx = a.x - this.mouse.x;
                        const dy = a.y - this.mouse.y;
                        const distSq = dx * dx + dy * dy;
                        const proximity = this.getMouseProximity(distSq);

                        if (proximity > 0) {
                            const lineBoost = 1 + proximity * 2.5;
                            const opacity = lineOpacity * lineBoost * proximity;
                            this.drawLine(a.x, a.y, this.mouse.x, this.mouse.y, opacity, colors.cursorLine);
                        }
                    }
                }
            }
        }

        for (let i = 0; i < this.particles.length; i++) {
            const particle = this.particles[i];
            let radius = particle.baseRadius;
            let alpha = dotOpacity;

            if (this.mouse.active) {
                const dx = particle.x - this.mouse.x;
                const dy = particle.y - this.mouse.y;
                const proximity = this.getMouseProximity(dx * dx + dy * dy);

                if (proximity > 0) {
                    radius += proximity * 1.2;
                    alpha = Math.min(dotOpacity + proximity * 0.45, 1);
                }
            }

            ctx.fillStyle = `rgba(${colors.dot}, ${alpha})`;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, radius, 0, Math.PI * 2);
            ctx.fill();
        }

        if (this.mouse.active) {
            const gradient = ctx.createRadialGradient(
                this.mouse.x,
                this.mouse.y,
                0,
                this.mouse.x,
                this.mouse.y,
                this.config.mouseRadius,
            );
            gradient.addColorStop(0, `rgba(${colors.cursorLine}, 0.07)`);
            gradient.addColorStop(0.5, `rgba(${colors.cursorLine}, 0.025)`);
            gradient.addColorStop(1, `rgba(${colors.cursorLine}, 0)`);

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(this.mouse.x, this.mouse.y, this.config.mouseRadius, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    private tick = (timestamp: number): void => {
        if (!this.running) return;

        const delta = this.lastTimestamp
            ? Math.min((timestamp - this.lastTimestamp) / 1000, 0.05)
            : 0.016;
        this.lastTimestamp = timestamp;

        this.updateParticles(delta);
        this.draw();
        this.animationId = requestAnimationFrame(this.tick);
    };
}
