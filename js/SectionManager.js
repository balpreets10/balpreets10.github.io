// SectionManager.js - Main section manager
class SectionManager {
    constructor() {
        this.sections = new Map();
        this.init();
    }

    init() {
        // Wait for DOM to be ready before initializing sections
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.initializeSections();
            });
        } else {
            this.initializeSections();
        }
    }

    initializeSections() {
        // Initialize all sections
        this.sections.set('hero', new HeroSection());
        this.sections.set('game', new GameSection());
        this.sections.set('experience', new ExperienceSection());
        this.sections.set('contact', new ContactSection());
        this.sections.set('skills', new SkillsSection());

        // Initialize projects section if data is available
        if (typeof projectsData !== 'undefined') {
            this.sections.set('projects', new ProjectsSection(projectsData));
        }
    }

    getSection(sectionName) {
        return this.sections.get(sectionName);
    }

    updateSection(sectionName, newContent) {
        const section = this.sections.get(sectionName);
        if (section && section.update) {
            section.update(newContent);
        }
    }

    handleResize() {
        // Handle resize events for all sections
        this.sections.forEach((section, name) => {
            if (section.handleResize) {
                section.handleResize();
            }
        });
    }
}