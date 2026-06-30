
const body = document.body;
const header = document.getElementById('header');
const progress = document.getElementById('progress');
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

window.addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
  progress.style.width = `${pct}%`;
  header.classList.toggle('scrolled', window.scrollY > 20);
});

menuBtn.addEventListener('click', () => body.classList.toggle('menu-open'));
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => body.classList.remove('menu-open'));
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const slides = [...document.querySelectorAll('.hero-slide')];
let currentSlide = 0;
setInterval(() => {
  slides[currentSlide].classList.remove('is-active');
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add('is-active');
}, 4200);

const filters = [...document.querySelectorAll('.filter')];
const cards = [...document.querySelectorAll('.gallery-card')];

filters.forEach(btn => {
  btn.addEventListener('click', () => {
    filters.forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');
    const filter = btn.dataset.filter;
    cards.forEach(card => {
      const show = filter === 'all' || card.dataset.cat === filter;
      card.classList.toggle('is-hidden', !show);
    });
  });
});

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const closeBtn = document.getElementById('lightboxClose');

cards.forEach(card => {
  card.addEventListener('click', () => {
    lightboxImage.src = card.dataset.src;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
  });
});

function closeLightbox(){
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  setTimeout(() => { lightboxImage.src = ''; }, 160);
}
closeBtn.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});
