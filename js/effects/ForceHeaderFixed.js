// Add this to your main script or AnimationEffects.js
// Force header to stay fixed - aggressive approach

function forceHeaderFixed() {
    const header = document.querySelector('header') || document.querySelector('.header');

    if (!header) return;

    // Force styles every 100ms on mobile
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
        const forceStyles = () => {
            header.style.position = 'fixed';
            header.style.top = '0';
            header.style.left = '0';
            header.style.right = '0';
            header.style.width = '100%';
            header.style.zIndex = '9999';
            header.style.transform = 'translate3d(0, 0, 0)';
            header.style.webkitTransform = 'translate3d(0, 0, 0)';
            header.style.backfaceVisibility = 'hidden';
            header.style.webkitBackfaceVisibility = 'hidden';
        };

        // Force immediately
        forceStyles();

        // Keep forcing on scroll
        let isForcing = false;
        const forceOnScroll = () => {
            if (!isForcing) {
                isForcing = true;
                requestAnimationFrame(() => {
                    forceStyles();
                    isForcing = false;
                });
            }
        };

        window.addEventListener('scroll', forceOnScroll, { passive: true });
        window.addEventListener('touchmove', forceOnScroll, { passive: true });
        window.addEventListener('orientationchange', () => {
            setTimeout(forceStyles, 100);
        });

        // Force every 100ms as fallback
        setInterval(forceStyles, 100);
    }
}

// Also fix body padding
function fixBodyPadding() {
    const isMobile = window.innerWidth <= 768;
    const isSmallMobile = window.innerWidth <= 480;

    if (isMobile) {
        const paddingTop = isSmallMobile ? '55px' : '60px';
        document.body.style.paddingTop = paddingTop;

        // Also fix any sections that might interfere
        const sections = document.querySelectorAll('section, .hero, .game-section');
        sections.forEach(section => {
            section.style.marginTop = '0';
            if (section.classList.contains('hero')) {
                section.style.paddingTop = '20px';
            }
        });
    }
}

// Initialize fixes
document.addEventListener('DOMContentLoaded', () => {
    forceHeaderFixed();
    fixBodyPadding();
});

// Re-apply on resize
window.addEventListener('resize', () => {
    setTimeout(() => {
        forceHeaderFixed();
        fixBodyPadding();
    }, 100);
});

// Critical: Re-apply after any potential conflicts
window.addEventListener('load', () => {
    setTimeout(() => {
        forceHeaderFixed();
        fixBodyPadding();
    }, 500);
});


// Debug script - Add this temporarily to find the issue
// Add to your HTML or run in browser console

function debugHeader() {
    const header = document.querySelector('header') || document.querySelector('.header');

    if (!header) {
        console.error('❌ Header element not found!');
        return;
    }

    console.log('🔍 Header Debug Info:');

    // Check computed styles
    const computed = window.getComputedStyle(header);
    console.log('📍 Position:', computed.position);
    console.log('📍 Top:', computed.top);
    console.log('📍 Z-index:', computed.zIndex);
    console.log('📍 Transform:', computed.transform);
    console.log('📍 Display:', computed.display);

    // Check for conflicting styles
    const allRules = [];
    for (let sheet of document.styleSheets) {
        try {
            for (let rule of sheet.cssRules || sheet.rules) {
                if (rule.selectorText && rule.selectorText.includes('header')) {
                    allRules.push({
                        selector: rule.selectorText,
                        position: rule.style.position,
                        top: rule.style.top,
                        zIndex: rule.style.zIndex
                    });
                }
            }
        } catch (e) {
            console.log('Cannot access stylesheet:', sheet.href);
        }
    }

    console.log('📝 CSS Rules affecting header:', allRules);

    // Check parent containers
    let parent = header.parentElement;
    let level = 1;
    while (parent && level <= 3) {
        const parentStyles = window.getComputedStyle(parent);
        console.log(`👨‍👩‍👧‍👦 Parent ${level} (${parent.tagName}):`, {
            position: parentStyles.position,
            zIndex: parentStyles.zIndex,
            overflow: parentStyles.overflow,
            transform: parentStyles.transform
        });
        parent = parent.parentElement;
        level++;
    }

    // Check for JavaScript modifications
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.target === header && mutation.type === 'attributes') {
                console.log('⚠️ Header modified by JavaScript:', mutation.attributeName);
                console.log('New style:', header.style[mutation.attributeName]);
            }
        });
    });

    observer.observe(header, {
        attributes: true,
        attributeFilter: ['style', 'class']
    });

    // Test scroll behavior
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        const headerRect = header.getBoundingClientRect();

        if (headerRect.top !== 0) {
            console.log('🚨 Header not at top!', {
                scrollY: currentScrollY,
                headerTop: headerRect.top,
                headerPosition: window.getComputedStyle(header).position
            });
        }

        lastScrollY = currentScrollY;
    }, { passive: true });

    console.log('✅ Debug monitoring started. Scroll to see results.');
}