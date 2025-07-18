class ScrollToTop {
    constructor() {
        this.btn = null;
        this.isMobile = window.innerWidth <= 768;
        this.init();
    }

    init() {
        const scrollToTopBtn = document.getElementById('scrollToTop');

        // Create button if it doesn't exist
        if (!scrollToTopBtn) {
            const newBtn = document.createElement('button');
            newBtn.id = 'scrollToTop';
            newBtn.className = 'scroll-to-top';
            newBtn.setAttribute('aria-label', 'Scroll to top');
            document.body.appendChild(newBtn);
        }

        this.btn = document.getElementById('scrollToTop');

        // Bind methods to preserve 'this' context
        this.toggleScrollButton = this.toggleScrollButton.bind(this);
        this.scrollToTop = this.scrollToTop.bind(this);
        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);
        this.handleResize = this.handleResize.bind(this);

        // Event listeners
        window.addEventListener('scroll', this.toggleScrollButton, { passive: true });
        window.addEventListener('resize', this.handleResize, { passive: true });
        this.btn.addEventListener('click', this.scrollToTop);

        // Handle touch events for mobile
        this.btn.addEventListener('touchstart', this.handleTouchStart);
        this.btn.addEventListener('touchend', this.handleTouchEnd);

        // Force proper positioning on mobile
        if (this.isMobile) {
            this.btn.style.position = 'fixed';
            this.btn.style.bottom = '20px';
            this.btn.style.right = '20px';
            this.btn.style.zIndex = '9998';
            document.body.setAttribute('data-mobile', 'true');
        }

        // Initial check
        this.toggleScrollButton();
    }

    toggleScrollButton() {
        if (!this.btn) return;

        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        // Lower threshold for mobile for better UX
        const threshold = this.isMobile ? 150 : 300;

        if (scrollTop > threshold) {
            this.btn.classList.add('visible');
        } else {
            this.btn.classList.remove('visible');
        }
    }

    handleResize() {
        this.isMobile = window.innerWidth <= 768;

        if (this.isMobile) {
            document.body.setAttribute('data-mobile', 'true');
            // Force mobile positioning
            if (this.btn) {
                this.btn.style.position = 'fixed';
                this.btn.style.bottom = '20px';
                this.btn.style.right = '20px';
                this.btn.style.zIndex = '9998';
            }
        } else {
            document.body.removeAttribute('data-mobile');
        }
    }

    // Smooth scroll to top
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    handleTouchStart(e) {
        e.preventDefault();
        this.btn.style.transform = 'translateY(-2px) scale(1.05)';
    }

    handleTouchEnd(e) {
        e.preventDefault();
        this.btn.style.transform = '';
        this.scrollToTop();
    }

    cleanup() {
        if (this.btn) {
            window.removeEventListener('scroll', this.toggleScrollButton);
            window.removeEventListener('resize', this.handleResize);
            this.btn.removeEventListener('click', this.scrollToTop);
            this.btn.removeEventListener('touchstart', this.handleTouchStart);
            this.btn.removeEventListener('touchend', this.handleTouchEnd);
        }
    }
}