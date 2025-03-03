// Menu toggle functionality
document.querySelector('.menu-toggle').addEventListener('click', function() {
    document.querySelector('nav ul').classList.toggle('active');
});

// Gallery carousel functionality
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.gallery img');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const dotsContainer = document.querySelector('.gallery-dots');
    let currentIndex = 0;
    let intervalId;

    // Create dots for navigation
    images.forEach((_, idx) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (idx === 0) dot.classList.add('active');
        dot.addEventListener('click', () => showImage(idx));
        dotsContainer.appendChild(dot);
    });

    function showImage(index) {
        images.forEach(img => img.classList.remove('active'));
        document.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'));
        
        images[index].classList.add('active');
        document.querySelectorAll('.dot')[index].classList.add('active');
        currentIndex = index;
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
    }

    // Add event listeners for navigation
    prevBtn.addEventListener('click', () => {
        clearInterval(intervalId);
        prevImage();
        startAutoSlide();
    });

    nextBtn.addEventListener('click', () => {
        clearInterval(intervalId);
        nextImage();
        startAutoSlide();
    });

    // Touch events for mobile swipe
    let touchStartX = 0;
    const gallery = document.querySelector('.gallery');

    gallery.addEventListener('touchstart', e => {
        touchStartX = e.touches[0].clientX;
    });

    gallery.addEventListener('touchend', e => {
        const touchEndX = e.changedTouches[0].clientX;
        const difference = touchStartX - touchEndX;

        if (Math.abs(difference) > 50) { // Minimum swipe distance
            clearInterval(intervalId);
            if (difference > 0) {
                nextImage();
            } else {
                prevImage();
            }
            startAutoSlide();
        }
    });

    // Auto advance slides
    function startAutoSlide() {
        if (intervalId) clearInterval(intervalId);
        intervalId = setInterval(nextImage, 5000); // Change slide every 5 seconds
    }

    // Initialize auto-slide
    startAutoSlide();

    // Pause auto-slide when user hovers over gallery
    gallery.addEventListener('mouseenter', () => clearInterval(intervalId));
    gallery.addEventListener('mouseleave', startAutoSlide);
});