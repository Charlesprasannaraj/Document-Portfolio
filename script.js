// ==========================================================================
// Mobile nav toggle
// ==========================================================================
const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');

navToggle?.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

mainNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

// ==========================================================================
// Duplicate the client marquee track so the CSS loop (-50%) is seamless
// ==========================================================================
const marqueeTrack = document.getElementById('marquee-track');
if (marqueeTrack) {
  marqueeTrack.innerHTML += marqueeTrack.innerHTML;
}

// ==========================================================================
// Stacking project cards: each card scales down slightly as the next
// one arrives, giving a deck-of-cards feel while scrolling through work.
// ==========================================================================
const stackCards = document.querySelectorAll('.stack-card');

function updateStack() {
  const viewportH = window.innerHeight;
  stackCards.forEach((card, i) => {
    const rect = card.getBoundingClientRect();
    const nextCard = stackCards[i + 1];
    if (!nextCard) return;

    const nextRect = nextCard.getBoundingClientRect();
    // Once the next card starts overlapping this one, scale this one down a touch
    const overlap = Math.max(0, rect.bottom - nextRect.top);
    const maxOverlap = rect.height * 0.5;
    const progress = Math.min(overlap / maxOverlap, 1);
    const scale = 1 - progress * 0.04;
    const opacity = 1 - progress * 0.15;
    card.style.transform = `scale(${scale})`;
    card.style.opacity = opacity;
  });
}

if (stackCards.length) {
  window.addEventListener('scroll', updateStack, { passive: true });
  window.addEventListener('resize', updateStack);
  updateStack();
}

// ==========================================================================
// Contact form — front-end only demo.
// Wire this up to your own backend / form service (e.g. Formspree,
// Netlify Forms, or a small Node/Express endpoint) by replacing the
// setTimeout block below with a real fetch() call.
// ==========================================================================
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const submitBtn = document.getElementById('contact-submit');

contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!contactForm.checkValidity()) {
    formStatus.textContent = 'Please fill in every field with a valid email.';
    return;
  }

  const originalLabel = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending…';
  formStatus.textContent = '';

  // --- Replace this block with a real request, e.g.:
  // const res = await fetch('/api/contact', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(Object.fromEntries(new FormData(contactForm)))
  // });
  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.textContent = originalLabel;
    formStatus.textContent = "Thanks — I'll get back to you within a day.";
    contactForm.reset();
  }, 900);
});

// ==========================================================================
// Footer year
// ==========================================================================
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
