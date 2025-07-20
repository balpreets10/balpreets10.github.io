/**
 * Portfolio Section - Gaming-oriented project showcase
 */
class PortfolioSection {
    constructor() {
        this.config = {
            title: 'PORTFOLIO',
            subtitle: 'Explore my journey through interactive experiences. From Multiplayers to PC strategy games to Web Casino games.</br>Each project represents a unique challenge conquered and innovation achieved.</br>The Design and Development of this website showcases my knack for UX.',
            filterLabel: 'Filter Projects',
            statIcons: {
                downloads: 'bi-download',
                rating: 'bi-star-fill',
                duration: 'bi-clock'
            },
            statusClasses: {
                'Completed': 'status-completed',
                'In Development': 'status-development',
                'Partially Deployed': 'status-deployed',
                'Side Project': 'status-project'
            }
        };
        this.projectsData = window.projectsData || [];
        this.activeFilter = 'all';
        this.filteredProjects = this.projectsData;
    }

    createBackgroundElements() {
        const bgElements = document.createElement('div');
        bgElements.className = 'portfolio-background-elements';
        bgElements.innerHTML = `
            <div class="portfolio-bg-grid"></div>
            <div class="portfolio-bg-particle particle-1"></div>
            <div class="portfolio-bg-particle particle-2"></div>
            <div class="portfolio-bg-particle particle-3"></div>
            <div class="portfolio-bg-glow glow-1"></div>
            <div class="portfolio-bg-glow glow-2"></div>
        `;
        return bgElements;
    }

    createHeader() {
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

    createCategoryFilter() {
        const categories = new Set(['all']);
        this.projectsData.forEach(project => {
            project.category.forEach(cat => categories.add(cat.toLowerCase()));
        });

        const filterContainer = document.createElement('div');
        filterContainer.className = 'category-filter';
        filterContainer.setAttribute('data-aos', 'fade-up');
        filterContainer.setAttribute('data-aos-delay', '100');

        Array.from(categories).forEach((category, index) => {
            const button = document.createElement('button');
            button.className = `filter-btn ${category === 'all' ? 'active' : ''}`;
            button.setAttribute('data-category', category);
            button.textContent = category === 'all' ? 'All Projects' : category.charAt(0).toUpperCase() + category.slice(1);
            filterContainer.appendChild(button);
        });

        return filterContainer;
    }

    getStatusClass(status) {
        for (const [key, className] of Object.entries(this.config.statusClasses)) {
            if (status.includes(key)) return className;
        }
        return 'status-project';
    }

    createProjectCard(project, index) {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.setAttribute('data-categories', project.category.join(',').toLowerCase());
        card.setAttribute('data-aos', 'fade-up');
        card.setAttribute('data-aos-delay', `${150 + (index % 3) * 100}`);

        // Get first 3 technologies for display and count remaining
        const displayTech = project.technologies.slice(0, 3);
        const remainingCount = project.technologies.length - 3;

        const techList = displayTech.map(tech =>
            `<span class="tech-tag">${tech.trim()}</span>`
        ).join('');

        const techCounter = remainingCount > 0 ?
            `<span class="tech-counter">+${remainingCount}</span>` : '';

        // Get first 2 achievements
        const achievements = project.achievements.slice(0, 2).map(achievement =>
            `<span class="achievement-item">${achievement}</span>`
        ).join('');

        card.innerHTML = `
            <div class="card-image" style="background-image: url('${project.images[0]}')">
                <div class="status-ribbon ${this.getStatusClass(project.status)}">
                    <span class="status-text">${project.status}</span>
                </div>
                <div class="card-overlay"></div>
            </div>
            <div class="card-content">
                <h3 class="card-title">${project.title}</h3>
                <p class="card-description">${project.description}</p>
                
                <div class="card-stats">
                    <div class="stat-item">
                        <i class="${this.config.statIcons.downloads}"></i>
                        <span class="stat-value downloads">${project.stats.downloads}</span>
                    </div>
                    <div class="stat-item">
                        <i class="${this.config.statIcons.rating}"></i>
                        <span class="stat-value rating">${project.stats.rating}</span>
                    </div>
                    <div class="stat-item">
                        <i class="${this.config.statIcons.duration}"></i>
                        <span class="stat-value duration">${project.stats.duration}</span>
                    </div>
                </div>

                <div class="card-technologies">
                    <div class="tech-label">TECH STACK</div>
                    <div class="tech-list">
                        ${techList}
                        ${techCounter}
                    </div>
                </div>

                <div class="card-achievements">
                    <div class="achievement-label">ACHIEVEMENTS</div>
                    <div class="achievement-list">${achievements}</div>
                </div>
            </div>
        `;

        return card;
    }

    createProjectsGrid() {
        const gridContainer = document.createElement('div');
        gridContainer.className = 'projects-grid-container';

        const grid = document.createElement('div');
        grid.className = 'projects-grid';
        grid.id = 'projectsGrid';

        this.projectsData.forEach((project, index) => {
            grid.appendChild(this.createProjectCard(project, index));
        });

        gridContainer.appendChild(grid);
        return gridContainer;
    }

    render() {
        const section = document.createElement('section');
        section.id = 'portfolio';
        section.className = 'portfolio section';

        section.appendChild(this.createBackgroundElements());

        const container = document.createElement('div');
        container.className = 'container';

        container.appendChild(this.createHeader());
        container.appendChild(this.createCategoryFilter());
        container.appendChild(this.createProjectsGrid());

        section.appendChild(container);
        return section;
    }

    setupFilters() {
        const filterButtons = document.querySelectorAll('.portfolio .filter-btn');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active state
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const category = button.getAttribute('data-category');
                this.activeFilter = category;
                this.filterProjects(category);
            });
        });
    }

    filterProjects(category) {
        const cards = document.querySelectorAll('.portfolio .project-card');

        cards.forEach(card => {
            const categories = card.getAttribute('data-categories');
            const shouldShow = category === 'all' || categories.includes(category);

            if (shouldShow) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.6s ease forwards';
            } else {
                card.style.animation = 'fadeOut 0.3s ease forwards';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }

    setupCardInteractions() {
        const cards = document.querySelectorAll('.portfolio .project-card');

        cards.forEach(card => {
            // Add click handler for potential modal or detailed view
            card.addEventListener('click', (e) => {
                // Prevent triggering when clicking links
                if (e.target.closest('.card-link')) return;

                // Future: Open project modal/details
                console.log('Project card clicked:', card.getAttribute('data-categories'));
            });

            // Enhanced hover effects
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-15px) scale(1.02)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    initializeAnimations() {
        // Initialize any additional animations or interactions
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.1 });

        const animatedElements = document.querySelectorAll('.portfolio .project-card');
        animatedElements.forEach(el => observer.observe(el));
    }

    initialize() {
        console.log('Portfolio section initialized');

        // Setup filter functionality
        this.setupFilters();

        // Setup card interactions
        this.setupCardInteractions();

        // Initialize animations
        this.initializeAnimations();

        // Initial filter application
        this.filterProjects(this.activeFilter);
    }
}

window.PortfolioSection = PortfolioSection;