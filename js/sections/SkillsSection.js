// SkillsSection.js
class SkillsSection {
    constructor() {
        this.skillsData = {
            title: "Skill Tree",
            subtitle: "Senior Developer with 8+ Years of Experience",
            unity: {
                level: "Expert • 8+ Years",
                skills: [
                    "Architecture", "Addressables", "Debugger", "Scriptable Objects",
                    "Custom Inspectors", "Memory Profiler", "DoTween", "ECS",
                    "IL2CPP", "NavMesh", "UI Toolkit", "Shader Graphs",
                    "GPU/CPU Profiling", "Cloud Build", "IAP", "URP",
                    "Occlusion Culling", "LOD Groups", "Cinemachine"
                ]
            },
            categories: [
                {
                    id: 1,
                    title: "Programming",
                    icon: "💻",
                    skills: ["C#", "OOP", "SOLID", "DOD", "Performance Optimization", "Memory Optimization"],
                    progress: 95
                },
                {
                    id: 2,
                    title: "Design Patterns",
                    icon: "🏗️",
                    skills: ["MVC", "Observer", "Factory", "Dependency Injection", "Strategy", "Refactoring Legacy Code"],
                    progress: 90
                },
                {
                    id: 3,
                    title: "Multiplayer",
                    icon: "🌐",
                    skills: ["Photon PUN2/Fusion", "Playfab", "Mirror", "Unity NetCode"],
                    progress: 85
                },
                {
                    id: 4,
                    title: "AI Tools",
                    icon: "🤖",
                    skills: ["Copilot", "Claude", "Cursor", "DeepSeek"],
                    progress: 88
                },
                {
                    id: 5,
                    title: "DevOps",
                    icon: "⚙️",
                    skills: ["Git", "Sourcetree", "CI/CD Pipelines", "Github Actions"],
                    progress: 80
                },
                {
                    id: 6,
                    title: "Leadership",
                    icon: "👑",
                    skills: ["Team Management", "Mentorship", "SCRUM", "AGILE", "JIRA", "Collaboration"],
                    progress: 92
                }
            ]
        };

        this.init();
    }

    init() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        // Check if skills section exists, if not create it
        let skillsSection = document.getElementById('skills');
        if (!skillsSection) {
            skillsSection = document.createElement('section');
            skillsSection.id = 'skills';
            skillsSection.className = 'game-section';

            // Insert after projects section
            const projectsSection = document.getElementById('projects');
            if (projectsSection) {
                projectsSection.parentNode.insertBefore(skillsSection, projectsSection.nextSibling);
            } else {
                document.querySelector('.container').appendChild(skillsSection);
            }
        }

        skillsSection.innerHTML = `
            <div class="skills-container">
                <div class="skills-particles"></div>
                <div class="skills-header">
                    <h2 class="skills-title">
                        <span class="title-icon">🎯</span>
                        ${this.skillsData.title}
                        <span class="title-glow"></span>
                    </h2>
                    <p class="skills-subtitle">${this.skillsData.subtitle}</p>
                </div>

                <!-- Skills Categories -->
                <div class="skills-categories">
                    ${this.generateSkillCategories()}
                </div>

                <!-- Unity Spotlight -->
                <div class="unity-spotlight">
                    <div class="unity-header">
                        <div class="unity-logo">U</div>
                        <h3 class="unity-title">Unity Expert</h3>
                        <div class="unity-level">${this.skillsData.unity.level}</div>
                    </div>
                    <div class="unity-skills-grid">
                        ${this.generateUnitySkills()}
                    </div>
                </div>
            </div>
        `;
    }

    generateUnitySkills() {
        return this.skillsData.unity.skills.map(skill => `
            <div class="unity-skill-tag">${skill}</div>
        `).join('');
    }

    generateSkillCategories() {
        return this.skillsData.categories.map((category, index) => `
            <div class="skill-category" data-category-id="${category.id}">
                <div class="category-header">
                    <div class="category-icon">${category.icon}</div>
                    <h3 class="category-title">${category.title}</h3>
                </div>
                <div class="skills-list">
                    ${category.skills.map(skill => `
                        <div class="skill-item">${skill}</div>
                    `).join('')}
                </div>
                <div class="skill-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="--progress-width: ${category.progress}%"></div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    setupEventListeners() {
        // Add intersection observer for animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');

                    // Trigger progress bar animations
                    if (entry.target.classList.contains('skill-category')) {
                        this.animateProgressBar(entry.target);
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe skill categories
        document.querySelectorAll('.skill-category').forEach(category => {
            observer.observe(category);
        });

        // Observe Unity spotlight
        const unitySpotlight = document.querySelector('.unity-spotlight');
        if (unitySpotlight) {
            observer.observe(unitySpotlight);
        }

        // Skill item hover effects
        document.querySelectorAll('.skill-item').forEach(item => {
            item.addEventListener('mouseenter', this.onSkillHover.bind(this));
            item.addEventListener('mouseleave', this.onSkillLeave.bind(this));
        });

        // Unity skill tag hover effects
        document.querySelectorAll('.unity-skill-tag').forEach(tag => {
            tag.addEventListener('mouseenter', this.onUnitySkillHover.bind(this));
        });

        // Category click events
        document.querySelectorAll('.skill-category').forEach(category => {
            category.addEventListener('click', () => {
                this.toggleCategoryDetails(category);
            });
        });

        // Initialize particles
        this.initializeParticles();
    }

    onSkillHover(event) {
        const item = event.target;
        item.style.transform = 'scale(1.05) translateY(-2px)';
        this.createRipple(item, event);
    }

    onSkillLeave(event) {
        const item = event.target;
        item.style.transform = 'scale(1) translateY(0)';
    }

    onUnitySkillHover(event) {
        const tag = event.target;
        tag.style.background = 'linear-gradient(135deg, rgba(0, 255, 136, 0.3), rgba(0, 136, 255, 0.3))';

        setTimeout(() => {
            tag.style.background = '';
        }, 300);
    }

    createRipple(element, event) {
        const ripple = document.createElement('div');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(0, 255, 136, 0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            pointer-events: none;
            z-index: 10;
        `;

        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);

        // Add ripple animation if not exists
        if (!document.querySelector('#ripple-keyframes')) {
            const style = document.createElement('style');
            style.id = 'ripple-keyframes';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
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
        }, 600);
    }

    animateProgressBar(category) {
        const progressFill = category.querySelector('.progress-fill');
        if (progressFill) {
            setTimeout(() => {
                const width = progressFill.style.getPropertyValue('--progress-width');
                progressFill.style.width = width;
            }, 300);
        }
    }

    toggleCategoryDetails(category) {
        const isExpanded = category.classList.contains('expanded');

        // Close all other expanded categories
        document.querySelectorAll('.skill-category.expanded').forEach(otherCategory => {
            if (otherCategory !== category) {
                otherCategory.classList.remove('expanded');
            }
        });

        // Toggle current category
        category.classList.toggle('expanded');
    }

    initializeParticles() {
        const particlesContainer = document.querySelector('.skills-particles');
        if (!particlesContainer) return;

        // Create floating particles for visual effect
        for (let i = 0; i < 15; i++) {
            this.createParticle(particlesContainer);
        }
    }

    createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        const startX = Math.random() * window.innerWidth;
        const startY = window.innerHeight + 10;
        const duration = 4 + Math.random() * 4;
        const delay = Math.random() * 2;

        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(0, 255, 136, 0.6);
            border-radius: 50%;
            left: ${startX}px;
            top: ${startY}px;
            animation: particleFloat ${duration}s linear infinite;
            animation-delay: ${delay}s;
            opacity: ${0.3 + Math.random() * 0.3};
            pointer-events: none;
        `;

        container.appendChild(particle);

        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, (duration + delay) * 1000);

        // Add particle float animation if not exists
        if (!document.querySelector('#particle-keyframes')) {
            const style = document.createElement('style');
            style.id = 'particle-keyframes';
            style.textContent = `
                @keyframes particleFloat {
                    0% {
                        transform: translateY(0) translateX(0);
                        opacity: 0;
                    }
                    10% {
                        opacity: 1;
                    }
                    90% {
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    handleResize() {
        // Reinitialize particles on resize
        const particlesContainer = document.querySelector('.skills-particles');
        if (particlesContainer) {
            particlesContainer.innerHTML = '';
            this.initializeParticles();
        }
    }

    update(newData) {
        this.skillsData = { ...this.skillsData, ...newData };
        this.render();
        this.setupEventListeners();
    }
}