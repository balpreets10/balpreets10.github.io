/**
 * Testimonials Section - Clean Gaming Theme Implementation
 */
class TestimonialsSection {
    constructor() {
        this.config = {
            title: 'Testimonials',
            subtitle: 'What industry professionals say about working with me',
            testimonials: [
                {
                    quote: 'The kind of technical leader who transforms teams and elevates outcomes. Visionary in systems design with unmatched problem solving attitude. Navigates high-pressure scenarios with calm and turns challenges into opportunities',
                    clientName: 'Sameer Bhanot',
                    clientPosition: 'Co-Founder - Rovelens & Technical Director - ArdentInfo Solutions',
                    clientImage: 'https://media.licdn.com/dms/image/v2/C4D03AQEFLLmXUVe0QA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1605625324403?e=1755734400&v=beta&t=FUy5Z3jSoW7Cp3QJka2cvolxo5Hg2oD2lG7KcJqozjs',
                    highlight: true
                },
                {
                    quote: 'Played a key role in shaping the technical direction of the project and led a team of 15 developers with clarity, patience, and strong leadership. Ability to stay grounded and collaborative',
                    clientName: 'Ankush Sharma',
                    clientPosition: 'Senior Game Developer - King Entertainment Corp',
                    clientImage: 'https://media.licdn.com/dms/image/v2/D5603AQFMxdkhfUkNRw/profile-displayphoto-shrink_400_400/B56ZTy9CL3GQAk-/0/1739242876229?e=1755734400&v=beta&t=bAGTsJXjBJRX7neGYJoNp6SEgJKMC-RYRQPJIKsbWj8',
                    highlight: false
                },
                {
                    quote: 'Highly productive and unwavering commitment to quality in every aspect. Deep understanding of game development paired with technical knowledge and vision consistently guided the team towards success',
                    clientName: 'Gunjita Jamwal',
                    clientPosition: 'Software Engineer @ Scopely',
                    clientImage: 'https://media.licdn.com/dms/image/v2/D5603AQGh8wqQhdrjbA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1718250502224?e=1755734400&v=beta&t=Lh40NG651n0hVSpNf9jEJDWe3MM46YGku0E7y-GUGi0',
                    highlight: false
                },
                {
                    quote: 'Led our team with a blend of deep technical mastery and remarkable people leadership. Transformed blockers into teaching moments, shielded the team from noise',
                    clientName: 'Anant Sharma',
                    clientPosition: 'Senior Game Developer - Miniclip',
                    clientImage: 'https://media.licdn.com/dms/image/v2/D4D03AQG-CUSfrhiT-w/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1732070678330?e=1755734400&v=beta&t=SkBJR-DGzbl6_UImggAGamZhqB5rcLxKOEY_6jO8B6c',
                    highlight: false
                },
                {
                    quote: 'Played a key role in shaping the technical direction of the module. Ability to stay grounded and collaborative and always learning aptitude',
                    clientName: 'Santosh Shedbalkar',
                    clientPosition: 'Director Of Engineering - Scopely',
                    clientImage: 'https://media.licdn.com/dms/image/v2/C5103AQHLeYF5wS6v4Q/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1554402118017?e=1755734400&v=beta&t=I77Zi-WkQcdb8ZE2daXkX3OoiHlWnSvdfj-gKLVq3Sk',
                    highlight: true
                },
                {
                    quote: 'Able, calm and cool headed with technical brilliancy. Always figuring out innovative solutions and optimal pathways',
                    clientName: 'Altaf Navalur',
                    clientPosition: 'Director of Engineering - Junglee Games',
                    clientImage: 'https://media.licdn.com/dms/image/v2/D5603AQEXcF3Grm2bqA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1711697179706?e=1755734400&v=beta&t=l2aHc2E5in82G4STEY4rG4bpugrgGonR2kl3nqdUHiU',
                    highlight: true
                }
            ]
        };
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

    createTestimonialCard(testimonial) {
        const card = document.createElement('div');
        card.className = testimonial.highlight ? 'testimonial-card highlight' : 'testimonial-card';

        // Quote icon
        const quoteIcon = document.createElement('div');
        quoteIcon.className = 'quote-icon';
        quoteIcon.innerHTML = '<i class="bi bi-quote"></i>';

        // Quote content
        const quoteContent = document.createElement('div');
        quoteContent.className = 'quote-content';
        const quote = document.createElement('p');
        quote.textContent = testimonial.quote;
        quoteContent.appendChild(quote);

        // Client info
        const clientInfo = document.createElement('div');
        clientInfo.className = 'client-info';

        // Client avatar
        const clientAvatar = document.createElement('div');
        clientAvatar.className = 'client-avatar';
        const img = document.createElement('img');
        // img.src = testimonial.clientImage;
        img.src = "";
        img.alt = testimonial.clientName;
        img.loading = 'lazy';
        clientAvatar.appendChild(img);

        // Client details
        const clientDetails = document.createElement('div');
        clientDetails.className = 'client-details';

        const h4 = document.createElement('h4');
        h4.textContent = testimonial.clientName;

        const position = document.createElement('p');
        position.className = 'position';
        position.textContent = testimonial.clientPosition;

        clientDetails.appendChild(h4);
        clientDetails.appendChild(position);

        // Assemble client info
        clientInfo.appendChild(clientAvatar);
        clientInfo.appendChild(clientDetails);

        // Assemble card
        card.appendChild(quoteIcon);
        card.appendChild(quoteContent);
        card.appendChild(clientInfo);

        return card;
    }

    render() {
        const section = document.createElement('section');
        section.id = 'testimonials';
        section.className = 'testimonials section';

        const container = document.createElement('div');
        container.className = 'container';

        // Add section header
        container.appendChild(this.createSectionHeader());

        // Create testimonial grid
        const grid = document.createElement('div');
        grid.className = 'testimonial-grid';

        // Add testimonial cards
        this.config.testimonials.forEach(testimonial => {
            grid.appendChild(this.createTestimonialCard(testimonial));
        });

        container.appendChild(grid);
        section.appendChild(container);

        return section;
    }

    // Optional: Method to initialize intersection observer for animations
    initializeAnimations() {
        const cards = document.querySelectorAll('.testimonial-card');

        // Only add intersection observer if user prefers animations
        if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animationPlayState = 'running';
                    }
                });
            }, { threshold: 0.1 });

            cards.forEach(card => {
                card.style.animationPlayState = 'paused';
                observer.observe(card);
            });
        }
    }

    // Initialize method called after render
    initialize() {
        console.log('Testimonials section initialized');
        this.initializeAnimations();
    }
}

window.TestimonialsSection = TestimonialsSection;