/* =========================================
   Villa Guide - Improved JavaScript
   All interactive features
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide icons
  lucide.createIcons();

  /* ========================================= */
  /* HAMBURGER MENU */
  /* ========================================= */
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  const navClose = document.getElementById('navClose');

  // Open menu
  menuToggle?.addEventListener('click', () => {
    mainNav.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Mark as seen (stop pulsing animation)
    menuToggle.classList.add('seen');
    localStorage.setItem('menuSeen', 'true');
  });

  // Close menu via X button
  navClose?.addEventListener('click', () => {
    mainNav.classList.remove('active');
    document.body.style.overflow = '';
  });

  // Close menu when clicking outside
  mainNav?.addEventListener('click', (e) => {
    if (e.target === mainNav) {
      mainNav.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Check if user has seen menu before
  if (localStorage.getItem('menuSeen')) {
    menuToggle?.classList.add('seen');
  }

  /* ========================================= */
  /* TABS NAVIGATION */
  /* ========================================= */
  const tabs = document.querySelectorAll(".tab-btn");
  const panels = document.querySelectorAll(".tab-panel");

  function activateTab(targetId) {
    // Update panels
    panels.forEach((panel) => {
      const active = panel.id === targetId;
      panel.classList.toggle("active", active);
      panel.setAttribute("aria-hidden", !active);
    });

    // Update tabs
    tabs.forEach((tab) => {
      const selected = tab.dataset.tab === targetId;
      tab.setAttribute("aria-selected", selected);
    });

    // Close mobile menu if open
    if (window.innerWidth <= 768) {
      mainNav.classList.remove('active');
      document.body.style.overflow = '';
    }

    // Scroll to main content
    const y = document.querySelector("main").getBoundingClientRect().top + window.scrollY - 12;
    window.scrollTo({ top: y, behavior: "smooth" });
  }

  // Tab click events
  tabs.forEach((btn) => {
    btn.addEventListener("click", () => activateTab(btn.dataset.tab));
    btn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        activateTab(btn.dataset.tab);
      }
    });
  });

  // Jump links (from Quick Start cards, Help popup, etc.)
  document.querySelectorAll("[data-jump]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const id = el.getAttribute("data-jump");
      activateTab(id);
    });
  });

  /* ========================================= */
  /* ACCORDION */
  /* ========================================= */
  document.querySelectorAll(".acc-head").forEach((head) => {
    head.addEventListener("click", () => {
      const item = head.closest(".acc-item");
      item.classList.toggle("open");
    });
  });

  /* ========================================= */
  /* SCROLL HINT */
  /* ========================================= */
  const scrollHint = document.getElementById('scrollHint');
  
  // Hide scroll hint after user scrolls
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100 && scrollHint) {
      scrollHint.classList.add('hidden');
    }
  }, { once: true });

  /* ========================================= */
  /* FLOATING HELP BUTTON */
  /* ========================================= */
  const floatingHelp = document.getElementById('floatingHelp');
  const helpPopup = document.getElementById('helpPopup');
  const helpClose = document.getElementById('helpClose');

  // Open help popup
  floatingHelp?.addEventListener('click', () => {
    helpPopup.classList.add('active');
    document.body.style.overflow = 'hidden';
    lucide.createIcons(); // Refresh icons in popup
  });

  // Close help popup via X button
  helpClose?.addEventListener('click', () => {
    helpPopup.classList.remove('active');
    document.body.style.overflow = '';
  });

  // Close help popup when clicking outside
  helpPopup?.addEventListener('click', (e) => {
    if (e.target === helpPopup) {
      helpPopup.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  /* ========================================= */
  /* ADD-ONS FORM */
  /* ========================================= */
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

  /* ========================================= */
  /* HEADER SHADOW ON SCROLL */
  /* ========================================= */
  const header = document.querySelector(".header");
  
  const toggleHeaderShadow = () => {
    if (!header) return;
    header.classList.toggle("shadow", window.scrollY > 12);
  };
  
  toggleHeaderShadow();
  window.addEventListener("scroll", toggleHeaderShadow, { passive: true });

  /* ========================================= */
  /* MOBILE TAB SCROLLING (HORIZONTAL) */
  /* ========================================= */
  const tabContainer = document.querySelector(".tabs");
  
  if (tabContainer && window.innerWidth > 768) {
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

  /* ========================================= */
  /* LANGUAGE SWITCH */
  /* ========================================= */
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

  /* ========================================= */
  /* DYNAMIC FOOTER YEAR */
  /* ========================================= */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ========================================= */
  /* ACCESSIBILITY: ESC KEY TO CLOSE MODALS */
  /* ========================================= */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      // Close mobile menu
      if (mainNav?.classList.contains('active')) {
        mainNav.classList.remove('active');
        document.body.style.overflow = '';
      }
      
      // Close help popup
      if (helpPopup?.classList.contains('active')) {
        helpPopup.classList.remove('active');
        document.body.style.overflow = '';
      }
    }
  });

  /* ========================================= */
  /* CONSOLE MESSAGE */
  /* ========================================= */
  console.log('🏡 Villa Guide loaded successfully!');
  console.log('📱 Mobile-optimized with hamburger menu');
  console.log('✨ Quick Start cards ready');
  console.log('🆘 Floating Help button active');
});
