/**
 * Game Section - Unity WebGL Game Integration
 * Follows the portfolio.js pattern for consistent section structure
 */
class GameSection {
    constructor() {
        this.config = {
            title: "Interactive Resume Experience",
            subtitle: "Dive into my Unity-powered portfolio game. Experience my professional journey through an interactive Unity game. Navigate through different levels representing my skills, projects, and achievements in an immersive 3D environment designed to showcase my game development expertise.",
            features: [
                "3D Navigation",
                "Interactive Portfolio",
                "Real-time Rendering",
                "Cross-platform",
                "WebGL Optimized",
                "Responsive Design"
            ],
            gameInfo: {
                status: "ready", // ready, loading, playing, error
                progress: 0,
                canFullscreen: true,
                isLoaded: false,
                isPlaying: false,
                isFullscreen: false
            },
            buttons: [
                {
                    id: "play-btn",
                    class: "game-control-btn play-btn",
                    icon: "fas fa-play",
                    text: "Play",
                    tooltip: "Start Game",
                    action: "play",
                    primary: true
                },
                {
                    id: "fullscreen-btn",
                    class: "game-control-btn fullscreen-btn",
                    icon: "fas fa-expand",
                    text: "Fullscreen",
                    tooltip: "Toggle Fullscreen",
                    action: "fullscreen",
                    disabled: true
                },
                {
                    id: "reload-btn",
                    class: "game-control-btn reload-btn",
                    icon: "fas fa-sync-alt",
                    text: "Reload",
                    tooltip: "Reload Game",
                    action: "reload",
                    disabled: true
                },
                {
                    id: "info-btn",
                    class: "game-control-btn info-btn",
                    icon: "fas fa-info-circle",
                    text: "Info",
                    tooltip: "Game Information",
                    action: "info"
                }
            ],
            placeholderContent: {
                icon: "fas fa-gamepad",
                title: "Unity Game Ready",
                description: "Click the Play button to start the interactive experience and explore my portfolio in 3D"
            },
            unityConfig: {
                buildUrl: "game/Build",
                dataUrl: "game/Build/Web.data.gz",
                frameworkUrl: "game/Build/Web.framework.js.gz",
                codeUrl: "game/Build/Web.wasm.gz",
                streamingAssetsUrl: "game/StreamingAssets",
                companyName: "Gaming Portfolio",
                productName: "Interactive Resume",
                productVersion: "1.0.0"
            }
        };

        this.gameContainer = null;
        this.unityInstance = null;
        this.isInitialized = false;

        // Bind methods to preserve context
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handlePlay = this.handlePlay.bind(this);
        this.handleFullscreen = this.handleFullscreen.bind(this);
        this.handleReload = this.handleReload.bind(this);
        this.handleInfo = this.handleInfo.bind(this);
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

    createGameInfoStrip() {
        const infoStrip = document.createElement('div');
        infoStrip.className = 'game-info-strip';
        infoStrip.setAttribute('data-aos', 'fade-up');
        infoStrip.setAttribute('data-aos-delay', '200');

        const content = document.createElement('div');
        content.className = 'game-info-content';

        const featuresContainer = document.createElement('div');
        featuresContainer.className = 'game-features';

        this.config.features.forEach((feature, index) => {
            const tag = document.createElement('span');
            tag.className = 'feature-tag';
            tag.textContent = feature;
            tag.setAttribute('data-aos', 'zoom-in');
            tag.setAttribute('data-aos-delay', 300 + (index * 50));
            featuresContainer.appendChild(tag);
        });

        content.appendChild(featuresContainer);
        infoStrip.appendChild(content);

        return infoStrip;
    }

    createGameControls() {
        const controls = document.createElement('div');
        controls.className = 'game-controls';

        this.config.buttons.forEach((buttonConfig, index) => {
            const button = document.createElement('button');
            button.id = buttonConfig.id;
            button.className = buttonConfig.class;
            button.setAttribute('data-tooltip', buttonConfig.tooltip);
            button.setAttribute('data-action', buttonConfig.action);

            if (buttonConfig.disabled) {
                button.disabled = true;
            }

            const icon = document.createElement('i');
            icon.className = buttonConfig.icon;

            const text = document.createElement('span');
            text.className = 'btn-text';
            text.textContent = buttonConfig.text;

            button.appendChild(icon);
            button.appendChild(text);

            // Add click event listener
            button.addEventListener('click', this.handleButtonClick);

            // Add AOS animation
            button.setAttribute('data-aos', 'zoom-in');
            button.setAttribute('data-aos-delay', 400 + (index * 100));

            controls.appendChild(button);
        });

        return controls;
    }

    createUnityGameArea() {
        const gameArea = document.createElement('div');
        gameArea.className = 'unity-game-area';
        gameArea.id = 'unity-game-container';

        // Create placeholder content
        const placeholder = this.createGamePlaceholder();
        gameArea.appendChild(placeholder);

        return gameArea;
    }

    createGamePlaceholder() {
        const placeholder = document.createElement('div');
        placeholder.className = 'game-placeholder';
        placeholder.id = 'game-placeholder';

        const icon = document.createElement('i');
        icon.className = `${this.config.placeholderContent.icon} placeholder-icon`;

        const title = document.createElement('h3');
        title.className = 'placeholder-title';
        title.textContent = this.config.placeholderContent.title;

        const description = document.createElement('p');
        description.className = 'placeholder-description';
        description.textContent = this.config.placeholderContent.description;

        placeholder.appendChild(icon);
        placeholder.appendChild(title);
        placeholder.appendChild(description);

        return placeholder;
    }

    createGameContainer() {
        const container = document.createElement('div');
        container.className = 'game-container';
        container.setAttribute('data-aos', 'fade-up');
        container.setAttribute('data-aos-delay', '300');

        const controls = this.createGameControls();
        const gameArea = this.createUnityGameArea();

        container.appendChild(controls);
        container.appendChild(gameArea);

        return container;
    }

    createLoadingState() {
        const loading = document.createElement('div');
        loading.className = 'game-loading';
        loading.id = 'game-loading';
        loading.style.display = 'none';

        const icon = document.createElement('i');
        icon.className = 'fas fa-spinner loading-icon';

        const text = document.createElement('div');
        text.className = 'loading-text';
        text.textContent = 'Loading Game...';

        const progressContainer = document.createElement('div');
        progressContainer.className = 'loading-progress';

        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        progressBar.id = 'game-progress-bar';

        progressContainer.appendChild(progressBar);
        loading.appendChild(icon);
        loading.appendChild(text);
        loading.appendChild(progressContainer);

        return loading;
    }

    render() {
        const section = document.createElement('section');
        section.id = 'game';
        section.className = 'game-section section';

        const container = document.createElement('div');
        container.className = 'container';

        const row = document.createElement('div');
        row.className = 'row';

        const col = document.createElement('div');
        col.className = 'col-12';

        // Assemble all components
        const header = this.createSectionHeader();
        const infoStrip = this.createGameInfoStrip();
        const gameContainer = this.createGameContainer();

        col.appendChild(header);
        col.appendChild(infoStrip);
        col.appendChild(gameContainer);

        row.appendChild(col);
        container.appendChild(row);
        section.appendChild(container);

        // Store reference to game container
        this.gameContainer = gameContainer.querySelector('#unity-game-container');

        return section;
    }

    handleButtonClick(event) {
        const action = event.currentTarget.getAttribute('data-action');
        const button = event.currentTarget;

        // Prevent multiple clicks
        if (button.disabled) return;

        // Add click animation
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);

        // Handle different actions
        switch (action) {
            case 'play':
                this.handlePlay();
                break;
            case 'fullscreen':
                this.handleFullscreen();
                break;
            case 'reload':
                this.handleReload();
                break;
            case 'info':
                this.handleInfo();
                break;
            default:
                console.warn(`Unknown action: ${action}`);
        }
    }

    handlePlay() {
        console.log('Play button clicked');

        if (!this.config.gameInfo.isLoaded) {
            this.showLoadingState();
            this.loadUnityGame();
        } else if (!this.config.gameInfo.isPlaying) {
            this.resumeGame();
        } else {
            this.pauseGame();
        }
    }

    handleFullscreen() {
        console.log('Fullscreen button clicked');

        if (!this.config.gameInfo.isFullscreen) {
            this.enterFullscreen();
        } else {
            this.exitFullscreen();
        }
    }

    handleReload() {
        console.log('Reload button clicked');

        if (this.config.gameInfo.isLoaded) {
            this.reloadGame();
        }
    }

    handleInfo() {
        console.log('Info button clicked');
        this.showGameInfo();
    }

    showLoadingState() {
        const placeholder = document.getElementById('game-placeholder');
        if (placeholder) {
            placeholder.style.display = 'none';
        }

        // Create and show loading state
        const gameArea = this.gameContainer;
        const loading = this.createLoadingState();
        loading.style.display = 'block';
        gameArea.appendChild(loading);

        // Update button states
        this.updateButtonStates({
            play: { disabled: true, text: 'Loading...', icon: 'fas fa-spinner fa-spin' }
        });
    }

    hideLoadingState() {
        const loading = document.getElementById('game-loading');
        if (loading) {
            loading.remove();
        }
    }

    loadUnityGame() {
        // Simulate loading for now
        console.log('Starting Unity game load...');

        let progress = 0;
        const progressBar = document.getElementById('game-progress-bar');

        const loadingInterval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress >= 100) {
                progress = 100;
                clearInterval(loadingInterval);
                this.onGameLoaded();
            }

            if (progressBar) {
                progressBar.style.width = `${progress}%`;
            }

            this.config.gameInfo.progress = progress;
        }, 200);
    }

    onGameLoaded() {
        console.log('Game loaded successfully');

        this.hideLoadingState();
        this.config.gameInfo.isLoaded = true;
        this.config.gameInfo.isPlaying = true;
        this.config.gameInfo.status = 'playing';

        // Show game content (placeholder for now)
        const placeholder = document.getElementById('game-placeholder');
        if (placeholder) {
            placeholder.querySelector('.placeholder-title').textContent = 'Game Running';
            placeholder.querySelector('.placeholder-description').textContent = 'Unity game is now active and running';
            placeholder.querySelector('.placeholder-icon').className = 'fas fa-play-circle placeholder-icon';
            placeholder.style.display = 'block';
        }

        // Update button states
        this.updateButtonStates({
            play: { disabled: false, text: 'Pause', icon: 'fas fa-pause' },
            fullscreen: { disabled: false },
            reload: { disabled: false }
        });
    }

    resumeGame() {
        console.log('Resuming game');
        this.config.gameInfo.isPlaying = true;
        this.updateButtonStates({
            play: { text: 'Pause', icon: 'fas fa-pause' }
        });
    }

    pauseGame() {
        console.log('Pausing game');
        this.config.gameInfo.isPlaying = false;
        this.updateButtonStates({
            play: { text: 'Play', icon: 'fas fa-play' }
        });
    }

    enterFullscreen() {
        console.log('Entering fullscreen');
        // Fullscreen logic will be implemented with Unity
        this.config.gameInfo.isFullscreen = true;
        this.updateButtonStates({
            fullscreen: { text: 'Exit Fullscreen', icon: 'fas fa-compress' }
        });
    }

    exitFullscreen() {
        console.log('Exiting fullscreen');
        this.config.gameInfo.isFullscreen = false;
        this.updateButtonStates({
            fullscreen: { text: 'Fullscreen', icon: 'fas fa-expand' }
        });
    }

    reloadGame() {
        console.log('Reloading game');

        // Reset game state
        this.config.gameInfo.isLoaded = false;
        this.config.gameInfo.isPlaying = false;
        this.config.gameInfo.progress = 0;
        this.config.gameInfo.status = 'ready';

        // Reset UI
        const placeholder = document.getElementById('game-placeholder');
        if (placeholder) {
            placeholder.querySelector('.placeholder-title').textContent = this.config.placeholderContent.title;
            placeholder.querySelector('.placeholder-description').textContent = this.config.placeholderContent.description;
            placeholder.querySelector('.placeholder-icon').className = `${this.config.placeholderContent.icon} placeholder-icon`;
        }

        // Reset button states
        this.updateButtonStates({
            play: { disabled: false, text: 'Play', icon: 'fas fa-play' },
            fullscreen: { disabled: true, text: 'Fullscreen', icon: 'fas fa-expand' },
            reload: { disabled: true }
        });
    }

    showGameInfo() {
        // This would open a modal or info panel
        console.log('Showing game info');

        const info = {
            title: this.config.title,
            features: this.config.features,
            status: this.config.gameInfo.status,
            isLoaded: this.config.gameInfo.isLoaded,
            progress: this.config.gameInfo.progress
        };

        // For now, just log the info - later this could open a modal
        console.log('Game Info:', info);

        // Could implement a simple alert for now
        alert(`Game Status: ${this.config.gameInfo.status}\nLoaded: ${this.config.gameInfo.isLoaded}\nProgress: ${this.config.gameInfo.progress}%`);
    }

    updateButtonStates(updates) {
        Object.keys(updates).forEach(buttonType => {
            const update = updates[buttonType];
            let buttonId;

            switch (buttonType) {
                case 'play':
                    buttonId = 'play-btn';
                    break;
                case 'fullscreen':
                    buttonId = 'fullscreen-btn';
                    break;
                case 'reload':
                    buttonId = 'reload-btn';
                    break;
                case 'info':
                    buttonId = 'info-btn';
                    break;
            }

            const button = document.getElementById(buttonId);
            if (button) {
                if (update.disabled !== undefined) {
                    button.disabled = update.disabled;
                }
                if (update.text) {
                    const textSpan = button.querySelector('.btn-text');
                    if (textSpan) textSpan.textContent = update.text;
                }
                if (update.icon) {
                    const icon = button.querySelector('i');
                    if (icon) icon.className = update.icon;
                }
            }
        });
    }

    getGameState() {
        return { ...this.config.gameInfo };
    }

    updateGameInfo(updates) {
        this.config.gameInfo = { ...this.config.gameInfo, ...updates };
    }

    initialize() {
        console.log('Game section initialized');
        this.isInitialized = true;

        // Any additional initialization can go here
        // For example, setting up intersection observers, resize handlers, etc.

        // Setup responsive behavior
        this.setupResponsiveHandlers();

        // Setup keyboard shortcuts
        this.setupKeyboardShortcuts();
    }

    setupResponsiveHandlers() {
        // Handle window resize for responsive behavior
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 250);
        });
    }

    setupKeyboardShortcuts() {
        // Setup keyboard shortcuts for game controls
        document.addEventListener('keydown', (event) => {
            // Only handle shortcuts when game section is visible
            const gameSection = document.getElementById('game');
            if (!gameSection || !this.isElementInViewport(gameSection)) return;

            switch (event.key) {
                case ' ': // Spacebar for play/pause
                    event.preventDefault();
                    this.handlePlay();
                    break;
                case 'f':
                case 'F':
                    if (event.ctrlKey || event.metaKey) {
                        event.preventDefault();
                        this.handleFullscreen();
                    }
                    break;
                case 'r':
                case 'R':
                    if (event.ctrlKey || event.metaKey) {
                        event.preventDefault();
                        this.handleReload();
                    }
                    break;
                case 'i':
                case 'I':
                    if (event.ctrlKey || event.metaKey) {
                        event.preventDefault();
                        this.handleInfo();
                    }
                    break;
            }
        });
    }

    handleResize() {
        // Handle any resize-specific logic
        console.log('Game section handling resize');

        // If Unity game is loaded, we might need to handle canvas resizing here
        if (this.unityInstance) {
            // Unity resize logic would go here
        }
    }

    isElementInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Method to update configuration after initialization
    updateConfig(newConfig) {
        this.config = { ...this.config, ...newConfig };
        console.log('Game section config updated');
    }

    // Cleanup method for when section is removed
    cleanup() {
        if (this.unityInstance) {
            // Clean up Unity instance
            this.unityInstance.Quit();
            this.unityInstance = null;
        }

        this.isInitialized = false;
        console.log('Game section cleaned up');
    }
}

window.GameSection = GameSection;