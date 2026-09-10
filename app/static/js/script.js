(function() {
    const burger = document.getElementById('burgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    function updateMobileMenuTop() {
        if (!mobileMenu) return;
        // Условия: только на мобильных (ширина <= 1316) И когда BVI активна (класс bvi-active на body)
        const isBviActive = document.body.classList.contains('bvi-active');
        const isMobile = window.innerWidth <= 1316;

        if (!isMobile || !isBviActive) {
            // Сбрасываем top для всех остальных случаев (десктоп или обычная мобильная версия)
            mobileMenu.style.top = '';
            return;
        }

        // Теперь мы на мобильной версии с включённой BVI
        const bviPanel = document.getElementById('bvi-panel');
        const nav = document.querySelector('nav');
        let topOffset = 0;

        if (bviPanel) {
            const rect = bviPanel.getBoundingClientRect();
            if (rect.height > 0 && rect.top < window.innerHeight) {
                topOffset = Math.max(0, rect.bottom);
            }
        }

        if (nav) {
            const navRect = nav.getBoundingClientRect();
            if (navRect.height > 0) {
                topOffset = Math.max(topOffset, navRect.bottom);
            }
        }

        // Уменьшаем отступ на 70px, но не ниже 0
        topOffset = Math.max(0, topOffset - 70);

        mobileMenu.style.top = topOffset + 'px';
    }

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
                // При открытии обновляем отступ
                updateMobileMenuTop();
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                document.body.style.overflow = '';
                mobileMenu.style.top = '';
            }
        });
    }

    // Закрытие меню при клике на ссылку
    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', function() {
            if (mobileMenu) {
                mobileMenu.classList.remove('open');
                const icon = burger.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
                document.body.style.overflow = '';
                mobileMenu.style.top = '';
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
                mobileMenu.style.top = '';
            }
        }
    });

    // Закрытие при ресайзе
    window.addEventListener('resize', function() {
        if (window.innerWidth > 1316 && mobileMenu && mobileMenu.classList.contains('open')) {
            mobileMenu.classList.remove('open');
            const icon = burger.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
            document.body.style.overflow = '';
            mobileMenu.style.top = '';
        } else if (mobileMenu && mobileMenu.classList.contains('open')) {
            // Если меню открыто, обновляем отступ (например, при ресайзе)
            updateMobileMenuTop();
        }
    });

    // Обновление при скролле (только если меню открыто, мобильная версия и BVI активна)
    window.addEventListener('scroll', function() {
        if (mobileMenu && mobileMenu.classList.contains('open')) {
            const isBviActive = document.body.classList.contains('bvi-active');
            if (window.innerWidth <= 1316 && isBviActive) {
                updateMobileMenuTop();
            }
        }
    });

    // Следим за изменением класса bvi-active на body (включение/выключение BVI)
    const observer = new MutationObserver(function() {
        // Если меню открыто, обновляем отступ при изменении состояния BVI
        if (mobileMenu && mobileMenu.classList.contains('open')) {
            updateMobileMenuTop();
        }
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    // Плавный скролл для якорей
    const nav = document.querySelector('nav');
    if (nav) {
        const navHeight = nav.offsetHeight;
        const scrollPadding = navHeight + 16;
        document.querySelectorAll('a[href^="#"]:not(.bvi-open)').forEach(anchor => {
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
    const observerFade = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observerFade.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
    fadeElements.forEach(el => observerFade.observe(el));
})();
(function initSlider() {
    const wrapper = document.getElementById('sliderWrapper');
    const prevBtn = document.getElementById('sliderPrev');
    const nextBtn = document.getElementById('sliderNext');
    const sliderContainer = document.querySelector('.footer-slider');

    if (!wrapper || !prevBtn || !nextBtn || !sliderContainer) return;

    let slides = Array.from(wrapper.children);
    let slidesCount = slides.length;
    if (slidesCount === 0) return;

    let currentOffset = 0;
    let maxOffset = 0;
    let slideWidth = 160;
    let gap = 20;
    let isSliderActive = false;
    let resizeTimer = null;

    function recalc() {
        slides = Array.from(wrapper.children);
        slidesCount = slides.length;
        if (slidesCount === 0) return;

        const firstSlide = slides[0];
        if (firstSlide) {
            const rect = firstSlide.getBoundingClientRect();
            slideWidth = rect.width || firstSlide.offsetWidth || 160;
            if (slideWidth <= 0) slideWidth = 160;
        }

        const wrapperStyle = window.getComputedStyle(wrapper);
        const gapValue = wrapperStyle.gap;
        gap = parseInt(gapValue) || 20;

        const containerWidth = sliderContainer.clientWidth || sliderContainer.offsetWidth || 0;
        const totalWidth = slidesCount * (slideWidth + gap) - gap;
        const isWrapped = wrapper.scrollHeight > wrapper.clientHeight && wrapper.style.flexWrap !== 'nowrap';
        const shouldActivate = (totalWidth > containerWidth) || isWrapped;

        if (!shouldActivate) {
            isSliderActive = false;
            sliderContainer.classList.remove('slider-active');
            wrapper.style.transform = 'none';
            wrapper.style.flexWrap = 'wrap';
            wrapper.style.justifyContent = 'center';
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
            currentOffset = 0;
            return;
        }

        isSliderActive = true;
        sliderContainer.classList.add('slider-active');
        wrapper.style.flexWrap = 'nowrap';
        wrapper.style.justifyContent = 'flex-start';
        prevBtn.style.display = 'flex';
        nextBtn.style.display = 'flex';

        maxOffset = Math.max(0, totalWidth - containerWidth);
        if (currentOffset > maxOffset) currentOffset = maxOffset;
        if (currentOffset < 0) currentOffset = 0;

        wrapper.style.transform = `translateX(-${currentOffset}px)`;
    }

    function updateSlider(animate = true) {
        wrapper.style.transition = animate ? 'transform 0.35s ease-out' : 'none';
        wrapper.style.transform = `translateX(-${currentOffset}px)`;
    }

    function step() {
        return slideWidth + gap;
    }

    function goNext() {
        if (!isSliderActive) {
            recalc();
            if (!isSliderActive) return;
        }
        let newOffset = currentOffset + step();
        if (newOffset >= maxOffset) newOffset = maxOffset;
        if (newOffset !== currentOffset) {
            currentOffset = newOffset;
            updateSlider(true);
        }
    }

    function goPrev() {
        if (!isSliderActive) {
            recalc();
            if (!isSliderActive) return;
        }
        let newOffset = currentOffset - step();
        if (newOffset <= 0) newOffset = 0;
        if (newOffset !== currentOffset) {
            currentOffset = newOffset;
            updateSlider(true);
        }
    }

    function handleResize() {
        if (resizeTimer) clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            recalc();
            if (isSliderActive) {
                updateSlider(false);
            }
            resizeTimer = null;
        }, 100);
    }

    prevBtn.addEventListener('click', function(e) {
        e.preventDefault();
        goPrev();
    });
    nextBtn.addEventListener('click', function(e) {
        e.preventDefault();
        goNext();
    });

    prevBtn.style.pointerEvents = 'auto';
    nextBtn.style.pointerEvents = 'auto';

    window.addEventListener('resize', handleResize);

    function waitForImages() {
        const images = wrapper.querySelectorAll('img');
        let pending = images.length;
        if (pending === 0) {
            recalc();
            if (isSliderActive) updateSlider(false);
            return;
        }
        const onLoadOrError = () => {
            pending--;
            if (pending === 0) {
                recalc();
                if (isSliderActive) updateSlider(false);
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

    waitForImages();
})();

