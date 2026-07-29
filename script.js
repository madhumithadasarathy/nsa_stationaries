const revealElements = document.querySelectorAll(".reveal");

document.querySelectorAll(".category-grid, .product-grid, .featured-track, .segment-grid").forEach((grid) => {
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

const storeSlides = [
  {
    src: "assets/shop/d398a9db-14b7-4d06-b1f6-3a321e994233.JPG",
    zone: "Workshop Overview",
    title: "Inside the workshop",
    caption: "A wide view across the production floor, equipment, and prepared paper stock.",
    alt: "Wide view of the NSA Stationers production workshop",
  },
  {
    src: "assets/shop/e9bfe24f-67dc-49a8-a967-d9073d522917.JPG",
    zone: "Workshop Overview",
    title: "Production floor view",
    caption: "Paper stacks and working equipment arranged across the main production area.",
    alt: "Portrait view across paper stacks and equipment in the production area",
  },
  {
    src: "assets/shop/f8a49836-0b45-4231-88a3-6ceffb8faa50.JPG",
    zone: "Workshop Overview",
    title: "The working floor",
    caption: "A clear view of the active workspace where paper products are prepared.",
    alt: "NSA Stationers team working among paper stacks and production equipment",
  },
  {
    src: "assets/shop/1d41b078-ac2a-42c6-9460-aa7239e23526.JPG",
    zone: "Cutting & Finishing",
    title: "Paper cutting station",
    caption: "Cut paper stock is kept ready beside the workshop cutting equipment.",
    alt: "Paper cutting machine with prepared paper stacks",
  },
  {
    src: "assets/shop/4ce0a699-d0f6-440a-84d0-13ae63a22584.JPG",
    zone: "Cutting & Finishing",
    title: "Finishing in progress",
    caption: "A close view of the cutting process on the workshop floor.",
    alt: "Operator working at a paper cutting machine",
  },
  {
    src: "assets/shop/5b20be2c-0fa5-4cbf-ba2c-fb6aaf285416.JPG",
    zone: "Cutting & Finishing",
    title: "Cutting equipment",
    caption: "The cutting station used to prepare consistent paper formats.",
    alt: "Close view of paper cutting equipment and prepared paper",
  },
  {
    src: "assets/shop/8cb15382-8813-4e7b-b7f9-1eb643a70be7.JPG",
    zone: "Cutting & Finishing",
    title: "A closer workshop view",
    caption: "Production equipment set up for paper trimming and finishing work.",
    alt: "Portrait view of paper trimming equipment inside the workshop",
  },
  {
    src: "assets/shop/42f2afb0-931a-462d-9654-ecf95d4e2696.JPG",
    zone: "Production Floor",
    title: "Prepared paper stock",
    caption: "Paper stacks are organised around the equipment for the next production stage.",
    alt: "Paper stacks surrounding production equipment in the workshop",
  },
  {
    src: "assets/shop/4d32ae39-9ce8-4085-85d9-b96efacd9e71.JPG",
    zone: "Production Floor",
    title: "Main production room",
    caption: "A broad view of the machinery, shelves, and paper stock in the working area.",
    alt: "Wide view of the main production room and paper stock",
  },
  {
    src: "assets/shop/233922d1-5e2a-4800-a7d7-e18e13bc4b62.JPG",
    zone: "Production Floor",
    title: "Production line view",
    caption: "Equipment and prepared materials arranged through the main workspace.",
    alt: "Portrait view of equipment and prepared materials in the workshop",
  },
  {
    src: "assets/shop/3f9fbbf1-f4cf-40ae-ac01-5aba92d89fe4.JPG",
    zone: "Production Floor",
    title: "Paper preparation area",
    caption: "Stacks of prepared sheets move through the workshop production process.",
    alt: "Prepared paper sheets and machinery inside the production room",
  },
  {
    src: "assets/shop/69b19c62-c98f-4f40-bd37-15144cd52db2.JPG",
    zone: "Production Floor",
    title: "Workshop aisle",
    caption: "A vertical view through the equipment and stock in the production room.",
    alt: "Workshop aisle with production equipment and paper stock",
  },
  {
    src: "assets/shop/6a275746-089f-4a64-beed-7b30b6f6fe0b.JPG",
    zone: "Production Floor",
    title: "Equipment and stock",
    caption: "Prepared materials remain close to the machinery for an efficient workflow.",
    alt: "Production machinery with nearby stacks of prepared materials",
  },
  {
    src: "assets/shop/53f9a975-d458-4134-96f5-d2d6c414ab01.JPG",
    zone: "Production Floor",
    title: "Cut sheets ready",
    caption: "Neatly prepared paper stacks positioned beside the cutting station.",
    alt: "Prepared paper stacks beside workshop cutting equipment",
  },
  {
    src: "assets/shop/551b05d0-960c-4a92-bb60-841dff58c328.JPG",
    zone: "Binding & Assembly",
    title: "Binding work area",
    caption: "Paper sections are arranged beside the binding equipment for assembly.",
    alt: "Binding equipment with arranged paper sections",
  },
  {
    src: "assets/shop/5944a03c-7bdf-402c-8102-eef0709a5053.JPG",
    zone: "Binding & Assembly",
    title: "Binding equipment",
    caption: "A closer look at the machinery used during the assembly process.",
    alt: "Industrial binding equipment inside the NSA Stationers workshop",
  },
  {
    src: "assets/shop/49e2aeb7-a862-44c2-827e-3fcbd027955b.JPG",
    zone: "Binding & Assembly",
    title: "Hand assembly",
    caption: "The team organises and finishes paper products by hand.",
    alt: "Team members assembling paper products by hand",
  },
  {
    src: "assets/shop/b63fdb79-d6c6-44f3-bc13-eee95ce1334e.JPG",
    zone: "Binding & Assembly",
    title: "Finishing together",
    caption: "A closer view of the team working through the final assembly stages.",
    alt: "NSA Stationers team completing paper product assembly",
  },
  {
    src: "assets/shop/90840d6d-eb2a-495c-8d77-92450356adca.JPG",
    zone: "Stock & Dispatch",
    title: "Finished stock",
    caption: "Completed paper products are stacked and kept ready for the next step.",
    alt: "Tall stack of finished paper products in the workshop",
  },
];

const storeStage = document.getElementById("storeStage");
const storeImage = document.getElementById("storeImage");
const storeZone = document.getElementById("storeZone");
const storeStatus = document.getElementById("storeStatus");
const storeCaptionTitle = document.getElementById("storeCaptionTitle");
const storeCaption = document.getElementById("storeCaption");
const storeCurrent = document.getElementById("storeCurrent");
const storePrevious = document.getElementById("storePrevious");
const storeNext = document.getElementById("storeNext");
const storeImageCount = document.querySelector(".store-walkthrough__image-count");
const storeZoneButtons = [...document.querySelectorAll("[data-store-slide]")];

if (
  storeStage &&
  storeImage &&
  storeZone &&
  storeStatus &&
  storeCaptionTitle &&
  storeCaption &&
  storeCurrent &&
  storePrevious &&
  storeNext &&
  storeImageCount
) {
  const storeReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let storeIndex = 0;
  let storePointerStart = null;
  let storeTransitioning = false;
  let storeTimer;

  const preloadStoreImage = (index) => {
    if (!storeSlides[index]) return;
    const image = new Image();
    image.src = storeSlides[index].src;
  };

  const updateStoreContent = (index) => {
    const slide = storeSlides[index];
    const formattedIndex = String(index + 1).padStart(2, "0");

    storeImage.src = slide.src;
    storeImage.alt = slide.alt;
    storeZone.textContent = slide.zone;
    storeCaptionTitle.textContent = slide.title;
    storeCaption.textContent = slide.caption;
    storeCurrent.textContent = formattedIndex;
    storeImageCount.textContent = formattedIndex;
    storePrevious.disabled = index === 0;
    storeNext.disabled = index === storeSlides.length - 1;

    storeZoneButtons.forEach((button) => {
      const zoneStart = Number(button.dataset.storeSlide);
      const nextButton = storeZoneButtons[storeZoneButtons.indexOf(button) + 1];
      const nextZoneStart = nextButton ? Number(nextButton.dataset.storeSlide) : storeSlides.length;
      const isActive = index >= zoneStart && index < nextZoneStart;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    preloadStoreImage(index + 1);
  };

  const showStoreSlide = (index) => {
    const targetIndex = Math.max(0, Math.min(index, storeSlides.length - 1));
    if (targetIndex === storeIndex || storeTransitioning) return;

    storeIndex = targetIndex;
    window.clearTimeout(storeTimer);

    if (storeReducedMotion.matches) {
      updateStoreContent(storeIndex);
      return;
    }

    storeTransitioning = true;
    storeStage.classList.add("is-changing");
    storeStatus.classList.add("is-changing");
    storeTimer = window.setTimeout(() => {
      updateStoreContent(storeIndex);
      window.requestAnimationFrame(() => {
        storeStage.classList.remove("is-changing");
        storeStatus.classList.remove("is-changing");
        storeTransitioning = false;
      });
    }, 180);
  };

  storePrevious.addEventListener("click", () => showStoreSlide(storeIndex - 1));
  storeNext.addEventListener("click", () => showStoreSlide(storeIndex + 1));
  storeZoneButtons.forEach((button) => {
    button.addEventListener("click", () => showStoreSlide(Number(button.dataset.storeSlide)));
  });

  storeStage.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    showStoreSlide(storeIndex + (event.key === "ArrowRight" ? 1 : -1));
  });

  storeStage.addEventListener("pointerdown", (event) => {
    if (!event.isPrimary) return;
    storePointerStart = event.clientX;
    storeStage.setPointerCapture?.(event.pointerId);
  });

  storeStage.addEventListener("pointerup", (event) => {
    if (storePointerStart === null || !event.isPrimary) return;
    const distance = event.clientX - storePointerStart;
    storePointerStart = null;
    if (Math.abs(distance) < 45) return;
    showStoreSlide(storeIndex + (distance < 0 ? 1 : -1));
  });

  storeStage.addEventListener("pointercancel", () => {
    storePointerStart = null;
  });

  preloadStoreImage(1);
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
