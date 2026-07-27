const revealElements = document.querySelectorAll(".reveal");

document.querySelectorAll(".category-grid, .product-grid, .segment-grid").forEach((grid) => {
  grid.querySelectorAll(".reveal").forEach((element, index) => {
    element.style.setProperty("--reveal-delay", `${Math.min(index * 45, 225)}ms`);
  });
});

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -32px" });

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("visible"));
}

const menuToggle = document.getElementById("menuToggle");
const primaryNav = document.getElementById("primaryNav");

if (menuToggle && primaryNav) {
  const closeMenu = () => {
    primaryNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = primaryNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });

  primaryNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (event) => {
    if (!primaryNav.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && primaryNav.classList.contains("is-open")) {
      closeMenu();
      menuToggle.focus();
    }
  });
}

const navLinks = [...document.querySelectorAll(".primary-nav a[href^='#']")];
const navTargets = navLinks
  .map((link) => ({ link, target: document.querySelector(link.getAttribute("href")) }))
  .filter(({ target }) => target);
let navFrame;

const updateActiveNav = () => {
  const marker = window.scrollY + 150;
  let active = navTargets[0];

  navTargets.forEach((item) => {
    if (item.target.offsetTop <= marker) active = item;
  });

  navLinks.forEach((link) => link.classList.toggle("is-active", link === active?.link));
  navFrame = null;
};

window.addEventListener("scroll", () => {
  if (!navFrame) navFrame = window.requestAnimationFrame(updateActiveNav);
}, { passive: true });
updateActiveNav();

const quoteModal = document.getElementById("quoteFormModal");
const closeQuoteForm = document.getElementById("closeQuoteForm");
const quoteTriggers = document.querySelectorAll(".quote-trigger");
let modalReturnFocus;

const openQuoteModal = () => {
  if (!quoteModal) return;
  modalReturnFocus = document.activeElement;
  quoteModal.hidden = false;
  document.body.classList.add("quote-modal-open");
  closeQuoteForm?.focus();
};

const closeQuoteModal = () => {
  if (!quoteModal) return;
  quoteModal.hidden = true;
  document.body.classList.remove("quote-modal-open");
  modalReturnFocus?.focus();
};

quoteTriggers.forEach((trigger) => {
  trigger.addEventListener("click", openQuoteModal);
});

if (quoteModal && closeQuoteForm) {
  closeQuoteForm.addEventListener("click", closeQuoteModal);
  quoteModal.addEventListener("click", (event) => {
    if (event.target === quoteModal) closeQuoteModal();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !quoteModal.hidden) closeQuoteModal();
  });
}
