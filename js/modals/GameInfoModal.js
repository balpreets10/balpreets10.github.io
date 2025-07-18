/**
 * GameInfoModal.js - Game Information Modal Handler
 * Built on base modal system, similar to ProjectModal
 */

class GameInfoModal {
    constructor() {
        this.modal = null;
        this.backdrop = null;
        this.isOpen = false;
        this.originalBodyOverflow = '';
        this.init();
    }

    init() {
        this.createModal();
        this.bindEvents();
    }

    createModal() {
        const modalHTML = `
            <div class="base-modal game-modal fade" id="gameInfoModal" tabindex="-1" role="dialog" aria-labelledby="gameInfoModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3 class="modal-title" id="gameInfoModalLabel">
                                <i class="fas fa-info-circle"></i>
                                Game Information
                            </h3>
                            <button type="button" class="btn-close" aria-label="Close">&times;</button>
                        </div>
                        <div class="modal-body">
                            <div class="info-section">
                                <h4><i class="fas fa-gamepad"></i> Game Status</h4>
                                <p><strong>Status:</strong> <span id="gameStatus">Ready to Load</span></p>
                                <p><strong>Platform:</strong> Unity WebGL</p>
                                <p><strong>Orientation:</strong> Landscape (16:9)</p>
                            </div>
                            <div class="info-section">
                                <h4><i class="fas fa-mobile-alt"></i> Device Controls</h4>
                                <p><strong>Desktop:</strong> WASD or Arrow Keys to move, Mouse to look</p>
                                <p><strong>Mobile:</strong> Touch controls with virtual joystick</p>
                                <p><strong>Tablet:</strong> Touch gestures and on-screen controls</p>
                            </div>
                            <div class="info-section">
                                <h4><i class="fas fa-expand-arrows-alt"></i> Fullscreen</h4>
                                <p><strong>Desktop:</strong> F11 or Fullscreen button</p>
                                <p><strong>Mobile:</strong> Auto-rotates to landscape in fullscreen</p>
                                <p><strong>Exit:</strong> Escape key or Exit Fullscreen button</p>
                            </div>
                            <div class="info-section">
                                <h4><i class="fas fa-cog"></i> Features</h4>
                                <p><strong>Interaction:</strong> E to interact with objects</p>
                                <p><strong>Navigation:</strong> Explore different career levels</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="base-modal-backdrop fade" id="gameInfoModalBackdrop"></div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.modal = document.getElementById('gameInfoModal');
        this.backdrop = document.getElementById('gameInfoModalBackdrop');
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
    }

    open(gameData = null) {
        // Save current scroll position
        sessionStorage.setItem('preModalScrollPosition', window.pageYOffset.toString());

        // Update game status if data provided
        if (gameData) {
            this.updateGameStatus(gameData);
        }

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

    updateGameStatus(gameData) {
        const statusElement = this.modal.querySelector('#gameStatus');
        if (statusElement && gameData.isGameLoaded !== undefined) {
            statusElement.textContent = gameData.isGameLoaded ? 'Loaded' : 'Ready to Load';
        }
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
    window.gameInfoModal = new GameInfoModal();
});

// Helper function to open modal with game data
function openGameInfoModal(gameData = null) {
    if (window.gameInfoModal) {
        window.gameInfoModal.open(gameData);
    } else {
        console.error('Game info modal not initialized');
    }
}