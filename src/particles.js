document.addEventListener("DOMContentLoaded", () => {

    const canvas = document.getElementById('background-canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    const particleCount = 100;

    class Particle {
    constructor(x, y) {
        this.x = x || Math.random() * canvas.width;
        this.y = y || Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.5;
        this.fadeSpeed = Math.random() * 0.01 + 0.005;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity -= this.fadeSpeed;
        if (this.opacity <= 0) {
        this.opacity = Math.random() * 0.5 + 0.5;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        }
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = '#00aaff';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
    }

    function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    }

    function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    requestAnimationFrame(animateParticles);
    }

    function rippleParticles(centerX, centerY) {
    particles.forEach((particle, index) => {
        const dx = particle.x - centerX;
        const dy = particle.y - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const delay = distance * 2;
        setTimeout(() => {
        anime({
            targets: particle,
            opacity: [particle.opacity, 1],
            duration: 500,
            easing: 'easeOutQuad'
        });
        }, delay);
    });
    }

    window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    });

    initParticles();
    animateParticles();

    window.rippleParticles = rippleParticles;
});