// Enhanced Script for Aesthetic Freelancer Section
// Particle Background System
class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('bg-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.resize();
        this.initParticles();
        this.animate();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    initParticles() {
for (let i = 0; i < 150; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1,
                alpha: Math.random() * 0.3 + 0.6,
                color: `hsl(${Math.random() * 60 + 200}, 70%, 80%)`
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            
            if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;

            this.ctx.save();
            this.ctx.globalAlpha = p.alpha;
            this.ctx.fillStyle = p.color;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        });

        // Connect nearby particles
for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    this.ctx.save();
                    this.ctx.strokeStyle = `rgba(100, 180, 255, ${0.9 - distance / 100 * 0.7})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                    this.ctx.restore();
                }
            }
        }

        requestAnimationFrame(() => this.animate());
    }
}

// Typing Animation
class TypingEffect {
    constructor(element, texts, speed = 100) {
        this.element = element;
        this.texts = texts;
        this.speed = speed;
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.init();
    }

    init() {
        this.type();
    }

    type() {
        const currentText = this.texts[this.textIndex];
        this.element.innerHTML = currentText.substring(0, this.charIndex) +
            (this.charIndex < currentText.length ? '|' : '');

        if (!this.isDeleting && this.charIndex < currentText.length) {
            this.charIndex++;
            setTimeout(() => this.type(), this.speed);
        } else if (this.isDeleting && this.charIndex > 0) {
            this.charIndex--;
            setTimeout(() => this.type(), this.speed);
        } else {
            if (!this.isDeleting) {
                this.isDeleting = true;
                setTimeout(() => this.type(), this.speed + 500);
            } else {
                this.isDeleting = false;
                this.textIndex = (this.textIndex + 1) % this.texts.length;
                setTimeout(() => this.type(), 500);
            }
        }
    }
}

// Enhanced Counter Animation for About and Freelance Stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Progress Bars Animation
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    progressBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width + '%';
    });
}

// Scroll Reveal
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const elementTop = reveal.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('active');
        }
    });
}

// Navbar Scroll Effect
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    const menu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    
    hamburger.addEventListener('click', () => {
        menu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Smooth Scrolling
function smoothScroll() {
    document.querySelectorAll('a[href^=\"#\"]').forEach(anchor => {
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
}

// Contact Form
function handleContactForm() {
    const form = document.querySelector('.contact-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const name = formData.get('name') || document.querySelector('input[placeholder=\"Your Name\"]').value;
        const email = formData.get('email') || document.querySelector('input[placeholder=\"Your Email\"]').value;
        const message = formData.get('message') || document.querySelector('textarea[placeholder=\"Your Message\"]').value;
        
        // Create mailto link
        const subject = encodeURIComponent(`New Portfolio Contact: ${name}`);
        const body = encodeURIComponent(`From: ${name} (${email})\\n\\nMessage:\\n${message}`);
        const mailtoLink = `mailto:mradulraghuwanshi@gmail.com?subject=${subject}&body=${body}`;
        
        // Open mail client
        window.open(mailtoLink, '_blank');
        
        // Reset form
        form.reset();
        
        // Confirmation
        alert('Email client opened! Your message has been prepared. 🚀');
    });
}

// Intersection Observer for Scroll Animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Trigger specific animations
                if (entry.target.classList.contains('about')) {
                    animateCounters();
                    animateProgressBars();
                }

                if (entry.target.id === 'experience') {
                    // Animate freelance stats
                    setTimeout(animateCounters, 200);
                }

                // Staggered cert cards reveal
                if (entry.target.classList.contains('certifications')) {
                    const cards = entry.target.querySelectorAll('.cert-card-modern');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('active');
                        }, index * 150);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
}

// Enhanced Card Tilt Effect for Timeline and Certs
function initCardTilt() {
    const tiltElements = document.querySelectorAll('.timeline-content, .cert-card-modern');
    
    tiltElements.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02) translateY(-5px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        });
    });
}

// Parallax Effect
function parallaxEffect() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');
    if (parallax) {
        parallax.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
}

// Tooltip Functionality - Enhanced
let currentTooltip = null;

function initTooltips() {
    const techLinks = document.querySelectorAll('.tech-link[data-tooltip]');
    
    techLinks.forEach(link => {
        link.addEventListener('mouseenter', (e) => {
            // Remove existing tooltip
            if (currentTooltip) {
                currentTooltip.remove();
            }
            
            // Create tooltip
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = link.getAttribute('data-tooltip');
            tooltip.setAttribute('role', 'tooltip');
            
            // Position tooltip
            const rect = link.getBoundingClientRect();
            tooltip.style.top = (rect.bottom + 10) + 'px';
            tooltip.style.left = rect.left + 'px';
            
            const viewportWidth = window.innerWidth;
            const tooltipWidth = 300;
            if (rect.right + tooltipWidth > viewportWidth) {
                tooltip.style.left = (rect.left - tooltipWidth + 20) + 'px';
            }
            
            document.body.appendChild(tooltip);
            currentTooltip = tooltip;
            
            // Show with animation
            requestAnimationFrame(() => tooltip.classList.add('visible'));
        });
        
        link.addEventListener('mouseleave', () => {
            if (currentTooltip) {
                currentTooltip.classList.remove('visible');
                setTimeout(() => {
                    if (currentTooltip) {
                        currentTooltip.remove();
                        currentTooltip = null;
                    }
                }, 300);
            }
        });
    });
}

// Certificates Data
const certsData = [
    {
        id: 0,
        title: 'Build Generative AI Apps and Solutions with No-Code Tools',
        desc: 'Developing AI solutions using no-code platforms (5.5 hours).',
        issuer: 'Udemy',
        year: '2025',
        image: 'https://drive.google.com/file/d/1woVhYNi0Ofkt2hjnOILQLR15qtATurcL/view?usp=drive_link',
        icon: 'fas fa-microchip'
    },
    {
        id: 1,
        title: 'Mastering C and C++ Programming',
        desc: 'Training in core syntax, memory management, and OOP in C/C++.',
        issuer: 'Board Infinity',
        year: '2025',
        image: 'https://drive.google.com/file/d/1CBqEbRpPEPDx_nV25jp7EeYY_kSylvmC/view?usp=drive_link',
        icon: 'fas fa-network-wired'
    },
    {
        id: 2,
        title: 'Computational Theory: Language Principle & Finite Automata Theory',
        desc: 'Study of formal languages and the theory behind computation.',
        issuer: 'Infosys Springboard',
        year: '2025',
        image: 'https://drive.google.com/file/d/1Ae4p1KYDB0kRextxmxhe4G6L3vZ2vzaC/view?usp=drive_link',
        icon: 'fas fa-shield-halved'
    },
    {
        id: 3,
        title: 'ChatGPT-4 Prompt Engineering: ChatGPT, Generative AI & LLM',
        desc: 'Mastering prompt engineering and Large Language Models.',
        issuer: 'Infosys Springboard',
        year: '2025',
        image: 'https://drive.google.com/file/d/1woVhYNi0Ofkt2hjnOILQLR15qtATurcL/view?usp=drive_link',
        icon: 'fas fa-cloud'
    },
    {
        id: 4,
        title: 'Java Programming',
        desc: '72-hour intensive online course on Java development. +1',
        issuer: 'LPU (via iamneo)',
        year: '2025',
        image: 'https://drive.google.com/file/d/1liyKT7L2Y0XVg26sNbTR9r-MpKD09OZD/view?usp=drive_link',
        icon: 'fas fa-database'
    },
    {
        id: 5,
        title: 'MERN Stack Web Development Course',
        desc: 'Full-stack web development using MongoDB, Express, React, and Node.',
        issuer: 'Coursera',
        year: '2025',
        image: 'https://drive.google.com/file/d/1s3uNA0Zc7B3N093xjPcob5aPdHj0EmfB/view?usp=drive_link',
        icon: 'fab fa-js'
    },
    {
        id: 6,
        title: 'Introduction to Software Engineering',
        desc: 'Overview of the SDLC, agile methodologies, and engineering principles.',
        issuer: 'IBM (via Coursera)',
        year: '2024',
        image: 'https://drive.google.com/file/d/14jNco8Az4yl8OnMv--SDqgVohtA9AfZD/view?usp=drive_link',
        icon: 'fas fa-code-branch'
    },
    {
        id: 7,
        title: 'Introduction to Cyber Security',
        desc: 'Foundational concepts of digital security, threats, and risk management.',
        issuer: 'Cisco',
        year: '2024',
        image: 'https://drive.google.com/file/d/1nhpQ1JrYC2RkvbCRdYM0Ze0rAE8pZWO6/view?usp=drive_link',
        icon: 'fas fa-laptop-code'
    },
    {
        id: 8,
        title: 'Object Oriented Programming',
        desc: '72-hour course focused on OOP principles and implementation. +1',
        issuer: 'LPU (via iamneo)',
        year: '2024',
        image: 'https://drive.google.com/file/d/1k6aGU_7DjZtyf7WZd_mvV7ktC9o0E6kJ/view?usp=drive_link',
        icon: 'fas fa-desktop'
    },
    {
        id: 9,
        title: 'Data Structures and Algorithm',
        desc: '72-hour intensive online course focused on core DSA concepts. +1',
        issuer: 'LPU (via iamneo)',
        year: '2024',
        image: 'https://drive.google.com/file/d/14MJaK0TuXheL95wdwVcrDEizLbqT5QTn/view?usp=drive_link',
        icon: 'fas fa-server'
    },
    {
        id: 10,
        title: 'Introduction to Hardware and Operating Systems',
        desc: 'Foundational course covering computer hardware and OS functions. +1',
        issuer: 'IBM (via Coursera)',
        year: '2024',
        image: 'https://drive.google.com/file/d/1nhpQ1JrYC2RkvbCRdYM0Ze0rAE8pZWO6/view?usp=drive_link',
        icon: 'fas fa-screwdriver-wrench'
    },
    {
        id: 11,
        title: 'The Bits and Bytes of Computer Networking',
        desc: 'Foundational concepts of networking, protocols, and infrastructure. +1',
        issuer: 'Google (via Coursera)',
        year: '2024',
        image: 'https://drive.google.com/file/d/14jNco8Az4yl8OnMv--SDqgVohtA9AfZD/view?usp=drive_link',
        icon: 'fab fa-python'
    },
    {
        id: 12,
        title: 'Certificate of Appreciation (Plantation)',
        desc: 'Recognition for contributing to environmental plantation efforts.',
        issuer: 'Mahadev Sundaram Jan Kalyan Samithi',
        year: '2024',
        image: 'https://drive.google.com/file/d/1isCb5GAYgucLVLnsmYwkXhB5PU90cUCw/view?usp=drive_link',
        icon: 'fas fa-plug'
    },
    {
        id: 13,
        title: 'DSA (Data Structures and Algorithms)',
        desc: '10-week course on fundamental data structures and algorithms.',
        issuer: 'GeeksforGeeks',
        year: '2024',
        image: 'https://drive.google.com/file/d/1vRxrTd1tbpTviH5zGHHPNDWZatJLpXca/view?usp=drive_link',
        icon: 'fas fa-mobile-screen'
    },
    {
        id: 14,
        title: 'Code Off Duty - A Web Hackathon',
        desc: 'Participation in a 2-day web hackathon demonstrating innovation.',
        issuer: 'Coding Wise',
        year: '2024',
        image: 'https://drive.google.com/file/d/1JY8eGTlQh61EXz3yodwQgqsQvl8Sw4of/view?usp=drive_link',
        icon: 'fas fa-gears'
    },
    {
        id: 15,
        title: 'Complete Python Tutorial',
        desc: 'Comprehensive training in Python programming. +1',
        issuer: 'CipherSchools',
        year: '2024',
        image: 'https://drive.google.com/file/d/18gSRmiAQIMezGEdhnW-RTiOD_SNaZbxn/view?usp=drive_link',
        icon: 'fas fa-diagram-project'
    },
    {
        id: 16,
        title: 'Legacy Responsive Web Design V8',
        desc: '300-hour certification covering HTML, CSS, and responsive design.',
        issuer: 'freeCodeCamp',
        year: '2023',
        image: 'https://drive.google.com/file/d/13fleXM9MVkly-gBjpydSK7thoR3sm3x4/view?usp=drive_link',
        icon: 'fas fa-chart-column'
    }
];

// Projects Modal Data (from existing #projects)
const projectsData = [
    {
        title: 'Dine Flow',
        desc: 'Next-generation POS platform for restaurants that manages billing, orders, menus with WhatsApp integration and analytics.',
        github: 'https://github.com/sparkserves002/sparkserves-orange-scroll-58',
        live: 'https://dineflow.sparkserves.com/',
        tags: ['React', 'TypeScript', 'Supabase']
    },
    {
        title: 'Contact Manager',
        desc: 'Client lifecycle management platform with integrated WhatsApp, Instagram, email, and call workflows.',
        github: 'https://github.com/sparkserves002/sparkserves-orange-scroll-58',
        live: 'https://contactmanager.sparkserves.com/',
        tags: ['React', 'TypeScript', 'Supabase']
    },
    {
        title: 'Geo location based Attendance system',
        desc: 'Real-time classroom communication platform for students and teachers with live chat and announcements.',
        github: 'https://github.com/sparkserves002/EMS',
        live: 'https://ems.sparkserves.com/',
        tags: ['PHP', 'JavaScript', 'MySQL']
    },
    {
        title: 'Dine Ease: Culinary Operations Architect',
        desc: 'A high-performance billing and management ecosystem designed for the hospitality industry. It streamlines order processing, table management, and real-time financial reporting for restaurants.',
        github: 'https://github.com/sparkserves002/sparkserves-orange-scroll-58',
        live: 'https://dineflow.sparkserves.com/',
        tags: ['React', 'Node.js', 'Express.js', 'Supabase', 'Tailwind CSS']
    },
    {
        title: 'Store Assist: Retail Inventory & Billing Engine',
        desc: 'A comprehensive retail management solution that synchronizes point-of-sale operations with inventory tracking. It provides business owners with a centralized dashboard for sales analytics and stock alerts.',
        github: '#',
        live: '#',
        tags: ['React', 'Node.js', 'Express.js', 'Supabase', 'Redux']
    },
    {
        title: 'SparkServes: Corporate Digital Identity',
        desc: 'The official digital headquarters for SparkServes. This platform serves as the primary touchpoint for clients, showcasing the company\'s mission to "serve together" and its suite of professional products.',
        github: '#',
        live: 'https://www.sparkserves.com',
        tags: ['React', 'Node.js', 'Express.js', 'Supabase', 'Framer Motion']
    },
    {
        title: 'TaxFlow: Intelligent GST Calculator',
        desc: 'A precision-engineered financial tool designed to simplify complex Indian taxation requirements. It provides instant, accurate GST breakdowns for various goods and services categories.',
        github: '#',
        live: '#',
        tags: ['React', 'Node.js', 'Express.js', 'Supabase']
    },
    {
        title: 'Untangle: Student Organization Hub',
        desc: 'A centralized ecosystem for student organizations to manage memberships, event calendars, and internal communications, fostering a more connected campus environment.',
        github: '#',
        live: '#',
        tags: ['React', 'Node.js', 'Express.js', 'MongoDB']
    },
    {
        title: 'EduPulse: Interactive Learning Ecosystem',
        desc: 'A lightweight, student-centric learning platform focused on accessibility and clean UI. It allows users to browse courses and track educational progress in a distraction-free environment.',
        github: '#',
        live: '#',
        tags: ['HTML5', 'CSS3', 'JavaScript']
    },
    {
        title: 'Paws & Hearts: Pet Adoption Portal',
        desc: 'A compassionate digital marketplace connecting rescue animals with potential adopters. The project focuses on intuitive navigation and emotive storytelling to increase successful adoption rates.',
        github: '#',
        live: '#',
        tags: ['HTML5', 'CSS3', 'JavaScript', 'AOS']
    }
];

function createProjectCard(project) {
    return `
        <article class="project-card reveal">
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.desc}</p>
                <div class="tech-tags">
                    ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.github}" class="link-icon" target="_blank" rel="noopener noreferrer"><i class="fab fa-github"></i></a>
                    <a href="${project.live}" class="link-icon" target="_blank" rel="noopener noreferrer"><i class="fas fa-external-link-alt"></i></a>
                </div>
            </div>
        </article>
    `;
}

function initProjectsSection() {
    const previewGrid = document.getElementById('projects-preview-grid');
    const galleryGrid = document.getElementById('projects-gallery-grid');
    const openBtn = document.getElementById('more-projects-btn');
    const closeBtn = document.getElementById('close-projects-btn');
    const galleryPage = document.getElementById('projects-gallery-page');

    if (!previewGrid || !galleryGrid || !openBtn || !closeBtn || !galleryPage) return;

    previewGrid.innerHTML = projectsData.slice(0, 3).map(createProjectCard).join('');
    galleryGrid.innerHTML = projectsData.map(createProjectCard).join('');

    openBtn.addEventListener('click', () => {
        galleryPage.hidden = false;
        galleryPage.scrollIntoView({ behavior: 'smooth', block: 'start' });
        revealOnScroll();
    });

    closeBtn.addEventListener('click', () => {
        galleryPage.hidden = true;
        document.getElementById('projects').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
}

function createCertCard(cert) {
    return `
        <article class="cert-card-modern reveal" data-cert="${cert.id}">
            <div class="cert-icon">
                <i class="${cert.icon}"></i>
            </div>
            <h3>${cert.title}</h3>
            <div class="cert-meta">
                <span class="issuer">${cert.issuer}</span>
                <span class="year">${cert.year}</span>
            </div>
            <p>${cert.desc}</p>
            <a href="${cert.image}" class="btn btn-primary btn-small cert-view-btn" target="_blank" rel="noopener noreferrer">View Certificate</a>
        </article>
    `;
}

function initCertificatesSection() {
    const previewGrid = document.getElementById('cert-preview-grid');
    const galleryGrid = document.getElementById('cert-gallery-grid');
    const openBtn = document.getElementById('more-certs-btn');
    const closeBtn = document.getElementById('close-certs-btn');
    const galleryPage = document.getElementById('cert-gallery-page');

    if (!previewGrid || !galleryGrid || !openBtn || !closeBtn || !galleryPage) return;

    previewGrid.innerHTML = certsData.slice(0, 3).map(createCertCard).join('');
    galleryGrid.innerHTML = certsData.map(createCertCard).join('');

    openBtn.addEventListener('click', () => {
        galleryPage.hidden = false;
        galleryPage.scrollIntoView({ behavior: 'smooth', block: 'start' });
        revealOnScroll();
    });

    closeBtn.addEventListener('click', () => {
        galleryPage.hidden = true;
        document.getElementById('certifications').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
}

// Initialize Everything on DOM Load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize particle system
    new ParticleSystem();
    
    // Typing effect
    const typingElement = document.querySelector('.typing-text');
    new TypingEffect(typingElement, [
        'Full Stack Developer',
        'MERN Stack Engineer', 
        'Startup Builder',
        'Freelance Web Developer'
    ]);
    
    // Setup all interactions
    toggleMobileMenu();
    smoothScroll();
    handleContactForm();
    setupScrollAnimations();
    initTooltips();
    initCardTilt();
    initProjectsSection();
    initCertificatesSection();
    initCustomCursor();
    
    // Initial scroll reveal
    revealOnScroll();
    
    // Page load completion
    window.addEventListener('load', function() {
        document.body.classList.remove('loading');
        document.body.classList.add('loaded');
        setTimeout(animateCounters, 1000); // Initial counters for about
    });
    
    // Event listeners
    window.addEventListener('scroll', () => {
        revealOnScroll();
        handleNavbarScroll();
        parallaxEffect();
    });
    
    // Add reveal class to all animatable elements
    document.querySelectorAll('.section, .project-card, .startup-card, .timeline-item, .cert-card-modern').forEach(el => {
        el.classList.add('reveal');
    });
    
// Custom Magnetic Cursor
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Magnetic hover
    const magneticEls = document.querySelectorAll('.btn, .profile-image, .tag, .project-card, .glass-card');
    magneticEls.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('magnetic'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('magnetic'));
    });
}

// Enhanced mouse trail effect (trail behind cursor)
document.addEventListener('mousemove', (e) => {
    const trail = document.createElement('div');
    trail.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        width: 8px;
        height: 8px;
        background: radial-gradient(circle, var(--accent-gold), transparent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        opacity: 0.6;
        transform: translate(-50%, -50%) scale(0);
        animation: trailFade 0.6s ease-out forwards;
    `;
    document.body.appendChild(trail);
});

const style = document.createElement('style');
style.textContent = `
    @keyframes trailFade {
        to { opacity: 0; transform: translate(-50%, -50%) scale(1.5) translateY(-20px); }
    }
`;
document.head.appendChild(style);
});

// Performance optimizations
if ('IntersectionObserver' in window) {
    // Use native scroll observer for better performance
} else {
    // Fallback for older browsers
    window.addEventListener('scroll', revealOnScroll);
}

