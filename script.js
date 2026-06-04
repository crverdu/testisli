document.addEventListener('DOMContentLoaded', () => {
    // Referencias al DOM
    const header = document.getElementById('main-header');
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    // 1. Efecto Scroll en el Header (si existe)
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // 2. Menú Hamburguesa para Móviles (si existen los elementos)
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Animación opcional del icono de hamburguesa
            const bars = document.querySelectorAll('.bar');
            if (bars && bars.length) {
                bars.forEach(bar => bar.classList.toggle('change'));
            }
        });

        // 3. Cerrar el menú al hacer click en un enlace (Móviles)
        navLinks.addEventListener('click', (e) => {
            const target = e.target;
            if (target && target.tagName === 'A' && window.innerWidth <= 768) {
                navLinks.classList.remove('active');
            }
        });
    }

    // Contact modal logic
    const contactLink = document.getElementById('contact-link');
    const contactModal = document.getElementById('contact-modal');
    const contactClose = document.getElementById('contact-close');
    const contactCancel = document.getElementById('contact-cancel');
    const contactForm = document.getElementById('contact-form');

    function openContact() {
        if (!contactModal) return;
        contactModal.classList.add('active');
        contactModal.setAttribute('aria-hidden', 'false');
        // focus first field
        const email = document.getElementById('contact-email');
        if (email) email.focus();
    }

    function closeContact() {
        if (!contactModal) return;
        contactModal.classList.remove('active');
        contactModal.setAttribute('aria-hidden', 'true');
        if (contactForm) contactForm.reset();
    }

    if (contactLink) {
        contactLink.addEventListener('click', (e) => {
            e.preventDefault();
            openContact();
        });
    }

    if (contactClose) contactClose.addEventListener('click', closeContact);
    if (contactCancel) contactCancel.addEventListener('click', closeContact);

    // close modal when clicking outside card
    if (contactModal) {
        contactModal.addEventListener('click', (e) => {
            if (e.target === contactModal) closeContact();
        });
    }

    // simple client-side submit handler
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const data = {
                email: document.getElementById('contact-email')?.value || '',
                subject: document.getElementById('contact-subject')?.value || '',
                message: document.getElementById('contact-message')?.value || '',
            };
            // Basic validation
            if (!data.email || !data.subject || !data.message) {
                alert('Por favor completa todos los campos.');
                return;
            }
            // Simulate send
            alert('Mensaje enviado (simulado).\nGracias por contactarnos.');
            closeContact();
        });
    }

    // Program cards expand/collapse functionality
    window.toggleProgram = function(headerElement) {
        const card = headerElement.closest('.program-card');
        const isActive = card.classList.contains('active');
        
        // Close all other cards
        document.querySelectorAll('.program-card.active').forEach(activeCard => {
            if (activeCard !== card) {
                activeCard.classList.remove('active');
            }
        });
        
        // Toggle current card
        if (isActive) {
            card.classList.remove('active');
        } else {
            card.classList.add('active');
        }
    };
});
