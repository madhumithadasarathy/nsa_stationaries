const WHATSAPP_NUMBER = "919952095668";
const WHATSAPP_MESSAGE = "Hello NSA Stationers, I would like to know more about your products and services.";
const floatingWhatsAppLink = document.getElementById("floatingWhatsApp");

if (floatingWhatsAppLink) {
  floatingWhatsAppLink.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
}

const revealElements = document.querySelectorAll(".reveal");

document.querySelectorAll(".category-grid, .product-grid, .featured-track, .segment-grid, .paper-trail__stages").forEach((grid) => {
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

const heroShopStrip = document.querySelector(".hero-shop-strip");

if (heroShopStrip) {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let isDragging = false;
  let dragStartX = 0;
  let dragStartScroll = 0;

  heroShopStrip.addEventListener("pointerdown", (event) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;

    isDragging = true;
    dragStartX = event.clientX;
    dragStartScroll = heroShopStrip.scrollLeft;
    heroShopStrip.classList.add("is-dragging");
    heroShopStrip.setPointerCapture(event.pointerId);
  });

  heroShopStrip.addEventListener("pointermove", (event) => {
    if (!isDragging) return;
    event.preventDefault();
    heroShopStrip.scrollLeft = dragStartScroll - (event.clientX - dragStartX);
  });

  const stopHeroDrag = (event) => {
    if (!isDragging) return;
    isDragging = false;
    heroShopStrip.classList.remove("is-dragging");
    if (heroShopStrip.hasPointerCapture(event.pointerId)) {
      heroShopStrip.releasePointerCapture(event.pointerId);
    }
  };

  heroShopStrip.addEventListener("pointerup", stopHeroDrag);
  heroShopStrip.addEventListener("pointercancel", stopHeroDrag);
  heroShopStrip.addEventListener("lostpointercapture", () => {
    isDragging = false;
    heroShopStrip.classList.remove("is-dragging");
  });

  heroShopStrip.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;

    event.preventDefault();
    heroShopStrip.scrollBy({
      left: (event.key === "ArrowRight" ? 1 : -1) * heroShopStrip.clientWidth * 0.75,
      behavior: reduceMotion.matches ? "auto" : "smooth",
    });
  });
}

const featuredTrack = document.getElementById("featuredTrack");
const featuredPrevious = document.getElementById("featuredPrevious");
const featuredNext = document.getElementById("featuredNext");
const featuredCurrent = document.getElementById("featuredCurrent");

if (featuredTrack && featuredPrevious && featuredNext && featuredCurrent) {
  const featuredCards = [...featuredTrack.querySelectorAll(".collection-card")];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let featuredIndex = 0;
  let featuredFrame;

  const updateFeaturedState = () => {
    const trackLeft = featuredTrack.getBoundingClientRect().left;
    featuredIndex = featuredCards.reduce((closest, card, index) => {
      const distance = Math.abs(card.getBoundingClientRect().left - trackLeft);
      return distance < closest.distance ? { index, distance } : closest;
    }, { index: 0, distance: Number.POSITIVE_INFINITY }).index;

    featuredCurrent.textContent = String(featuredIndex + 1).padStart(2, "0");
    featuredPrevious.disabled = featuredTrack.scrollLeft <= 2;
    featuredNext.disabled = featuredTrack.scrollLeft >= featuredTrack.scrollWidth - featuredTrack.clientWidth - 2;
    featuredFrame = null;
  };

  const scrollToFeaturedCard = (index) => {
    const targetIndex = Math.max(0, Math.min(index, featuredCards.length - 1));
    const target = featuredCards[targetIndex];
    featuredTrack.scrollTo({
      left: target.offsetLeft - featuredTrack.offsetLeft,
      behavior: reducedMotion.matches ? "auto" : "smooth",
    });
  };

  featuredPrevious.addEventListener("click", () => scrollToFeaturedCard(featuredIndex - 1));
  featuredNext.addEventListener("click", () => scrollToFeaturedCard(featuredIndex + 1));
  featuredTrack.addEventListener("scroll", () => {
    if (!featuredFrame) featuredFrame = window.requestAnimationFrame(updateFeaturedState);
  }, { passive: true });
  featuredTrack.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    scrollToFeaturedCard(featuredIndex + (event.key === "ArrowRight" ? 1 : -1));
  });
  window.addEventListener("resize", updateFeaturedState);
  updateFeaturedState();
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
