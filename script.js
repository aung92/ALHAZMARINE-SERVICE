document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Menu Toggle ---
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close menu when a link is clicked
    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = mobileBtn.querySelector('i');
            if(icon) {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    });

    // --- Navbar Scroll Effect ---
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Intersection Observer for Scroll Animations ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, observerOptions);

    // Initial Elements to Animate (Hero)
    document.querySelectorAll('.animate-up').forEach(el => {
        observer.observe(el);
    });

    // Dynamically add animation classes to section titles and cards
    const sectionElements = document.querySelectorAll(`
        .section-title, 
        .section-tag, 
        .section-desc, 
        .about-text p,
        .service-card,
        .feature-list li,
        .contact-card,
        .contact-form
    `);

    sectionElements.forEach((el, index) => {
        if(!el.classList.contains('animate-up')) {
            el.classList.add('animate-up');
            // Stagger animation for grid cards
            if(el.classList.contains('service-card') || el.classList.contains('feature-list li') || el.classList.contains('contact-card')) {
                const delay = (index % 4) + 1;
                el.classList.add(`delay-${delay}`);
            }
            observer.observe(el);
        }
    });

    // --- Form Submission Mock ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get button to show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            // Mock API Call delay
            setTimeout(() => {
                alert('Thank you for reaching out! We have received your message and will get back to you shortly.');
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1000);
        });
    }
});
