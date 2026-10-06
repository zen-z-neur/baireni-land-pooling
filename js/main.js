// ============================================
// बैरेनी जग्गा एकीकरण आयोजना - Main JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function () {

    // ---- Mobile Nav Toggle ----
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            navMenu.classList.toggle('open');
            const icon = navToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });

        // Close nav when clicking a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                const icon = navToggle.querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            });
        });
    }

    // ---- Active Nav Link ----
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-menu li').forEach(li => {
        const link = li.querySelector('a');
        if (link) {
            const href = link.getAttribute('href');
            if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                li.classList.add('active');
            } else {
                li.classList.remove('active');
            }
        }
    });

    // ---- Nepali Number Formatter Helper ----
    const nepaliDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
    const toNepaliNum = (num) => {
        return num.toString().replace(/\d/g, d => nepaliDigits[d]);
    };

    // ---- Counter Animation ----
    const statNumbers = document.querySelectorAll('.stat-number');

    const animateCounter = (el, target) => {
        let current = 0;
        const duration = 2000;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            el.textContent = toNepaliNum(Math.floor(current));
        }, 16);
    };

    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };

    if ('IntersectionObserver' in window) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.animated) {
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    animateCounter(entry.target, target);
                    entry.target.dataset.animated = 'true';
                }
            });
        }, observerOptions);

        statNumbers.forEach(el => counterObserver.observe(el));

        // ---- Progress Bar Animation ----
        const progressFills = document.querySelectorAll('.progress-fill');
        const progressObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const fill = entry.target;
                    const width = fill.style.width;
                    fill.style.width = '0';
                    setTimeout(() => { fill.style.width = width; }, 100);
                    progressObserver.unobserve(fill);
                }
            });
        }, { threshold: 0.3 });

        progressFills.forEach(fill => progressObserver.observe(fill));
    }

    // ---- Sticky Header Shadow ----
    const mainNav = document.querySelector('.main-nav');
    if (mainNav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                mainNav.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
            } else {
                mainNav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.08)';
            }
        });
    }

    // ---- Scroll Animations ----
    const animatedEls = document.querySelectorAll(
        '.stat-card, .news-card, .benefit-card, .doc-card, .progress-item'
    );

    if ('IntersectionObserver' in window && animatedEls.length > 0) {
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    fadeObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

        animatedEls.forEach((el, i) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(25px)';
            el.style.transition = `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`;
            fadeObserver.observe(el);
        });
    }

    // ---- Contact Form Validation ----
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = document.getElementById('name')?.value.trim();
            const email = document.getElementById('email')?.value.trim();
            const message = document.getElementById('message')?.value.trim();

            if (!name || !email || !message) {
                showAlert('कृपया सबै आवश्यक क्षेत्रहरू भर्नुहोस्।', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showAlert('कृपया मान्य इमेल ठेगाना प्रविष्ट गर्नुहोस्।', 'error');
                return;
            }

            showAlert('तपाईंको सन्देश सफलतापूर्वक पठाइयो! हामी चाँडै सम्पर्क गर्नेछौं।', 'success');
            contactForm.reset();
        });
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showAlert(msg, type) {
        const existing = document.querySelector('.form-alert');
        if (existing) existing.remove();

        const alert = document.createElement('div');
        alert.className = `alert alert-${type === 'success' ? 'success' : 'warning'} form-alert`;
        alert.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-triangle'}"></i> ${msg}`;
        contactForm.insertBefore(alert, contactForm.firstChild);

        setTimeout(() => alert.remove(), 6000);
    }

    // ---- Gallery Lightbox ----
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            // Simple lightbox placeholder
            console.log('Gallery item clicked');
        });
    });

    // ---- Smooth scroll for anchor links ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ---- Back to Top Button ----
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTop.setAttribute('aria-label', 'माथि जानुहोस्');
    document.body.appendChild(backToTop);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Add back-to-top styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .back-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 48px;
            height: 48px;
            background: var(--primary);
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 18px;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            transition: all 0.3s ease;
            opacity: 0;
            visibility: hidden;
            z-index: 999;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .back-to-top.visible {
            opacity: 1;
            visibility: visible;
        }
        .back-to-top:hover {
            background: var(--secondary);
            color: var(--primary-dark);
            transform: translateY(-3px);
        }
    `;
    document.head.appendChild(style);
});
