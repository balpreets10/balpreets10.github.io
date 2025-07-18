// ContactSection.js
class ContactSection {
    constructor() {
        this.contactData = {
            title: "Let's Build Something Amazing Together",
            subtitle: "Ready to bring your game ideas to life? Let's connect and create the next big hit!",
            contactInfo: {
                email: "balpreets10@gmail.com",
                phone: "+91 70069-55241",
                location: "Jammu, J&K, India",
                availability: "Available for freelance and full-time opportunities"
            },
            socialLinks: [
                {
                    name: "LinkedIn",
                    url: "https://www.linkedin.com/in/balpreets7/",
                    icon: "fab fa-linkedin",
                    color: "#0077b5"
                },
                {
                    name: "GitHub",
                    url: "https://github.com/balpreets10/",
                    icon: "fab fa-github",
                    color: "#2ad870ff"
                },
                {
                    name: "Twitter",
                    url: "https://x.com/balpreets7",
                    icon: "fab fa-twitter",
                    color: "#1da1f2"
                },
                {
                    name: "Itch.io",
                    url: "https://balpreets7.itch.io/",
                    icon: "fab fa-itch-io",
                    color: "#fa5c5c"
                }
            ],
            formFields: [
                {
                    name: "name",
                    type: "text",
                    placeholder: "Your Name",
                    required: true,
                    icon: "fas fa-user"
                },
                {
                    name: "email",
                    type: "email",
                    placeholder: "Your Email",
                    required: true,
                    icon: "fas fa-envelope"
                },
                {
                    name: "subject",
                    type: "text",
                    placeholder: "Project Subject",
                    required: true,
                    icon: "fas fa-tag"
                },
                {
                    name: "message",
                    type: "textarea",
                    placeholder: "Tell me about your project...",
                    required: true,
                    icon: "fas fa-comment"
                }
            ]
        };
        
        this.init();
    }

    init() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        // Check if contact section exists, if not create it
        let contactSection = document.getElementById('contact');
        if (!contactSection) {
            contactSection = document.createElement('section');
            contactSection.id = 'contact';
            contactSection.className = 'game-section';
            
            // Insert before footer
            const footer = document.querySelector('footer');
            if (footer) {
                footer.parentNode.insertBefore(contactSection, footer);
            } else {
                document.querySelector('.container').appendChild(contactSection);
            }
        }

        contactSection.innerHTML = `
            <div class="contact-header">
                <h2 class="contact-title">
                    <span class="title-icon">📧</span>
                    ${this.contactData.title}
                    <span class="title-glow"></span>
                </h2>
                <p class="contact-subtitle">${this.contactData.subtitle}</p>
            </div>
            
            <div class="contact-content">
                <div class="contact-info">
                    <div class="contact-card">
                        <h3>Get In Touch</h3>
                        <div class="contact-details">
                            <div class="contact-item">
                                <i class="fas fa-envelope"></i>
                                <div>
                                    <strong>Email</strong>
                                    <span>${this.contactData.contactInfo.email}</span>
                                </div>
                            </div>
                            <div class="contact-item">
                                <i class="fas fa-phone"></i>
                                <div>
                                    <strong>Phone</strong>
                                    <span>${this.contactData.contactInfo.phone}</span>
                                </div>
                            </div>
                            <div class="contact-item">
                                <i class="fas fa-map-marker-alt"></i>
                                <div>
                                    <strong>Location</strong>
                                    <span>${this.contactData.contactInfo.location}</span>
                                </div>
                            </div>
                            <div class="contact-item">
                                <i class="fas fa-clock"></i>
                                <div>
                                    <strong>Status</strong>
                                    <span class="availability">${this.contactData.contactInfo.availability}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="social-links-contact">
                            <h4>Connect With Me</h4>
                            <div class="social-grid">
                                ${this.generateSocialLinks()}
                            </div>
                        </div>
                    </div>
                </div>
                
               
            </div>
        `;
    }

    generateSocialLinks() {
        return this.contactData.socialLinks.map(link => `
            <a href="${link.url}" target="_blank" rel="noopener noreferrer" 
               class="social-link" style="--social-color: ${link.color}">
                <i class="${link.icon}"></i>
                <span>${link.name}</span>
            </a>
        `).join('');
    }

    generateFormFields() {
        return this.contactData.formFields.map(field => {
            if (field.type === 'textarea') {
                return `
                    <div class="form-group">
                        <div class="form-icon">
                            <i class="${field.icon}"></i>
                        </div>
                        <textarea 
                            name="${field.name}" 
                            placeholder="${field.placeholder}" 
                            ${field.required ? 'required' : ''}
                            rows="5"
                        ></textarea>
                    </div>
                `;
            } else {
                return `
                    <div class="form-group">
                        <div class="form-icon">
                            <i class="${field.icon}"></i>
                        </div>
                        <input 
                            type="${field.type}" 
                            name="${field.name}" 
                            placeholder="${field.placeholder}" 
                            ${field.required ? 'required' : ''}
                        />
                    </div>
                `;
            }
        }).join('');
    }

    setupEventListeners() {
        // Form submission
        const form = document.getElementById('contactForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                this.handleFormSubmit(e);
            });
        }

        // Form field animations
        const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
        formInputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });
        });

        // Social link hover effects
        const socialLinks = document.querySelectorAll('.social-link');
        socialLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                this.addSocialHoverEffect(link);
            });
            
            link.addEventListener('mouseleave', () => {
                this.removeSocialHoverEffect(link);
            });
        });

        // Intersection observer for animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        const contactElements = document.querySelectorAll('.contact-card, .contact-form');
        contactElements.forEach(element => {
            observer.observe(element);
        });
    }

    handleFormSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        
        // Show loading state
        const submitBtn = e.target.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Reset form
            e.target.reset();
            
            // Show success message
            this.showMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }

    showMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        
        const form = document.getElementById('contactForm');
        form.appendChild(messageDiv);
        
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
}


/*
 <div class="contact-form-container">
                    <form class="contact-form" id="contactForm">
                        <h3>Send Me a Message</h3>
                        ${this.generateFormFields()}
                        <button type="submit" class="submit-btn">
                            <i class="fas fa-paper-plane"></i>
                            Send Message
                        </button>
                    </form>
                </div>
                */