/**
 * Enhanced Project Modal Handler - Updated with Links section
 * Handles opening, closing, and populating project modals with comprehensive data
 */

class ProjectModal {
    constructor(projectData = null) {
        this.modal = null;
        this.backdrop = null;
        this.isOpen = false;
        this.originalBodyOverflow = '';
        this.currentImageIndex = 0;
        this.images = [];
        this.projectData = projectData;
        this.init();
    }

    init() {
        this.createModal();
        this.bindEvents();
    }

    createModal() {
        const modalHTML = `
            <div class="base-modal project-modal fade" id="projectModal" tabindex="-1" role="dialog" aria-labelledby="projectModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h2 class="modal-title" id="projectModalLabel">
                                <i class="fas fa-project-diagram"></i>
                                Project Details
                            </h2>
                            <button type="button" class="btn-close" aria-label="Close">&times;</button>
                        </div>
                        <div class="modal-body">
                            <div class="modal-body-content">
                                <!-- Left Column -->
                                <div class="left-column">
                                    <!-- Image Carousel Section -->
                                    <div class="project-section">
                                        <h3><i class="fas fa-images"></i> Gallery</h3>
                                        <div class="image-carousel-container">
                                            <div class="image-carousel" id="imageCarousel">
                                                <!-- Images will be populated here -->
                                            </div>
                                            <div class="carousel-controls">
                                                <button class="carousel-btn prev" id="prevBtn">
                                                    <i class="fas fa-chevron-left"></i>
                                                </button>
                                                <div class="carousel-indicators" id="carouselIndicators">
                                                    <!-- Indicators will be populated here -->
                                                </div>
                                                <button class="carousel-btn next" id="nextBtn">
                                                    <i class="fas fa-chevron-right"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Video Section -->
                                    <div class="project-section" id="videoSection">
                                        <h3><i class="fas fa-video"></i> Demo Video</h3>
                                        <div class="video-container" id="videoContainer">
                                            <!-- Video will be populated here -->
                                        </div>
                                    </div>

                                    <!-- Links Section -->
                                    <div class="project-section" id="linksSection">
                                        <h3><i class="fas fa-external-link-alt"></i> Links</h3>
                                        <div class="links-list" id="projectLinks">
                                            <!-- Links will be populated here -->
                                        </div>
                                    </div>

                                    <!-- Overview Section -->
                                    <div class="project-section">
                                        <h3><i class="fas fa-info-circle"></i> Overview</h3>
                                        <p id="projectDescription">Loading...</p>
                                        <div class="client-info" id="clientInfo">
                                            <strong>Client:</strong> <span id="projectClient">N/A</span>
                                        </div>
                                    </div>

                                    <!-- Technologies Section -->
                                    <div class="project-section">
                                        <h3><i class="fas fa-code"></i> Technologies</h3>
                                        <div class="tech-list" id="projectTechnologies">
                                            <!-- Technologies will be populated here -->
                                        </div>
                                    </div>

                                    <!-- Achievements Section -->
                                    <div class="project-section">
                                        <h3><i class="fas fa-trophy"></i> Achievements</h3>
                                        <div class="achievements-grid" id="projectAchievements">
                                            <!-- Achievements will be populated here -->
                                        </div>
                                    </div>
                                </div>

                                <!-- Right Column -->
                                <div class="right-column">
                                    <!-- Project Stats Section -->
                                    <div class="project-section">
                                        <h3><i class="fas fa-chart-bar"></i> Project Stats</h3>
                                        <div class="stats-grid" id="projectStats">
                                            <!-- Stats will be populated here -->
                                        </div>
                                    </div>

                                    <!-- Role & Responsibilities -->
                                    <div class="project-section">
                                        <h3><i class="fas fa-user-tie"></i> Role & Responsibilities</h3>
                                        <div class="roles-list" id="projectRoles">
                                            <!-- Roles will be populated here -->
                                        </div>
                                    </div>

                                    <!-- Features Section -->
                                    <div class="project-section">
                                        <h3><i class="fas fa-star"></i> Key Features</h3>
                                        <div class="features-list" id="projectFeatures">
                                            <!-- Features will be populated here -->
                                        </div>
                                    </div>

                                    <!-- Challenges Section -->
                                    <div class="project-section">
                                        <h3><i class="fas fa-mountain"></i> Challenges Overcome</h3>
                                        <div class="challenges-list" id="projectChallenges">
                                            <!-- Challenges will be populated here -->
                                        </div>
                                    </div>

                                    

                                    <!-- Categories Section -->
                                    <div class="project-section">
                                        <h3><i class="fas fa-tags"></i> Categories</h3>
                                        <div class="categories-list" id="projectCategories">
                                            <!-- Categories will be populated here -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="base-modal-backdrop fade" id="projectModalBackdrop"></div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.modal = document.getElementById('projectModal');
        this.backdrop = document.getElementById('projectModalBackdrop');
    }

    bindEvents() {
        // Close button
        const closeBtn = this.modal.querySelector('.btn-close');
        closeBtn.addEventListener('click', () => this.close());

        // Modal dialog click (outside content area)
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });

        // Backdrop click
        this.backdrop.addEventListener('click', () => this.close());

        // Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });

        // Prevent modal content click from closing modal
        const modalContent = this.modal.querySelector('.modal-content');
        modalContent.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        // Carousel controls
        const prevBtn = this.modal.querySelector('#prevBtn');
        const nextBtn = this.modal.querySelector('#nextBtn');

        prevBtn.addEventListener('click', () => this.previousImage());
        nextBtn.addEventListener('click', () => this.nextImage());

        // Keyboard navigation for carousel
        document.addEventListener('keydown', (e) => {
            if (this.isOpen) {
                if (e.key === 'ArrowLeft') this.previousImage();
                if (e.key === 'ArrowRight') this.nextImage();
            }
        });
    }

    open(projectData = null) {
        const dataToUse = projectData || this.projectData;

        if (!dataToUse) {
            console.error('No project data provided to modal');
            return;
        }

        // Save current scroll position
        sessionStorage.setItem('preModalScrollPosition', window.pageYOffset.toString());

        this.populateModal(dataToUse);
        this.originalBodyOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        document.body.classList.add('modal-open');

        this.modal.style.display = 'block';
        this.backdrop.style.display = 'block';

        // Force reflow
        this.modal.offsetHeight;
        this.backdrop.offsetHeight;

        setTimeout(() => {
            this.modal.classList.add('show');
            this.backdrop.classList.add('show');
            const modalBody = this.modal.querySelector('.modal-body');
            if (modalBody) {
                modalBody.scrollTop = 0;
            }
        }, 10);

        this.isOpen = true;
        this.modal.focus();
    }

    close() {
        this.modal.classList.remove('show');
        this.backdrop.classList.remove('show');
        document.body.style.overflow = this.originalBodyOverflow;
        document.body.classList.remove('modal-open');

        setTimeout(() => {
            this.modal.style.display = 'none';
            this.backdrop.style.display = 'none';

            // Restore scroll position after closing modal
            const savedPosition = sessionStorage.getItem('preModalScrollPosition');
            if (savedPosition) {
                window.scrollTo({
                    top: parseInt(savedPosition),
                    behavior: 'smooth'
                });
                sessionStorage.removeItem('preModalScrollPosition');
            }
        }, 300);

        this.isOpen = false;
    }

    populateModal(data) {
        // Set title
        const title = this.modal.querySelector('#projectModalLabel');
        title.innerHTML = `<i class="fas fa-project-diagram"></i> ${data.title || 'Project Details'}`;

        // Set description
        const description = this.modal.querySelector('#projectDescription');
        description.textContent = data.description || 'No description available.';

        // Set client
        const client = this.modal.querySelector('#projectClient');
        client.textContent = data.client || 'N/A';

        // Populate sections
        this.populateImageCarousel(data.images || []);
        this.populateVideoSection(data.videoUrl);
        this.populateStats(data.stats || {});
        this.populateLinks(data);
        this.populateTechnologies(data.technologies || []);
        this.populateRoles(data.roles || []);
        this.populateFeatures(data.features || []);
        this.populateChallenges(data.challenges || []);
        this.populateAchievements(data.achievements || []);
        this.populateCategories(data.category || []);
    }

    populateLinks(data) {
        const linksSection = this.modal.querySelector('#linksSection');
        const linksContainer = this.modal.querySelector('#projectLinks');

        // Collect available links
        const links = [];

        if (data.androidapplink) {
            links.push({
                url: data.androidapplink,
                title: 'Download for Android',
                icon: 'fab fa-google-play',
                class: 'android-link'
            });
        }

        if (data.iosapplink) {
            links.push({
                url: data.iosapplink,
                title: 'Download for iOS',
                icon: 'fab fa-app-store',
                class: 'ios-link'
            });
        }

        if (data.webbuildlink) {
            links.push({
                url: data.webbuildlink,
                title: 'Play Web Version',
                icon: 'fas fa-globe',
                class: 'web-link'
            });
        }

        // Show or hide section based on available links
        if (links.length === 0) {
            linksSection.style.display = 'none';
            return;
        }

        linksSection.style.display = 'block';

        // Generate links HTML
        linksContainer.innerHTML = links.map(link => `
            <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="project-link ${link.class}">
                <div class="link-icon">
                    <i class="${link.icon}"></i>
                </div>
                <div class="link-content">
                    <div class="link-title">${link.title}</div>
                    <div class="link-url">${this.formatUrl(link.url)}</div>
                </div>
                <div class="link-arrow">
                    <i class="fas fa-external-link-alt"></i>
                </div>
            </a>
        `).join('');
    }

    populateImageCarousel(images) {
        this.images = images;
        this.currentImageIndex = 0;

        const carousel = this.modal.querySelector('#imageCarousel');
        const indicators = this.modal.querySelector('#carouselIndicators');

        if (images.length === 0) {
            carousel.innerHTML = '<div class="no-images">No images available</div>';
            indicators.innerHTML = '';
            return;
        }

        // Create image elements
        carousel.innerHTML = images.map((image, index) => `
            <div class="carousel-item ${index === 0 ? 'active' : ''}" data-index="${index}">
                <img src="${image}" alt="Project Image ${index + 1}" class="carousel-image" loading="lazy">
            </div>
        `).join('');

        // Create indicators
        indicators.innerHTML = images.map((_, index) => `
            <button class="indicator ${index === 0 ? 'active' : ''}" data-index="${index}" aria-label="Go to image ${index + 1}"></button>
        `).join('');

        // Bind indicator clicks
        indicators.querySelectorAll('.indicator').forEach(indicator => {
            indicator.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                this.showImage(index);
            });
        });

        // Show/hide controls based on image count
        const prevBtn = this.modal.querySelector('#prevBtn');
        const nextBtn = this.modal.querySelector('#nextBtn');

        if (images.length <= 1) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'flex';
            nextBtn.style.display = 'flex';
        }
    }

    populateVideoSection(videoUrl) {
        const videoSection = this.modal.querySelector('#videoSection');
        const videoContainer = this.modal.querySelector('#videoContainer');

        if (!videoUrl) {
            videoSection.style.display = 'none';
            return;
        }

        videoSection.style.display = 'block';

        // Extract video ID from YouTube URL
        const videoId = this.extractYouTubeId(videoUrl);

        if (videoId) {
            videoContainer.innerHTML = `
                <div class="video-wrapper">
                    <iframe 
                        src="https://www.youtube.com/embed/${videoId}" 
                        frameborder="0" 
                        allowfullscreen
                        title="Project Demo Video"
                        loading="lazy">
                    </iframe>
                </div>
            `;
        } else {
            videoContainer.innerHTML = '<p class="no-data">Invalid video URL</p>';
        }
    }

    populateStats(stats) {
        const statsContainer = this.modal.querySelector('#projectStats');
        const statsEntries = Object.entries(stats);

        if (statsEntries.length === 0) {
            statsContainer.innerHTML = '<p class="no-data">No stats available</p>';
            return;
        }

        statsContainer.innerHTML = statsEntries.map(([key, value]) => `
            <div class="stat-item">
                <div class="stat-value">${value}</div>
                <div class="stat-label">${this.formatLabel(key)}</div>
            </div>
        `).join('');
    }

    populateTechnologies(technologies) {
        const techContainer = this.modal.querySelector('#projectTechnologies');

        if (technologies.length === 0) {
            techContainer.innerHTML = '<p class="no-data">No technologies listed</p>';
            return;
        }

        techContainer.innerHTML = technologies.map(tech =>
            `<span class="tech-item">${this.escapeHtml(tech.trim())}</span>`
        ).join('');
    }

    populateRoles(roles) {
        const rolesContainer = this.modal.querySelector('#projectRoles');

        if (roles.length === 0) {
            rolesContainer.innerHTML = '<p class="no-data">No roles specified</p>';
            return;
        }

        rolesContainer.innerHTML = roles.map(role =>
            `<div class="role-item">• ${this.escapeHtml(role)}</div>`
        ).join('');
    }

    populateFeatures(features) {
        const featuresContainer = this.modal.querySelector('#projectFeatures');

        if (features.length === 0) {
            featuresContainer.innerHTML = '<p class="no-data">No features listed</p>';
            return;
        }

        featuresContainer.innerHTML = features.map(feature =>
            `<div class="feature-item">• ${this.escapeHtml(feature)}</div>`
        ).join('');
    }

    populateChallenges(challenges) {
        const challengesContainer = this.modal.querySelector('#projectChallenges');

        if (challenges.length === 0) {
            challengesContainer.innerHTML = '<p class="no-data">No challenges listed</p>';
            return;
        }

        challengesContainer.innerHTML = challenges.map(challenge =>
            `<div class="challenge-item">• ${this.escapeHtml(challenge)}</div>`
        ).join('');
    }

    populateAchievements(achievements) {
        const achievementsContainer = this.modal.querySelector('#projectAchievements');

        if (achievements.length === 0) {
            achievementsContainer.innerHTML = '<p class="no-data">No achievements listed</p>';
            return;
        }

        achievementsContainer.innerHTML = achievements.map(achievement =>
            `<div class="achievement-item">${this.escapeHtml(achievement)}</div>`
        ).join('');
    }

    populateCategories(categories) {
        const categoriesContainer = this.modal.querySelector('#projectCategories');

        if (categories.length === 0) {
            categoriesContainer.innerHTML = '<p class="no-data">No categories specified</p>';
            return;
        }

        categoriesContainer.innerHTML = categories.map(category =>
            `<span class="category-item">${this.escapeHtml(category.trim())}</span>`
        ).join('');
    }

    // Carousel methods
    showImage(index) {
        if (this.images.length === 0) return;

        this.currentImageIndex = index;

        // Update carousel items
        const items = this.modal.querySelectorAll('.carousel-item');
        items.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });

        // Update indicators
        const indicators = this.modal.querySelectorAll('.indicator');
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
    }

    nextImage() {
        if (this.images.length === 0) return;
        const nextIndex = (this.currentImageIndex + 1) % this.images.length;
        this.showImage(nextIndex);
    }

    previousImage() {
        if (this.images.length === 0) return;
        const prevIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
        this.showImage(prevIndex);
    }

    // Helper methods
    extractYouTubeId(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    }

    formatLabel(key) {
        return key.replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase())
            .trim();
    }

    formatUrl(url) {
        try {
            const urlObj = new URL(url);
            return urlObj.hostname.replace('www.', '');
        } catch {
            return url.length > 30 ? url.substring(0, 30) + '...' : url;
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Cleanup method
    destroy() {
        if (this.modal) {
            this.modal.remove();
        }
        if (this.backdrop) {
            this.backdrop.remove();
        }
        this.modal = null;
        this.backdrop = null;
        this.isOpen = false;
    }
}

// Initialize modal when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.projectModal = new ProjectModal();
});

// Helper function to open modal with project data
function openProjectModal(projectData) {
    if (window.projectModal) {
        window.projectModal.open(projectData);
    } else {
        console.error('Project modal not initialized');
    }
}