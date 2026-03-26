// Активная подсветка пункта меню
document.addEventListener('DOMContentLoaded', function() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === '/' && href === 'index.html')) {
            link.classList.add('active');
        } else if (currentPath.includes(href) && href !== 'index.html') {
            link.classList.add('active');
        }
    });

    // Плавный скролл для якорей (если есть)
    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Кнопка "Связаться" – скролл к контактам (если есть на странице)
    const contactBtn = document.getElementById('scrollContactBtn');
    if (contactBtn) {
        contactBtn.addEventListener('click', function() {
            const contactSection = document.getElementById('contacts-official');
            if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    const heroContactBtn = document.getElementById('heroContactBtn');
    if (heroContactBtn) {
        heroContactBtn.addEventListener('click', function() {
            const contactSection = document.getElementById('contacts-official');
            if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    const moreInfoBtn = document.getElementById('moreInfoBtn');
    if (moreInfoBtn) {
        moreInfoBtn.addEventListener('click', function() {
            const featuresSection = document.querySelector('.features-grid');
            if (featuresSection) featuresSection.scrollIntoView({ behavior: 'smooth' });
        });
    }
});