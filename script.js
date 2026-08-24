// Section Navigation
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Show selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.add('active');
        // Scroll to top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Update active nav link
    updateActiveNavLink(sectionId);
}

// Update active nav link styling
function updateActiveNavLink(sectionId) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    // Map sections to nav positions
    const navMap = {
        'home': 0,
        'about': 1,
        'work': 3,
        'contact': 4
    };

    const navPosition = navMap[sectionId];
    if (navPosition !== undefined) {
        const allLinks = document.querySelectorAll('.nav-link');
        if (allLinks[navPosition]) {
            allLinks[navPosition].classList.add('active');
        }
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Set home as active by default
    updateActiveNavLink('home');

    // Add smooth animations to elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.animation = 'fadeIn 0.5s ease-in forwards';
            }
        });
    }, observerOptions);

    // Observe all skill cards and work cards
    document.querySelectorAll('.skill-card, .work-card, .contact-item').forEach(element => {
        element.style.opacity = '0';
        observer.observe(element);
    });

    // Add ripple effect to buttons on click
    document.querySelectorAll('.contact-link, .skill-card, .work-card').forEach(element => {
        element.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Parallax effect for decorative elements on mouse move
    document.addEventListener('mousemove', function(e) {
        const decoElements = document.querySelectorAll('.deco-element');
        decoElements.forEach(element => {
            const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
            const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
            element.style.transform = `translateY(-50%) translate(${moveX}px, ${moveY}px)`;
        });
    });

    // Add keyboard navigation (arrow keys)
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight') {
            const currentSection = document.querySelector('.section.active');
            const sections = Array.from(document.querySelectorAll('.section'));
            const currentIndex = sections.indexOf(currentSection);
            if (currentIndex < sections.length - 1) {
                showSection(sections[currentIndex + 1].id);
            }
        } else if (e.key === 'ArrowLeft') {
            const currentSection = document.querySelector('.section.active');
            const sections = Array.from(document.querySelectorAll('.section'));
            const currentIndex = sections.indexOf(currentSection);
            if (currentIndex > 0) {
                showSection(sections[currentIndex - 1].id);
            }
        }
    });

    // Log message to console
    console.log('🎨 Welcome to Phuong\'s Portfolio!');
    console.log('💡 Tip: Use arrow keys to navigate sections!');
});

// Add ripple animation style
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: rippleAnimation 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes rippleAnimation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
