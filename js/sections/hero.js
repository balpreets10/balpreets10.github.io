/**
 * Hero Section - Main banner with profile and introduction
 */
class HeroSection {
    constructor() {
        this.config = {
            name: "Team Leader Senior Game Developer",
            title: 'Balpreet<span class="accent-text">Singh</span>',
            typedItems: ["Crafting Digital Worlds", "Leading Creative Teams", "Building Tomorrow's Games"],
            description: "Welcome to my interactive journey through the realm of game development. From concept to completion, I've been shaping digital experiences that captivate, challenge, and inspire players worldwide. Dive into my world where code meets creativity and imagination becomes reality.</br>This website is an example of my adaptability and scrappiness in learning new technologies and frameworks.",
            actions: [
                { href: '#portfolio', text: 'My Journey', class: 'btn btn-primary' },
                { href: '#contact', text: 'Get In Touch', class: 'btn btn-outline' },
                {
                    href: 'assets/resume/Balpreet-Team-Lead-Senior-Unity-Developer-Resume.pdf',
                    text: 'Download Resume',
                    class: 'btn btn-secondary',
                    download: 'Balpreet-Team-Lead-Senior-Unity-Developer-Resume.pdf',
                    target: '_blank'
                }
            ],
            socialLinks: [
                { href: 'https://linkedin.com/in/balpreets7', icon: 'bi-linkedin', label: 'LinkedIn' },
                { href: 'https://github.com/balpreets10', icon: 'bi-github', label: 'GitHub' },
                { href: 'https://balpreets7.itch.io', icon: 'bi-joystick', label: 'Itch.io' }
            ],
            stats: [
                {
                    icon: 'bi-trophy',
                    count: 14,
                    label: 'Projects Completed',
                    tooltip: 'Successfully delivered games and applications across multiple platforms',
                    delay: 100
                },
                {
                    icon: 'bi-download',
                    count: 5000000,
                    label: 'Total Downloads',
                    tooltip: 'Combined downloads across all published games and applications',
                    suffix: " +",
                    delay: 150
                },
                {
                    icon: 'bi-calendar-check',
                    count: 8,
                    label: 'Years Experience',
                    tooltip: 'Professional game development and team leadership experience',
                    suffix: " +",
                    delay: 200
                },
                {
                    icon: 'bi-star-fill',
                    count: 98,
                    label: 'Client Satisfaction',
                    tooltip: 'Average client satisfaction rating based on project reviews',
                    suffix: '%',
                    delay: 250
                }
            ],
            // Available title animations - can be switched via CSS class
            titleAnimations: [
                'glitch-effect',
                'neon-pulse',
                'matrix-reveal',
                'cyberpunk-hologram',
                'rgb-shift',
                'pixelated-fade'
            ],
            floatingElements: [
                { icon: "fas fa-cube", position: "top: 20%; left: 10%; font-size: 2rem;", color: "rgba(0, 255, 136, 0.3)" },
                { icon: "fas fa-gamepad", position: "top: 60%; right: 15%; font-size: 1.5rem;", color: "rgba(0, 136, 255, 0.3)", delay: "-2s" },
                { icon: "fas fa-trophy", position: "top: 40%; right: 25%; font-size: 1.5rem;", color: "rgba(184, 236, 62, 0.3)", delay: "-2s" },
                { icon: "fas fa-code", position: "bottom: 30%; left: 20%; font-size: 1.8rem;", color: "rgba(255, 0, 136, 0.3)", delay: "-4s" },
                { icon: "fa-brands fa-unity", position: "bottom: 15%; left: 30%; font-size: 1.8rem;", color: "rgba(255, 255, 255, 0.3)", delay: "-4s" },
                { icon: "fa-brands fa-app-store-ios", position: "top: 40%; left: 15%; font-size: 1.8rem;", color: "rgba(255, 255, 255, 0.3)", delay: "-4s" }
            ],
            currentAnimation: this.getRandomAnimation() // Random animation on each visit
        };
    }

    // Method to get random animation for each visit
    getRandomAnimation() {
        const animations = [
            'glitch-effect',
            'powerup',
            'neon-pulse',
            'matrix-reveal',
            'cyberpunk-hologram',
            'rgb-shift',
            'pixelated-fade'
        ];
        const randomIndex = Math.floor(Math.random() * animations.length);
        return animations[randomIndex];
    }

    createBackgroundElements() {
        const bgElements = document.createElement('div');
        bgElements.className = 'background-elements';
        bgElements.innerHTML = `
            <div class="bg-circle circle-1"></div>
            <div class="bg-circle circle-2"></div>
            <div class="bg-particle particle-1"></div>
            <div class="bg-particle particle-2"></div>
            <div class="bg-particle particle-3"></div>
            <div class="bg-particle particle-4"></div>
            <div class="bg-particle particle-5"></div>
        `;
        return bgElements;
    }

    createHeroText() {
        const heroText = document.createElement('div');
        heroText.className = 'hero-text';

        const h1 = document.createElement('h1');
        h1.className = `title-animated ${this.config.currentAnimation}`;
        h1.innerHTML = this.config.title;
        h1.setAttribute('data-text', 'BalpreetSingh'); // For glitch effect

        const h2 = document.createElement('h4');
        h2.textContent = this.config.name;

        const leadP = document.createElement('p');
        leadP.className = 'lead';
        leadP.innerHTML = `<span class="typed" data-typed-items="${this.config.typedItems.join(', ')}"></span>`;

        const descP = document.createElement('p');
        descP.className = 'description';
        descP.innerHTML = this.config.description;

        const actions = document.createElement('div');
        actions.className = 'hero-actions';
        this.config.actions.forEach(action => {
            const a = document.createElement('a');
            a.href = action.href;
            a.className = action.class;
            a.textContent = action.text;

            a.href = action.href;
            a.className = action.class;
            a.textContent = action.text;

            // Handle download attribute
            if (action.download) {
                a.setAttribute('download', action.download);
            }

            // Handle target attribute
            if (action.target) {
                a.setAttribute('target', action.target);
            }
            actions.appendChild(a);
        });

        const socialLinks = document.createElement('div');
        socialLinks.className = 'social-links';
        this.config.socialLinks.forEach(link => {
            const a = document.createElement('a');
            a.href = link.href;
            a.title = link.label;
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            a.innerHTML = `<i class="${link.icon}"></i>`;
            socialLinks.appendChild(a);
        });

        heroText.appendChild(h1);
        heroText.appendChild(h2);
        heroText.appendChild(leadP);
        heroText.appendChild(descP);
        heroText.appendChild(actions);
        heroText.appendChild(socialLinks);

        return heroText;
    }

    generateFloatingElements() {
        return this.heroData.floatingElements.map(element => `
            <div class="floating-element" style="${element.position} color: ${element.color}; ${element.delay ? `animation-delay: ${element.delay};` : ''}">
                <i class="${element.icon}"></i>
            </div>
        `).join('');
    }

    createStatsSection() {
        const statsSection = document.createElement('div');
        statsSection.className = 'hero-stats';

        const statsTitle = document.createElement('h3');
        statsTitle.className = 'stats-title';
        statsTitle.textContent = 'Leaderboard';

        const statsGrid = document.createElement('div');
        statsGrid.className = 'stats-grid';

        this.config.stats.forEach((stat, index) => {
            const statItem = document.createElement('div');
            statItem.className = 'stat-item';
            statItem.setAttribute('data-aos', 'zoom-in');
            statItem.setAttribute('data-aos-delay', stat.delay);

            // Create tooltip
            const tooltip = document.createElement('div');
            tooltip.className = 'stat-tooltip';
            tooltip.textContent = stat.tooltip;

            statItem.innerHTML = `
                <div class="stat-icon">
                    <i class="${stat.icon}"></i>
                </div>
                <div class="stat-content">
                    <span class="stat-number" data-target="${stat.count}">0${stat.suffix || ''}</span>
                    <p class="stat-label">${stat.label}</p>
                </div>
            `;

            statItem.appendChild(tooltip);
            statsGrid.appendChild(statItem);
        });

        statsSection.appendChild(statsTitle);
        statsSection.appendChild(statsGrid);

        return statsSection;
    }

    initializeTooltips() {
        const statItems = document.querySelectorAll('.hero .stat-item');

        statItems.forEach(statItem => {
            let hoverTimer = null;
            let isTooltipVisible = false;
            const tooltip = statItem.querySelector('.stat-tooltip');

            if (!tooltip) return;

            // 2-second hover delay functionality
            statItem.addEventListener('mouseenter', () => {
                // Clear any existing timer
                if (hoverTimer) {
                    clearTimeout(hoverTimer);
                }

                // Set 2-second delay before showing tooltip
                hoverTimer = setTimeout(() => {
                    this.showTooltip(statItem, tooltip);
                    isTooltipVisible = true;
                }, 2000);
            });

            // Clear timer on mouse leave
            statItem.addEventListener('mouseleave', () => {
                if (hoverTimer) {
                    clearTimeout(hoverTimer);
                    hoverTimer = null;
                }

                // Hide tooltip if it was shown via hover
                if (isTooltipVisible) {
                    this.hideTooltip(statItem, tooltip);
                    isTooltipVisible = false;
                }
            });

            // Click functionality - immediate show/hide
            statItem.addEventListener('click', (e) => {
                e.preventDefault();

                // Clear hover timer if clicking
                if (hoverTimer) {
                    clearTimeout(hoverTimer);
                    hoverTimer = null;
                }

                if (isTooltipVisible) {
                    this.hideTooltip(statItem, tooltip);
                    isTooltipVisible = false;
                } else {
                    this.showTooltip(statItem, tooltip);
                    isTooltipVisible = true;
                }
            });

            // Hide tooltip when clicking outside
            document.addEventListener('click', (e) => {
                if (!statItem.contains(e.target) && isTooltipVisible) {
                    this.hideTooltip(statItem, tooltip);
                    isTooltipVisible = false;
                }
            });

            // Add visual feedback for interactive elements
            statItem.style.cursor = 'pointer';
            statItem.setAttribute('title', 'Hover 2s or click for details');
        });
    }

    // Add this method to show tooltip with animation
    showTooltip(statItem, tooltip) {
        tooltip.style.opacity = '1';
        tooltip.style.visibility = 'visible';
        tooltip.style.bottom = '-40px';
        tooltip.style.transform = 'translateX(-50%) translateY(0) scale(1)';

        // Add visual feedback to stat item
        statItem.classList.add('tooltip-active');
    }

    // Add this method to hide tooltip with animation
    hideTooltip(statItem, tooltip) {
        tooltip.style.opacity = '0';
        tooltip.style.visibility = 'hidden';
        tooltip.style.bottom = '-45px';
        tooltip.style.transform = 'translateX(-50%) translateY(5px) scale(0.95)';

        // Remove visual feedback from stat item
        statItem.classList.remove('tooltip-active');
    }

    render() {
        const section = document.createElement('section');
        section.id = 'hero';
        section.className = 'hero section';

        section.appendChild(this.createBackgroundElements());

        const heroContent = document.createElement('div');
        heroContent.className = 'hero-content';

        const container = document.createElement('div');
        container.className = 'container';

        const row = document.createElement('div');
        row.className = 'row align-items-center';

        const leftCol = document.createElement('div');
        leftCol.className = 'col-lg-7';
        leftCol.setAttribute('data-aos', 'fade-right');
        leftCol.setAttribute('data-aos-delay', '100');
        leftCol.appendChild(this.createHeroText());

        const rightCol = document.createElement('div');
        rightCol.className = 'col-lg-5';
        rightCol.setAttribute('data-aos', 'fade-left');
        rightCol.setAttribute('data-aos-delay', '200');
        rightCol.appendChild(this.createStatsSection());

        row.appendChild(leftCol);
        row.appendChild(rightCol);
        container.appendChild(row);
        heroContent.appendChild(container);
        section.appendChild(heroContent);

        return section;
    }

    // Method to switch title animation
    switchTitleAnimation(animationClass) {
        const titleElement = document.querySelector('.hero .title-animated');
        if (titleElement) {
            // Remove all animation classes
            this.config.titleAnimations.forEach(anim => {
                titleElement.classList.remove(anim);
            });
            // Add new animation class
            titleElement.classList.add(animationClass);
            this.config.currentAnimation = animationClass;
        }
    }

    initializeTyped() {
        // Initialize typed.js after render
        if (typeof Typed !== 'undefined') {
            const typed = document.querySelector('.typed');
            if (typed) {
                new Typed('.typed', {
                    strings: this.config.typedItems,
                    typeSpeed: 50,
                    backSpeed: 30,
                    loop: true
                });
            }
        }
    }

    initializeCounters() {
        // Initialize counter animations
        const statNumbers = document.querySelectorAll('.hero .stat-number');

        const animateCounter = (element, target, suffix = '') => {
            let count = 0;
            const increment = target / 100;
            const timer = setInterval(() => {
                count += increment;
                if (count >= target) {
                    count = target;
                    clearInterval(timer);
                }

                let displayValue;
                if (target >= 1000000) {
                    // Handle millions
                    displayValue = (count / 1000000).toFixed(1) + 'M';
                } else if (target >= 1000) {
                    // Handle thousands
                    displayValue = (count / 1000).toFixed(1) + 'K';
                } else {
                    // Handle regular numbers
                    displayValue = Math.floor(count).toString();
                }

                element.textContent = displayValue + suffix;
            }, 20);
        };

        // Intersection Observer for counter animation
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    const target = parseInt(entry.target.dataset.target);
                    const suffix = entry.target.textContent.includes('%') ? '%' : '';
                    entry.target.classList.add('animated'); // Prevent re-animation
                    animateCounter(entry.target, target, suffix);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(stat => observer.observe(stat));
    }

    // Initialize all animations after render
    initialize() {
        console.log(`Hero section initialized with animation: ${this.config.currentAnimation}`);
        this.initializeTyped();
        // Small delay to ensure DOM is ready for counter animation
        setTimeout(() => {
            this.initializeCounters();
            this.initializeTooltips();

            // Track animation with hero tracker
            if (window.analyticsManager) {
                const heroTracker = window.analyticsManager.getSectionTracker('hero');
                if (heroTracker) {
                    heroTracker.trackAnimation(this.config.currentAnimation);
                }
            }
        }, 100);
    }
}

window.HeroSection = HeroSection;