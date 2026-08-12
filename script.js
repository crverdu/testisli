// Script principal - Funcionalidades e interacciones del ISLI

// Funciones globales para acordeones (Oferta Académica / Inscripciones)
window.toggleProgram = function(headerElement) {
    const card = headerElement.closest('.program-card');
    if (!card) return;
    
    const details = card.querySelector('.program-details');
    const arrow = headerElement.querySelector('.toggle-arrow');
    const isActive = card.classList.contains('active');
    
    // Cerrar todos los programas
    document.querySelectorAll('.program-card').forEach(c => {
        c.classList.remove('active');
        const d = c.querySelector('.program-details');
        const a = c.querySelector('.toggle-arrow');
        if (d) {
            d.classList.remove('active');
            d.style.maxHeight = null;
        }
        if (a) a.classList.remove('rotated');
    });
    
    // Abrir el seleccionado si no estaba activo
    if (!isActive && details) {
        card.classList.add('active');
        details.classList.add('active');
        // Permitir suficiente espacio para que los acordeones internos de años también se expandan sin cortarse
        details.style.maxHeight = (details.scrollHeight + 2000) + 'px';
        if (arrow) arrow.classList.add('rotated');
    }
};

window.toggleYear = function(headerElement) {
    const yearSection = headerElement.closest('.year-section');
    if (!yearSection) return;
    
    const content = yearSection.querySelector('.year-content');
    const toggle = headerElement.querySelector('.year-toggle');
    const isActive = yearSection.classList.contains('active');
    
    // Cerrar otros year-sections en el mismo plan
    const studyPlan = yearSection.closest('.space-y-3');
    if (studyPlan) {
        studyPlan.querySelectorAll('.year-section.active').forEach(section => {
            if (section !== yearSection) {
                section.classList.remove('active');
                const c = section.querySelector('.year-content');
                if (c) c.style.maxHeight = null;
                const t = section.querySelector('.year-toggle');
                if (t) t.textContent = '+';
            }
        });
    }
    
    if (isActive) {
        yearSection.classList.remove('active');
        if (content) content.style.maxHeight = null;
        if (toggle) toggle.textContent = '+';
    } else {
        yearSection.classList.add('active');
        if (content) {
            content.style.maxHeight = content.scrollHeight + 'px';
        }
        if (toggle) toggle.textContent = '−';
        
        // Ajustar también el contenedor padre de la carrera si existe
        const parentDetails = yearSection.closest('.program-details');
        if (parentDetails) {
            parentDetails.style.maxHeight = (parentDetails.scrollHeight + 2000) + 'px';
        }
    }
};

// Función principal de inicialización tras cargar los componentes
window.initAppInteractions = function() {
    // 1. Menú Móvil Hamburguesa
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNav = document.getElementById('mobile-nav');
    if (mobileMenu && mobileNav) {
        const bars = mobileMenu.querySelectorAll('.mobile-bar');
        mobileMenu.addEventListener('click', function() {
            const isHidden = mobileNav.classList.contains('hidden');
            if (isHidden) {
                mobileNav.classList.remove('hidden');
                if (bars.length >= 3) {
                    bars[0].style.transform = 'rotate(45deg) translate(4px, 4px)';
                    bars[1].style.opacity = '0';
                    bars[2].style.transform = 'rotate(-45deg) translate(4px, -4px)';
                }
            } else {
                mobileNav.classList.add('hidden');
                if (bars.length >= 3) {
                    bars[0].style.transform = 'none';
                    bars[1].style.opacity = '1';
                    bars[2].style.transform = 'none';
                }
            }
        });
        
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                mobileNav.classList.add('hidden');
                if (bars.length >= 3) {
                    bars[0].style.transform = 'none';
                    bars[1].style.opacity = '1';
                    bars[2].style.transform = 'none';
                }
            });
        });
    }

    // 2. Formulario de Contacto (Sección principal)
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const btn = this.querySelector('button[type="submit"]');
            const btnText = btn?.querySelector(".btn-text");
            const btnLoading = btn?.querySelector(".btn-loading");

            if (btnText && btnLoading) {
                btnText.classList.add("hidden");
                btnLoading.classList.remove("hidden");
                btn.disabled = true;
            }

            const nombre = document.getElementById("nombre")?.value || '';

            setTimeout(function () {
                alert("Mensaje enviado exitosamente.\nGracias por contactarnos, " + nombre + ". Te responderemos a la brevedad.");
                contactForm.reset();
                if (btnText && btnLoading) {
                    btnText.classList.remove("hidden");
                    btnLoading.classList.add("hidden");
                    btn.disabled = false;
                }
            }, 1000);
        });
    }

    // 3. Formulario Modal de Contacto
    const contactModal = document.getElementById('contact-modal');
    const modalClose = document.getElementById('modal-close');
    const modalCancel = document.getElementById('modal-cancel');
    const modalForm = document.getElementById('modal-contact-form');

    function closeModal() {
        if (!contactModal) return;
        contactModal.classList.remove('modal-enter-active');
        contactModal.classList.add('modal-enter');
    }

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalCancel) modalCancel.addEventListener('click', closeModal);
    if (contactModal) {
        contactModal.addEventListener('click', (e) => {
            if (e.target === contactModal) closeModal();
        });
    }

    if (modalForm) {
        modalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Mensaje enviado exitosamente. Te responderemos a la brevedad.');
            modalForm.reset();
            closeModal();
        });
    }

    // 4. Smooth Scroll para enlaces #
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 5. Scroll highlight para menú de navegación
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
    highlightNavOnScroll();
};