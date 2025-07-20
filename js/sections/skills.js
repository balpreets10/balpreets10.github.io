/**
 * Optimized Skills Section - Gaming-themed with Mobile Performance Focus
 */
class SkillsSection {
    constructor() {
        this.config = {
            title: "Skill Matrix",
            subtitle: "Expertise Unlocked Through 8+ Years of Development",

            // Unity spotlight data with Unity logo
            unity: {
                title: "Unity Engine Mastery",
                level: "Expert Level • 8+ Years",
                description: "Complete mastery of Unity's ecosystem and advanced development techniques",
                skills: [
                    "Architecture", "Addressables", "Debugger", "Scriptable Objects",
                    "Custom Inspectors", "Memory Profiler", "DoTween", "ECS",
                    "IL2CPP", "NavMesh", "UI Toolkit", "Shader Graphs",
                    "GPU/CPU Profiling", "Cloud Build", "IAP", "URP",
                    "Occlusion Culling", "LOD Groups", "Cinemachine"
                ],
                xp: 95,
                icon: "ᵁ" // Unity logo representation
            },

            // Skill categories with optimized layout
            categories: [
                {
                    id: 1,
                    title: "Core Programming",
                    icon: "💻",
                    color: "#38ac5f",
                    skills: ["C#", "OOP", "SOLID", "DOD", "Performance Optimization", "Memory Optimization"],
                    level: 95,
                    description: "Foundation of all development work"
                },
                {
                    id: 2,
                    title: "Design Patterns",
                    icon: "🏗️",
                    color: "#ff0080",
                    skills: ["MVC", "Observer", "Factory", "Dependency Injection", "Strategy", "Refactoring Legacy Code"],
                    level: 90,
                    description: "Architectural excellence and code structure"
                },
                {
                    id: 3,
                    title: "Multiplayer Systems",
                    icon: "🌐",
                    color: "#00d4ff",
                    skills: ["Photon PUN2/Fusion", "Playfab", "Mirror", "Unity NetCode"],
                    level: 85,
                    description: "Connecting players across the globe"
                },
                {
                    id: 4,
                    title: "AI Development Tools",
                    icon: "🤖",
                    color: "#ffff00",
                    skills: ["Copilot", "Claude", "Cursor", "DeepSeek"],
                    level: 88,
                    description: "Next-gen development acceleration"
                },
                {
                    id: 5,
                    title: "DevOps & Pipeline",
                    icon: "⚙️",
                    color: "#ff6b00",
                    skills: ["Git", "Sourcetree", "CI/CD Pipelines", "Github Actions"],
                    level: 80,
                    description: "Streamlined development workflows"
                },
                {
                    id: 6,
                    title: "Team Leadership",
                    icon: "👑",
                    color: "#9d4edd",
                    skills: ["Team Management", "Mentorship", "SCRUM", "AGILE", "JIRA", "Collaboration"],
                    level: 92,
                    description: "Guiding teams to victory"
                }
            ],

            // Reduced skill particles for performance
            skillParticles: [
                { text: "Unity", position: "top: 15%; left: 8%;" },
                { text: "C#", position: "top: 25%; right: 12%;" },
                { text: "Leadership", position: "top: 45%; left: 5%;" },
                { text: "Optimization", position: "bottom: 30%; right: 8%;" }
            ]
        };

        // Performance detection
        this.isMobile = window.innerWidth <= 768;
        this.reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.isLowPerformance = this.detectLowPerformance();

        // Animation control
        this.animationPaused = false;
        this.visibilityObserver = null;
    }

    detectLowPerformance() {
        // Simple performance detection
        const start = performance.now();
        for (let i = 0; i < 100000; i++) {
            // Simple computation test
            Math.random() * Math.random();
        }
        const duration = performance.now() - start;

        return duration > 20 || this.isMobile; // Consider mobile as low performance for animations
    }

    createBackgroundElements() {
        const bgElements = document.createElement('div');
        bgElements.className = 'skills-background';

        // Only add particles on desktop for performance
        if (!this.isMobile && !this.reduceMotion) {
            bgElements.innerHTML = `
                <div class="floating-particles">
                    ${this.config.skillParticles.map(particle => `
                        <div class="skill-particle" style="${particle.position}">${particle.text}</div>
                    `).join('')}
                </div>
            `;
        }

        return bgElements;
    }

    createSectionHeader() {
        const header = document.createElement('div');
        header.className = 'section-header';
        header.setAttribute('data-aos', 'fade-down');

        header.innerHTML = `
            <div class="title-container">
                <h2 class="section-title">
                    <span class="title-icon">⚡</span>
                    ${this.config.title}
                </h2>
            </div>
            <div class="header-divider"></div>
            <p class="section-subtitle">${this.config.subtitle}</p>
        `;

        return header;
    }

    createUnitySpotlight() {
        const unity = this.config.unity;
        const spotlight = document.createElement('div');
        spotlight.className = 'unity-spotlight gaming-hover-effect';
        spotlight.setAttribute('data-aos', 'zoom-in');
        spotlight.setAttribute('data-aos-delay', '200');

        // Optimize skill categorization
        const importantSkills = ["Architecture", "Addressables", "DoTween", "Shader Graphs"];
        const mediumSkills = ["Scriptable Objects", "Memory Profiler", "UI Toolkit", "URP", "Cinemachine"];

        const skillsHtml = unity.skills.map((skill, index) => {
            let sizeClass = 'size-small';
            let extraClasses = '';

            if (importantSkills.includes(skill)) {
                sizeClass = 'size-large';
                extraClasses = 'featured';
                // Only add floating on desktop
                if (!this.isMobile && !this.isLowPerformance) {
                    extraClasses += ' floating';
                }
            } else if (mediumSkills.includes(skill)) {
                sizeClass = 'size-medium';
                // Randomly add floating to some medium skills on desktop only
                if (!this.isMobile && !this.isLowPerformance && Math.random() > 0.7) {
                    extraClasses = 'floating';
                }
            }

            return `<div class="skill-pill ${sizeClass} ${extraClasses} gaming-hover-effect" style="animation-delay: ${index * 0.1}s">
                <span>${skill}</span>
            </div>`;
        }).join('');

        spotlight.innerHTML = `
            <div class="spotlight-header">
                <div class="unity-emblem">
                    <div class="emblem-core">${unity.icon}</div>
                    <div class="emblem-ring"></div>
                </div>
                <div class="unity-info">
                    <h3 class="unity-title">${unity.title}</h3>
                    <div class="unity-level">${unity.level}</div>
                    <p class="unity-description">${unity.description}</p>
                </div>
                <div class="xp-display">
                    <div class="xp-number">${unity.xp}</div>
                    <div class="xp-label">XP</div>
                </div>
            </div>
            
            <div class="unity-skills-cloud">
                ${skillsHtml}
            </div>
            
            <div class="progress-container">
                <div class="progress-label">Mastery Level</div>
                <div class="progress-track">
                    <div class="progress-energy" style="--progress: ${unity.xp}%"></div>
                    <div class="progress-markers">
                        ${Array.from({ length: 10 }, (_, i) => `
                            <div class="marker ${i < Math.floor(unity.xp / 10) ? 'active' : ''}" style="left: ${i * 10}%"></div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        return spotlight;
    }

    createSkillCategories() {
        const categoriesGrid = document.createElement('div');
        categoriesGrid.className = 'skills-categories-grid';

        this.config.categories.forEach((category, index) => {
            const categoryCard = document.createElement('div');
            categoryCard.className = 'skill-category gaming-hover-effect';
            categoryCard.setAttribute('data-aos', 'fade-up');
            categoryCard.setAttribute('data-aos-delay', `${200 + (index * 100)}`);
            categoryCard.setAttribute('data-category-id', category.id);

            categoryCard.innerHTML = `
                <div class="category-header">
                    <div class="category-icon" style="--category-color: ${category.color}">
                        <span class="icon-symbol">${category.icon}</span>
                        <div class="icon-glow"></div>
                    </div>
                    <div class="category-info">
                        <h4 class="category-title">${category.title}</h4>
                        <p class="category-description">${category.description}</p>
                    </div>
                    <div class="level-badge">
                        <span class="level-number">${category.level}</span>
                        <span class="level-text">LVL</span>
                    </div>
                </div>
                
                <div class="skills-grid">
                    ${category.skills.map((skill, skillIndex) => `
                        <div class="skill-chip gaming-hover-effect" style="animation-delay: ${skillIndex * 0.1}s">
                            <span class="skill-name">${skill}</span>
                        </div>
                    `).join('')}
                </div>
                
                <div class="category-stats">
                    <div class="stat-bar">
                        <div class="stat-fill" style="--fill-width: ${category.level}%; --fill-color: ${category.color}"></div>
                    </div>
                    <div class="stat-text">Proficiency: ${category.level}%</div>
                </div>
            `;

            categoriesGrid.appendChild(categoryCard);
        });

        return categoriesGrid;
    }

    render() {
        const section = document.createElement('section');
        section.id = 'skills';
        section.className = 'skills-section game-section';

        // Add performance class if needed
        if (this.isLowPerformance) {
            section.classList.add('low-performance');
        }

        section.appendChild(this.createBackgroundElements());

        const container = document.createElement('div');
        container.className = 'container';

        const content = document.createElement('div');
        content.className = 'skills-content';

        content.appendChild(this.createSectionHeader());
        content.appendChild(this.createUnitySpotlight());
        content.appendChild(this.createSkillCategories());

        container.appendChild(content);
        section.appendChild(container);

        return section;
    }

    initializeParticleSystem() {
        // Only initialize on desktop for performance
        if (this.isMobile || this.reduceMotion || this.isLowPerformance) {
            return;
        }

        const particlesContainer = document.querySelector('.floating-particles');
        if (!particlesContainer) return;

        // Create fewer particles for better performance
        for (let i = 0; i < 4; i++) {
            this.createFloatingParticle(particlesContainer);
        }

        // Slower particle generation
        this.particleInterval = setInterval(() => {
            if (particlesContainer && particlesContainer.children.length < 8 && !this.animationPaused) {
                this.createFloatingParticle(particlesContainer);
            }
        }, 5000);
    }

    createFloatingParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';

        const symbols = ['◆', '●', '▲', '✦'];
        const symbol = symbols[Math.floor(Math.random() * symbols.length)];

        particle.textContent = symbol;
        particle.style.cssText = `
            position: absolute;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            font-size: ${8 + Math.random() * 8}px;
            color: var(--accent-color);
            opacity: ${0.2 + Math.random() * 0.2};
            animation: particleFloatUp ${6 + Math.random() * 6}s linear infinite;
            animation-delay: ${Math.random() * 2}s;
            pointer-events: none;
        `;

        container.appendChild(particle);

        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, 12000);
    }

    initializeProgressAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate progress bars
                    const progressBars = entry.target.querySelectorAll('.progress-energy, .stat-fill');
                    progressBars.forEach((bar, index) => {
                        setTimeout(() => {
                            bar.style.transform = 'scaleX(1)';
                        }, index * 200);
                    });

                    // Add reveal animation to skills
                    const skillChips = entry.target.querySelectorAll('.skill-chip, .skill-pill');
                    skillChips.forEach((chip, index) => {
                        setTimeout(() => {
                            chip.style.opacity = '1';
                            chip.style.transform = 'translateY(0)';
                        }, index * 50);
                    });

                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        // Observe all skill categories and unity spotlight
        document.querySelectorAll('.skill-category, .unity-spotlight').forEach(element => {
            observer.observe(element);
        });
    }

    initializeInteractions() {
        // Optimized hover effects
        document.querySelectorAll('.skill-chip, .skill-pill').forEach(chip => {
            chip.addEventListener('mouseenter', () => {
                if (!this.isMobile) {
                    this.createOptimizedRipple(chip);
                }
            });
        });

        // Unity spotlight special effects (desktop only)
        const unitySpotlight = document.querySelector('.unity-spotlight');
        if (unitySpotlight && !this.isMobile) {
            unitySpotlight.addEventListener('mouseenter', () => {
                unitySpotlight.classList.add('spotlight-active');
            });

            unitySpotlight.addEventListener('mouseleave', () => {
                unitySpotlight.classList.remove('spotlight-active');
            });
        }

        // Category click interactions (simplified)
        document.querySelectorAll('.skill-category').forEach(category => {
            category.addEventListener('click', () => {
                this.toggleCategoryFocus(category);
            });
        });
    }

    createOptimizedRipple(element) {
        const ripple = document.createElement('div');
        ripple.className = 'skill-ripple';

        ripple.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 4px;
            height: 4px;
            background: var(--accent-color);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            animation: skillRipple 0.4s ease-out;
            pointer-events: none;
            z-index: 10;
        `;

        element.style.position = 'relative';
        element.appendChild(ripple);

        // Add ripple animation if not exists
        if (!document.querySelector('#skill-ripple-keyframes')) {
            const style = document.createElement('style');
            style.id = 'skill-ripple-keyframes';
            style.textContent = `
                @keyframes skillRipple {
                    0% {
                        width: 4px;
                        height: 4px;
                        opacity: 1;
                    }
                    100% {
                        width: 30px;
                        height: 30px;
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.remove();
            }
        }, 400);
    }

    toggleCategoryFocus(category) {
        const isExpanded = category.classList.contains('expanded');

        // Remove focus from other categories
        document.querySelectorAll('.skill-category.expanded').forEach(otherCategory => {
            if (otherCategory !== category) {
                otherCategory.classList.remove('expanded');
            }
        });

        category.classList.toggle('expanded');
    }

    initializeVisibilityControl() {
        // Pause animations when not visible for performance
        this.visibilityObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const skillsSection = entry.target;
                if (entry.isIntersecting) {
                    this.animationPaused = false;
                    skillsSection.classList.remove('animation-paused');
                } else {
                    this.animationPaused = true;
                    skillsSection.classList.add('animation-paused');
                }
            });
        }, { threshold: 0.1 });

        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
            this.visibilityObserver.observe(skillsSection);
        }
    }

    initializeResponsiveHandling() {
        // Handle window resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                const wasMobile = this.isMobile;
                this.isMobile = window.innerWidth <= 768;

                // If switching between mobile and desktop, reinitialize
                if (wasMobile !== this.isMobile) {
                    this.cleanup();
                    this.initialize();
                }
            }, 250);
        });
    }

    cleanup() {
        // Clear intervals and observers
        if (this.particleInterval) {
            clearInterval(this.particleInterval);
        }

        if (this.visibilityObserver) {
            this.visibilityObserver.disconnect();
        }

        // Remove particles
        const particles = document.querySelectorAll('.floating-particle');
        particles.forEach(particle => particle.remove());
    }

    // Initialize all systems
    initialize() {
        console.log('Skills section initialized with performance optimizations');
        console.log(`Performance mode: ${this.isLowPerformance ? 'Low' : 'High'}`);
        console.log(`Device: ${this.isMobile ? 'Mobile' : 'Desktop'}`);

        // Initialize systems based on performance capability
        this.initializeProgressAnimations();
        this.initializeInteractions();
        this.initializeResponsiveHandling();
        this.initializeVisibilityControl();

        // Only initialize particles on capable devices
        if (!this.isLowPerformance && !this.isMobile) {
            this.initializeParticleSystem();
        }

        // Add performance monitoring in development
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            this.initializePerformanceMonitoring();
        }
    }

    initializePerformanceMonitoring() {
        let frameCount = 0;
        let lastTime = performance.now();

        const measureFPS = () => {
            const currentTime = performance.now();
            frameCount++;

            if (currentTime - lastTime >= 1000) {
                const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
                console.log(`Skills Section FPS: ${fps}`);

                // Auto-adjust performance if FPS drops
                if (fps < 30 && !this.isLowPerformance) {
                    console.log('Low FPS detected, switching to performance mode');
                    this.switchToPerformanceMode();
                }

                frameCount = 0;
                lastTime = currentTime;
            }

            if (!this.animationPaused) {
                requestAnimationFrame(measureFPS);
            }
        };

        requestAnimationFrame(measureFPS);
    }

    switchToPerformanceMode() {
        this.isLowPerformance = true;
        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
            skillsSection.classList.add('low-performance');
        }

        // Remove particles
        const particles = document.querySelectorAll('.floating-particle');
        particles.forEach(particle => particle.remove());

        // Clear particle interval
        if (this.particleInterval) {
            clearInterval(this.particleInterval);
        }
    }

    // Method to update skills data
    updateSkills(newData) {
        this.config = { ...this.config, ...newData };
        const existingSection = document.getElementById('skills');
        if (existingSection) {
            this.cleanup();
            const newSection = this.render();
            existingSection.parentNode.replaceChild(newSection, existingSection);
            this.initialize();
        }
    }

    // Public method to toggle performance mode
    setPerformanceMode(enabled) {
        this.isLowPerformance = enabled;
        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
            skillsSection.classList.toggle('low-performance', enabled);
        }

        if (enabled) {
            this.cleanup();
        } else if (!this.isMobile) {
            this.initializeParticleSystem();
        }
    }
}

// Global instance
window.SkillsSection = SkillsSection;