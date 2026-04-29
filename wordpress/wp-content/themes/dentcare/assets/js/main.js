(function () {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  function setBodyLock(locked) {
    document.body.classList.toggle("is-locked", locked);
  }

  function initHeader() {
    const header = $("[data-site-header]");
    if (!header) return;

    const toggle = $("[data-menu-toggle]", header);
    const mobileMenu = $("[data-mobile-menu]", header);
    const scrollTopLinks = $$("[data-scroll-top]");

    const applyScrolled = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 50);
    };
    applyScrolled();
    window.addEventListener("scroll", applyScrolled, { passive: true });

    if (toggle && mobileMenu) {
      toggle.addEventListener("click", () => {
        const open = !header.classList.contains("is-menu-open");
        header.classList.toggle("is-menu-open", open);
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });

      $$("a", mobileMenu).forEach((link) => {
        link.addEventListener("click", () => {
          header.classList.remove("is-menu-open");
          toggle.setAttribute("aria-expanded", "false");
        });
      });
    }

    scrollTopLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        if (link.getAttribute("href") && link.getAttribute("href") !== "#") return;
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
      });
    });
  }

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function initHero() {
    const root = $("[data-hero-slider]");
    if (!root) return;
    const images = $$("[data-hero-image]", root);
    const dots = $$("[data-hero-dot]", root);
    const count = $("[data-hero-count]", root);
    if (images.length <= 1) return;

    let index = 0;
    let timer = null;

    const render = (next) => {
      index = (next + images.length) % images.length;
      images.forEach((image, i) => image.classList.toggle("is-active", i === index));
      dots.forEach((dot, i) => dot.classList.toggle("is-active", i === index));
      if (count) {
        count.textContent = `${String(index + 1).padStart(2, "0")} / ${String(images.length).padStart(2, "0")}`;
      }
    };

    const start = () => {
      if (prefersReducedMotion()) return;
      timer = window.setInterval(() => render(index + 1), 6200);
    };

    const restart = () => {
      if (timer) window.clearInterval(timer);
      start();
    };

    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        render(Number(dot.dataset.heroDot || 0));
        restart();
      });
    });

    start();
  }

  function initProducts() {
    const root = $("[data-products]");
    if (!root) return;
    const tabs = $$("[data-product-tab]", root);
    const panels = $$("[data-product-panel]", root);
    const modal = $("[data-product-modal]", root);
    if (!modal) return;

    const modalImage = $("[data-modal-image]", modal);
    const modalTitle = $("[data-modal-title]", modal);
    const modalDescription = $("[data-modal-description]", modal);
    const modalTechnical = $("[data-modal-technical]", modal);
    const modalThumbs = $("[data-modal-thumbs]", modal);
    let lastProductTrigger = null;

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const key = tab.dataset.productTab;
        tabs.forEach((item) => item.classList.toggle("is-active", item === tab));
        panels.forEach((panel) => panel.classList.toggle("is-active", panel.dataset.productPanel === key));
      });
    });

    const setImage = (src, alt, activeButton) => {
      if (!modalImage) return;
      modalImage.src = src;
      modalImage.alt = alt || "";
      $$("button", modalThumbs).forEach((button) => button.classList.toggle("is-active", button === activeButton));
    };

    const openModal = (payload, trigger) => {
      lastProductTrigger = trigger;
      if (modalTitle) modalTitle.textContent = payload.title || "";
      if (modalDescription) modalDescription.textContent = payload.description || "";
      if (modalTechnical) modalTechnical.textContent = payload.technical || "";
      if (modalThumbs) modalThumbs.innerHTML = "";

      const images = Array.isArray(payload.images) ? payload.images : [];
      images.forEach((src, index) => {
        const button = document.createElement("button");
        button.type = "button";
        const img = document.createElement("img");
        img.src = src;
        img.alt = payload.title || "";
        button.appendChild(img);
        button.addEventListener("click", () => setImage(src, payload.title, button));
        modalThumbs.appendChild(button);
        if (index === 0) setImage(src, payload.title, button);
      });

      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      setBodyLock(true);
      const close = $("[data-modal-close]", modal);
      if (close) close.focus();
    };

    const closeModal = () => {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      setBodyLock(false);
      if (lastProductTrigger) lastProductTrigger.focus();
    };

    $$("[data-product-detail]", root).forEach((card) => {
      const activate = () => {
        try {
          openModal(JSON.parse(card.dataset.productDetail || "{}"), card);
        } catch (error) {
          console.error("Invalid product detail payload", error);
        }
      };
      card.addEventListener("click", activate);
      card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          activate();
        }
      });
    });

    $$("[data-modal-close]", modal).forEach((button) => button.addEventListener("click", closeModal));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && modal.classList.contains("is-open")) closeModal();
    });
  }

  function initClinical() {
    const root = $("[data-clinical]");
    if (!root) return;
    const modal = $("[data-lightbox-modal]", root);
    if (!modal) return;

    const image = $("[data-lightbox-image]", modal);
    const caption = $("[data-lightbox-caption]", modal);
    const prev = $("[data-lightbox-prev]", modal);
    const next = $("[data-lightbox-next]", modal);
    const closeButtons = $$("[data-lightbox-close]", modal);
    let state = { items: [], index: 0, opener: null };

    const render = () => {
      const current = state.items[state.index];
      if (!current) return;
      image.src = current.src;
      image.alt = current.alt || "";
      caption.textContent = current.alt || "";
      const multiple = state.items.length > 1;
      prev.hidden = !multiple;
      next.hidden = !multiple;
    };

    const open = (payload, opener) => {
      state.opener = opener;
      if (payload.type === "gallery") {
        state.items = payload.items || [];
        state.index = payload.index || 0;
      } else {
        state.items = [{ src: payload.src, alt: payload.alt }];
        state.index = 0;
      }
      render();
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      setBodyLock(true);
      const close = $("[data-lightbox-close]", modal);
      if (close) close.focus();
    };

    const close = () => {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      setBodyLock(false);
      if (state.opener) state.opener.focus();
    };

    const move = (delta) => {
      if (state.items.length < 2) return;
      state.index = (state.index + delta + state.items.length) % state.items.length;
      render();
    };

    $$("[data-lightbox]", root).forEach((trigger) => {
      trigger.addEventListener("click", () => {
        try {
          open(JSON.parse(trigger.dataset.lightbox || "{}"), trigger);
        } catch (error) {
          console.error("Invalid lightbox payload", error);
        }
      });
    });

    closeButtons.forEach((button) => button.addEventListener("click", close));
    prev.addEventListener("click", () => move(-1));
    next.addEventListener("click", () => move(1));

    document.addEventListener("keydown", (event) => {
      if (!modal.classList.contains("is-open")) return;
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") move(-1);
      if (event.key === "ArrowRight") move(1);
    });
  }

  function initPolicies() {
    const root = $("[data-policies]");
    if (!root) return;
    const buttons = $$("[data-policy]", root);
    const output = $("[data-policy-output]", root);
    buttons.forEach((button, index) => {
      if (index === 0) button.classList.add("is-active");
      button.addEventListener("click", () => {
        buttons.forEach((item) => item.classList.toggle("is-active", item === button));
        if (output) output.textContent = button.dataset.policyDetail || "";
      });
    });
  }

  function initFaq() {
    const root = $("[data-faq]");
    if (!root) return;
    $$(".faq-item", root).forEach((item) => {
      const button = $("button", item);
      if (!button) return;
      button.addEventListener("click", () => {
        const open = !item.classList.contains("is-open");
        $$(".faq-item", root).forEach((other) => {
          other.classList.remove("is-open");
          const otherButton = $("button", other);
          if (otherButton) otherButton.setAttribute("aria-expanded", "false");
        });
        item.classList.toggle("is-open", open);
        button.setAttribute("aria-expanded", open ? "true" : "false");
      });
    });
  }

  function initScrollTop() {
    const button = $("[data-scroll-top-button]");
    if (!button) return;
    const toggle = () => button.classList.toggle("is-visible", window.scrollY > 300);
    toggle();
    window.addEventListener("scroll", toggle, { passive: true });
    button.addEventListener("click", () => window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" }));
  }

  function initContactFormState() {
    document.addEventListener("wpcf7submit", (event) => {
      const form = event.target;
      if (!form) return;
      form.classList.remove("is-sending");
    });
    document.addEventListener("wpcf7beforesubmit", (event) => {
      const form = event.target;
      if (form) form.classList.add("is-sending");
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initHeader();
    initHero();
    initProducts();
    initClinical();
    initPolicies();
    initFaq();
    initScrollTop();
    initContactFormState();
  });
})();

