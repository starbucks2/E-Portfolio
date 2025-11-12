// ===== Mobile Navigation Toggle =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ===== Active Navigation Link on Scroll =====
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===== Skill Progress Animation =====
const skillsSection = document.querySelector('.skills');
let skillsAnimated = false;

const animateSkills = () => {
    const skillProgress = document.querySelectorAll('.skill-progress');
    skillProgress.forEach(skill => {
        const progress = skill.getAttribute('data-progress');
        skill.style.width = progress + '%';
    });
};

const checkSkillsScroll = () => {
    if (!skillsAnimated && skillsSection) {
        const skillsPosition = skillsSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight;
        
        if (skillsPosition < screenPosition) {
            animateSkills();
            skillsAnimated = true;
        }
    }
};

window.addEventListener('scroll', checkSkillsScroll);

// ===== Smooth Scroll for Navigation Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// ===== Scroll Reveal Animation =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animation
const animateOnScroll = document.querySelectorAll('.skill-card, .project-card, .stat-item, .about-content, .contact-content');
animateOnScroll.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===== Form Submission Handler =====
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const subject = contactForm.querySelectorAll('input[type="text"]')[1].value;
        const message = contactForm.querySelector('textarea').value;
        
        // Simple validation
        if (name && email && subject && message) {
            // Show success message (you can customize this)
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        } else {
            alert('Please fill in all fields.');
        }
    });
}

// ===== Typing Effect for Hero Title =====
const heroTitle = document.querySelector('.gradient-text');
if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;
    
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 500);
}

// ===== Parallax Effect for Hero Section =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// ===== Add Navbar Background on Scroll =====
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(15, 15, 15, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(212, 175, 55, 0.15)';
    } else {
        navbar.style.background = 'rgba(15, 15, 15, 0.9)';
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.2)';
    }
});

// ===== Cursor Trail Effect (Optional) =====
const createCursorTrail = () => {
    const coords = { x: 0, y: 0 };
    const circles = document.querySelectorAll('.cursor-circle');
    
    if (circles.length === 0) return;
    
    circles.forEach((circle, index) => {
        circle.x = 0;
        circle.y = 0;
    });
    
    window.addEventListener('mousemove', (e) => {
        coords.x = e.clientX;
        coords.y = e.clientY;
    });
    
    const animateCircles = () => {
        let x = coords.x;
        let y = coords.y;
        
        circles.forEach((circle, index) => {
            circle.style.left = x - 12 + 'px';
            circle.style.top = y - 12 + 'px';
            circle.style.transform = `scale(${(circles.length - index) / circles.length})`;
            
            circle.x = x;
            circle.y = y;
            
            const nextCircle = circles[index + 1] || circles[0];
            x += (nextCircle.x - x) * 0.3;
            y += (nextCircle.y - y) * 0.3;
        });
        
        requestAnimationFrame(animateCircles);
    };
    
    animateCircles();
};

// Initialize cursor trail if elements exist
if (document.querySelectorAll('.cursor-circle').length > 0) {
    createCursorTrail();
}

// ===== Counter Animation for Stats =====
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.ceil(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    };
    
    updateCounter();
};

// Observe stats section for counter animation
const statsSection = document.querySelector('.about-stats');
let statsAnimated = false;

if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated) {
                const statNumbers = document.querySelectorAll('.stat-item h4');
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.textContent);
                    animateCounter(stat, target);
                });
                statsAnimated = true;
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
}

console.log('Portfolio loaded successfully! 🚀');

// ===== 3D Tilt Effect with Golden Shine =====
const initTiltEffects = () => {
    const tiltEls = document.querySelectorAll('.tilt');
    if (!tiltEls.length) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const maxTilt = 12; // degrees

    tiltEls.forEach(el => {
        let rect = null;
        let rafId = null;
        let currentX = 0, currentY = 0;

        const update = () => {
            // compute percent from center
            const px = (currentX - rect.left) / rect.width;
            const py = (currentY - rect.top) / rect.height;
            const rx = (0.5 - py) * (maxTilt * 2);
            const ry = (px - 0.5) * (maxTilt * 2);

            // shine intensity based on distance from center
            const dx = Math.abs(px - 0.5) * 2;
            const dy = Math.abs(py - 0.5) * 2;
            const intensity = Math.max(0, 1 - Math.hypot(dx, dy));
            el.style.setProperty('--shine', (0.15 * intensity).toFixed(3));

            el.style.transform = `rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
            rafId = null;
        };

        const onEnter = () => {
            rect = el.getBoundingClientRect();
            if (!prefersReduced) {
                el.style.transition = 'transform 120ms ease';
            }
        };

        const onMove = (e) => {
            if (!rect) rect = el.getBoundingClientRect();
            currentX = e.clientX;
            currentY = e.clientY;
            if (!rafId) rafId = requestAnimationFrame(update);
        };

        const onLeave = () => {
            el.style.transition = 'transform 300ms ease';
            el.style.transform = 'rotateX(0deg) rotateY(0deg)';
            el.style.setProperty('--shine', 0);
        };

        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mousemove', onMove);
        el.addEventListener('mouseleave', onLeave);

        // Recalculate on resize/scroll
        ['scroll', 'resize'].forEach(evt => window.addEventListener(evt, () => {
            rect = el.getBoundingClientRect();
        }));
    });
};

window.addEventListener('DOMContentLoaded', initTiltEffects);