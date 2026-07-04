const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const menuToggle = document.getElementById("menuToggle");
const primaryNav = document.getElementById("primaryNav");

if (menuToggle && primaryNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = primaryNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  primaryNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      primaryNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const quoteModal = document.getElementById("quoteFormModal");
const closeQuoteForm = document.getElementById("closeQuoteForm");
const quoteTriggers = document.querySelectorAll(".quote-trigger");

const openQuoteModal = () => {
  if (!quoteModal) return;
  quoteModal.hidden = false;
  document.body.classList.add("quote-modal-open");
};

const closeQuoteModal = () => {
  if (!quoteModal) return;
  quoteModal.hidden = true;
  document.body.classList.remove("quote-modal-open");
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
