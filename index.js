// Menu toggle functionality
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('nav ul');
menuToggle?.addEventListener('click', () => navMenu.classList.toggle('active'));

// Gallery carousel functionality
document.addEventListener('DOMContentLoaded', () => {
    const images = [...document.querySelectorAll('.gallery img')];
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const dotsContainer = document.querySelector('.gallery-dots');
    let currentIndex = 0;
    let intervalId;

    const createDots = () => {
        images.forEach((_, idx) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (idx === 0) dot.classList.add('active');
            dot.addEventListener('click', () => showImage(idx));
            dotsContainer?.appendChild(dot);
        });
    };

    const showImage = (index) => {
        images.forEach(img => img.classList.remove('active'));
        const dots = document.querySelectorAll('.dot');
        dots.forEach(dot => dot.classList.remove('active'));
        
        images[index]?.classList.add('active');
        dots[index]?.classList.add('active');
        currentIndex = index;
    };

    const nextImage = () => showImage((currentIndex + 1) % images.length);
    const prevImage = () => showImage((currentIndex - 1 + images.length) % images.length);

    const startAutoSlide = () => {
        if (intervalId) clearInterval(intervalId);
        intervalId = setInterval(nextImage, 5000);
    };

    const handleSlideNavigation = (direction) => {
        clearInterval(intervalId);
        direction === 'next' ? nextImage() : prevImage();
        startAutoSlide();
    };

    // Initialize gallery
    if (images.length) {
        createDots();
        
        // Event listeners
        prevBtn?.addEventListener('click', () => handleSlideNavigation('prev'));
        nextBtn?.addEventListener('click', () => handleSlideNavigation('next'));

        const gallery = document.querySelector('.gallery');
        let touchStartX = 0;

        gallery?.addEventListener('touchstart', e => {
            touchStartX = e.touches[0].clientX;
        });

        gallery?.addEventListener('touchend', e => {
            const touchEndX = e.changedTouches[0].clientX;
            const difference = touchStartX - touchEndX;

            if (Math.abs(difference) > 50) {
                handleSlideNavigation(difference > 0 ? 'next' : 'prev');
            }
        });

        gallery?.addEventListener('mouseenter', () => clearInterval(intervalId));
        gallery?.addEventListener('mouseleave', startAutoSlide);

        startAutoSlide();
    }
});

// Contact form handling
const contactForm = document.getElementById('contactForm');

// Add video autoplay functionality
document.addEventListener('DOMContentLoaded', () => {
    const videos = document.querySelectorAll('video');
    
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.play();
            } else {
                entry.target.pause();
            }
        });
    }, { threshold: 0.5 });

    videos.forEach(video => {
        video.muted = true; // Necesario para autoplay en la mayoría de navegadores
        videoObserver.observe(video);
    });
});
contactForm?.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    try {
        const formData = new FormData(this);
        const fecha = formData.get('fecha');
        
        // Actualizar el mensaje de autorespuesta con la fecha
        const autoresponseInput = this.querySelector('[name="_autoresponse"]');
        if (autoresponseInput) {
            const mensaje = autoresponseInput.value.replace('{fecha}', new Date(fecha).toLocaleDateString());
            autoresponseInput.value = mensaje;
        }

        const response = await fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            alert('¡Gracias! Tu reserva ha sido registrada. Recibirás un correo de confirmación en breve.');
            this.reset();
        } else {
            throw new Error('Error al enviar la reserva');
        }
    } catch (error) {
        alert('Lo sentimos, hubo un error al procesar tu reserva. Por favor, intenta nuevamente.');
    }
});

// Smooth scroll for reservation buttons
document.querySelectorAll('a[href="#contacto"]').forEach(anchor => {
    anchor?.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href'))?.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Recargar el widget de Instagram cuando sea necesario
window.instgrm?.Embeds.process();