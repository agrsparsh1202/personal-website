const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  nav.classList.toggle('open', !isOpen);
});

document.querySelectorAll('.nav a').forEach((link) => link.addEventListener('click', () => {
  menuButton?.setAttribute('aria-expanded', 'false');
  nav?.classList.remove('open');
}));

document.querySelector('#year').textContent = new Date().getFullYear();

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
} else {
  document.querySelectorAll('.reveal').forEach((element) => element.classList.add('visible'));
}

/* ---------------------------------------------------------------------
   Lightbox: click any photo/logo image to zoom it into a fixed-size,
   centered stage; click outside it (or Esc, or the close button) to exit.
   Only wires up real <img>/<video> elements — text-only logo placeholders
   (e.g. the "NTU"/"IEEE" badges with no source image yet) have nothing to
   zoom into, so they're left as-is.
--------------------------------------------------------------------- */

const lightbox = document.querySelector('#lightbox');

if (lightbox) {
  const lightboxImg = lightbox.querySelector('.lightbox-img');
  const lightboxVideo = lightbox.querySelector('.lightbox-video');
  const lightboxClose = lightbox.querySelector('.lightbox-close');
  let lastFocused = null;

  // Autoplaying background videos (e.g. the looping Eastspring clip) can get
  // promoted to their own compositor layer and paint above the lightbox
  // overlay despite z-index; pause them while zoomed in, resume on close.
  const pageVideos = () => document.querySelectorAll('.media-circles video');

  const closeLightbox = () => {
    lightbox.hidden = true;
    document.body.classList.remove('lightbox-open');
    lightboxImg.hidden = true;
    lightboxImg.removeAttribute('src');
    lightboxVideo.pause();
    lightboxVideo.hidden = true;
    lightboxVideo.removeAttribute('src');
    pageVideos().forEach((video) => video.play().catch(() => {}));
    lastFocused?.focus?.();
  };

  const openLightboxImage = (source) => {
    lastFocused = document.activeElement;
    pageVideos().forEach((video) => video.pause());
    lightboxVideo.pause();
    lightboxVideo.hidden = true;
    lightboxVideo.removeAttribute('src');
    lightboxImg.src = source.currentSrc || source.src;
    lightboxImg.alt = source.alt || '';
    lightboxImg.hidden = false;
    lightbox.hidden = false;
    document.body.classList.add('lightbox-open');
  };

  const openLightboxVideo = (source) => {
    lastFocused = document.activeElement;
    pageVideos().forEach((video) => { if (video !== source) video.pause(); });
    lightboxImg.hidden = true;
    lightboxImg.removeAttribute('src');
    lightboxVideo.src = source.currentSrc || source.src;
    lightboxVideo.hidden = false;
    lightbox.hidden = false;
    document.body.classList.add('lightbox-open');
    lightboxVideo.play().catch(() => {});
  };

  // Note: .logo-rail images deliberately excluded — they're the "In the
  // past, I've been associated with" rail, and should only jump to the
  // matching section (see their <a href="#..."> wrappers), never zoom.
  const zoomableImages = document.querySelectorAll(
    '.media-circles img, img.role-logo, .portrait'
  );
  zoomableImages.forEach((img) => {
    img.dataset.zoomable = 'true';
    img.setAttribute('tabindex', '0');
    img.setAttribute('role', 'button');
    img.setAttribute('aria-label', `Zoom in on ${img.alt || 'image'}`);
    img.addEventListener('click', () => openLightboxImage(img));
    img.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openLightboxImage(img);
      }
    });
  });

  document.querySelectorAll('.media-circles video').forEach((video) => {
    video.dataset.zoomable = 'true';
    video.addEventListener('click', () => openLightboxVideo(video));
  });

  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox || event.target.classList.contains('lightbox-stage')) {
      closeLightbox();
    }
  });

  lightboxClose.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !lightbox.hidden) closeLightbox();
  });
}
