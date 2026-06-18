/**
 * TechOva Solutions — Main JavaScript
 * Handles animations, navigation, particles, and form submission.
 */

// ── Page Loader ──────────────────────────────────────────────
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
  const loader = document.querySelector('.page-loader');
  if (loader) {
    setTimeout(() => loader.classList.add('hidden'), 600);
  }
});

// ── Header Scroll Effect ─────────────────────────────────────
const header = document.getElementById('header');

function onScroll() {
  const scrollY = window.scrollY;
  if (header) {
    header.classList.toggle('scrolled', scrollY > 50);
  }
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ── Mobile Navigation ────────────────────────────────────────
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.classList.toggle('active', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  navMenu.querySelectorAll('.nav__link').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

// ── Smooth Scroll for Anchor Links ───────────────────────────
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ── Scroll Reveal Animations ─────────────────────────────────
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay || '0', 10);
        setTimeout(() => entry.target.classList.add('visible'), delay);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

revealElements.forEach((el) => revealObserver.observe(el));

// ── Counter Animation ────────────────────────────────────────
function animateCounter(el, target, duration = 2000) {
  const start = performance.now();
  const update = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  };
  requestAnimationFrame(update);
}

const statsSection = document.querySelector('.hero__stats');
if (statsSection) {
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('[data-count]').forEach((counter) => {
            animateCounter(counter, parseInt(counter.dataset.count, 10));
          });
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  counterObserver.observe(statsSection);
}

// ── Cursor Glow Effect ───────────────────────────────────────
const cursorGlow = document.querySelector('.cursor-glow');

if (cursorGlow && window.matchMedia('(hover: hover)').matches) {
  let mouseX = 0;
  let mouseY = 0;
  let glowX = 0;
  let glowY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateGlow() {
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    cursorGlow.style.left = `${glowX}px`;
    cursorGlow.style.top = `${glowY}px`;
    requestAnimationFrame(animateGlow);
  }

  animateGlow();
}

// ── Particle Canvas ──────────────────────────────────────────
const canvas = document.getElementById('particleCanvas');

if (canvas) {
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationId;

  function resizeCanvas() {
    const parent = canvas.parentElement;
    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight;
  }

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = (Math.random() - 0.5) * 0.3;
      this.opacity = Math.random() * 0.5 + 0.1;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
        this.reset();
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(99, 102, 241, ${this.opacity})`;
      ctx.fill();
    }
  }

  function initParticles() {
    const count = Math.min(80, Math.floor((canvas.width * canvas.height) / 12000));
    particles = Array.from({ length: count }, () => new Particle());
  }

  function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(99, 102, 241, ${0.08 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.update();
      p.draw();
    });
    connectParticles();
    animationId = requestAnimationFrame(animateParticles);
  }

  function startParticles() {
    resizeCanvas();
    initParticles();
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      animateParticles();
    }
  }

  startParticles();

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      cancelAnimationFrame(animationId);
      startParticles();
    }, 200);
  });
}

// ── Active Nav Link Highlight ────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__link[href^="#"]');

function highlightNav() {
  const scrollPos = window.scrollY + 100;
  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    if (scrollPos >= top && scrollPos < top + height) {
      navLinks.forEach((link) => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${id}`) {
          link.style.color = 'var(--color-text)';
        }
      });
    }
  });
}

window.addEventListener('scroll', highlightNav, { passive: true });

// ── Custom Select ────────────────────────────────────────────
function initCustomSelect(wrapper) {
  const select = wrapper.querySelector('select');
  const trigger = wrapper.querySelector('.custom-select__trigger');
  const valueEl = wrapper.querySelector('.custom-select__value');
  const menu = wrapper.querySelector('.custom-select__menu');
  if (!select || !trigger || !valueEl || !menu) return;

  let activeIndex = -1;
  const options = [];

  Array.from(select.options).forEach((opt) => {
    if (!opt.value) return;

    const item = document.createElement('li');
    item.setAttribute('role', 'option');
    item.dataset.value = opt.value;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'custom-select__option';
    btn.textContent = opt.textContent;
    btn.addEventListener('click', () => chooseOption(opt.value));

    item.appendChild(btn);
    menu.appendChild(item);
    options.push({ opt, btn, item });
  });

  function setPlaceholderState() {
    const isPlaceholder = !select.value;
    valueEl.classList.toggle('is-placeholder', isPlaceholder);
    valueEl.textContent = isPlaceholder
      ? select.querySelector('option[value=""]')?.textContent || 'Select a service'
      : select.options[select.selectedIndex]?.textContent || '';
  }

  function updateSelectedState() {
    options.forEach(({ opt, btn }) => {
      btn.classList.toggle('is-selected', opt.value === select.value);
    });
  }

  function chooseOption(value) {
    select.value = value;
    setPlaceholderState();
    updateSelectedState();
    closeMenu();
    select.dispatchEvent(new Event('change', { bubbles: true }));
  }

  function openMenu() {
    wrapper.classList.add('is-open');
    trigger.setAttribute('aria-expanded', 'true');
    menu.hidden = false;
    activeIndex = Math.max(
      0,
      options.findIndex(({ opt }) => opt.value === select.value)
    );
    highlightActive();
  }

  function closeMenu() {
    wrapper.classList.remove('is-open');
    trigger.setAttribute('aria-expanded', 'false');
    menu.hidden = true;
    activeIndex = -1;
    options.forEach(({ btn }) => btn.classList.remove('is-active'));
  }

  function highlightActive() {
    options.forEach(({ btn }, index) => {
      btn.classList.toggle('is-active', index === activeIndex);
    });
    options[activeIndex]?.btn.focus();
  }

  trigger.addEventListener('click', () => {
    if (menu.hidden) openMenu();
    else closeMenu();
  });

  trigger.addEventListener('keydown', (e) => {
    if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
      e.preventDefault();
      if (menu.hidden) openMenu();
    }
    if (e.key === 'Escape') closeMenu();
  });

  menu.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      activeIndex = Math.min(activeIndex + 1, options.length - 1);
      highlightActive();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      activeIndex = Math.max(activeIndex - 1, 0);
      highlightActive();
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (options[activeIndex]) chooseOption(options[activeIndex].opt.value);
    } else if (e.key === 'Escape') {
      closeMenu();
      trigger.focus();
    }
  });

  document.addEventListener('click', (e) => {
    if (!wrapper.contains(e.target)) closeMenu();
  });

  select.form?.addEventListener('reset', () => {
    setTimeout(() => {
      setPlaceholderState();
      updateSelectedState();
      closeMenu();
    });
  });

  setPlaceholderState();
  updateSelectedState();
}

document.querySelectorAll('[data-custom-select]').forEach(initCustomSelect);

// ── Contact Form ─────────────────────────────────────────────
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending...';
    formNote.textContent = '';
    formNote.className = 'form__note';

    const formData = new FormData(contactForm);

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        formNote.textContent = data.message;
        formNote.classList.add('success');
        contactForm.reset();
      } else {
        formNote.textContent = data.message || 'Something went wrong. Please try again.';
        formNote.classList.add('error');
      }
    } catch {
      formNote.textContent = 'Unable to send. Please email us at hello@techovasolutions.ca';
      formNote.classList.add('error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  });
}

// ── Footer Year ──────────────────────────────────────────────
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
