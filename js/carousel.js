// ============================================
// CONFIGURACIÓN DEL CARRUSEL
// ============================================
// Para agregar o quitar imágenes, simplemente edita este array
// Agrega el nombre de la imagen tal como está en la carpeta images/carrusel/
const carouselImages = [
    '1.avif',
    '2.avif',
    '3.avif',
    '4.avif'
];

// Tiempo de transición automática en milisegundos (5000 = 5 segundos)
const autoPlayInterval = 5000;

// ============================================
// NO ES NECESARIO MODIFICAR EL CÓDIGO DEBAJO
// ============================================

let currentIndex = 0;
let autoPlayTimer;

// Construir el path completo para cada imagen
const imagePaths = carouselImages.map(img => `images/carrusel/${img}`);

// Inicializar el carrusel cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    const carouselContainer = document.querySelector('.carousel-images');
    const dotsContainer = document.querySelector('.carousel-dots');

    // Crear elementos de imagen
    imagePaths.forEach((src, index) => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = `Imagen ${index + 1}`;
        img.addEventListener('click', () => openModal(src));
        carouselContainer.appendChild(img);
    });

    // Crear puntos indicadores
    imagePaths.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('carousel-dot');
        dot.setAttribute('aria-label', `Ir a imagen ${index + 1}`);
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    // Botones de navegación
    document.querySelector('.carousel-btn.prev').addEventListener('click', prevSlide);
    document.querySelector('.carousel-btn.next').addEventListener('click', nextSlide);

    // Iniciar reproducción automática
    startAutoPlay();

    // Pausar al pasar el mouse sobre el carrusel
    const carousel = document.querySelector('.carousel');
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);

    // Configurar modal
    setupModal();
});

function updateCarousel() {
    const carouselContainer = document.querySelector('.carousel-images');
    const dots = document.querySelectorAll('.carousel-dot');

    // Mover el carrusel
    carouselContainer.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Actualizar puntos indicadores
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % imagePaths.length;
    updateCarousel();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + imagePaths.length) % imagePaths.length;
    updateCarousel();
}

function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
}

function startAutoPlay() {
    stopAutoPlay(); // Limpiar cualquier timer existente
    autoPlayTimer = setInterval(nextSlide, autoPlayInterval);
}

function stopAutoPlay() {
    if (autoPlayTimer) {
        clearInterval(autoPlayTimer);
    }
}

// ============================================
// FUNCIONALIDAD DEL MODAL (MAXIMIZAR IMAGEN)
// ============================================

function setupModal() {
    const modal = document.getElementById('imageModal');
    const closeBtn = document.querySelector('.modal-close');

    // Cerrar modal con el botón X
    closeBtn.addEventListener('click', closeModal);

    // Cerrar modal al hacer click fuera de la imagen
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Cerrar modal con la tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
}

function openModal(imageSrc) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');

    modal.classList.add('show');
    modalImg.src = imageSrc;

    // Prevenir scroll del body cuando el modal está abierto
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.classList.remove('show');

    // Restaurar scroll del body
    document.body.style.overflow = 'auto';
}
