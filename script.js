/* =========================================
   Majestic Villa Lidija – script.js
   Tabs, Accordions, Form, and UX logic
   ========================================= */

// Run when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  // Render Lucide icons
  lucide.createIcons();

  /* ---------- Tabs Logic ---------- */
  const tabs = document.querySelectorAll(".tab-btn");
  const panels = document.querySelectorAll(".tab-panel");

  function activateTab(targetId) {
    panels.forEach((panel) => {
      const active = panel.id === targetId;
      panel.classList.toggle("active", active);
      panel.setAttribute("aria-hidden", !active);
    });

    tabs.forEach((tab) => {
      const selected = tab.dataset.tab === targetId;
      tab.setAttribute("aria-selected", selected);
    });

    // Scroll to main content (useful for mobile)
    const y =
      document.querySelector("main").getBoundingClientRect().top +
      window.scrollY -
      12;
    window.scrollTo({ top: y, behavior: "smooth" });
  }

  tabs.forEach((btn) => {
    btn.addEventListener("click", () => activateTab(btn.dataset.tab));
    btn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        activateTab(btn.dataset.tab);
      }
    });
  });

  // Allow jump links to open a tab
  document.querySelectorAll("[data-jump]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const id = el.getAttribute("data-jump");
      activateTab(id);
    });
  });

  /* ---------- Accordion Logic ---------- */
  document.querySelectorAll(".acc-head").forEach((head) => {
    head.addEventListener("click", () => {
      const item = head.closest(".acc-item");
      item.classList.toggle("open");
    });
  });

  /* ---------- Add-ons Form ---------- */
  const form = document.getElementById("addonsForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const subj = encodeURIComponent("Villa Lidija Add-on Request");
      const body = encodeURIComponent(
        `Name: ${data.get("name") || ""}
Email: ${data.get("email") || ""}
Phone: ${data.get("phone") || ""}
Service: ${data.get("service") || ""}
Preferred Date/Time: ${data.get("datetime") || ""}

Notes:
${data.get("notes") || ""}`
      );
      window.location.href = `mailto:concierge@irundo.com?subject=${subj}&body=${body}`;
    });
  }

  /* ---------- Dynamic Footer Year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Mobile Horizontal Tab Scroll (with fades & hint) ---------- */
  const tabContainer = document.querySelector(".tabs");
  if (tabContainer) {
    const updateTabShadows = () => {
      const maxScroll = tabContainer.scrollWidth - tabContainer.clientWidth;
      const scrolled = tabContainer.scrollLeft > 2;
      const atEnd = tabContainer.scrollLeft >= maxScroll - 2;

      tabContainer.classList.toggle("is-scrolled", scrolled);
      tabContainer.classList.toggle("is-end", atEnd);
    };

    requestAnimationFrame(updateTabShadows);
    tabContainer.addEventListener("scroll", updateTabShadows, { passive: true });
    window.addEventListener("resize", updateTabShadows);
  }

  /* ---------- Language Switch (JSON-based) ---------- */
  async function setLanguage(lang) {
    try {
      const res = await fetch(`lang-${lang}.json`);
      const translations = await res.json();

      document.querySelectorAll("[data-translate]").forEach((el) => {
        const key = el.dataset.translate;
        if (translations[key]) el.innerHTML = translations[key];
      });

      localStorage.setItem("villaLang", lang);

      document.querySelectorAll(".lang-btn").forEach((btn) =>
        btn.classList.toggle("active", btn.dataset.lang === lang)
      );
    } catch (err) {
      console.error("Translation load error:", err);
    }
  }

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
  });

  // Load saved language or default English
  setLanguage(localStorage.getItem("villaLang") || "en");

  /* ---------- Header shadow on scroll ---------- */
  const header = document.querySelector(".header");
  const toggleHeaderShadow = () => {
    if (!header) return;
    header.classList.toggle("shadow", window.scrollY > 12);
  };
  toggleHeaderShadow();
  window.addEventListener("scroll", toggleHeaderShadow, { passive: true });
});
