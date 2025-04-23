// Проверка загрузки Tailwind CSS
window.addEventListener('load', () => {
    if (typeof tailwind === 'undefined') {
        console.error('Tailwind CSS не загрузился. Используются резервные стили.');
        document.body.classList.add('no-tailwind');
    }
});

// Calculator Logic
try {
    const formworkHeight = document.getElementById('formworkHeight');
    const quantity = document.getElementById('quantity');
    const days = document.getElementById('days');
    const totalCost = document.getElementById('totalCost');

    function calculateCost() {
        const pricePerUnit = 25; // сом/день/штука
        const cost = pricePerUnit * (quantity.value || 1) * (days.value || 1);
        totalCost.textContent = cost.toFixed(2);
    }

    formworkHeight.addEventListener('change', calculateCost);
    quantity.addEventListener('input', calculateCost);
    days.addEventListener('input', calculateCost);
    calculateCost();
} catch (e) {
    console.error('Ошибка в калькуляторе:', e);
}

// Scroll Animations for Sections
try {
    document.addEventListener('DOMContentLoaded', () => {
        const elements = document.querySelectorAll('.fade-in');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.1 }
        );
        elements.forEach((el) => observer.observe(el));
    });
} catch (e) {
    console.error('Ошибка в анимации прокрутки:', e);
}

// Carousel Logic
try {
    const carouselInner = document.querySelector('.carousel-inner');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    let currentIndex = 0;
    const totalItems = carouselItems.length;

    function updateCarousel() {
        carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    });

    // Auto-slide every 5 seconds
    setInterval(() => {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    }, 5000);
} catch (e) {
    console.error('Ошибка в карусели:', e);
}

// Floating Contact Menu Toggle
try {
    const toggleBtn = document.querySelector('.floating-contact-toggle');
    const contactMenu = document.querySelector('.floating-contact-menu');
    const openContactButtons = document.querySelectorAll('.open-contact-menu');

    toggleBtn.addEventListener('click', () => {
        contactMenu.classList.toggle('active');
        toggleBtn.classList.toggle('active');
    });

    toggleBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            contactMenu.classList.toggle('active');
            toggleBtn.classList.toggle('active');
        }
    });

    openContactButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            contactMenu.classList.toggle('active');
            toggleBtn.classList.toggle('active');
        });
    });
} catch (e) {
    console.error('Ошибка в меню контактов:', e);
}