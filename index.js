document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('glass-morphism', 'shadow-lg', 'py-2');
            navbar.classList.remove('py-4');
        } else {
            navbar.classList.remove('glass-morphism', 'shadow-lg', 'py-2');
            navbar.classList.add('py-4');
        }
    });

    // Mobile Menu Logic
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('flex');
            // GSAP would be nice here, but vanilla for now
        });
    }

    // Scroll Reveal Interaction
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));

    // WhatsApp Intelligent Redirect
    const whatsappButtons = document.querySelectorAll('[data-whatsapp]');
    const phoneNumber = '5511973747197';

    whatsappButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const service = btn.getAttribute('data-service') || 'Consultoria Ambiental';
            const message = encodeURIComponent(`Olá! Gostaria de saber mais sobre ${service}. Vi seu site e tenho interesse em um diagnóstico.`);
            window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
        });
    });

    // Counter Animation for Stats
    const stats = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateValue(entry.target, 0, target, 2000);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(s => statsObserver.observe(s));

    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
});
