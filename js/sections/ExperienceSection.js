// ExperienceSection.js
class ExperienceSection {
    constructor() {
        this.experienceData = {
            title: "Professional Journey",
            subtitle: "Building careers through code and creativity",
            experiences: [
                {
                    id: 1,
                    company: "ArdentInfo Solutions",
                    position: "Team Lead ",
                    duration: "2021 - 2025",
                    location: "Chandigarh, IND",
                    type: "Full-time",
                    description: "Leading a team of developers in creating cutting-edge mobile and PC/Web games using Unity engine.",
                    achievements: [
                        "Spearheaded technical development for a narrative e-learning platform",
                        "Mentored teams of 3-4 developers",
                        "Delivered 2 games, expanding the company’s portfolio by 20%",
                        "Reduced game build times by 20% via CI/CD pipelines",
                        "Cut coding effort by 80% with custom editor tools",
                        "Applied SOLID principles to improve throughput by 15%",
                        "Resolved inter-department blockers (20% productivity gain), and managed LiveOps/DLCs using Addressables.",
                        "Led client workshops to translate business needs into technical specs, reducing revision cycles by 30%",
                        "Implemented Agile methodologies, improving team velocity by 25%"

                    ],
                    technologies: ["Unity", "C#", "Phaser.JS", "Team Leadership", "Project Management"]
                },
                {
                    id: 2,
                    company: "Webzool Creative Inc",
                    position: "Unity Team Leader ",
                    duration: "2019 - 2021",
                    location: "Hybrid USA/India",
                    type: "Full Time",
                    description: "Leading Frontend Team, Developed Casino games and slot machines for mobile platforms.",
                    achievements: [
                        "Architected a slot machine engine, reducing memory usage by 15% via Addressables and Scriptable Objects",
                        "Implemented design patterns (MVC, DI, Observer, Strategy) to enhance dev output by 25%",
                        "Managed a 14-developer team to deliver mobile games, achieving 100% deadline adherence.",
                        "Built custom editor tools to accelerate development and integrated UGUI with pluggable skins for seamless UI workflows",
                        "Rapidly mastered new tools (GitHub Actions) to reduce build times by 20%.",
                        "Live Ops: Implemented Info API’s to gather real-time data and improve UX with progressive builds.",
                        "Immediate promotion to Team Lead after 4 months for exceptional performance and leadership skills"
                    ],
                    technologies: ["Unity", "C#", "JavaScript", "Installers", "Mobile Development"]
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
                    technologies: ["Unity", "C#", "Android Development", "UI/UX Design"]
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
                        "Developed and launched mobile games for clients,Govt. organizations, and educational institutions",
                        "Managed end-to-end game development processes, from concept to deployment",
                        "Built a team of developers/designers, fostering a collaborative and innovative work environment"
                    ],
                    technologies: ["Unity", "C#", "Android Studio", "Android Development", "UI/UX Design"]
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
                        "Developed and deployed a Standalone Software for Revision of Pension for CCA, Jammu ,Govt. Of India",
                        "Managed end-to-end game development processes, from design to deployment",
                    ],
                    technologies: ["Visual Studio", "C#", "Android Studio", "Android Development", "UI/UX Design"]
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
        // Check if experience section exists, if not create it
        let experienceSection = document.getElementById('experience');
        if (!experienceSection) {
            experienceSection = document.createElement('section');
            experienceSection.id = 'experience';
            experienceSection.className = 'game-section';

            // Insert before footer
            const footer = document.querySelector('footer');
            if (footer) {
                footer.parentNode.insertBefore(experienceSection, footer);
            } else {
                document.querySelector('.container').appendChild(experienceSection);
            }
        }

        experienceSection.innerHTML = `
            <div class="experience-header">
                <h2 class="experience-title">
                    <span class="title-icon">💼</span>
                    ${this.experienceData.title}
                    <span class="title-glow"></span>
                </h2>
                <p class="experience-subtitle">${this.experienceData.subtitle}</p>
            </div>
            
            <div class="experience-timeline">
                ${this.generateExperienceItems()}
            </div>
            
            
        `;
    }

    generateExperienceItems() {
        return this.experienceData.experiences.map((exp, index) => `
            <div class="experience-item" data-experience-id="${exp.id}">
                <div class="experience-timeline-dot"></div>
                <div class="experience-content">
                    <div class="experience-header-info">
                        <div class="experience-company">${exp.company}</div>
                        <div class="experience-duration">${exp.duration}</div>
                    </div>
                    <div class="experience-position">${exp.position}</div>
                    <div class="experience-meta">
                        <span class="experience-location">
                            <i class="fas fa-map-marker-alt"></i>
                            ${exp.location}
                        </span>
                        <span class="experience-type">
                            <i class="fas fa-briefcase"></i>
                            ${exp.type}
                        </span>
                    </div>
                    <p class="experience-description">${exp.description}</p>
                    
                    <div class="experience-achievements">
                        <h4>Key Achievements:</h4>
                        <ul>
                            ${exp.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="experience-technologies">
                        <h4>Technologies Used:</h4>
                        <div class="tech-tags">
                            ${exp.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        </div>
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
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        document.querySelectorAll('.experience-item').forEach(item => {
            observer.observe(item);
        });

        // Add click events for experience items
        document.querySelectorAll('.experience-item').forEach(item => {
            item.addEventListener('click', () => {
                this.toggleExperienceDetails(item);
            });
        });
    }

    toggleExperienceDetails(item) {
        const isExpanded = item.classList.contains('expanded');

        // Close all other expanded items
        document.querySelectorAll('.experience-item.expanded').forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('expanded');
            }
        });

        // Toggle current item
        item.classList.toggle('expanded');
    }

    update(newData) {
        this.experienceData = { ...this.experienceData, ...newData };
        this.render();
        this.setupEventListeners();
    }
}