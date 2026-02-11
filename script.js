// ============================================
// MOJASTRONA - JavaScript
// Mobile menu, smooth scrolling, interactions
// ============================================

// ============================================
// MOBILE MENU TOGGLE
// ============================================

const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');

        // Prevent body scroll when menu is open
        if (navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// ============================================
// SMOOTH SCROLLING
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Skip if href is just "#"
        if (href === '#') return;

        e.preventDefault();

        const target = document.querySelector(href);
        if (target) {
            // Calculate header offset
            const navHeight = document.querySelector('.nav').offsetHeight || 80;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// NAVBAR BACKGROUND ON SCROLL
// ============================================

const nav = document.querySelector('.nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add solid background after scrolling 100px
    if (currentScroll > 100) {
        nav.style.background = 'rgba(15, 20, 25, 0.98)';
        nav.style.boxShadow = '0 2px 16px rgba(0, 0, 0, 0.2)';
    } else {
        nav.style.background = 'rgba(15, 20, 25, 0.95)';
        nav.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// ============================================
// INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.problem-card, .step-card, .package-card, .faq-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ============================================
// FAQ ACCORDION (Optional enhancement)
// ============================================

document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    // Initially show all answers (as per design)
    // If you want accordion behavior, uncomment below:

    /*
    answer.style.maxHeight = '0';
    answer.style.overflow = 'hidden';
    answer.style.transition = 'max-height 0.3s ease';
    
    question.style.cursor = 'pointer';
    question.addEventListener('click', () => {
        const isOpen = answer.style.maxHeight !== '0px' && answer.style.maxHeight !== '';
        
        if (isOpen) {
            answer.style.maxHeight = '0';
        } else {
            answer.style.maxHeight = answer.scrollHeight + 'px';
        }
    });
    */
});

// ============================================
// FORM HANDLING (when you add a contact form)
// ============================================

// Placeholder for future contact form
const contactForm = document.querySelector('#contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        console.log('Form submitted:', data);

        // TODO: Add your form submission logic here
        // Example: send to email service, Formspree, etc.

        // Show success message
        alert('Dziękujemy za wiadomość! Odezwiemy się wkrótce.');
        contactForm.reset();
    });
}

// ============================================
// MOBILE STYLES FOR NAV (inject if needed)
// ============================================

// Add mobile menu styles dynamically
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 767px) {
        .nav-links {
            position: fixed;
            top: 60px;
            left: 0;
            right: 0;
            background: rgba(15, 20, 25, 0.98);
            backdrop-filter: blur(10px);
            flex-direction: column;
            padding: 2rem;
            gap: 1.5rem;
            transform: translateX(-100%);
            transition: transform 0.3s ease;
            border-bottom: 1px solid var(--color-dark-border);
            max-height: calc(100vh - 60px);
            overflow-y: auto;
        }
        
        .nav-links.active {
            transform: translateX(0);
            display: flex;
        }
        
        .mobile-menu-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .mobile-menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        .nav-link {
            font-size: 1.125rem;
        }
        
        .nav-cta {
            text-align: center;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// UTILITY: Check if element is in viewport
// ============================================

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ============================================
// ANALYTICS PLACEHOLDER
// ============================================

// Track CTA button clicks
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const buttonText = e.target.textContent;
        console.log('CTA clicked:', buttonText);

        // TODO: Add Google Analytics or other tracking
        // Example: gtag('event', 'cta_click', { button_text: buttonText });
    });
});

// Track package selection
document.querySelectorAll('.package-card .btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const packageName = e.target.closest('.package-card').querySelector('.package-name').textContent;
        console.log('Package selected:', packageName);

        // TODO: Add tracking
        // Example: gtag('event', 'package_select', { package: packageName });
    });
});

// ============================================
// PERFORMANCE: Lazy load images (when added)
// ============================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// CHAT SIMULATION LOGIC
// ============================================

const chatContainer = document.querySelector('.chat-simulation');
const calendarContainer = document.querySelector('.calendar-simulation');

const messages = [
    { text: "Cześć! Tak, mam wolne 9:30 i 11:00.\nZarezerwować?", type: "assistant", delay: 1000 },
    { text: "Tak, poproszę na 9:30", type: "client", delay: 2000 },
    { text: "Zarezerwowane! Do zobaczenia", type: "assistant", delay: 1500 }
];

async function typeText(element, text) {
    element.innerHTML = '<span class="typing-animation"></span>';
    const span = element.querySelector('.typing-animation');

    for (let char of text) {
        span.textContent += char;
        // Random typing speed for realism
        await new Promise(r => setTimeout(r, 30 + Math.random() * 50));

        // Auto scroll to bottom
        if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    }

    // Remove cursor effect after typing
    span.style.borderRight = 'none';
    span.classList.remove('typing-animation');
}

async function runChatSimulation() {
    if (!chatContainer) return;

    // Wait a bit before starting
    await new Promise(r => setTimeout(r, 1500));

    for (const msg of messages) {
        await new Promise(r => setTimeout(r, msg.delay));

        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-message ${msg.type}-message`;

        if (msg.type === 'assistant') {
            const nameSpan = document.createElement('span');
            nameSpan.className = 'assistant-name';
            nameSpan.textContent = 'Asystent:';
            msgDiv.appendChild(nameSpan);
        } else {
            const nameSpan = document.createElement('span');
            nameSpan.className = 'assistant-name';
            nameSpan.textContent = 'Klient:';
            msgDiv.appendChild(nameSpan);
        }

        const textP = document.createElement('p');
        msgDiv.appendChild(textP);
        chatContainer.appendChild(msgDiv);

        // Ensure scroll to bottom before typing starts
        chatContainer.scrollTop = chatContainer.scrollHeight;

        await typeText(textP, msg.text);
    }

    // Trigger Calendar Sequence
    if (calendarContainer) {
        await new Promise(r => setTimeout(r, 2000)); // Wait 2s after chat ends

        // Fade out chat slightly
        chatContainer.style.opacity = '0.3';
        chatContainer.style.transform = 'scale(0.95)';

        // Show Calendar
        calendarContainer.style.display = 'block';
        // Force reflow
        calendarContainer.offsetHeight;
        calendarContainer.style.opacity = '1';
        calendarContainer.style.transform = 'translate(-50%, -50%) scale(1)';

        // Type event in calendar
        const eventSlot = calendarContainer.querySelector('.typing-event');
        if (eventSlot) {
            await new Promise(r => setTimeout(r, 500));
            await typeText(eventSlot, "Wizyta klienta - Jan Kowalski");
        }

        // Trigger Assistant Image Sequence
        const assistantContainer = document.querySelector('.eva-assistant');
        if (assistantContainer) {
            await new Promise(r => setTimeout(r, 2000)); // Wait 2s after calendar typing

            // Randomly select Assistant
            const assistants = [
                { src: './Eva.png', alt: 'AI Assistant Eva' },
                { src: './Ivan.png', alt: 'AI Assistant Ivan' }
            ];
            const randomAssistant = assistants[Math.floor(Math.random() * assistants.length)];

            const assistantImg = assistantContainer.querySelector('img');
            if (assistantImg) {
                assistantImg.src = randomAssistant.src;
                assistantImg.alt = randomAssistant.alt;
            }

            // Fade out calendar
            calendarContainer.style.opacity = '0.3';
            calendarContainer.style.transform = 'translate(-50%, -50%) scale(0.95)';

            // Show Assistant
            assistantContainer.style.display = 'flex';
            // Force reflow
            assistantContainer.offsetHeight;
            assistantContainer.style.opacity = '1';
            assistantContainer.style.transform = 'translate(-50%, -50%) scale(1)';
        }
    }
}

// Start simulation when in view
const chatObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            runChatSimulation();
            chatObserver.disconnect();
        }
    });
}, { threshold: 0.5 });

if (chatContainer) {
    chatObserver.observe(chatContainer);
}

// ============================================
// 3D TILT EFFECT FOR CHAT WIDGET
// ============================================

const heroVisual = document.querySelector('.hero-visual');
const chatCard = document.querySelector('.chat-simulation');

if (heroVisual && chatCard) {
    heroVisual.addEventListener('mousemove', (e) => {
        const rect = heroVisual.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Calculate rotation based on cursor position
        // Range: -10deg to 10deg
        const xRotation = -1 * ((y - rect.height / 2) / rect.height * 20);
        const yRotation = (x - rect.width / 2) / rect.width * 20;

        // Apply transform
        chatCard.style.transform = `
            perspective(1000px)
            rotateX(${xRotation}deg)
            rotateY(${yRotation}deg)
            scale3d(1.02, 1.02, 1.02)
        `;
    });

    heroVisual.addEventListener('mouseleave', () => {
        // Reset position smoothly
        chatCard.style.transform = `
            perspective(1000px)
            rotateX(0)
            rotateY(0)
            scale3d(1, 1, 1)
        `;
    });
}

// ============================================
// MAGNETIC BUTTON EFFECT
// ============================================

const magneticButtons = document.querySelectorAll('.btn-primary');

magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});

// ============================================
// CONSOLE SIGNATURE
// ============================================

console.log('%c🌟 MojaStrona.online ', 'background: #f5a623; color: #0f1419; font-size: 16px; font-weight: bold; padding: 10px;');
console.log('%cProfesjonalne strony w abonamencie | mojastronaonline.pl', 'color: #8896a4; font-size: 12px;');
// ============================================
// FAQ ACCORDION
// ============================================

const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        const isActive = item.classList.contains('active');

        // Close all other items
        document.querySelectorAll('.faq-item').forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });

        // Toggle current item
        item.classList.toggle('active');
    });
});

// ============================================
// LIGHTBOX FOR TEMPLATE CARDS
// ============================================

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');

// Click handlers for template cards
document.querySelectorAll('.template-card').forEach(card => {
    if (card.tagName === 'A') return; // skip cards that are links to demo
    card.addEventListener('click', () => {
        const img = card.querySelector('.template-image');
        const title = card.querySelector('h3').textContent;

        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxCaption.textContent = title;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Close lightbox function
function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

// Close on overlay click or close button
if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
            closeLightbox();
        }
    });
}

// Close on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
        closeLightbox();
    }
});

// ============================================
// LEGAL MODALS (Regulamin, Polityka Prywatności)
// ============================================

const legalModals = {
    privacy: document.getElementById('modal-privacy'),
    terms: document.getElementById('modal-terms')
};

// Open modal
document.querySelectorAll('[data-modal]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const modalId = link.dataset.modal;
        const modal = legalModals[modalId];
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close modal function
function closeLegalModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Close on X button or overlay click
document.querySelectorAll('.legal-modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('legal-modal-close')) {
            closeLegalModal(modal);
        }
    });
});

// Close on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.legal-modal.active').forEach(modal => {
            closeLegalModal(modal);
        });
    }
});
