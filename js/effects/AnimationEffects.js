/**
 * Animation Effects Manager
 * Handles all visual effects and animations for the portfolio
 */
class AnimationEffects {
    constructor() {
        this.cursor = null;
        this.cursorTrails = [];
        this.codeRainInterval = null;
        this.observers = [];

        this.init();
    }

    init() {
        this.initializeMobileMenu();
        this.initializeScrollToTop();
        this.initializeCursor();
        this.initializeCodeRain();
        this.initializeScrollProgress();
        this.initializeAnimations();
        this.initializeCursorEffects();
        console.log('Animation Effects initialized');
    }

    initializeScrollToTop() {
        // Initialize ScrollToTop effect
        if (typeof ScrollToTop !== 'undefined') {
            this.scrollToTop = new ScrollToTop();
            console.log('Scroll to Top initialized');
        } else {
            console.warn('ScrollToTop class not found, skipping initialization');
        }
    }

    /**
     * Custom cursor with trail effect
     */
    initializeCursor() {
        // Only initialize cursor on non-touch devices
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
            console.log('Touch device detected, skipping cursor initialization');
            return;
        }

        this.cursor = document.querySelector('.cursor');
        if (!this.cursor) {
            console.warn('Cursor element not found');
            return;
        }

        document.addEventListener('mousemove', (e) => {
            if (!this.cursor) return;

            // Use requestAnimationFrame for smoother animation
            requestAnimationFrame(() => {
                this.cursor.style.left = e.clientX + 'px';
                this.cursor.style.top = e.clientY + 'px';
            });

            // Create trail effect (throttled)
            if (Math.random() > 0.7) { // Reduce trail frequency for performance
                this.createCursorTrail(e.clientX, e.clientY);
            }
        });

        console.log('Custom cursor initialized');
    }

    createCursorTrail(x, y) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.left = x + 'px';
        trail.style.top = y + 'px';
        document.body.appendChild(trail);

        setTimeout(() => {
            if (trail.parentNode) {
                trail.remove();
            }
        }, 1000);
    }

    initializeMobileMenu() {
        // Initialize the gaming menu system
        this.gamingMenuSystem = new GamingMenuSystem();
        console.log('Gaming mobile menu initialized');
    }

    /**
     * Code rain background effect
     */
    initializeCodeRain() {
        const codeRain = document.getElementById('codeRain');
        if (!codeRain) return;

        // Skip code rain on mobile devices for better performance
        if (window.innerWidth <= 768) {
            console.log('Mobile device detected, skipping code rain');
            return;
        }

        const codeSnippets = [
            'function createGame() {',
            'var player = new Player();',
            'if (gameState === "playing") {',
            'renderer.render(scene, camera);',
            'transform.position = Vector3.zero;',
            'public class GameManager : MonoBehaviour',
            'void Update() {',
            'GameObject.Instantiate(prefab);',
            'yield return new WaitForSeconds(1f);',
            'Debug.Log("Game Started");',
            'const gameLoop = () => {',
            'Physics.Simulate(deltaTime);',
            'Input.GetKeyDown(KeyCode.Space)',
            'StartCoroutine(SpawnEnemies());',
            'Vector3.Distance(player, enemy)',
            'Quaternion.LookRotation(target)'
        ];

        let animationId;
        let lastTime = 0;

        const createCodeLine = (currentTime) => {
            if (currentTime - lastTime > 200) { // Throttle to every 200ms
                const codeLine = document.createElement('div');
                codeLine.className = 'code-line';
                codeLine.textContent = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
                codeLine.style.left = Math.random() * 100 + '%';
                codeLine.style.animationDuration = (Math.random() * 3 + 2) + 's';
                codeLine.style.fontSize = (Math.random() * 10 + 10) + 'px';
                codeLine.style.color = `hsl(${Math.random() * 60 + 120}, 70%, ${Math.random() * 30 + 50}%)`;

                codeRain.appendChild(codeLine);

                // Clean up after animation
                setTimeout(() => {
                    if (codeLine.parentNode) {
                        codeLine.remove();
                    }
                }, 5000);

                lastTime = currentTime;
            }

            animationId = requestAnimationFrame(createCodeLine);
        };

        // Start the animation
        animationId = requestAnimationFrame(createCodeLine);

        // Store reference for cleanup
        this.codeRainAnimation = () => {
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
        };

        console.log('Code rain initialized');
    }

    createCodeLine(container, snippets) {
        const codeLine = document.createElement('div');
        codeLine.className = 'code-line';
        codeLine.textContent = snippets[Math.floor(Math.random() * snippets.length)];
        codeLine.style.left = Math.random() * 100 + '%';
        codeLine.style.animationDuration = (Math.random() * 3 + 2) + 's';
        codeLine.style.fontSize = (Math.random() * 10 + 10) + 'px';
        codeLine.style.color = `hsl(${Math.random() * 60 + 120}, 70%, ${Math.random() * 30 + 50}%)`;

        container.appendChild(codeLine);

        setTimeout(() => {
            if (codeLine.parentNode) {
                codeLine.remove();
            }
        }, 5000);
    }

    /**
     * Scroll progress indicator
     */
    initializeScrollProgress() {
        const scrollProgress = document.getElementById('scrollProgress');
        if (!scrollProgress) return;

        let ticking = false;

        const updateScrollProgress = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = Math.min((scrollTop / scrollHeight) * 100, 100);

            scrollProgress.style.width = progress + '%';
            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollProgress);
                ticking = true;
            }
        };

        // Use passive event listener for better performance
        window.addEventListener('scroll', requestTick, { passive: true });

        console.log('Scroll progress initialized');
    }

    /**
     * Cursor hover effects
     */
    initializeCursorEffects() {
        if (!this.cursor) return;

        const hoverElements = 'a, button, .cta-btn, .nav-links a, .social-links a, .project-card, .unity-game-btn';

        // Helper function to check if element matches selector
        const elementMatches = (element, selector) => {
            if (!element || !element.matches) return false;
            return element.matches(selector);
        };

        document.addEventListener('mouseover', (e) => {
            let target = e.target;
            // Find the nearest parent that might match our selector
            while (target && target !== document) {
                if (elementMatches(target, hoverElements)) {
                    this.cursor.style.transform = 'scale(1.5)';
                    this.cursor.style.borderColor = '#00ff88';
                    this.cursor.style.backgroundColor = 'rgba(0, 255, 136, 0.1)';
                    return;
                }
                target = target.parentNode;
            }

            // Reset if no match found
            this.cursor.style.transform = 'scale(1)';
            this.cursor.style.borderColor = '#00ff88';
            this.cursor.style.backgroundColor = 'transparent';
        });
        /*
        const hoverElements = '.cta-btn, .nav-links a, .social-links a, .project-card, .unity-game-btn';
        
        document.addEventListener('mouseenter', (e) => {
            if (e.target.matches(hoverElements)) {
                this.cursor.style.transform = 'scale(1.5)';
                this.cursor.style.borderColor = '#00ff88';
                this.cursor.style.backgroundColor = 'rgba(0, 255, 136, 0.1)';
            }
        }, true);

        document.addEventListener('mouseleave', (e) => {
            if (e.target.matches(hoverElements)) {
                this.cursor.style.transform = 'scale(1)';
                this.cursor.style.borderColor = '#00ff88';
                this.cursor.style.backgroundColor = 'transparent';
            }
        }, true);
        */
    }

    /**
     * Intersection Observer for scroll animations
     */
    initializeAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        this.observers.push(observer);

        // Observe elements for animation
        const animateElements = document.querySelectorAll('.game-section, .hero-content, .project-card, .experience-item');
        animateElements.forEach(el => {
            observer.observe(el);
        });
    }

    /**
     * Smooth scrolling for navigation links
     */
    initializeSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    /**
     * Typing effect for text elements
     */
    createTypingEffect(element, text, speed = 50) {
        if (!element) return;

        let i = 0;
        element.textContent = '';

        const typing = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typing);
            }
        }, speed);
    }

    createGlitchTypewriter(element, text, speed = 50, glitchChance = 0.1) {
        if (!element) return;

        let i = 0;
        element.textContent = '';

        const typing = setInterval(() => {
            if (i < text.length) {
                // Add glitch effect randomly
                if (Math.random() < glitchChance) {
                    element.classList.add('glitch-effect');
                    setTimeout(() => {
                        element.classList.remove('glitch-effect');
                    }, 200);
                }

                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typing);
                // Final glitch when complete
                this.createGlitchEffect(element, 500);
            }
        }, speed);
    }

    /**
     * Glitch effect for elements
     */
    createGlitchEffect(element, duration = 1000) {
        if (!element) return;

        element.classList.add('glitch-effect');

        setTimeout(() => {
            element.classList.remove('glitch-effect');
        }, duration);
    }

    /**
     * Particle explosion effect
     */
    createParticleExplosion(x, y, color = '#00ff88') {
        const particleCount = 15;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.backgroundColor = color;
            particle.style.setProperty('--random-x', (Math.random() - 0.5) * 200 + 'px');
            particle.style.setProperty('--random-y', (Math.random() - 0.5) * 200 + 'px');

            document.body.appendChild(particle);

            setTimeout(() => {
                if (particle.parentNode) {
                    particle.remove();
                }
            }, 1000);
        }
    }

    /**
     * Floating elements animation
     */
    createFloatingElements() {
        const floatingElements = document.querySelectorAll('.floating-element');

        floatingElements.forEach((element, index) => {
            const duration = 3000 + (index * 500);
            const delay = index * 200;

            element.style.animationDuration = duration + 'ms';
            element.style.animationDelay = delay + 'ms';
            element.classList.add('float-animation');
        });
    }

    /**
     * Handle window resize
     */
    handleResize() {
        // Recalculate any size-dependent animations
        console.log('Animation Effects: Handling resize');
    }

    /**
     * Pause all animations
     */
    pauseAnimations() {
        if (this.codeRainInterval) {
            clearInterval(this.codeRainInterval);
        }
        document.body.style.animationPlayState = 'paused';
    }

    /**
     * Resume all animations
     */
    resumeAnimations() {
        if (!this.codeRainInterval) {
            this.initializeCodeRain();
        }
        document.body.style.animationPlayState = 'running';
    }

    /**
     * Cleanup all effects
     */
    cleanup() {
        // Stop code rain animation
        if (this.codeRainAnimation) {
            this.codeRainAnimation();
        }

        // Clean up gaming menu system
        if (this.gamingMenuSystem) {
            this.gamingMenuSystem.cleanup();
        }

        if (this.scrollToTop) {
            this.scrollToTop.cleanup();
        }
        // Disconnect observers
        this.observers.forEach(observer => {
            observer.disconnect();
        });

        // Remove event listeners
        window.removeEventListener('resize', this.handleResize);
        window.removeEventListener('orientationchange', this.handleOrientationChange);

        // Remove any remaining trail elements
        document.querySelectorAll('.cursor-trail, .particle').forEach(el => {
            el.remove();
        });

        // Restore body overflow if it was modified
        document.body.style.overflow = '';

        console.log('Animation Effects cleaned up');
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AnimationEffects;
}