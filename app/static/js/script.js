(function() {
    const burger = document.getElementById('burgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    // Открытие/закрытие бургер-меню
    if (burger && mobileMenu) {
        burger.addEventListener('click', function(e) {
            e.stopPropagation();
            mobileMenu.classList.toggle('open');
            const icon = burger.querySelector('i');
            if (mobileMenu.classList.contains('open')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                document.body.style.overflow = 'hidden';
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                document.body.style.overflow = '';
            }
        });
    }

    // Закрытие меню при клике на ссылку
    const mobileLinks = document.querySelectorAll('.mobile-menu a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mobileMenu) {
                mobileMenu.classList.remove('open');
                const icon = burger.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
                document.body.style.overflow = '';
            }
        });
    });

    // Закрытие при клике вне меню
    document.addEventListener('click', function(e) {
        if (mobileMenu && mobileMenu.classList.contains('open')) {
            if (!burger.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.remove('open');
                const icon = burger.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
                document.body.style.overflow = '';
            }
        }
    });

    // Закрытие при ресайзе
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && mobileMenu && mobileMenu.classList.contains('open')) {
            mobileMenu.classList.remove('open');
            const icon = burger.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
            document.body.style.overflow = '';
        }
    });

    // Плавный скролл для якорей
    const nav = document.querySelector('nav');
    if (nav) {
        const navHeight = nav.offsetHeight;
        const scrollPadding = navHeight + 16;
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === "#" || targetId === "" || targetId === "#home") {
                    if (targetId === "#home") {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                    return;
                }
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - scrollPadding;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                }
            });
        });
    }

    // Анимация появления секций
    const fadeElements = document.querySelectorAll('.fade-up');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
    fadeElements.forEach(el => observer.observe(el));
})();

// ========== СЛАЙДЕР ==========
(function initSlider() {
    const wrapper = document.getElementById('sliderWrapper');
    const prevBtn = document.getElementById('sliderPrev');
    const nextBtn = document.getElementById('sliderNext');
    if (!wrapper || !prevBtn || !nextBtn) return;

    let slides = Array.from(wrapper.children);
    let slidesCount = slides.length;
    let currentOffset = 0;
    let maxOffset = 0;
    let slideWidth = 160;
    let gap = 20;
    let autoTimer = null;
    const AUTO_INTERVAL = 5000;

    function recalc() {
        if (!wrapper.parentElement) return;
        slides = Array.from(wrapper.children);
        slidesCount = slides.length;
        if (slidesCount === 0) return;

        const firstSlide = slides[0];
        if (firstSlide) {
            slideWidth = firstSlide.offsetWidth;
            if (slideWidth <= 0) slideWidth = 160;
        }
        const wrapperStyle = window.getComputedStyle(wrapper);
        const gapValue = wrapperStyle.gap;
        gap = parseInt(gapValue) || 20;

        const container = wrapper.parentElement;
        const containerWidth = container ? container.offsetWidth : 0;
        const totalWidth = slidesCount * (slideWidth + gap) - gap;
        maxOffset = Math.max(0, totalWidth - containerWidth);

        if (currentOffset > maxOffset) currentOffset = maxOffset;
        if (currentOffset < 0) currentOffset = 0;
    }

    function updateSlider(animate = true) {
        if (!wrapper) return;
        wrapper.style.transition = animate ? 'transform 0.35s ease-out' : 'none';
        wrapper.style.transform = `translateX(-${currentOffset}px)`;
    }

    const step = () => (slideWidth + gap);

    function goNext() {
        if (slidesCount === 0) return;
        recalc();
        let newOffset = currentOffset + step();
        if (newOffset >= maxOffset - 0.5) newOffset = maxOffset;
        if (newOffset <= maxOffset) {
            currentOffset = newOffset;
            updateSlider(true);
            resetAutoTimer();
            if (currentOffset >= maxOffset) stopAutoTimer();
        }
    }

    function goPrev() {
        if (slidesCount === 0) return;
        recalc();
        let newOffset = currentOffset - step();
        if (newOffset <= 0.5) newOffset = 0;
        if (newOffset >= 0) {
            currentOffset = newOffset;
            updateSlider(true);
            resetAutoTimer();
            if (autoTimer === null && currentOffset < maxOffset) startAutoTimer();
        }
    }

    function autoStep() {
        if (slidesCount === 0) return;
        recalc();
        if (currentOffset < maxOffset - 0.5) {
            let newOffset = currentOffset + step();
            if (newOffset > maxOffset) newOffset = maxOffset;
            currentOffset = newOffset;
            updateSlider(true);
        }
        if (currentOffset >= maxOffset) stopAutoTimer();
    }

    function startAutoTimer() {
        if (autoTimer) clearInterval(autoTimer);
        if (currentOffset < maxOffset - 0.5) {
            autoTimer = setInterval(autoStep, AUTO_INTERVAL);
        }
    }

    function stopAutoTimer() {
        if (autoTimer) {
            clearInterval(autoTimer);
            autoTimer = null;
        }
    }

    function resetAutoTimer() {
        stopAutoTimer();
        startAutoTimer();
    }

    function handleResize() {
        recalc();
        updateSlider(false);
        if (currentOffset >= maxOffset) stopAutoTimer();
        else startAutoTimer();
    }

    function waitForImages() {
        const images = wrapper.querySelectorAll('img');
        let pending = images.length;
        if (pending === 0) {
            recalc();
            updateSlider(false);
            startAutoTimer();
            return;
        }
        const onLoadOrError = () => {
            pending--;
            if (pending === 0) {
                recalc();
                updateSlider(false);
                startAutoTimer();
            }
        };
        images.forEach(img => {
            if (img.complete) onLoadOrError();
            else {
                img.addEventListener('load', onLoadOrError);
                img.addEventListener('error', onLoadOrError);
            }
        });
    }

    prevBtn.addEventListener('click', goPrev);
    nextBtn.addEventListener('click', goNext);
    window.addEventListener('resize', handleResize);

    const sliderContainer = document.querySelector('.footer-slider');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', stopAutoTimer);
        sliderContainer.addEventListener('mouseleave', () => {
            if (currentOffset < maxOffset - 0.5) startAutoTimer();
            else stopAutoTimer();
        });
    }

    waitForImages();
})();