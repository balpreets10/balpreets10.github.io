// HeroSection.js
class HeroSection {
    constructor() {

        console.log('HeroSection constructor called');
        console.log('Hero element exists:', !!document.getElementById('home'));
        this.heroData = {
            name: "BALPREET SINGH",
            title: "Team Leader / Senior Game Developer",
            subtitle: "Crafting Digital Worlds • Leading Creative Teams • Building Tomorrow's Games",
            journey: `Welcome to my interactive journey through the realm of game development.
                     From concept to completion, I've been shaping digital experiences that captivate,
                     challenge, and inspire players worldwide. Dive into my world where code meets creativity
                     and imagination becomes reality.</br><strong>This website is an example of my adaptability and scrappiness in learning new technologies and frameworks.</strong>`,
            floatingElements: [
                { icon: "fas fa-cube", position: "top: 20%; left: 10%; font-size: 2rem;", color: "rgba(0, 255, 136, 0.3)" },
                { icon: "fas fa-gamepad", position: "top: 60%; right: 15%; font-size: 1.5rem;", color: "rgba(0, 136, 255, 0.3)", delay: "-2s" },
                { icon: "fas fa-trophy", position: "top: 40%; right: 25%; font-size: 1.5rem;", color: "rgba(184, 236, 62, 0.3)", delay: "-2s" },
                { icon: "fas fa-code", position: "bottom: 30%; left: 20%; font-size: 1.8rem;", color: "rgba(255, 0, 136, 0.3)", delay: "-4s" },
                { icon: "fa-brands fa-unity", position: "bottom: 15%; left: 30%; font-size: 1.8rem;", color: "rgba(255, 255, 255, 0.3)", delay: "-4s" },
                { icon: "fa-brands fa-app-store-ios", position: "top: 40%; left: 15%; font-size: 1.8rem;", color: "rgba(255, 255, 255, 0.3)", delay: "-4s" }
            ]
        };

        this.init();
    }

    init() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        const heroSection = document.getElementById('home');
        if (!heroSection) return;

        heroSection.innerHTML = `
            <div class="hero-content">
                <h1 class="glitch-text" data-text="${this.heroData.name}">${this.heroData.name}</h1>
                <p class="title">${this.heroData.title}</p>
                <p class="subtitle">${this.heroData.subtitle}</p>
                <p class="journey-text">${this.heroData.journey}</p>
                <div class="cta-container">
                    <a href="#game" class="cta-btn">
                        <i class="fas fa-play"></i> My Journey
                    </a>
                    <a href="#contact" class="cta-btn secondary">
                        <i class="fas fa-envelope"></i> Let's Connect
                    </a>
                </div>

                <div class="hero-stats">
                    <div class="stat-item">
                        <div class="stat-number">13</div>
                        <div class="stat-label">Projects Completed</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">5M+</div>
                        <div class="stat-label">Total Downloads</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">4.8★</div>
                        <div class="stat-label">Average Rating</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">8+</div>
                        <div class="stat-label">Years Experience</div>
                    </div>
            </div>
            </div>

            ${this.generateFloatingElements()}
            
        `;
    }

    generateFloatingElements() {
        return this.heroData.floatingElements.map(element => `
            <div class="floating-element" style="${element.position} color: ${element.color}; ${element.delay ? `animation-delay: ${element.delay};` : ''}">
                <i class="${element.icon}"></i>
            </div>
        `).join('');
    }

    setupEventListeners() {
        // Add any hero-specific event listeners here
        const ctaButtons = document.querySelectorAll('.cta-btn');
        ctaButtons.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                this.addCTAHoverEffect(btn);
            });

            btn.addEventListener('mouseleave', () => {
                this.removeCTAHoverEffect(btn);
            });
        });
    }

    addCTAHoverEffect(button) {
        const cursor = document.querySelector('.cursor');
        if (cursor) {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.borderColor = '#00ff88';
        }
    }

    removeCTAHoverEffect(button) {
        const cursor = document.querySelector('.cursor');
        if (cursor) {
            cursor.style.transform = 'scale(1)';
            cursor.style.borderColor = '#00ff88';
        }
    }

    update(newData) {
        this.heroData = { ...this.heroData, ...newData };
        this.render();
        this.setupEventListeners();
    }
}