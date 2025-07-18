/**
 * GameSection.js - Updated for base modal system
 * Handles Unity game loading, progress tracking, and interactive controls
 */
class GameSection {
    constructor() {
        this.gameData = {
            title: "Interactive Resume Experience",
            description: "Experience my interactive Unity-powered resume journey. Navigate through different levels representing my professional milestones, skills, and achievements in an engaging 3D environment.",
            features: [
                "3D Navigation",
                "Interactive CV",
                "Project Showcase",
                "Skill Demos"
            ]
        };

        this.gameContainer = null;
        this.unityInstance = null;
        this.unityCanvas = null;
        this.isGameLoaded = false;
        this.isLoading = false;
        this.isVisible = false;
        this.retryAttempts = 0;
        this.maxRetryAttempts = 3;
        this.loadingProgress = 0;
        this.contextLost = false;
        this.isFullscreen = false;
        this.wasMobileBeforeFullscreen = false;
        this.lastScrollPosition = 0;

        // Unity build configuration
        this.unityConfig = {
            buildUrl: "game/Build",
            arguments: [],
            companyName: "Gaming Dronzz",
            productName: "Portfolio",
            productVersion: "0.1.0"
        };

        this.init();
    }

    init() {
        this.render();
        this.setupEventListeners();
        this.setupIntersectionObserver();
        this.setupVisibilityHandlers();
        this.setupMobileDetection();
        this.registerServiceWorker();
        this.initializeManifest();

        // Monitor device pixel ratio changes
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);
            mediaQuery.addEventListener('change', () => {
                this.handleDevicePixelRatioChange();
            });
        }
    }

    render() {
        const gameSection = document.getElementById('game');
        if (!gameSection) return;

        gameSection.innerHTML = `
            <div class="game-section-content">
                <div class="game-header">
                    <h2 class="section-title">${this.gameData.title}</h2>
                </div>
                
                <!-- Combined Info Strip -->
                <div class="game-info-strip">
                    <div class="info-content">
                        <div class="game-description">
                            ${this.gameData.description}
                        </div>
                        <div class="game-features">
                            ${this.gameData.features.map(feature =>
            `<span class="feature-tag">${feature}</span>`
        ).join('')}
                        </div>
                    </div>
                </div>

                <!-- Main Game Container -->
                <div class="game-container">
                    <div class="game-controls">
                        <button id="game-load-btn" class="game-control-btn load-btn" data-tooltip="Load Game">
                            <i class="fas fa-play"></i><span class="btn-text">Play</span>
                        </button>
                        <button id="game-fullscreen-btn" class="game-control-btn fullscreen-btn" data-tooltip="Fullscreen" disabled>
                            <i class="fas fa-expand"></i><span class="btn-text"> Fullscreen</span>
                        </button>
                        <button id="game-reload-btn" class="game-control-btn reload-btn" data-tooltip="Reload" disabled>
                            <i class="fas fa-sync-alt"></i><span class="btn-text"> Reload Game</span>
                        </button>
                        <button id="game-info-btn" class="game-control-btn info-btn" data-tooltip="Game Info">
                            <i class="fas fa-info-circle"></i><span class="btn-text"> Info</span>
                        </button>
                    </div>
                    
                    <div id="unity-game-container" class="unity-container">
                        <div class="game-placeholder">
                            <div class="placeholder-content">
                                <i class="fas fa-gamepad placeholder-icon"></i>
                                <h3>Unity Game Ready</h3>
                                <p>Click "Play" to start the interactive experience</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.gameContainer = document.getElementById('unity-game-container');
        this.setupUnityContainer();
    }

    setupUnityContainer() {
        if (!this.gameContainer) return;

        // Create Unity canvas
        this.unityCanvas = document.createElement('canvas');
        this.unityCanvas.id = 'unity-canvas';
        this.unityCanvas.tabIndex = -1;
        this.unityCanvas.style.display = 'none';

        // Create loading bar
        const loadingBar = document.createElement('div');
        loadingBar.id = 'unity-loading-bar';
        loadingBar.style.display = 'none';
        loadingBar.innerHTML = `
            <div id="unity-logo"></div>
            <div id="unity-progress-bar-empty">
                <div id="unity-progress-bar-full"></div>
            </div>
        `;

        // Create warning banner
        const warningBanner = document.createElement('div');
        warningBanner.id = 'unity-warning';
        warningBanner.style.display = 'none';

        this.gameContainer.appendChild(this.unityCanvas);
        this.gameContainer.appendChild(loadingBar);
        this.gameContainer.appendChild(warningBanner);
    }

    setupEventListeners() {
        // Game controls
        const loadBtn = document.getElementById('game-load-btn');
        if (loadBtn) {
            loadBtn.addEventListener('click', async (e) => {
                e.preventDefault();
                e.stopPropagation();

                const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
                if (isMobile) {
                    await this.prepareMobileFullscreen();
                }
                this.loadUnityGame();
            });
        }

        const fullscreenBtn = document.getElementById('game-fullscreen-btn');
        if (fullscreenBtn) {
            fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());
        }

        const reloadBtn = document.getElementById('game-reload-btn');
        if (reloadBtn) {
            reloadBtn.addEventListener('click', () => this.handleReloadGame());
        }

        const infoBtn = document.getElementById('game-info-btn');
        if (infoBtn) {
            infoBtn.addEventListener('click', () => this.showGameInfo());
        }

        // Fullscreen change events
        document.addEventListener('fullscreenchange', () => this.handleFullscreenChange());
        document.addEventListener('webkitfullscreenchange', () => this.handleFullscreenChange());
        document.addEventListener('mozfullscreenchange', () => this.handleFullscreenChange());
        document.addEventListener('MSFullscreenChange', () => this.handleFullscreenChange());

        // Screen orientation change
        if (screen.orientation) {
            screen.orientation.addEventListener('change', () => this.handleOrientationChange());
        }
        window.addEventListener('orientationchange', () => this.handleOrientationChange());

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (!this.isVisible) return;

            switch (e.key) {
                case 'Escape':
                    if (this.isFullscreen) {
                        this.exitFullscreen();
                    }
                    break;
                case 'F11':
                    e.preventDefault();
                    this.toggleFullscreen();
                    break;
                case 'f':
                case 'F':
                    if (e.ctrlKey && this.isGameLoaded) {
                        e.preventDefault();
                        this.toggleFullscreen();
                    }
                    break;
                case 'r':
                case 'R':
                    if (e.ctrlKey && this.isGameLoaded) {
                        e.preventDefault();
                        this.handleReloadGame();
                    }
                    break;
            }
        });
    }

    setupMobileDetection() {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

        if (isMobile) {
            document.body.classList.add('mobile-device');

            let lastTouchEnd = 0;
            document.addEventListener('touchend', (e) => {
                const now = new Date().getTime();
                if (now - lastTouchEnd <= 300) {
                    e.preventDefault();
                }
                lastTouchEnd = now;
            }, false);

            document.addEventListener('gesturestart', (e) => {
                e.preventDefault();
            });

            let viewport = document.querySelector('meta[name="viewport"]');
            if (!viewport) {
                viewport = document.createElement('meta');
                viewport.name = 'viewport';
                viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.5, user-scalable=yes, viewport-fit=cover';
                document.head.appendChild(viewport);
            }
        }
    }

    async prepareMobileFullscreen() {
        try {
            const element = this.gameContainer;
            const fullscreenPromise = element.requestFullscreen?.() ||
                element.webkitRequestFullscreen?.() ||
                element.mozRequestFullScreen?.() ||
                element.msRequestFullscreen?.();

            await fullscreenPromise;
            await this.requestLandscapeOrientation();

            this.isFullscreen = true;
            this.wasMobileBeforeFullscreen = true;
            this.updateFullscreenButton();
        } catch (error) {
            console.warn('Mobile fullscreen preparation failed:', error);
        }
    }

    async loadUnityGame() {
        if (this.isLoading || this.isGameLoaded) return;

        this.isLoading = true;
        this.showGameLoading();

        try {
            await this.loadUnityScript();

            const config = {
                arguments: this.unityConfig.arguments,
                dataUrl: `${this.unityConfig.buildUrl}/Web.data.gz`,
                frameworkUrl: `${this.unityConfig.buildUrl}/Web.framework.js.gz`,
                codeUrl: `${this.unityConfig.buildUrl}/Web.wasm.gz`,
                streamingAssetsUrl: "game/StreamingAssets",
                companyName: this.unityConfig.companyName,
                productName: this.unityConfig.productName,
                productVersion: this.unityConfig.productVersion,
                showBanner: this.unityShowBanner.bind(this),
                matchWebGLToCanvasSize: true,
                devicePixelRatio: window.devicePixelRatio || 1
            };

            this.unityInstance = await createUnityInstance(this.unityCanvas, config, (progress) => {
                this.updateLoadingProgress(progress);
            });

            setTimeout(() => {
                this.setCanvasSize();
            }, 100);

            this.isGameLoaded = true;
            this.isLoading = false;
            this.hideGameLoading();
            this.updateGameControls(true);
            this.sendSectionDataToUnity();

        } catch (error) {
            console.error('Unity loading failed:', error);
            this.isLoading = false;
            this.handleGameLoadError(error);
        }
    }

    handleDevicePixelRatioChange() {
        if (this.unityInstance) {
            try {
                this.unityInstance.SendMessage("GameManager", "HandlePixelRatioChange", window.devicePixelRatio);
            } catch (error) {
                console.warn('Could not handle pixel ratio change:', error);
            }
        }
    }

    loadUnityScript() {
        return new Promise((resolve, reject) => {
            if (window.createUnityInstance) {
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.src = `${this.unityConfig.buildUrl}/Web.loader.js`;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    setCanvasSize() {
        if (!this.unityCanvas) return;

        const container = this.gameContainer;
        const containerRect = container.getBoundingClientRect();
        const canvasWidth = containerRect.width;
        const canvasHeight = containerRect.height;

        this.unityCanvas.width = canvasWidth;
        this.unityCanvas.height = canvasHeight;
        this.unityCanvas.style.width = canvasWidth + 'px';
        this.unityCanvas.style.height = canvasHeight + 'px';
        console.log(`Unity canvas resized to ${canvasWidth}x${canvasHeight}`);
    }

    async toggleFullscreen() {
        if (!this.isGameLoaded) return;

        if (this.isFullscreen) {
            await this.exitFullscreen();
        } else {
            await this.enterFullscreen();
        }
    }

    async enterFullscreen() {
        try {
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

            if (isMobile) {
                this.wasMobileBeforeFullscreen = true;
                await this.requestLandscapeOrientation();
                await new Promise(resolve => setTimeout(resolve, 300));
            }

            const element = this.gameContainer;
            if (element.requestFullscreen) {
                await element.requestFullscreen();
            } else if (element.webkitRequestFullscreen) {
                await element.webkitRequestFullscreen();
            } else if (element.mozRequestFullScreen) {
                await element.mozRequestFullScreen();
            } else if (element.msRequestFullscreen) {
                await element.msRequestFullscreen();
            }
        } catch (error) {
            console.warn('Fullscreen request failed:', error);
        }
    }

    async exitFullscreen() {
        try {
            if (document.exitFullscreen) {
                await document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                await document.webkitExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                await document.mozCancelFullScreen();
            } else if (document.msExitFullscreen) {
                await document.msExitFullscreen();
            }
        } catch (error) {
            console.warn('Exit fullscreen failed:', error);
        }
    }

    async requestLandscapeOrientation() {
        if (!screen.orientation || !screen.orientation.lock) {
            console.warn('Screen orientation API not supported');
            return;
        }

        try {
            await screen.orientation.lock('landscape-primary');
            console.log('Locked to landscape-primary');
        } catch (error) {
            try {
                await screen.orientation.lock('landscape');
                console.log('Locked to landscape');
            } catch (error2) {
                try {
                    await screen.orientation.lock('landscape-secondary');
                    console.log('Locked to landscape-secondary');
                } catch (error3) {
                    console.warn('All orientation lock attempts failed:', error3);
                }
            }
        }
    }

    handleFullscreenChange() {
        this.isFullscreen = !!(document.fullscreenElement ||
            document.webkitFullscreenElement ||
            document.mozFullScreenElement ||
            document.msFullscreenElement);

        this.updateFullscreenButton();

        if (!this.isFullscreen && this.wasMobileBeforeFullscreen) {
            if (screen.orientation && screen.orientation.unlock) {
                screen.orientation.unlock();
            }
            this.wasMobileBeforeFullscreen = false;
        }

        setTimeout(() => {
            this.setCanvasSize();
            this.handleResize();
        }, 200);
    }

    handleOrientationChange() {
        setTimeout(() => {
            this.setCanvasSize();
            this.handleResize();
        }, 400);
    }

    updateFullscreenButton() {
        const fullscreenBtn = document.getElementById('game-fullscreen-btn');
        if (fullscreenBtn) {
            const icon = fullscreenBtn.querySelector('i');
            const text = fullscreenBtn.querySelector('.btn-text');

            if (this.isFullscreen) {
                icon.className = 'fas fa-compress';
                if (text) text.textContent = ' Exit Fullscreen';
                fullscreenBtn.setAttribute('data-tooltip', 'Exit Fullscreen');
            } else {
                icon.className = 'fas fa-expand';
                if (text) text.textContent = ' Fullscreen';
                fullscreenBtn.setAttribute('data-tooltip', 'Fullscreen');
            }
        }
    }

    unityShowBanner(msg, type) {
        const warningBanner = document.getElementById('unity-warning');
        if (!warningBanner) return;

        const div = document.createElement('div');
        div.innerHTML = msg;
        warningBanner.appendChild(div);

        if (type === 'error') {
            div.style.cssText = 'background: red; padding: 10px; color: white; margin: 5px 0;';
        } else if (type === 'warning') {
            div.style.cssText = 'background: yellow; padding: 10px; color: black; margin: 5px 0;';
            setTimeout(() => {
                if (warningBanner.contains(div)) {
                    warningBanner.removeChild(div);
                }
            }, 5000);
        }

        warningBanner.style.display = warningBanner.children.length ? 'block' : 'none';
    }

    showGameLoading() {
        if (!this.gameContainer) return;

        const placeholder = this.gameContainer.querySelector('.game-placeholder');
        if (placeholder) placeholder.style.display = 'none';

        const loadingBar = document.getElementById('unity-loading-bar');
        if (loadingBar) loadingBar.style.display = 'block';

        const loadBtn = document.getElementById('game-load-btn');
        if (loadBtn) {
            loadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span class="btn-text"> Loading...</span>';
            loadBtn.disabled = true;
        }
    }

    hideGameLoading() {
        const loadingBar = document.getElementById('unity-loading-bar');
        if (loadingBar) loadingBar.style.display = 'none';

        if (this.unityCanvas) {
            this.unityCanvas.style.display = 'block';
        }

        const loadBtn = document.getElementById('game-load-btn');
        if (loadBtn) {
            loadBtn.style.display = 'none';
        }
    }

    updateLoadingProgress(progress) {
        this.loadingProgress = progress;
        const percentage = Math.round(progress * 100);

        const progressBarFull = document.getElementById('unity-progress-bar-full');
        if (progressBarFull) {
            progressBarFull.style.width = percentage + '%';
        }
    }

    setupIntersectionObserver() {
        const gameSection = document.getElementById('game');
        if (!gameSection) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
                    this.isVisible = true;
                    this.onSectionVisible();
                } else {
                    this.isVisible = false;
                    this.onSectionHidden();
                }
            });
        }, {
            threshold: [0, 0.1, 0.5],
            rootMargin: '50px'
        });

        observer.observe(gameSection);
    }

    setupVisibilityHandlers() {
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.onSectionHidden();
            } else if (this.isVisible) {
                this.onSectionVisible();
            }
        });

        window.addEventListener('blur', () => {
            this.onSectionHidden();
        });

        window.addEventListener('focus', () => {
            if (this.isVisible) {
                this.onSectionVisible();
            }
        });

        window.addEventListener('resize', () => {
            this.setCanvasSize();
            this.handleResize();
        });
    }

    async registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            try {
                const registration = await navigator.serviceWorker.register('game/ServiceWorker.js');
                console.log('Service Worker registered successfully:', registration);

                registration.addEventListener('updatefound', () => {
                    console.log('Service Worker update found');
                    const newWorker = registration.installing;
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            this.showBanner('Game updated! Refresh to get the latest version.', 'info');
                        }
                    });
                });
            } catch (error) {
                console.warn('Service Worker registration failed:', error);
            }
        }
    }

    initializeManifest() {
        let manifestLink = document.querySelector('link[rel="manifest"]');
        if (!manifestLink) {
            manifestLink = document.createElement('link');
            manifestLink.rel = 'manifest';
            manifestLink.href = 'game/manifest.webmanifest';
            document.head.appendChild(manifestLink);
            console.log('Web App Manifest linked');
        }

        let themeColorMeta = document.querySelector('meta[name="theme-color"]');
        if (!themeColorMeta) {
            themeColorMeta = document.createElement('meta');
            themeColorMeta.name = 'theme-color';
            themeColorMeta.content = '#231F20';
            document.head.appendChild(themeColorMeta);
        }
    }

    onSectionVisible() {
        console.log('Game section is now visible');
        if (this.unityInstance) {
            try {
                this.unityInstance.SendMessage('Main Camera', 'OnApplicationFocus', 1);
            } catch (error) {
                console.warn('Could not resume Unity game:', error);
            }
        }
    }

    onSectionHidden() {
        console.log('Game section is now hidden');

        if (this.unityInstance && !this.contextLost) {
            try {
                this.unityInstance.SendMessage('Main Camera', 'OnApplicationFocus', 0);
            } catch (error) {
                console.warn('Could not pause Unity game:', error);
            }
        }
    }

    handleReloadGame() {
        if (!this.isGameLoaded) return;

        const reloadBtn = document.getElementById('game-reload-btn');
        if (reloadBtn) {
            reloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span class="btn-text"> Reloading...</span>';
            reloadBtn.disabled = true;
        }

        this.cleanup();

        setTimeout(() => {
            this.render();
            this.setupEventListeners();
            if (reloadBtn) {
                reloadBtn.innerHTML = '<i class="fas fa-sync-alt"></i><span class="btn-text"> Reload Game</span>';
                reloadBtn.disabled = false;
            }
        }, 1000);
    }

    showGameInfo() {
        // Scroll to top to show modal properly
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        // Open the game info modal with current game state
        const gameData = {
            isGameLoaded: this.isGameLoaded,
            isVisible: this.isVisible,
            isFullscreen: this.isFullscreen,
            retryAttempts: this.retryAttempts,
            loadingProgress: this.loadingProgress
        };

        if (window.gameInfoModal) {
            window.gameInfoModal.open(gameData);
        } else {
            // Fallback if modal not initialized
            openGameInfoModal(gameData);
        }
    }

    updateGameControls(enabled = false) {
        const reloadBtn = document.getElementById('game-reload-btn');
        const fullscreenBtn = document.getElementById('game-fullscreen-btn');

        [reloadBtn, fullscreenBtn].forEach(btn => {
            if (btn) {
                btn.disabled = !enabled;
                btn.style.opacity = enabled ? '1' : '0.5';
                btn.style.cursor = enabled ? 'pointer' : 'not-allowed';
            }
        });
    }

    handleGameLoadError(error) {
        this.isGameLoaded = false;
        this.updateGameControls(false);

        if (this.gameContainer) {
            this.gameContainer.innerHTML = `
                <div class="game-error">
                    <div class="error-content">
                        <i class="fas fa-exclamation-triangle error-icon"></i>
                        <h3>Game Loading Failed</h3>
                        <p class="error-message">
                            ${error.message || 'The Unity game could not be loaded. Please check your internet connection and try again.'}
                        </p>
                        <div class="error-actions">
                            ${this.retryAttempts < this.maxRetryAttempts ?
                    `<button onclick="gameSection.retryGameLoad()" class="retry-btn">
                                    <i class="fas fa-sync-alt"></i> Retry (${this.maxRetryAttempts - this.retryAttempts} attempts left)
                                </button>` : ''
                }
                            <button onclick="window.location.reload()" class="reload-btn">
                                <i class="fas fa-refresh"></i> Reload Page
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    async retryGameLoad() {
        if (this.retryAttempts >= this.maxRetryAttempts) {
            console.warn('Maximum retry attempts reached');
            return;
        }

        this.retryAttempts++;
        console.log(`Retrying game load (attempt ${this.retryAttempts}/${this.maxRetryAttempts})`);

        this.cleanup();
        await new Promise(resolve => setTimeout(resolve, 2000));
        this.render();
        this.setupEventListeners();
        setTimeout(() => this.loadUnityGame(), 500);
    }

    sendSectionDataToUnity() {
        if (!this.unityInstance) return;

        const sectionData = {
            sectionName: "portfolio",
            features: this.gameData.features,
            title: this.gameData.title,
            description: this.gameData.description,
            timestamp: Date.now()
        };

        setTimeout(() => {
            try {
                this.unityInstance.SendMessage("GameManager", "LoadPortfolioSection", JSON.stringify(sectionData));
            } catch (error) {
                console.warn('Could not send data to Unity:', error);
            }
        }, 2000);
    }

    showBanner(message, type = 'info') {
        const banner = document.createElement('div');
        banner.className = `game-banner game-banner-${type}`;
        banner.innerHTML = `
            <span>${message}</span>
            <button onclick="this.parentElement.remove()">×</button>
        `;

        document.body.appendChild(banner);

        setTimeout(() => {
            if (banner.parentElement) {
                banner.remove();
            }
        }, 5000);
    }

    handleResize() {
        if (this.unityInstance) {
            try {
                this.unityInstance.SendMessage("GameManager", "HandleResize");
            } catch (error) {
                console.warn('Could not handle Unity resize:', error);
            }
        }
    }

    update(newData) {
        this.gameData = { ...this.gameData, ...newData };
        this.render();
        this.setupEventListeners();
        this.setupIntersectionObserver();

        if (this.isGameLoaded) {
            this.sendSectionDataToUnity();
        }
    }

    getState() {
        return {
            isGameLoaded: this.isGameLoaded,
            isVisible: this.isVisible,
            isFullscreen: this.isFullscreen,
            retryAttempts: this.retryAttempts,
            loadingProgress: this.loadingProgress
        };
    }

    cleanup() {
        if (this.unityInstance) {
            try {
                const canvas = document.getElementById('unity-canvas');
                if (canvas) {
                    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
                    if (gl) {
                        const loseContext = gl.getExtension('WEBGL_lose_context');
                        if (loseContext) {
                            loseContext.loseContext();
                        }
                    }
                }

                this.unityInstance.Quit();
            } catch (error) {
                console.warn('Error during Unity cleanup:', error);
            }
            this.unityInstance = null;
        }

        this.isGameLoaded = false;
        this.isLoading = false;
        this.loadingProgress = 0;
        this.isFullscreen = false;
    }
}

// Initialize for global access
let gameSection;