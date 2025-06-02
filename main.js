const VERSION = 1.1;

import { renderAbout } from './components/about.js?v=${VERSION}';
import { renderEducation } from './components/education.js?v=${VERSION}';
import { renderSkills } from './components/skills.js?v=${VERSION}';
import { renderProjects } from './components/projects.js?v=${VERSION}';
import { renderFooter } from './components/footer.js?v=${VERSION}';

document.addEventListener('DOMContentLoaded', () => {
    const main = document.querySelector('main.main');

    // Render all sections
    main.innerHTML = `
        ${renderAbout()}
        ${renderSkills()}
        ${renderProjects()}
        ${renderEducation()}
        ${renderFooter()}
    `;

    // Re-initialize AOS after content is loaded
    AOS.init();

    // Re-initialize other libraries that might be needed
    // Typed.js initialization
    let typed = new Typed('.typed', {
        strings: ["Technical Team Lead", "Game Developer", "Unity Programmer", "C# Expert"],
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000,
        loop: true
    });
});