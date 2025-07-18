class GamingMenuSystem {
    constructor() {
        this.isMenuOpen = false;
        this.scrollToTopButton = null;
        this.originalNavLinks = null;
        this.mobileMenuBtn = null;
        this.mobileMenuOverlay = null;
        this.init();
    }

    init() {
        this.preserveOriginalNavigation();
        this.createMobileMenuButton();
        this.createMobileMenuStructure();
        this.createScrollToTopButton();
        this.initializeEventListeners();
        this.handleResize(); // Set initial state
        console.log('Gaming Menu System initialized');
    }

    preserveOriginalNavigation() {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks) {
            // Store original desktop navigation
            this.originalNavLinks = navLinks.cloneNode(true);
            this.originalNavLinks.classList.add('desktop-nav');
        }
    }

    createMobileMenuButton() {
        const navContainer = document.querySelector('.nav-container');
        if (!navContainer) {
            console.warn('Navigation container not found');
            return;
        }

        // Remove existing mobile menu button if it exists
        const existingBtn = navContainer.querySelector('.mobile-menu-btn');
        if (existingBtn) {
            existingBtn.remove();
        }

        // Create mobile menu button
        this.mobileMenuBtn = document.createElement('button');
        this.mobileMenuBtn.className = 'mobile-menu-btn';
        this.mobileMenuBtn.setAttribute('aria-label', 'Toggle navigation menu');
        this.mobileMenuBtn.setAttribute('aria-expanded', 'false');

        navContainer.appendChild(this.mobileMenuBtn);
    }

    createMobileMenuStructure() {
        const navContainer = document.querySelector('.nav-container');
        if (!navContainer) return;

        // Remove existing mobile menu overlay if it exists
        const existingOverlay = document.querySelector('.mobile-menu-overlay');
        if (existingOverlay) {
            existingOverlay.remove();
        }

        // Create mobile menu overlay (initially hidden)
        this.mobileMenuOverlay = document.createElement('div');
        this.mobileMenuOverlay.className = 'mobile-menu-overlay';
        this.mobileMenuOverlay.style.display = 'none';

        // Menu items data
        const menuItems = [
            { href: '#home', icon: '🏠', label: 'Home' },
            { href: '#game', icon: '🎮', label: 'Game' },
            { href: '#projects', icon: '⚔️', label: 'Projects' },
            { href: '#skills', icon: '🛡️', label: 'Skills' },
            { href: '#experience', icon: '📜', label: 'Experience' },
            { href: '#contact', icon: '📡', label: 'Contact' }
        ];

        // Create grid container
        const menuGrid = document.createElement('div');
        menuGrid.className = 'nav-menu-grid';

        // Create menu items
        menuItems.forEach((item, index) => {
            const menuItem = document.createElement('a');
            menuItem.className = 'nav-menu-item';
            menuItem.href = item.href;
            menuItem.style.animationDelay = `${(index + 1) * 0.1}s`;

            menuItem.innerHTML = `
                <div class="nav-menu-icon">${item.icon}</div>
                <span>${item.label}</span>
            `;

            // Add click handler
            menuItem.addEventListener('click', (e) => {
                e.preventDefault();
                this.closeMenu();
                this.navigateToSection(item.href);
            });

            menuGrid.appendChild(menuItem);
        });

        this.mobileMenuOverlay.appendChild(menuGrid);

        // Append to body instead of nav container to avoid conflicts
        document.body.appendChild(this.mobileMenuOverlay);
    }

    createScrollToTopButton() {
        // Remove existing button if it exists
        const existing = document.querySelector('.scroll-to-top');
        if (existing) {
            existing.remove();
        }

        this.scrollToTopButton = document.createElement('button');
        this.scrollToTopButton.className = 'scroll-to-top';
        this.scrollToTopButton.setAttribute('aria-label', 'Scroll to top');
        this.scrollToTopButton.title = 'Scroll to top';

        this.scrollToTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            this.createScrollEffect();
        });

        document.body.appendChild(this.scrollToTopButton);
    }

    initializeEventListeners() {
        // Menu button click
        if (this.mobileMenuBtn) {
            this.mobileMenuBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleMenu();
            });
        }

        // Close menu when clicking on backdrop
        document.addEventListener('click', (e) => {
            if (this.isMenuOpen && this.mobileMenuOverlay) {
                const menuGrid = this.mobileMenuOverlay.querySelector('.nav-menu-grid');
                const clickedInsideMenu = menuGrid && menuGrid.contains(e.target);
                const clickedMenuButton = this.mobileMenuBtn && this.mobileMenuBtn.contains(e.target);

                if (!clickedInsideMenu && !clickedMenuButton) {
                    this.closeMenu();
                }
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMenuOpen) {
                this.closeMenu();
            }
        });

        // Scroll to top button visibility
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                this.handleScrollToTopVisibility();
            }, 10);
        }, { passive: true });

        // Handle resize with proper binding
        this.resizeHandler = () => this.handleResize();
        window.addEventListener('resize', this.resizeHandler);

        // Handle orientation change
        this.orientationHandler = () => {
            setTimeout(() => this.handleResize(), 200);
        };
        window.addEventListener('orientationchange', this.orientationHandler);
    }

    toggleMenu() {
        if (this.isMenuOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    openMenu() {
        if (!this.mobileMenuOverlay) return;

        this.isMenuOpen = true;
        this.mobileMenuOverlay.classList.add('active');
        this.mobileMenuOverlay.style.display = 'flex';

        if (this.mobileMenuBtn) {
            this.mobileMenuBtn.classList.add('active');
            this.mobileMenuBtn.setAttribute('aria-expanded', 'true');
        }

        // Prevent body scrolling
        document.body.classList.add('modal-open');

        // Add entrance animations to menu items
        const menuItems = this.mobileMenuOverlay.querySelectorAll('.nav-menu-item');
        menuItems.forEach((item, index) => {
            item.style.animationDelay = `${(index + 1) * 0.1}s`;
        });

        this.createMenuParticles();
    }

    closeMenu() {
        if (!this.isMenuOpen || !this.mobileMenuOverlay) return;

        this.isMenuOpen = false;
        this.mobileMenuOverlay.classList.remove('active');

        if (this.mobileMenuBtn) {
            this.mobileMenuBtn.classList.remove('active');
            this.mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }

        // Restore body scrolling
        document.body.classList.remove('modal-open');

        // Hide overlay after animation
        setTimeout(() => {
            if (this.mobileMenuOverlay && !this.isMenuOpen) {
                this.mobileMenuOverlay.style.display = 'none';
            }
        }, 300);
    }

    navigateToSection(href) {
        const target = document.querySelector(href);
        if (target) {
            // Add offset for fixed header
            const headerHeight = 80;
            const targetPosition = target.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    handleScrollToTopVisibility() {
        if (!this.scrollToTopButton) return;

        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const showThreshold = 300;

        if (scrollTop > showThreshold) {
            this.scrollToTopButton.classList.add('visible');
        } else {
            this.scrollToTopButton.classList.remove('visible');
        }
    }

    createScrollEffect() {
        const particles = 8;
        const buttonRect = this.scrollToTopButton.getBoundingClientRect();
        const centerX = buttonRect.left + buttonRect.width / 2;
        const centerY = buttonRect.top + buttonRect.height / 2;

        for (let i = 0; i < particles; i++) {
            this.createParticle(centerX, centerY);
        }
    }

    createParticle(x, y) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: #00ff88;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${x}px;
            top: ${y}px;
        `;

        const angle = (Math.PI * 2 * Math.random());
        const velocity = 50 + Math.random() * 50;
        const life = 1000;

        document.body.appendChild(particle);

        let start = Date.now();
        const animate = () => {
            const elapsed = Date.now() - start;
            const progress = elapsed / life;

            if (progress >= 1) {
                particle.remove();
                return;
            }

            const distance = velocity * progress;
            const newX = x + Math.cos(angle) * distance;
            const newY = y + Math.sin(angle) * distance - (progress * progress * 100);

            particle.style.left = newX + 'px';
            particle.style.top = newY + 'px';
            particle.style.opacity = 1 - progress;

            requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
    }

    createMenuParticles() {
        if (!this.mobileMenuOverlay) return;

        const particleCount = 20;

        for (let i = 0; i < particleCount; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.className = 'menu-particle';
                particle.style.cssText = `
                    position: absolute;
                    width: 2px;
                    height: 2px;
                    background: rgba(0, 255, 136, 0.6);
                    border-radius: 50%;
                    pointer-events: none;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    animation: particleFloat 3s ease-out forwards;
                `;
                this.mobileMenuOverlay.appendChild(particle);

                setTimeout(() => {
                    if (particle.parentNode) {
                        particle.remove();
                    }
                }, 3000);
            }, i * 50);
        }
    }

    handleResize() {
        const isMobile = window.innerWidth <= 768;
        const desktopNav = document.querySelector('.nav-links:not(.mobile-menu-overlay)');

        if (isMobile) {
            // Mobile mode
            if (this.mobileMenuBtn) {
                this.mobileMenuBtn.style.display = 'block';
            }
            if (desktopNav) {
                desktopNav.style.display = 'none';
            }
        } else {
            // Desktop mode
            if (this.mobileMenuBtn) {
                this.mobileMenuBtn.style.display = 'none';
            }
            if (desktopNav) {
                desktopNav.style.display = 'flex';
            }
            // Force close mobile menu if open
            if (this.isMenuOpen) {
                this.closeMenu();
            }
        }
    }

    cleanup() {
        if (this.scrollToTopButton) {
            this.scrollToTopButton.remove();
        }

        if (this.mobileMenuOverlay) {
            this.mobileMenuOverlay.remove();
        }

        if (this.mobileMenuBtn) {
            this.mobileMenuBtn.remove();
        }

        // Remove event listeners
        if (this.resizeHandler) {
            window.removeEventListener('resize', this.resizeHandler);
        }
        if (this.orientationHandler) {
            window.removeEventListener('orientationchange', this.orientationHandler);
        }

        // Restore body classes
        document.body.classList.remove('modal-open');

        console.log('Gaming Menu System cleaned up');
    }
}