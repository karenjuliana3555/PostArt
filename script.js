const track = document.querySelector(".carousel-track");
const slides = Array.from(track.children);
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let index = 0;

function moveToSlide(newIndex) {
  index = (newIndex + slides.length) % slides.length;
  const slideWidth = slides[0].getBoundingClientRect().width + 
                     parseFloat(getComputedStyle(track).gap || 0);
  track.style.transform = `translateX(-${index * slideWidth}px)`;
}

// Botones
prevBtn.addEventListener("click", () => moveToSlide(index - 1));
nextBtn.addEventListener("click", () => moveToSlide(index + 1));

// Auto-play cada 4s
setInterval(() => moveToSlide(index + 1), 4000);



// CARRUSEL "CONOCE AL PARCHE" - con dots y pause on hover
(function () {
  const track = document.querySelector(".parche-track");
  if (!track) return; // si no existe la sección, salir
  const slides = Array.from(track.children);
  const prev = document.querySelector(".parche-prev");
  const next = document.querySelector(".parche-next");
  const dotsContainer = document.querySelector(".carousel-dots-parche");
  let index = 0;
  let autoplayTimer = null;
  const AUTOPLAY_MS = 6000;

  // crear dots dinámicamente
  slides.forEach((_, i) => {
    const btn = document.createElement("button");
    if (i === 0) btn.classList.add("active");
    dotsContainer.appendChild(btn);
    btn.addEventListener("click", () => goTo(i));
  });
  const dots = Array.from(dotsContainer.children);

  function update() {
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach(d => d.classList.remove("active"));
    if (dots[index]) dots[index].classList.add("active");
  }

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    update();
  }

  prev.addEventListener("click", () => { goTo(index - 1); resetAutoplay(); });
  next.addEventListener("click", () => { goTo(index + 1); resetAutoplay(); });

  // autoplay con pausa al hover
  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(() => goTo(index + 1), AUTOPLAY_MS);
  }
  function stopAutoplay() {
    if (autoplayTimer) { clearInterval(autoplayTimer); autoplayTimer = null; }
  }
  function resetAutoplay() { startAutoplay(); }

  // pausar al hover sobre el contenedor del carrusel
  const container = document.querySelector(".carousel-container-parche");
  if (container) {
    container.addEventListener("mouseenter", stopAutoplay);
    container.addEventListener("mouseleave", startAutoplay);
  }

  // init
  update();
  startAutoplay();

  // opcional: re-ajustar al cambiar tamaño (no estrictamente necesario aquí)
  window.addEventListener("resize", update);
})();


// Coloca este script al final del body o en tu bundle
document.addEventListener('DOMContentLoaded', function () {
  const items = document.querySelectorAll('.fade-in');

  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target); // animar solo una vez
      }
    });
  }, { threshold: 0.25 });

  items.forEach(i => io.observe(i));
});



