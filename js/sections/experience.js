/**
 * Experience Section - Modern Glassy Card Layout
 */
class ExperienceSection {
    constructor() {
        this.config = {
            title: "Professional Journey",
            subtitle: "Building careers through code and creativity",
            experiences: [
                {
                    id: 1,
                    company: "ArdentInfo Solutions",
                    position: "Team Lead",
                    duration: "2021 - 2025",
                    location: "Chandigarh, IND",
                    type: "Full-time",
                    description: "Leading a team of developers in creating cutting-edge mobile and PC/Web games using Unity engine.",
                    achievements: [
                        "Spearheaded technical development for a narrative e-learning platform",
                        "Mentored teams of 3-4 developers",
                        "Delivered 2 games, expanding the company's portfolio by 20%",
                        "Reduced game build times by 20% via CI/CD pipelines",
                        "Cut coding effort by 80% with custom editor tools",
                        "Applied SOLID principles to improve throughput by 15%",
                        "Resolved inter-department blockers (20% productivity gain), and managed LiveOps/DLCs using Addressables",
                        "Led client workshops to translate business needs into technical specs, reducing revision cycles by 30%",
                        "Implemented Agile methodologies, improving team velocity by 25%"
                    ],
                    technologies: ["Unity", "C#", "Phaser.JS", "Team Leadership", "Project Management"],
                    featured: true
                },
                {
                    id: 2,
                    company: "Webzool Creative Inc",
                    position: "Unity Team Leader",
                    duration: "2019 - 2021",
                    location: "Hybrid USA/India",
                    type: "Full Time",
                    description: "Leading Frontend Team, Developed Casino games and slot machines for mobile platforms.",
                    achievements: [
                        "Architected a slot machine engine, reducing memory usage by 15% via Addressables and Scriptable Objects",
                        "Implemented design patterns (MVC, DI, Observer, Strategy) to enhance dev output by 25%",
                        "Managed a 14-developer team to deliver mobile games, achieving 100% deadline adherence",
                        "Built custom editor tools to accelerate development and integrated UGUI with pluggable skins for seamless UI workflows",
                        "Rapidly mastered new tools (GitHub Actions) to reduce build times by 20%",
                        "Live Ops: Implemented Info API's to gather real-time data and improve UX with progressive builds",
                        "Immediate promotion to Team Lead after 4 months for exceptional performance and leadership skills"
                    ],
                    technologies: ["Unity", "C#", "JavaScript", "Installers", "Mobile Development"],
                    featured: false
                },
                {
                    id: 3,
                    company: "Lucky Strike Games",
                    position: "Game Developer",
                    duration: "2018 - 2019",
                    location: "Bengaluru, India",
                    type: "Full-time",
                    description: "Designing and developing Bingo Game, focusing on user engagement and performance optimization.",
                    achievements: [
                        "Scalable Minigame Framework: Developed a reusable framework for mini-games, reducing tech debt by 15%",
                        "Asset Bundles: Implemented Asset Bundles to optimize memory usage, achieving a 35% reduction in build sizes",
                        "Reduced GC allocations by 40% through efficient memory management and object pooling",
                        "Received 'Top Performer of the month' award for outstanding contributions to game development"
                    ],
                    technologies: ["Unity", "C#", "Android Development", "UI/UX Design"],
                    featured: false
                },
                {
                    id: 4,
                    company: "Gaming Dronzz",
                    position: "Developer, Co-Founder",
                    duration: "2017 - 2018",
                    location: "J&K, India",
                    type: "Full-time",
                    description: "Ran a game development Consultancy Startup, focusing on mobile games and educational apps.",
                    achievements: [
                        "Developed and launched mobile games for clients, Govt. organizations, and educational institutions",
                        "Managed end-to-end game development processes, from concept to deployment",
                        "Built a team of developers/designers, fostering a collaborative and innovative work environment"
                    ],
                    technologies: ["Unity", "C#", "Android Studio", "Android Development", "UI/UX Design"],
                    featured: false
                },
                {
                    id: 5,
                    company: "Freelance",
                    position: "Developer",
                    duration: "2015 - 2017",
                    location: "J&K, India",
                    type: "Full-time",
                    description: "Worked on various freelance projects - mobile apps and websites",
                    achievements: [
                        "Developed and launched mobile app for a news company",
                        "Developed and deployed a Standalone Software for Revision of Pension for CCA, Jammu, Govt. Of India",
                        "Managed end-to-end game development processes, from design to deployment"
                    ],
                    technologies: ["Visual Studio", "C#", "Android Studio", "Android Development", "UI/UX Design"],
                    featured: false
                }
            ]
        };
    }

    createSectionHeader() {
        const header = document.createElement('div');
        header.className = 'section-header';
        header.setAttribute('data-aos', 'fade-down');

        header.innerHTML = `
            <div class="title-container">
                <h2 class="section-title">${this.config.title}</h2>
            </div>
            <div class="header-divider"></div>
            <p class="section-subtitle">${this.config.subtitle}</p>
        `;

        return header;
    }

    createExperienceCard(experience, index) {
        const card = document.createElement('div');
        const colClass = experience.featured ? 'col-12' : 'col-lg-6';
        card.className = `${colClass} mb-4`;
        card.setAttribute('data-aos', 'fade-up');
        card.setAttribute('data-aos-delay', index * 100);

        const achievementsList = experience.achievements.map(achievement =>
            `<li class="achievement-plain">${achievement}</li>`
        ).join('');

        const techTags = experience.technologies.map(tech =>
            `<span class="tech-badge-glow">${tech}</span>`
        ).join('');

        const cardClass = experience.featured ? 'experience-card-featured' : 'experience-card-glass';

        card.innerHTML = `
            <div class="${cardClass} gaming-hover-effect h-100">
                <div class="card-header-glass">
                    <div class="company-header">
                        <h3 class="company-name-prominent">${experience.company}</h3>
                        <div class="duration-chip">${experience.duration}</div>
                    </div>
                    <h4 class="position-prominent">${experience.position}</h4>
                    <div class="location-meta">
                        <span class="location-badge">
                            <i class="bi bi-geo-alt"></i>
                            ${experience.location}
                        </span>
                        <span class="type-badge">
                            <i class="bi bi-briefcase"></i>
                            ${experience.type}
                        </span>
                    </div>
                </div>

                <div class="card-body-glass">
                    <p class="description-text">${experience.description}</p>
                    
                    <div class="achievements-section">
                        <h6 class="achievements-header">Key Responsibilities & Achievements</h6>
                        <ul class="achievements-list-plain">${achievementsList}</ul>
                    </div>

                    <div class="technologies-section">
                        <h6 class="tech-header">Technologies & Skills</h6>
                        <div class="tech-grid">${techTags}</div>
                    </div>
                </div>

                <div class="card-glow-effect"></div>
            </div>
        `;

        return card;
    }

    createExperienceGrid() {
        const grid = document.createElement('div');
        grid.className = 'row g-4 experience-grid';

        this.config.experiences.forEach((experience, index) => {
            grid.appendChild(this.createExperienceCard(experience, index));
        });

        return grid;
    }

    render() {
        const section = document.createElement('section');
        section.id = 'experience';
        section.className = 'experience-glass section py-5';

        const container = document.createElement('div');
        container.className = 'container';

        container.appendChild(this.createSectionHeader());
        container.appendChild(this.createExperienceGrid());

        section.appendChild(container);

        return section;
    }

    initializeAnimations() {
        // Initialize hover effects
        const cards = document.querySelectorAll('.experience-card-glass, .experience-card-featured');

        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Initialize counter animations for stats
        const statNumbers = document.querySelectorAll('.stat-number-glow');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    entry.target.classList.add('animated');
                    this.animateCounter(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(stat => observer.observe(stat));
    }

    animateCounter(element) {
        const target = parseInt(element.textContent.replace(/\D/g, ''));
        let count = 0;
        const increment = target / 60;

        const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
                count = target;
                clearInterval(timer);
            }

            const originalText = element.textContent;
            let displayValue = Math.floor(count).toString();

            if (originalText.includes('+')) {
                displayValue += '+';
            }

            element.textContent = displayValue;
        }, 30);
    }

    initialize() {
        console.log('Experience Glass section initialized');
        setTimeout(() => {
            this.initializeAnimations();
        }, 100);
    }
}

window.ExperienceSection = ExperienceSection;