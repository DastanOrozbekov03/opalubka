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
  const carousel = document.querySelector('.carousel');
  let currentIndex = 0;
  const totalItems = carouselItems.length;
  let autoSlideInterval;

  function updateCarousel() {
    carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % totalItems;
      updateCarousel();
    }, 5000);
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  // Проверяем загрузку всех изображений
  const images = document.querySelectorAll('.carousel-item img');
  let loadedImages = 0;

  if (images.length > 0) {
    images.forEach((img) => {
      if (img.complete) {
        loadedImages++;
      } else {
        img.addEventListener('load', () => {
          loadedImages++;
          if (loadedImages === images.length) {
            startAutoSlide();
          }
        });
      }
    });
    if (loadedImages === images.length) {
      startAutoSlide();
    }
  } else {
    startAutoSlide();
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    updateCarousel();
    stopAutoSlide(); // Останавливаем автопрокрутку
    setTimeout(startAutoSlide, 10000); // Возобновляем через 10 секунд
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalItems;
    updateCarousel();
    stopAutoSlide();
    setTimeout(startAutoSlide, 10000);
  });

  // Пауза при наведении
  carousel.addEventListener('mouseenter', stopAutoSlide);
  carousel.addEventListener('mouseleave', startAutoSlide);

  updateCarousel();
} catch (e) {
  console.error('Ошибка в карусели:', e);
}

// Floating Contact Menu Toggle
try {
  const toggleBtn = document.querySelector('.floating-contact-toggle');
  const contactMenu = document.querySelector('.floating-contact-menu');

  const toggleMenu = () => {
    contactMenu.classList.toggle('active');
    toggleBtn.classList.toggle('active');
  };

  toggleBtn.addEventListener('click', toggleMenu);

  toggleBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleMenu();
    }
  });
} catch (e) {
  console.error('Ошибка в меню контактов:', e);
}

// try {
//   const toggleBtn = document.querySelector('.floating-contact-toggle');
//   const contactMenu = document.querySelector('.floating-contact-menu');
//   const openContactButtons = document.querySelectorAll('.open-contact-menu');
//
//   toggleBtn.addEventListener('click', () => {
//     contactMenu.classList.toggle('active');
//     toggleBtn.classList.toggle('active');
//   });
//
//   toggleBtn.addEventListener('keydown', (e) => {
//     if (e.key === 'Enter') {
//       contactMenu.classList.toggle('active');
//       toggleBtn.classList.toggle('active');
//     }
//   });
//
//   openContactButtons.forEach(button => {
//     button.addEventListener('click', (e) => {
//       e.preventDefault();
//       contactMenu.classList.toggle('active');
//       toggleBtn.classList.toggle('active');
//     });
//   });
// } catch (e) {
//   console.error('Ошибка в меню контактов:', e);
// }
