/* ==========================================
   KIZUNA Atelier — Interactive Features
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ---------- Scroll Animations (Intersection Observer) ----------
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger animation for grid children
        const parent = entry.target.parentElement;
        const siblings = parent ? parent.querySelectorAll('.animate-on-scroll') : [];
        let delay = 0;

        if (siblings.length > 1) {
          const siblingIndex = Array.from(siblings).indexOf(entry.target);
          delay = siblingIndex * 100;
        }

        setTimeout(() => {
          entry.target.classList.add('is-visible');
        }, delay);

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => observer.observe(el));

  // ---------- Navigation Scroll Effect ----------
  const nav = document.getElementById('nav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 80) {
      nav.classList.add('is-scrolled');
    } else {
      nav.classList.remove('is-scrolled');
    }

    lastScroll = currentScroll;
  }, { passive: true });

  // ---------- Mobile Navigation Toggle ----------
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('is-active');
    navLinks.classList.toggle('is-open');
    document.body.style.overflow = navLinks.classList.contains('is-open') ? 'hidden' : '';
  });

  // Close mobile nav on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('is-active');
      navLinks.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  });

  // ---------- Smooth Scroll for Anchor Links ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        const offset = nav.offsetHeight + 20;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });

  // ---------- Gallery Lightbox ----------
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const galleryItems = document.querySelectorAll('.gallery__item');
  let currentIndex = 0;

  const images = Array.from(galleryItems).map(item => {
    const img = item.querySelector('img');
    return img ? img.src : '';
  });

  function openLightbox(index) {
    currentIndex = index;
    lightboxImg.src = images[currentIndex];
    lightbox.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    lightboxImg.src = images[currentIndex];
  }

  function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    lightboxImg.src = images[currentIndex];
  }

  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
  });

  lightbox.querySelector('.lightbox__close').addEventListener('click', closeLightbox);
  lightbox.querySelector('.lightbox__next').addEventListener('click', nextImage);
  lightbox.querySelector('.lightbox__prev').addEventListener('click', prevImage);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  });

  // ---------- Parallax Decorations ----------
  const decos = document.querySelectorAll('.concept__deco');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    decos.forEach((deco, i) => {
      const speed = 0.03 * (i + 1);
      deco.style.transform = `translateY(${scrollY * speed}px)`;
    });
  }, { passive: true });

});
