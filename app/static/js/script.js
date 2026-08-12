(function() {
    const burger = document.getElementById('burgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');

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

    function recalc() {
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

        const containerWidth = sliderContainer ? sliderContainer.offsetWidth : 0;

        const totalWidth = slidesCount * (slideWidth + gap) - gap;

        if (totalWidth <= containerWidth) {
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
        if (!isSliderActive) return;
        recalc(); 
        let newOffset = currentOffset + step();
        if (newOffset >= maxOffset) newOffset = maxOffset;
        if (newOffset !== currentOffset) {
            currentOffset = newOffset;
            updateSlider(true);
        }
    }

    function goPrev() {
        if (!isSliderActive) return;
        recalc();
        let newOffset = currentOffset - step();
        if (newOffset <= 0) newOffset = 0;
        if (newOffset !== currentOffset) {
            currentOffset = newOffset;
            updateSlider(true);
        }
    }

    function handleResize() {
        recalc();
        if (isSliderActive) {
            updateSlider(false);
        }
    }

    function waitForImages() {
        const images = wrapper.querySelectorAll('img');
        let pending = images.length;
        if (pending === 0) {
            recalc();
            if (isSliderActive) {
                updateSlider(false);
            }
            return;
        }
        const onLoadOrError = () => {
            pending--;
            if (pending === 0) {
                recalc();
                if (isSliderActive) {
                    updateSlider(false);
                }
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
    waitForImages();
})();