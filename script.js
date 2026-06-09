const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.16 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

const header = document.querySelector('.header');
const quoteModal = document.getElementById('quoteFormModal');
const openQuoteForm = document.getElementById('openQuoteForm');
const closeQuoteForm = document.getElementById('closeQuoteForm');
const SHRINK_THRESHOLD = 100;
const MOBILE_HEADER_QUERY = window.matchMedia('(hover: none), (pointer: coarse), (max-width: 930px)');

// Mobile users cannot hover the compact header, so this helper keeps the
// expanded state controlled by a tap while preserving the existing scroll shrink.
const closeMobileHeaderNav = () => {
  if (!header) return;
  header.classList.remove('header-expanded');
  header.setAttribute('aria-expanded', 'false');
};

// The compact header acts like a page-selector trigger on touch devices.
if (header) {
  header.setAttribute('aria-expanded', 'false');

  header.addEventListener('click', (event) => {
    if (!MOBILE_HEADER_QUERY.matches || !header.classList.contains('header-shrunk')) return;

    const clickedLink = event.target.closest('a');
    if (clickedLink && clickedLink.closest('nav')) {
      closeMobileHeaderNav();
      return;
    }

    event.preventDefault();
    header.classList.toggle('header-expanded');
    header.setAttribute('aria-expanded', String(header.classList.contains('header-expanded')));
  });

  document.addEventListener('click', (event) => {
    if (!MOBILE_HEADER_QUERY.matches || !header.classList.contains('header-expanded')) return;
    if (!header.contains(event.target)) closeMobileHeaderNav();
  });

  window.addEventListener('resize', () => {
    if (!MOBILE_HEADER_QUERY.matches) closeMobileHeaderNav();
  });
}

// Quote modal: keeps the Google Form available on demand without making the
// embedded iframe dominate the main page layout.
const openQuoteModal = () => {
  if (!quoteModal) return;
  quoteModal.hidden = false;
  document.body.classList.add('quote-modal-open');
};

const closeQuoteModal = () => {
  if (!quoteModal) return;
  quoteModal.hidden = true;
  document.body.classList.remove('quote-modal-open');
};

if (quoteModal && openQuoteForm && closeQuoteForm) {
  openQuoteForm.addEventListener('click', openQuoteModal);
  closeQuoteForm.addEventListener('click', closeQuoteModal);

  quoteModal.addEventListener('click', (event) => {
    if (event.target === quoteModal) closeQuoteModal();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !quoteModal.hidden) closeQuoteModal();
  });
}

window.addEventListener('scroll', () => {
  const cards = document.querySelectorAll('.ledger-card');
  const y = window.scrollY;
  cards.forEach((card, index) => {
    card.style.marginTop = `${Math.sin((y / 140) + index) * 8}px`;
  });

  if (header) {
    header.classList.toggle('header-shrunk', y > SHRINK_THRESHOLD);
    if (y <= SHRINK_THRESHOLD) closeMobileHeaderNav();
  }
});

/* ── Auto-Changing Premium Showcase ── */
function initAutoShowcase() {
  const section = document.querySelector(".auto-showcase-section");
  const images = Array.from(document.querySelectorAll(".auto-showcase-image"));
  const panels = Array.from(document.querySelectorAll(".auto-showcase-panel"));
  const buttons = Array.from(document.querySelectorAll(".auto-showcase-progress button"));

  if (!section || !images.length || !panels.length || !buttons.length) {
    console.warn("Auto showcase not initialized.");
    return;
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const slideDuration = 3200;
  let activeIndex = 0;
  let timer = null;
  let isPaused = false;

  section.style.setProperty("--slide-duration", `${slideDuration}ms`);

  function resetProgressVisuals(active) {
    buttons.forEach((button, index) => {
      const fill = button.querySelector(".progress-fill");
      button.classList.remove("active", "is-complete");

      if (!fill) return;

      fill.style.animation = "none";
      fill.style.transform = "scaleY(0)";

      if (index < active) {
        button.classList.add("is-complete");
        fill.style.transform = "scaleY(1)";
      }
    });
  }

  function startActiveProgress(index) {
    const activeButton = buttons[index];
    if (!activeButton) return;

    const fill = activeButton.querySelector(".progress-fill");
    activeButton.classList.add("active");

    if (!fill) return;

    fill.style.animation = "none";
    fill.getBoundingClientRect();
    fill.style.animation = `progressVertical ${slideDuration}ms linear forwards`;
  }

  function setActive(index) {
    activeIndex = index;

    images.forEach((img, i) => img.classList.toggle("active", i === index));
    panels.forEach((panel, i) => panel.classList.toggle("active", i === index));

    resetProgressVisuals(index);
    startActiveProgress(index);
  }

  function nextSlide() {
    const nextIndex = (activeIndex + 1) % images.length;
    setActive(nextIndex);
    if (!prefersReducedMotion && !isPaused) {
      startAutoPlay();
    }
  }

  function stopAutoPlay() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }

  function startAutoPlay() {
    stopAutoPlay();
    if (prefersReducedMotion || isPaused) return;
    timer = setTimeout(nextSlide, slideDuration);
  }

  buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      setActive(index);
      startAutoPlay();
    });
  });

  section.addEventListener("mouseenter", () => {
    isPaused = true;
    stopAutoPlay();

    const activeFill = buttons[activeIndex]?.querySelector(".progress-fill");
    if (activeFill) {
      const computed = window.getComputedStyle(activeFill);
      activeFill.style.animationPlayState = "paused";
      if (!computed.animationName || computed.animationName === "none") {
        activeFill.style.animation = "none";
      } else {
        activeFill.style.animationPlayState = "paused";
      }
    }
  });

  section.addEventListener("mouseleave", () => {
    isPaused = false;
    setActive(activeIndex);
    startAutoPlay();
  });

  section.addEventListener("focusin", () => {
    isPaused = true;
    stopAutoPlay();
  });

  section.addEventListener("focusout", () => {
    isPaused = false;
    setActive(activeIndex);
    startAutoPlay();
  });

  setActive(0);
  if (!prefersReducedMotion) {
    startAutoPlay();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initAutoShowcase();
});
