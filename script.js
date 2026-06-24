document.addEventListener('DOMContentLoaded', () => {
    // 1. Efecto Scroll en el Header
    function initScrollEffect() {
        const header = document.getElementById('main-header');
        if (header) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });
        }
    }

    // 2. Menú Hamburguesa para Móviles
    function initMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobile-menu');
        const navLinks = document.querySelector('.nav-links');
        
        if (mobileMenuBtn && navLinks) {
            mobileMenuBtn.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                
                const bars = document.querySelectorAll('.bar');
                if (bars && bars.length) {
                    bars.forEach(bar => bar.classList.toggle('change'));
                }
            });

            navLinks.addEventListener('click', (e) => {
                const target = e.target;
                if (target && target.tagName === 'A' && window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                }
            });
        }
    }

    // 3. Contact page navigation logic
    let isContactPageActive = false;
    let originalMainContent = '';
    let contactHandlersInitialized = false;

    function initContactNavigation() {
        if (contactHandlersInitialized) return;
        
        const contactLink = document.getElementById('contact-link');
        const inicioLink = document.getElementById('inicio-link');
        const ctaContactBtn = document.getElementById('cta-contact-btn');
        const mainContentComponent = document.getElementById('main-content-component');
        
        if (!contactLink || !mainContentComponent) {
            // Elements not ready yet, try again soon
            setTimeout(initContactNavigation, 100);
            return;
        }

        contactHandlersInitialized = true;

        function showContactPage() {
            if (isContactPageActive) return;
            
            if (!originalMainContent) {
                originalMainContent = mainContentComponent.innerHTML;
            }
            
            mainContentComponent.innerHTML = '<div style="text-align:center;padding:100px 20px;"><p>Cargando formulario de contacto...</p></div>';
            
            fetch('components/contact.html')
                .then(response => {
                    if (!response.ok) throw new Error('Network response was not ok');
                    return response.text();
                })
                .then(data => {
                    mainContentComponent.innerHTML = data;
                    isContactPageActive = true;
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                })
                .catch(error => {
                    console.error('Error loading contact page:', error);
                    mainContentComponent.innerHTML = '<div style="text-align:center;padding:100px 20px;"><p>Error al cargar el formulario de contacto. Por favor, inténtalo de nuevo.</p></div>';
                });
        }

        function showMainPage() {
            if (!isContactPageActive || !originalMainContent) return;
            
            mainContentComponent.innerHTML = originalMainContent;
            isContactPageActive = false;
            
            initProgramCards();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Handle Inicio link clicks
        inicioLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (isContactPageActive) {
                showMainPage();
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });

        // Handle contact link clicks
        contactLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (isContactPageActive) {
                showMainPage();
            } else {
                showContactPage();
            }
        });

        // Handle CTA contact button
        if (ctaContactBtn) {
            ctaContactBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (!isContactPageActive) {
                    showContactPage();
                }
            });
        }
    }

    // 4. Program cards expand/collapse functionality
    function initProgramCards() {
        window.toggleProgram = function(headerElement) {
            const card = headerElement.closest('.program-card');
            if (!card) return;
            
            const isActive = card.classList.contains('active');
            
            document.querySelectorAll('.program-card.active').forEach(activeCard => {
                if (activeCard !== card) {
                    activeCard.classList.remove('active');
                }
            });
            
            if (isActive) {
                card.classList.remove('active');
            } else {
                card.classList.add('active');
            }
        };

        window.toggleYear = function(headerElement) {
            const yearSection = headerElement.closest('.year-section');
            if (!yearSection) return;
            
            const isActive = yearSection.classList.contains('active');
            const studyPlan = yearSection.closest('.study-plan');
            
            if (studyPlan) {
                studyPlan.querySelectorAll('.year-section.active').forEach(activeSection => {
                    if (activeSection !== yearSection) {
                        activeSection.classList.remove('active');
                    }
                });
            }
            
            if (isActive) {
                yearSection.classList.remove('active');
            } else {
                yearSection.classList.add('active');
            }
        };
    }

    // Initialize everything
    initScrollEffect();
    initMobileMenu();
    initContactNavigation();
    initProgramCards();
    
    // Re-initialize when components are loaded (backup timing)
    setTimeout(() => {
        initContactNavigation();
        initProgramCards();
    }, 500);
});