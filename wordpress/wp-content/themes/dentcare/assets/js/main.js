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

    let scrollTick = false;
    const applyScrolled = () => {
      if (scrollTick) return;
      scrollTick = true;
      requestAnimationFrame(() => {
        header.classList.toggle("is-scrolled", window.scrollY > 50);
        scrollTick = false;
      });
    };
    requestAnimationFrame(() => applyScrolled());
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

  function initLanguageSwitcher() {
    const root = $("[data-language-switcher]");
    if (!root) return;
    const toggle = $(".language-switcher__toggle", root);
    if (!toggle) return;

    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const open = !root.classList.contains("is-open");
      root.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    document.addEventListener("click", (e) => {
      if (!root.contains(e.target)) {
        root.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && root.classList.contains("is-open")) {
        root.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
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

    const modalImageCount = $("[data-modal-image-count]", modal);

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
      if (modalImageCount) modalImageCount.textContent = `${images.length} images`;

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
    const title = $("[data-lightbox-title]", modal);
    const counter = $("[data-lightbox-counter]", modal);
    const thumbs = $("[data-lightbox-thumbs]", modal);
    const prev = $("[data-lightbox-prev]", modal);
    const next = $("[data-lightbox-next]", modal);
    const closeButtons = $$("[data-lightbox-close]", modal);
    let state = { type: "single", title: "", items: [], index: 0, opener: null };

    const render = () => {
      const current = state.items[state.index];
      if (!current) return;

      image.src = current.src;
      image.alt = current.alt || "";

      if (state.type === "gallery") {
        title.textContent = state.title;
        counter.textContent = `${state.index + 1} / ${state.items.length}`;
        title.hidden = false;
        counter.hidden = false;
      } else {
        title.hidden = true;
        counter.hidden = true;
      }

      const multiple = state.items.length > 1;
      prev.style.display = multiple ? "flex" : "none";
      next.style.display = multiple ? "flex" : "none";

      // Thumbs
      thumbs.innerHTML = "";
      if (multiple) {
        state.items.forEach((item, idx) => {
          const btn = document.createElement("button");
          btn.type = "button";
          btn.className = `lightbox__thumb ${idx === state.index ? "is-active" : ""}`;
          btn.innerHTML = `<img src="${item.src}" alt="">`;
          btn.addEventListener("click", () => {
            state.index = idx;
            render();
          });
          thumbs.appendChild(btn);
        });
        thumbs.style.display = "flex";
      } else {
        thumbs.style.display = "none";
      }
    };

    const open = (payload, opener) => {
      state.opener = opener;
      state.type = payload.type;
      if (payload.type === "gallery") {
        state.title = payload.title || "";
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
      const closeBtn = $("[data-lightbox-close]", modal);
      if (closeBtn) closeBtn.focus();
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
    const tabs = $$("[data-policy-tab]", root);
    const panel = $("[data-policy-panel]", root);
    const panelTitle = $("[data-policy-panel-title]", panel);
    const panelDescription = $("[data-policy-panel-description]", panel);
    const panelAction = $("[data-policy-panel-action]", panel);

    if (!tabs.length) return;

    const activate = (tab) => {
      const { policyTab, policyTitle, policyDescription } = tab.dataset;
      
      // Update UI
      tabs.forEach((t) => t.classList.toggle("is-active", t === tab));
      
      if (panelTitle) panelTitle.textContent = policyTitle || "";
      if (panelDescription) panelDescription.textContent = policyDescription || "";
      
      // Show action button only for 'terms' (CGV)
      if (panelAction) {
        panelAction.style.display = (policyTab === "terms") ? "block" : "none";
      }
    };

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => activate(tab));
    });

    // Auto-activate first tab
    activate(tabs[0]);
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
    let scrollTick = false;
    const toggle = () => {
      if (scrollTick) return;
      scrollTick = true;
      requestAnimationFrame(() => {
        button.classList.toggle("is-visible", window.scrollY > 300);
        scrollTick = false;
      });
    };
    requestAnimationFrame(() => toggle());
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
    initLanguageSwitcher();
    initHero();
    initProducts();
    initClinical();
    initPolicies();
    initFaq();
    initScrollTop();
    initContactFormState();
  });
})();

