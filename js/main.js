/**
* Template Name: SnapFolio
* Template URL: https://bootstrapmade.com/snapfolio-bootstrap-portfolio-template/
* Updated: Jun 13 2025 with Bootstrap v5.3.6
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function () {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function (direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function () {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function (filters) {
      filters.addEventListener('click', function () {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Enhanced Navmenu Scrollspy with Gaming Navigation
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    // Get viewport dimensions and calculate offset
    const isDesktop = window.innerWidth >= 1200;
    const headerOffset = isDesktop ? 100 : 80; // Account for header and some padding
    const viewportHeight = window.innerHeight;
    const scrollPosition = window.scrollY;

    let currentSection = null;
    let minDistance = Infinity;

    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;

      const section = document.querySelector(navmenulink.hash);
      if (!section) return;

      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      const sectionMiddle = sectionTop + (section.offsetHeight / 2);

      // Calculate distances for better section detection
      const distanceFromTop = Math.abs(scrollPosition + headerOffset - sectionTop);
      const distanceFromMiddle = Math.abs(scrollPosition + (viewportHeight / 2) - sectionMiddle);

      // Check if section is in viewport with improved logic
      const isInViewport = (scrollPosition + headerOffset >= sectionTop - 50) &&
        (scrollPosition + headerOffset <= sectionBottom + 50);

      // For hero section, activate when near top
      if (navmenulink.hash === '#hero') {
        if (scrollPosition < 200) {
          currentSection = navmenulink;
          minDistance = 0;
        }
      }
      // For other sections, use distance-based detection
      else if (isInViewport) {
        const combinedDistance = distanceFromTop + (distanceFromMiddle * 0.3);
        if (combinedDistance < minDistance) {
          minDistance = combinedDistance;
          currentSection = navmenulink;
        }
      }
    });

    // Update active states
    navmenulinks.forEach(link => {
      link.classList.remove('active');
    });

    if (currentSection) {
      currentSection.classList.add('active');
    }
    // Fallback: if no section detected and we're at the top, activate hero
    else if (scrollPosition < 100) {
      const heroLink = document.querySelector('.navmenu a[href="#hero"]');
      if (heroLink) {
        heroLink.classList.add('active');
      }
    }
  }

  // Throttled scroll detection for better performance
  let ticking = false;

  function requestScrollUpdate() {
    if (!ticking) {
      requestAnimationFrame(navmenuScrollspy);
      ticking = true;
      setTimeout(() => { ticking = false; }, 10);
    }
  }

  // Initialize and bind scroll detection
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', requestScrollUpdate);

  // Also trigger on resize to recalculate positions
  window.addEventListener('resize', () => {
    setTimeout(navmenuScrollspy, 100);
  });

})();