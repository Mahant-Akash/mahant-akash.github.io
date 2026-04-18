/**
 * Akash Mahant - Portfolio Website
 * Scroll Animations & Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio loaded successfully!');

    // Initialize all features
    initScrollAnimations();
    initSmoothScrolling();
    initNavbarScrollEffect();
    initActiveNavHighlighting();
    initHeroAnimations();
    initSkillBarAnimations();
    initCursorEffects();
    initKeyboardNavigation();
    initLoadingState();
});

/**
 * Scroll-triggered fade-in animations using Intersection Observer
 */
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
        thresholdStep: 0.05
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Trigger skill bar animations
                if (entry.target.classList.contains('skills-section')) {
                    const skillFills = entry.target.querySelectorAll('.skill-fill');
                    skillFills.forEach(fill => {
                        const width = fill.style.width;
                        fill.style.width = '0';
                        setTimeout(() => {
                            fill.style.width = width;
                        }, 100);
                    });
                }

                // Stop observing once visible
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));

    // Also observe sections
    document.querySelectorAll('.section').forEach(section => observer.observe(section));
}

/**
 * Smooth scrolling for navigation links
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Navbar scroll effect - add shadow on scroll
 */
function initNavbarScrollEffect() {
    const navbar = document.querySelector('.navbar');

    const updateNavbar = () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 100) {
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
            navbar.style.background = 'rgba(11, 17, 32, 0.98)';
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.background = 'rgba(11, 17, 32, 0.95)';
        }
    };

    window.addEventListener('scroll', updateNavbar, { passive: true });
}

/**
 * Active section highlighting in navigation
 */
function initActiveNavHighlighting() {
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                if (navLink) navLink.style.color = 'var(--accent-teal)';
            } else if (navLink) {
                navLink.style.color = '';
            }
        });
    }, { passive: true });
}

/**
 * Hero animations - typing effect and parallax
 */
function initHeroAnimations() {
    // Typing effect for tagline
    const heroTagline = document.querySelector('.hero-tagline');
    const typingText = heroTagline?.textContent;

    if (typingText && window.innerWidth >= 768) {
        heroTagline.innerHTML = '';
        heroTagline.style.opacity = '1';

        let index = 0;
        const typeChar = () => {
            if (index < typingText.length) {
                heroTagline.innerHTML += typingText.charAt(index);
                index++;
                setTimeout(typeChar, 50);
            }
        };
        setTimeout(typeChar, 800);
    }

    // Parallax effect for hero background
    const heroMesh = document.querySelector('.gradient-mesh');

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        if (scrolled < 100 && heroMesh) {
            heroMesh.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    }, { passive: true });
}

/**
 * Skill bar animations
 */
function initSkillBarAnimations() {
    const skillBarObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target.querySelector?.('.skill-fill');
                if (fill) {
                    const width = fill.style.width;
                    fill.style.width = '0';
                    setTimeout(() => {
                        fill.style.width = width;
                    }, 100);
                }
                skillBarObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.skill-bar').forEach(bar => skillBarObserver.observe(bar));
}

/**
 * Custom cursor effects for desktop
 */
function initCursorEffects() {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    // Custom cursor
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    const updateCursor = (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    };

    const updateCursorHover = (e) => {
        const target = e.target;
        if (target.closest('a') || target.closest('button') || target.closest('.experience-card') || target.closest('.project-card')) {
            cursor.classList.add('hover');
        } else {
            cursor.classList.remove('hover');
        }
    };

    document.addEventListener('mousemove', updateCursor, { passive: true });
    document.addEventListener('mouseover', updateCursorHover, { passive: true });
}

/**
 * Keyboard navigation support
 */
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
}

/**
 * Loading state handling
 */
function initLoadingState() {
    if (document.readyState === 'complete') {
        document.body.classList.add('loaded');
    } else {
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');
        });
    }
}

// Add custom cursor styles dynamically
const cursorStyles = document.createElement('style');
cursorStyles.textContent = `
    .custom-cursor {
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid var(--accent-teal);
        border-radius: 50%;
        pointer-events: none;
        z-index: 10000;
        transform: translate(-50%, -50%);
        transition: transform 0.1s ease, border-color 0.2s ease;
        mix-blend-mode: difference;
    }

    .custom-cursor.hover {
        transform: translate(-50%, -50%) scale(1.5);
        border-color: var(--accent-gold);
        background: rgba(20, 184, 166, 0.1);
    }

    @media (max-width: 768px) {
        .custom-cursor {
            display: none;
        }
    }
`;
document.head.appendChild(cursorStyles);
