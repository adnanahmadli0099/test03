(function () {
  const B = window.BUSINESS || {};
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const safe = (value, fallback = "") => (typeof value === "string" && value.trim()) ? value.trim() : fallback;

  $$("[data-business-name]").forEach(el => el.textContent = safe(B.name, "Your Business Name"));
  $$("[data-business-category]").forEach(el => el.textContent = safe(B.category, "Your Business Category"));
  $$("[data-business-tagline]").forEach(el => el.textContent = safe(B.tagline, "Helpful service. Clear communication."));
  $$("[data-business-address]").forEach(el => el.textContent = safe(B.address, "Add verified business address"));
  $$("[data-business-city]").forEach(el => el.textContent = safe(B.city, "Your City"));
  $$("[data-business-area]").forEach(el => el.textContent = safe(B.serviceArea, "Add verified service area"));
  $$("[data-business-hours]").forEach(el => el.textContent = safe(B.hours, "Add verified opening hours"));
  $$("[data-business-phone]").forEach(el => el.textContent = safe(B.phoneDisplay, "Add verified phone number"));
  $$("[data-business-email]").forEach(el => {
    el.textContent = safe(B.email, "Add verified email");
    if (B.email && B.email.includes("@") && !B.email.includes("example.com")) el.href = "mailto:" + B.email;
    else el.removeAttribute("href");
  });
  $$("[data-current-year]").forEach(el => el.textContent = new Date().getFullYear());

  $$("[data-phone-link]").forEach(el => {
    if (B.phoneLink && /^\+?[0-9]{7,16}$/.test(B.phoneLink)) el.href = "tel:" + B.phoneLink;
    else { el.href = "#contact"; el.addEventListener("click", () => alert("Please add a verified phone number in assets/js/config.js.")); }
  });
  $$("[data-whatsapp-link]").forEach(el => {
    if (B.whatsapp && /^[0-9]{8,15}$/.test(B.whatsapp)) {
      el.href = "https://wa.me/" + B.whatsapp;
      el.target = "_blank"; el.rel = "noopener noreferrer";
    } else {
      el.href = "#contact";
      el.addEventListener("click", () => alert("Please add a verified WhatsApp number in assets/js/config.js."));
    }
  });
  $$("[data-maps-link]").forEach(el => {
    const url = safe(B.mapsUrl);
    if (url.startsWith("https://")) { el.href = url; el.target = "_blank"; el.rel = "noopener noreferrer"; }
    else { el.href = "#contact"; }
  });
  $$("[data-reviews-link]").forEach(el => {
    if (B.googleReviewsUrl && B.googleReviewsUrl.startsWith("https://")) {
      el.href = B.googleReviewsUrl; el.target = "_blank"; el.rel = "noopener noreferrer";
    } else {
      el.href = "#reviews";
      el.addEventListener("click", (e) => { if (el.getAttribute("href") === "#reviews") { e.preventDefault(); alert("Add the verified Google reviews URL in assets/js/config.js."); } });
    }
  });
  $$("[data-social='instagram']").forEach(el => { if (B.instagramUrl && B.instagramUrl.startsWith("https://")) el.href = B.instagramUrl; else el.hidden = true; });
  $$("[data-social='facebook']").forEach(el => { if (B.facebookUrl && B.facebookUrl.startsWith("https://")) el.href = B.facebookUrl; else el.hidden = true; });

  const toggle = $(".nav-toggle");
  const nav = $(".nav-links");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
    });
    $$(".nav-links a").forEach(a => a.addEventListener("click", () => {
      nav.classList.remove("open"); toggle.setAttribute("aria-expanded", "false");
    }));
  }

  const path = location.pathname.split("/").pop() || "index.html";
  $$("[data-nav]").forEach(a => {
    if (a.getAttribute("href") === path) a.setAttribute("aria-current", "page");
  });

  const form = $("#contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const status = $("#form-status");
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      const message = String(data.get("message") || "").trim();
      if (!name || !message) {
        status.className = "form-status error";
        status.textContent = "Please complete the required fields.";
        return;
      }
      status.className = "form-status success";
      status.textContent = "Demo form validated. No message has been sent yet. Connect a form backend or email service before publishing.";
      form.reset();
    });
  }

  const modal = $("#gallery-modal");
  if (modal) {
    const modalImg = $("img", modal);
    const close = $(".modal-close", modal);
    $$(".gallery-item").forEach(btn => btn.addEventListener("click", () => {
      const img = $("img", btn);
      if (!img) return;
      modalImg.src = img.src; modalImg.alt = img.alt;
      modal.classList.add("open"); modal.setAttribute("aria-hidden", "false");
      if (close) close.focus();
    }));
    const closeModal = () => { modal.classList.remove("open"); modal.setAttribute("aria-hidden", "true"); };
    if (close) close.addEventListener("click", closeModal);
    modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
    document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });
  }
})();
