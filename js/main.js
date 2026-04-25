/**
 * Akash Mahant - Portfolio Website
 * Scroll Animations & Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initSmoothScrolling();
    initNavbarScrollEffect();
    initActiveNavHighlighting();
    initHeroAnimations();
    initSkillBarAnimations();
    initNumberCounters();
    initTimelineAnimations();
    initCursorEffects();
    initKeyboardNavigation();
    initMobileMenu();
});

/**
 * Scroll-triggered fade-in animations using Intersection Observer
 */
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => observer.observe(el));
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
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

/**
 * Navbar scroll effect - single RAF-throttled handler
 */
function initNavbarScrollEffect() {
    const navbar = document.querySelector('.navbar');
    let ticking = false;

    const updateNavbar = () => {
        const currentScrollY = window.scrollY;
        if (currentScrollY > 100) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }, { passive: true });
}

/**
 * Active section highlighting in navigation - single RAF-throttled handler
 */
function initActiveNavHighlighting() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    let ticking = false;

    const updateActiveNav = () => {
        const scrollY = window.scrollY;
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

            if (navLink) {
                if (scrollY >= sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.style.color = 'var(--accent-teal)';
                    navLink.setAttribute('aria-current', 'page');
                } else {
                    navLink.style.color = '';
                    navLink.removeAttribute('aria-current');
                }
            }
        });
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateActiveNav);
            ticking = true;
        }
    }, { passive: true });
}

/**
 * Hero animations - character-by-character reveal using textContent
 */
function initHeroAnimations() {
    const heroTagline = document.querySelector('.hero-tagline');
    const typingText = heroTagline?.textContent;

    if (typingText && window.innerWidth >= 768) {
        heroTagline.textContent = '';
        heroTagline.style.opacity = '1';

        let index = 0;
        const typeChar = () => {
            if (index < typingText.length) {
                heroTagline.textContent += typingText.charAt(index);
                index++;
                setTimeout(typeChar, 50);
            }
        };
        setTimeout(typeChar, 800);
    }

    // Parallax effect - RAF-throttled, respects prefers-reduced-motion
    const heroMesh = document.querySelector('.gradient-mesh');
    if (!heroMesh) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrolled = window.scrollY;
                if (scrolled < 100 && heroMesh) {
                    heroMesh.style.transform = `translateY(${scrolled * 0.3}px)`;
                }
                ticking = false;
            });
            ticking = true;
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
                const fill = entry.target.querySelector('.skill-fill');
                if (fill) {
                    const targetScale = parseFloat(fill.dataset.scale) || 0;
                    fill.dataset.scale = targetScale;
                    fill.style.transform = 'scaleX(0)';
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            fill.style.transform = `scaleX(${targetScale})`;
                        });
                    });
                    entry.target.classList.add('visible');
                }
                skillBarObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.skill-bar').forEach(bar => skillBarObserver.observe(bar));
}

/**
 * Animated number counters for highlight stats
 */
function initNumberCounters() {
    const counters = document.querySelectorAll('.highlight-number');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.target);
                const prefix = el.dataset.prefix || '';
                const suffix = el.dataset.suffix || '';
                const duration = 1500;
                const startTime = performance.now();

                const easeOutQuint = t => 1 - Math.pow(1 - t, 5);

                const updateCounter = (now) => {
                    const elapsed = now - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const easedProgress = easeOutQuint(progress);
                    const current = Math.floor(easedProgress * target);
                    el.textContent = prefix + current + suffix;
                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        el.textContent = prefix + target + suffix;
                    }
                };

                requestAnimationFrame(updateCounter);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(el => counterObserver.observe(el));
}

/**
 * Scroll-triggered timeline animations
 */
function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');

    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                timelineObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });

    timelineItems.forEach((item, i) => {
        item.style.transitionDelay = (i * 0.15) + 's';
        timelineObserver.observe(item);
    });
}

/**
 * Custom cursor effects for desktop only
 */
function initCursorEffects() {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    const animateCursor = () => {
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;
        cursorX += dx * 0.15;
        cursorY += dy * 0.15;
        cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px)`;
        requestAnimationFrame(animateCursor);
    };
    requestAnimationFrame(animateCursor);

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }, { passive: true });

    // Use event delegation on static elements rather than every mouseover
    const hoverTargets = 'a, button, .experience-card, .project-card';
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest(hoverTargets)) {
            cursor.classList.add('hover');
        } else {
            cursor.classList.remove('hover');
        }
    }, { passive: true });

    document.addEventListener('mouseout', (e) => {
        if (!e.target.closest(hoverTargets)) {
            cursor.classList.remove('hover');
        }
    }, { passive: true });
}

/**
 * Mobile hamburger menu toggle
 */
function initMobileMenu() {
    const toggle = document.querySelector('.nav-toggle');
    const links = document.querySelector('.nav-links');
    const overlay = document.querySelector('.nav-overlay');

    if (!toggle || !links) return;

    const openMenu = () => {
        toggle.setAttribute('aria-expanded', 'true');
        links.classList.add('open');
        overlay?.classList.add('visible');
        document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
        toggle.setAttribute('aria-expanded', 'false');
        links.classList.remove('open');
        overlay?.classList.remove('visible');
        document.body.style.overflow = '';
    };

    toggle.addEventListener('click', () => {
        const isOpen = toggle.getAttribute('aria-expanded') === 'true';
        isOpen ? closeMenu() : openMenu();
    });

    overlay?.addEventListener('click', closeMenu);

    links.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') closeMenu();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMenu();
    });
}

/**
 * Keyboard navigation support
 */
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const menu = document.querySelector('.nav-links');
            if (!menu?.classList.contains('open')) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    });
}