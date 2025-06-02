import { renderHeader } from './components/headerComponent.js';

document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header.header');

    // Render all sections
    header.innerHTML = `
        ${renderHeader()}
    `;

    // Re-initialize AOS after content is loaded
    AOS.init();

});