// Script principal - Funcionalidades compartidas
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Active link highlighting en navegación
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('#navbar a, #mobile-nav a');

    function highlightNavOnScroll() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('text-teal-acento');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('text-teal-acento');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavOnScroll);
    highlightNavOnScroll(); // Ejecutar una vez al cargar
});