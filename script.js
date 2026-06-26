/* Interactions on portfolio */

/* ── Navbar: added scroll shadow and active link ── */
const navbar   = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav__link');
const sections = document.querySelectorAll('.section');

function onScroll() {
  // Shadow on scroll
  if (window.scrollY > 20) {
    navbar.classList.add('nav--scrolled');
  } else {
    navbar.classList.remove('nav--scrolled');
  }

  // Highlight the active nav link based on the scroll position
  let current = '';
  sections.forEach(sec => {
    const top    = sec.getBoundingClientRect().top;
    const offset = window.innerHeight * 0.4;
    if (top <= offset) current = sec.id;
  });

  navLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.page === current);
  });
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll(); // run once on load

/* ── Smooth scroll on nav click & close mobile menu ── */
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    // close mobile menu
    document.getElementById('navLinks').classList.remove('open');
    document.getElementById('burger').classList.remove('open');
  });
});

/* Mobile burger toggle */
const burger   = document.getElementById('burger');
const navMenu  = document.getElementById('navLinks');

burger.addEventListener('click', () => {
  const open = navMenu.classList.toggle('open');
  burger.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open);
});

// Close menu on outside click
document.addEventListener('click', e => {
  if (!navbar.contains(e.target)) {
    navMenu.classList.remove('open');
    burger.classList.remove('open');
  }
});

/* Intersection Observer: reveal on scroll  */
const revealEls = document.querySelectorAll(
  '.card, .project-card, .contact-card, .home__eyebrow, .home__title, .home__sub, .home__ctas, .home__photo-frame, .home__stats, .section-title, .section-eyebrow, .contact__lead'
);

revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // only animates once
      }
    });
  },
  { threshold: 0.12 }
);

revealEls.forEach(el => observer.observe(el));

/* ── Stagger reveal for grid items ── */
function staggerReveal(selector, delay = 80) {
  const items = document.querySelectorAll(selector);
  items.forEach((item, i) => {
    item.style.transitionDelay = `${i * delay}ms`;
  });
}

staggerReveal('.about__grid .card',     80);
staggerReveal('.projects__grid .project-card', 100);
staggerReveal('.contact__grid .contact-card',  80);

/*  Active section highlight in URL hash (optional, no page reload) */
// (intentionally light - no history.pushState spam)