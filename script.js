const WHATSAPP_NUMBER = "919952095668";
const WHATSAPP_MESSAGE = "Hello NSA Stationers, I would like to know more about your products and services.";
const siteSplash = document.getElementById("siteSplash");

if (siteSplash) {
  const reducedIntroMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const splashDuration = reducedIntroMotion ? 250 : 2350;
  document.body.classList.add("splash-active");
  if (!reducedIntroMotion) document.body.classList.add("home-intro-pending");

  window.setTimeout(() => {
    siteSplash.classList.add("is-closing");
    document.body.classList.remove("splash-active");
    if (!reducedIntroMotion) {
      window.requestAnimationFrame(() => document.body.classList.add("home-intro-playing"));
      window.setTimeout(() => {
        document.body.classList.remove("home-intro-pending", "home-intro-playing");
      }, 1700);
    }

    window.setTimeout(() => {
      siteSplash.hidden = true;
    }, 550);
  }, splashDuration);
}

const floatingWhatsAppLink = document.getElementById("floatingWhatsApp");
const normalizedWhatsAppNumber = WHATSAPP_NUMBER.replace(/\D/g, "");

if (floatingWhatsAppLink) {
  floatingWhatsAppLink.href = `https://wa.me/${normalizedWhatsAppNumber}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
}

const revealElements = document.querySelectorAll(".reveal");

document.querySelectorAll(".category-grid, .catalog-category-grid, .product-grid, .featured-track, .paper-trail__stages, .promo-bands").forEach((grid) => {
  grid.querySelectorAll(".reveal").forEach((element, index) => {
    const delayStep = grid.classList.contains("paper-trail__stages")
      ? 160
      : grid.classList.contains("catalog-category-grid")
        ? 90
      : grid.classList.contains("promo-bands")
        ? 140
        : 45;
    const maximumDelay = grid.classList.contains("catalog-category-grid") ? 540 : 440;
    element.style.setProperty("--reveal-delay", `${Math.min(index * delayStep, maximumDelay)}ms`);
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

const typewriterHeading = document.querySelector("[data-typewriter]");

if (typewriterHeading) {
  const typewriterOutput = typewriterHeading.querySelector(".typewriter-heading__text");
  const typewriterText = typewriterHeading.dataset.typewriter || "";
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let typewriterStarted = false;

  const showTypewriterText = () => {
    if (!typewriterOutput) return;
    typewriterOutput.textContent = typewriterText;
    typewriterHeading.classList.add("is-complete");
  };

  const startTypewriter = () => {
    if (typewriterStarted || !typewriterOutput) return;
    typewriterStarted = true;
    typewriterHeading.classList.add("is-typing");
    let characterIndex = 0;

    const typeNextCharacter = () => {
      characterIndex += 1;
      typewriterOutput.textContent = typewriterText.slice(0, characterIndex);

      if (characterIndex < typewriterText.length) {
        const character = typewriterText[characterIndex - 1];
        const typingDelay = /[,.]/.test(character) ? 150 : character === " " ? 24 : 48;
        window.setTimeout(typeNextCharacter, typingDelay);
      } else {
        typewriterHeading.classList.remove("is-typing");
        typewriterHeading.classList.add("is-complete");
      }
    };

    typeNextCharacter();
  };

  if (prefersReducedMotion) {
    showTypewriterText();
  } else if ("IntersectionObserver" in window) {
    const typewriterObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        startTypewriter();
        typewriterObserver.disconnect();
      }
    }, { threshold: 0.55 });

    typewriterObserver.observe(typewriterHeading);
  } else {
    startTypewriter();
  }
}

const heroShopStrip = document.querySelector(".hero-shop-strip");

if (heroShopStrip) {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const heroShopTrack = heroShopStrip.querySelector(".hero-shop-track");
  let isDragging = false;
  let dragStartX = 0;
  let dragStartScroll = 0;
  let autoScrollFrame;
  let autoScrollLastTime;
  let autoScrollResumeTimer;
  let autoScrollPaused = false;
  let heroStripInView = true;

  if (heroShopTrack && !reduceMotion.matches) {
    const originalImages = [...heroShopTrack.querySelectorAll("img")];

    originalImages.forEach((image) => {
      const clone = image.cloneNode(true);
      clone.alt = "";
      clone.setAttribute("aria-hidden", "true");
      clone.loading = "lazy";
      clone.dataset.heroClone = "true";
      heroShopTrack.appendChild(clone);
    });

    const firstClone = heroShopTrack.querySelector("[data-hero-clone='true']");
    heroShopStrip.classList.add("has-auto-scroll");

    const pauseAutoScroll = () => {
      autoScrollPaused = true;
      heroShopStrip.classList.add("is-auto-paused");
      window.clearTimeout(autoScrollResumeTimer);
    };

    const resumeAutoScroll = (delay = 0) => {
      window.clearTimeout(autoScrollResumeTimer);
      autoScrollResumeTimer = window.setTimeout(() => {
        autoScrollPaused = false;
        autoScrollLastTime = undefined;
        heroShopStrip.classList.remove("is-auto-paused");
      }, delay);
    };

    const runHeroAutoScroll = (time) => {
      if (!autoScrollPaused && heroStripInView && !document.hidden && !document.body.classList.contains("splash-active") && firstClone) {
        if (autoScrollLastTime !== undefined) {
          const elapsed = Math.min(time - autoScrollLastTime, 32);
          heroShopStrip.scrollLeft += elapsed * 0.032;

          const loopPoint = firstClone.offsetLeft - originalImages[0].offsetLeft;
          if (loopPoint > 0 && heroShopStrip.scrollLeft >= loopPoint) {
            heroShopStrip.scrollLeft -= loopPoint;
          }
        }
        autoScrollLastTime = time;
      } else {
        autoScrollLastTime = undefined;
      }

      autoScrollFrame = window.requestAnimationFrame(runHeroAutoScroll);
    };

    heroShopStrip.addEventListener("mouseenter", pauseAutoScroll);
    heroShopStrip.addEventListener("mouseleave", () => resumeAutoScroll(500));
    heroShopStrip.addEventListener("focusin", pauseAutoScroll);
    heroShopStrip.addEventListener("focusout", () => resumeAutoScroll(700));
    heroShopStrip.addEventListener("pointerdown", pauseAutoScroll);
    heroShopStrip.addEventListener("pointerup", () => resumeAutoScroll(1200));
    heroShopStrip.addEventListener("pointercancel", () => resumeAutoScroll(1200));

    if ("IntersectionObserver" in window) {
      const heroStripObserver = new IntersectionObserver(([entry]) => {
        heroStripInView = entry.isIntersecting;
        autoScrollLastTime = undefined;
      }, { threshold: 0.08 });
      heroStripObserver.observe(heroShopStrip);
    }

    autoScrollFrame = window.requestAnimationFrame(runHeroAutoScroll);
  }

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
  const featuredProgress = featuredCurrent.closest(".featured-progress");
  const featuredAutoplayDelay = 4600;
  const featuredPauseReasons = new Set(["viewport"]);
  let featuredIndex = 0;
  let lastFeaturedIndex = -1;
  let featuredFrame;
  let featuredAutoplayTimer;

  const updateFeaturedState = () => {
    const trackLeft = featuredTrack.getBoundingClientRect().left;
    featuredIndex = featuredCards.reduce((closest, card, index) => {
      const distance = Math.abs(card.getBoundingClientRect().left - trackLeft);
      return distance < closest.distance ? { index, distance } : closest;
    }, { index: 0, distance: Number.POSITIVE_INFINITY }).index;

    if (featuredIndex !== lastFeaturedIndex) {
      const direction = lastFeaturedIndex < 0 || featuredIndex > lastFeaturedIndex ? "forward" : "backward";
      featuredTrack.dataset.direction = direction;
      featuredCards.forEach((card, index) => {
        card.classList.toggle("is-active", index === featuredIndex);
        card.classList.remove("is-entering");
      });

      const activeCard = featuredCards[featuredIndex];
      if (activeCard && !reducedMotion.matches) {
        void activeCard.offsetWidth;
        activeCard.classList.add("is-entering");
      }

      lastFeaturedIndex = featuredIndex;
    }

    featuredCurrent.textContent = String(featuredIndex + 1).padStart(2, "0");
    featuredPrevious.disabled = featuredTrack.scrollLeft <= 2;
    featuredNext.disabled = featuredTrack.scrollLeft >= featuredTrack.scrollWidth - featuredTrack.clientWidth - 2;
    featuredFrame = null;
  };

  const scrollToFeaturedCard = (index) => {
    const targetIndex = Math.max(0, Math.min(index, featuredCards.length - 1));
    featuredTrack.dataset.direction = targetIndex >= featuredIndex ? "forward" : "backward";
    const target = featuredCards[targetIndex];
    featuredTrack.scrollTo({
      left: target.offsetLeft - featuredTrack.offsetLeft,
      behavior: reducedMotion.matches ? "auto" : "smooth",
    });
  };

  const stopFeaturedAutoplayClock = () => {
    window.clearTimeout(featuredAutoplayTimer);
    featuredProgress?.classList.remove("is-counting");
  };

  const scheduleFeaturedAutoplay = (delay = featuredAutoplayDelay) => {
    stopFeaturedAutoplayClock();
    if (reducedMotion.matches || featuredPauseReasons.size > 0 || document.hidden) return;

    if (featuredProgress) {
      featuredProgress.style.setProperty("--featured-autoplay-duration", `${delay}ms`);
      void featuredProgress.offsetWidth;
      featuredProgress.classList.add("is-counting");
    }

    featuredAutoplayTimer = window.setTimeout(() => {
      const nextIndex = featuredIndex >= featuredCards.length - 1 ? 0 : featuredIndex + 1;
      scrollToFeaturedCard(nextIndex);
      scheduleFeaturedAutoplay();
    }, delay);
  };

  const pauseFeaturedAutoplay = (reason) => {
    featuredPauseReasons.add(reason);
    stopFeaturedAutoplayClock();
  };

  const resumeFeaturedAutoplay = (reason, delay = featuredAutoplayDelay) => {
    featuredPauseReasons.delete(reason);
    scheduleFeaturedAutoplay(delay);
  };

  const manuallyScrollFeatured = (index) => {
    stopFeaturedAutoplayClock();
    scrollToFeaturedCard(index);
    scheduleFeaturedAutoplay();
  };

  featuredPrevious.addEventListener("click", () => manuallyScrollFeatured(featuredIndex - 1));
  featuredNext.addEventListener("click", () => manuallyScrollFeatured(featuredIndex + 1));
  featuredTrack.addEventListener("scroll", () => {
    if (!featuredFrame) featuredFrame = window.requestAnimationFrame(updateFeaturedState);
  }, { passive: true });
  featuredTrack.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    manuallyScrollFeatured(featuredIndex + (event.key === "ArrowRight" ? 1 : -1));
  });
  featuredTrack.addEventListener("mouseenter", () => pauseFeaturedAutoplay("hover"));
  featuredTrack.addEventListener("mouseleave", () => resumeFeaturedAutoplay("hover", 1800));
  featuredTrack.addEventListener("focusin", () => pauseFeaturedAutoplay("focus"));
  featuredTrack.addEventListener("focusout", (event) => {
    if (!featuredTrack.contains(event.relatedTarget)) resumeFeaturedAutoplay("focus", 1800);
  });
  featuredTrack.addEventListener("pointerdown", () => pauseFeaturedAutoplay("pointer"));
  featuredTrack.addEventListener("pointerup", () => resumeFeaturedAutoplay("pointer", 1800));
  featuredTrack.addEventListener("pointercancel", () => resumeFeaturedAutoplay("pointer", 1800));

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) pauseFeaturedAutoplay("hidden");
    else resumeFeaturedAutoplay("hidden");
  });

  if ("IntersectionObserver" in window) {
    const featuredObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) resumeFeaturedAutoplay("viewport");
      else pauseFeaturedAutoplay("viewport");
    }, { threshold: 0.25 });
    featuredObserver.observe(featuredTrack);
  } else {
    resumeFeaturedAutoplay("viewport");
  }

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
const contactNavTargets = navTargets.filter(({ target }) => target.id === "contact");
let preferredContactNavLink = null;
let navFrame;

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    preferredContactNavLink = link.getAttribute("href") === "#contact" ? link : null;
    if (!navFrame) navFrame = window.requestAnimationFrame(updateActiveNav);
  });
});

const updateActiveNav = () => {
  const marker = window.scrollY + 150;
  let active = navTargets[0];

  navTargets.forEach((item) => {
    if (item.target.offsetTop <= marker) active = item;
  });

  const contactTarget = document.getElementById("contact");
  const pageBottom = window.scrollY + window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const contactIsVisible = contactTarget
    && contactTarget.getBoundingClientRect().top <= window.innerHeight * 0.82;
  const isAtPageBottom = pageBottom >= documentHeight - 8;

  if (contactNavTargets.length && (contactIsVisible || isAtPageBottom)) {
    active = contactNavTargets.find(({ link }) => link === preferredContactNavLink)
      || contactNavTargets[contactNavTargets.length - 1];
  }

  navLinks.forEach((link) => {
    const isActive = link === active?.link;
    link.classList.toggle("is-active", isActive);
    if (isActive) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
  navFrame = null;
};

window.addEventListener("scroll", () => {
  if (!navFrame) navFrame = window.requestAnimationFrame(updateActiveNav);
}, { passive: true });
window.addEventListener("resize", () => {
  if (!navFrame) navFrame = window.requestAnimationFrame(updateActiveNav);
});
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
