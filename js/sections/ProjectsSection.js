// ProjectsSection.js - Fixed version
class ProjectsSection {
    constructor(projectsData) {
        this.projectsData = projectsData;
        this.currentFilter = 'all';

        // Define filter categories
        this.filterCategories = [
            { key: 'all', label: 'All Projects', icon: 'fas fa-th-large' },
            { key: 'Mobile', label: 'Mobile', icon: 'fas fa-mobile-alt' },
            // { key: 'Web', label: 'Web Games', icon: 'fas fa-desktop' },
            { key: 'Strategy', label: 'Strategy', icon: 'fas fa-chess' },
            { key: 'Casino', label: 'Casino', icon: 'fas fa-dice' },
            // { key: 'E-Learning', label: 'E-Learning', icon: 'fas fa-graduation-cap' },
            // { key: 'Web', label: 'WebGL', icon: 'fas fa-globe' },
            { key: 'Others', label: 'Others', icon: 'fas fa-ellipsis-h' }
        ];

        this.init();
    }

    init() {
        this.createProjectsSection();
        this.setupEventListeners();
        this.setupIntersectionObserver();
    }

    createProjectsSection() {
        const projectsSection = document.querySelector('#projects');

        if (!projectsSection) {
            console.error('Projects section not found');
            return;
        }

        projectsSection.classList.add('projects-section');

        projectsSection.innerHTML = `
            <div class="projects-header">
                <h2 class="projects-title">
                    <span class="title-icon">🎮</span>
                    Portfolio
                    <span class="title-glow"></span>
                </h2>
                <p class="projects-subtitle">
                    Explore my journey through interactive experiences - from mobile RPGs to PC strategy games to Web Casino games.
                    Each project represents a unique challenge conquered and innovation achieved.
                    <br> The Design and Development of this website shwcases my knack for UX.
                </p>
                <div class="projects-controls">
                    ${this.generateFilterButtons()}
                </div>
            </div>
            
            <div class="projects-grid" id="projectsGrid">
                ${this.generateProjectCards()}
            </div>
        `;
    }

    generateFilterButtons() {
        // Get categories that actually exist in the projects data
        const existingCategories = new Set(['all']); // Always include 'all'

        this.projectsData.forEach(project => {
            const category = this.getProjectCategory(project);
            existingCategories.add(category);
        });

        // Filter our categories to only show those that exist in the data
        const availableCategories = this.filterCategories.filter(category =>
            existingCategories.has(category.key)
        );

        return availableCategories.map((category, index) => `
        <button class="filter-btn ${index === 0 ? 'active' : ''}" data-filter="${category.key}">
            <i class="${category.icon}"></i> ${category.label}
        </button>
    `).join('');
    }

    generateProjectCards() {
        // Debug: Log the number of projects
        console.log(`Generating ${this.projectsData.length} project cards`);

        return this.projectsData.map((project, index) => {
            // Validate project data
            if (!project || !project.id || !project.title) {
                console.warn(`Invalid project data at index ${index}:`, project);
                return '';
            }

            // Determine project category
            const projectCategory = this.getProjectCategory(project);

            // Safely handle missing properties
            const images = project.images || [];
            const technologies = project.technologies || [];
            const achievements = project.achievements || [];
            const stats = project.stats || {};

            return `
            <div class="project-card" data-category="${projectCategory}" data-project-id="${project.id}">
                <div class="project-image-container">
                    <img src="${images[0] || 'assets/images/placeholder.png'}" alt="${project.title}" class="project-image">
                    <div class="project-overlay">
                        <div class="overlay-content">
                            <i class="fas fa-eye"></i>
                            <span>Project Details</span>
                        </div>
                    </div>
                    <div class="project-category">${projectCategory}</div>
                    <div class="project-status">
                        <i class="fas fa-check-circle"></i>
                        ${project.status || 'Unknown'}
                    </div>
                </div>
                
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description || 'No description available'}</p>
                    
                    <div class="project-stats">
                        <div class="project-stat">
                            <i class="fas fa-download"></i>
                            <span>${stats.downloads || 'N/A'}</span>
                        </div>
                        <div class="project-stat">
                            <i class="fas fa-star"></i>
                            <span>${stats.rating || 'N/A'}</span>
                        </div>
                        <div class="project-stat">
                            <i class="fas fa-clock"></i>
                            <span>${stats.duration || 'N/A'}</span>
                        </div>
                    </div>
                    
                    <div class="project-tech">
                        ${technologies.slice(0, 3).map(tech => `<span class="tech-tag">${tech.trim()}</span>`).join('')}
                        ${technologies.length > 3 ? `<span class="tech-tag more">+${technologies.length - 3}</span>` : ''}
                    </div>
                    
                    <div class="project-achievements">
                        ${achievements.slice(0, 2).map(achievement => `<span class="achievement-badge">${achievement}</span>`).join('')}
                    </div>
                </div>
                
                <div class="project-glow"></div>
            </div>
        `;
        }).filter(card => card !== '').join(''); // Filter out empty cards
    }

    getProjectCategory(project) {
        // Check if project has category array
        if (Array.isArray(project.category)) {
            // Find the first category that matches our filter categories (excluding 'all' and 'Others')
            const matchingCategory = project.category.find(cat =>
                this.filterCategories.some(filter =>
                    filter.key === cat && filter.key !== 'all' && filter.key !== 'Others'
                )
            );
            return matchingCategory || 'Others';
        }

        // If category is a string, check if it matches our filter categories
        if (typeof project.category === 'string') {
            const matchingCategory = this.filterCategories.find(filter =>
                filter.key === project.category && filter.key !== 'all' && filter.key !== 'Others'
            );
            return matchingCategory ? project.category : 'Others';
        }

        // Default to Others if no category or unrecognized format
        return 'Others';
    }

    setupEventListeners() {
        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.filterProjects(e.target.dataset.filter);

                // Update active state
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
            });
        });

        // Project cards hover effects
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.addHoverEffect(card);
            });

            card.addEventListener('mouseleave', () => {
                this.removeHoverEffect(card);
            });

            card.addEventListener('click', () => {
                const projectId = card.dataset.projectId;
                const projectData = this.projectsData.find(p => p.id === parseInt(projectId, 10));

                if (projectData) {

                    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
                    sessionStorage.setItem('preModalScrollPosition', scrollPosition);
                    // Open project modal with the project data
                    openProjectModal(projectData);

                    // Scroll to top after opening modal
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                    console.error(`Project with ID ${projectId} not found`);
                }
            });
        });
    }

    setupIntersectionObserver() {
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

        document.querySelectorAll('.project-card').forEach(card => {
            observer.observe(card);
        });
    }

    filterProjects(filter) {
        this.currentFilter = filter;
        const cards = document.querySelectorAll('.project-card');

        cards.forEach(card => {
            const category = card.dataset.category;
            const shouldShow = filter === 'all' || category === filter;

            if (shouldShow) {
                card.style.display = 'block';
                card.classList.add('filter-animate-in');
            } else {
                card.classList.add('filter-animate-out');
                setTimeout(() => {
                    card.style.display = 'none';
                    card.classList.remove('filter-animate-out');
                }, 300);
            }
        });
    }

    addHoverEffect(card) {
        const cursor = document.querySelector('.cursor');
        if (cursor) {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.borderColor = '#00ff88';
        }

        this.createParticles(card);
    }

    removeHoverEffect(card) {
        const cursor = document.querySelector('.cursor');
        if (cursor) {
            cursor.style.transform = 'scale(1)';
            cursor.style.borderColor = '#00ff88';
        }
    }

    createParticles(element) {
        const particles = 5;
        const rect = element.getBoundingClientRect();

        for (let i = 0; i < particles; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.left = `${Math.random() * 100}%`;

            element.appendChild(particle);

            setTimeout(() => {
                if (particle.parentNode) {
                    particle.remove();
                }
            }, 2000);
        }
    }

    // Method to handle window resize
    handleResize() {
        // Re-initialize any responsive elements if needed
        this.setupIntersectionObserver();
    }

    // Clean up method
    destroy() {
        // Clear references
        this.projectsData = null;
    }
}

// Initialize projects section when page loads
let projectsManager;
document.addEventListener('DOMContentLoaded', () => {
    // Wait for projects data to be available
    if (typeof projectsData !== 'undefined') {
        console.log('Projects data loaded:', projectsData.length, 'projects');
        projectsManager = new ProjectsSection(projectsData);
    } else {
        // Retry after a short delay if data isn't loaded yet
        setTimeout(() => {
            if (typeof projectsData !== 'undefined') {
                console.log('Projects data loaded (delayed):', projectsData.length, 'projects');
                projectsManager = new ProjectsSection(projectsData);
            } else {
                console.error('Projects data not found after delay');
            }
        }, 100);
    }
});