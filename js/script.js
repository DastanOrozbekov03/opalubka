try {
  const iconGrid = document.querySelector('.icon-grid');
  const iconLinks = document.querySelectorAll('.icon-grid img');

  // Функция для генерации псевдослучайных координат
  function positionIcons() {
    const gridWidth = iconGrid.offsetWidth;
    const gridHeight = iconGrid.offsetHeight;
    const icons = Array.from(iconLinks);
    const positions = [];

    icons.forEach(icon => {
      let attempts = 0;
      let top, left;

      do {
        top = Math.random() * (gridHeight - 100); // Уменьшено для меньшего размера иконок
        left = Math.random() * (gridWidth - 100);
        attempts++;
      } while (
          positions.some(pos => {
            const dx = pos.left - left;
            const dy = pos.top - top;
            return Math.sqrt(dx * dx + dy * dy) < 100; // Уменьшено минимальное расстояние
          }) && attempts < 50
          );

      positions.push({ top, left });
      icon.style.top = `${top}px`;
      icon.style.left = `${left}px`;

      // Сохраняем начальные координаты для возврата
      icon.dataset.originalTop = top;
      icon.dataset.originalLeft = left;
    });
  }

  // Позиционирование иконок при загрузке и изменении размера окна
  positionIcons();
  window.addEventListener('resize', positionIcons);

  // Анимация появления при скролле
  const iconObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        iconLinks.forEach((iconLink, index) => {
          setTimeout(() => {
            iconLink.classList.add('visible');
          }, index * 200);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  if (iconGrid) {
    iconObserver.observe(iconGrid);
  }

  // Эффект отталкивания и увеличения при наведении (только на десктопе)
  if (window.innerWidth > 768) {
    iconLinks.forEach(icon => {
      icon.addEventListener('mouseenter', () => {
        icon.style.transform = 'scale(1.6)';

        const iconRect = icon.getBoundingClientRect();
        const centerX = iconRect.left + iconRect.width / 2;
        const centerY = iconRect.top + iconRect.height / 2;

        iconLinks.forEach(otherIcon => {
          if (otherIcon !== icon) {
            const otherRect = otherIcon.getBoundingClientRect();
            const otherCenterX = otherRect.left + otherRect.width / 2;
            const otherCenterY = otherRect.top + otherRect.height / 2;

            const distance = Math.sqrt(
                Math.pow(centerX - otherCenterX, 2) + Math.pow(centerY - otherCenterY, 2)
            );

            if (distance < 350) {
              const angle = Math.atan2(otherCenterY - centerY, otherCenterX - centerX);
              const pushDistance = 40;
              const translateX = Math.cos(angle) * pushDistance;
              const translateY = Math.sin(angle) * pushDistance;
              otherIcon.style.transition = 'transform 0.5s ease';
              otherIcon.style.transform = `translate(${translateX}px, ${translateY}px) scale(1)`;
            }
          }
        });
      });

      icon.addEventListener('mouseleave', () => {
        // Сбрасываем трансформацию текущей иконки
        icon.style.transform = 'scale(1)';
        icon.style.top = `${icon.dataset.originalTop}px`;
        icon.style.left = `${icon.dataset.originalLeft}px`;

        // Сбрасываем трансформации и позиции всех остальных иконок
        iconLinks.forEach(otherIcon => {
          if (otherIcon !== icon) {
            otherIcon.style.transform = 'scale(1)';
            otherIcon.style.top = `${otherIcon.dataset.originalTop}px`;
            otherIcon.style.left = `${otherIcon.dataset.originalLeft}px`;
          }
        });
      });
    });
  }
} catch (e) {
  console.error('Ошибка в секции партнеров:', e);
}


// Проверка загрузки Tailwind CSS
window.addEventListener('load', () => {
  const testElement = document.createElement('div');
  testElement.className = 'hidden';
  document.body.appendChild(testElement);
  if (window.getComputedStyle(testElement).display !== 'none') {
    console.error('Tailwind CSS не загрузился.');
    document.body.classList.add('no-tailwind');
  }
  document.body.removeChild(testElement);
});

// Calculator Logic
try {
  const formworkHeight = document.getElementById('formworkHeight');
  const quantity = document.getElementById('quantity');
  const days = document.getElementById('days');
  const totalCost = document.getElementById('totalCost');
  const resetButton = document.getElementById('resetCalculator');

  function calculateCost() {
    const pricePerUnit = 25;
    const qty = Math.max(1, parseInt(quantity.value) || 1);
    const d = Math.max(1, parseInt(days.value) || 1);
    const cost = pricePerUnit * qty * d;
    totalCost.textContent = cost.toFixed();
  }

  quantity.addEventListener('input', () => {
    if (quantity.value < 1 || isNaN(quantity.value)) {
      quantity.classList.add('invalid');
      quantity.value = 1;
      setTimeout(() => quantity.classList.remove('invalid'), 1000);
    }
    calculateCost();
  });
  days.addEventListener('input', () => {
    if (days.value < 1 || isNaN(days.value)) {
      days.classList.add('invalid');
      days.value = 1;
      setTimeout(() => days.classList.remove('invalid'), 1000);
    }
    calculateCost();
  });

  formworkHeight.addEventListener('change', calculateCost);

  resetButton.addEventListener('click', () => {
    formworkHeight.value = '0.60';
    quantity.value = 1;
    days.value = 1;
    calculateCost();
  });

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
    stopAutoSlide();
    setTimeout(startAutoSlide, 10000);
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalItems;
    updateCarousel();
    stopAutoSlide();
    setTimeout(startAutoSlide, 10000);
  });

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
    const isActive = contactMenu.classList.toggle('active');
    toggleBtn.classList.toggle('active');
    toggleBtn.setAttribute('aria-expanded', isActive);
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

// Map
try {
  document.addEventListener('DOMContentLoaded', function () {
    // Инициализация карты с координатами Садырбаева, 264
    var map = L.map('map').setView([42.828694, 74.563750], 15);

    // Добавление тайлов OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    // Добавление маркера
    var marker = L.marker([42.828694, 74.563750])
        .addTo(map)
        .bindPopup('Улица Садырбаева, 264, Бишкек')
        .openPopup();

    // Переход на Google Maps при клике на карту
    map.on('click', function () {
      var url = 'https://www.google.com/maps?q=42.829694,74.563750&z=15';
      // Альтернатива: 2ГИС
      // var url = 'https://2gis.kg/bishkek/geo/74.563750,42.829694/15';
      window.open(url, '_blank');
    });

    // Обработка видимости карты для корректного рендеринга
    const mapContainer = document.getElementById('map');
    const mapObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                map.invalidateSize();
                map.setView([42.829694, 74.563750], 15); // Принудительное центрирование
              }, 600); // Синхронизация с анимацией fade-in
              mapObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
    );
    mapObserver.observe(mapContainer);

    // Дополнительное центрирование после полной загрузки
    setTimeout(() => {
      map.invalidateSize();
      map.setView([42.829694, 74.563750], 15);
    }, 1000);
  });
} catch (e) {
  console.error('Ошибка в карте:', e);
}

document.getElementById('submit-btn').addEventListener('click', function(event) {
  event.preventDefault(); // Предотвращаем стандартную отправку формы

  // Получение значений полей
  const name = document.getElementById('name').value.trim();
  let phone = document.getElementById('phone').value.trim();
  const message = document.getElementById('message').value.trim();

  // Проверка обязательных полей
  if (!name || !phone) {
    alert('Пожалуйста, заполните поля Имя и Телефон.');
    return;
  }

  // Очистка номера от пробелов и дефисов
  phone = phone.replace(/[\s-]/g, '');

  // Проверка формата телефона
  const phoneRegex = /^(?:\+996|0)?\d{9}$/;
  if (!phoneRegex.test(phone)) {
    alert('Пожалуйста, введите корректный номер телефона (например, +996555123456, 0555123456 или 555123456).');
    return;
  }

  // Нормализация номера: добавляем +996, если код отсутствует
  if (phone.startsWith('0')) {
    phone = '+996' + phone.slice(1);
  } else if (!phone.startsWith('+996')) {
    phone = '+996' + phone;
  }

  // Формирование сообщения для WhatsApp
  let whatsappMessage = `Здравствуйте!%0A`;
  whatsappMessage += `Имя: ${encodeURIComponent(name)}%0A`;
  whatsappMessage += `Телефон: ${encodeURIComponent(phone)}%0A`;
  if (message) {
    whatsappMessage += `Сообщение: ${encodeURIComponent(message)}%0A`;
  }

  // URL для WhatsApp
  const whatsappUrl = `https://wa.me/+996502554488?text=${whatsappMessage}`;

  try {
    // Открытие WhatsApp
    window.open(whatsappUrl, '_blank');


    // Очистка формы
    document.getElementById('name').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('message').value = '';
  } catch (e) {
    alert('Не удалось открыть WhatsApp. Пожалуйста, попробуйте снова.');
    console.error('Ошибка при открытии WhatsApp:', e);
  }
});