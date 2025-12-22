/* =========================================
   Villa Guide - Improved JavaScript
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  /* ========================================= */
  /* HAMBURGER MENU - FIX */
  /* ========================================= */
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  const navClose = document.getElementById('navClose');

  // Open menu
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('Menu toggle clicked!'); // Debug
      mainNav.classList.add('active');
      // DON'T lock body scroll - that's the problem!
      // document.body.style.overflow = 'hidden'; // <- Remove this
      
      // Mark as seen
      menuToggle.classList.add('seen');
      localStorage.setItem('menuSeen', 'true');
    });
  }

  // Close menu via X button
  if (navClose && mainNav) {
    navClose.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('Nav close clicked!'); // Debug
      mainNav.classList.remove('active');
      // document.body.style.overflow = ''; // <- Remove this
    });
  }

  // Close menu when clicking backdrop
  if (mainNav) {
    mainNav.addEventListener('click', (e) => {
      if (e.target === mainNav) {
        console.log('Backdrop clicked!'); // Debug
        mainNav.classList.remove('active');
        // document.body.style.overflow = ''; // <- Remove this
      }
    });
  }

  // Check if user has seen menu before
  if (menuToggle && localStorage.getItem('menuSeen')) {
    menuToggle.classList.add('seen');
  }

  /* ========================================= */
  /* TABS NAVIGATION */
  /* ========================================= */
  const tabs = document.querySelectorAll(".tab-btn");
  const panels = document.querySelectorAll(".tab-panel");

  function activateTab(targetId) {
    console.log('Activating tab:', targetId); // Debug
    
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
    if (window.innerWidth <= 768 && mainNav) {
      mainNav.classList.remove('active');
      // document.body.style.overflow = ''; // <- Remove this
    }

    // Scroll to main content
    const mainEl = document.querySelector("main");
    if (mainEl) {
      const y = mainEl.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }

  // Tab click events
  tabs.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      activateTab(btn.dataset.tab);
    });
  });

  // Jump links
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
  
  if (scrollHint) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        scrollHint.classList.add('hidden');
      }
    }, { once: true });
  }

  /* ========================================= */
  /* FLOATING HELP BUTTON */
  /* ========================================= */
  const floatingHelp = document.getElementById('floatingHelp');
  const helpPopup = document.getElementById('helpPopup');
  const helpClose = document.getElementById('helpClose');

  // Open help popup
  if (floatingHelp && helpPopup) {
    floatingHelp.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('Help button clicked!'); // Debug
      helpPopup.classList.add('active');
      // DON'T lock scroll here either
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
    });
  }

  // Close help popup
  if (helpClose && helpPopup) {
    helpClose.addEventListener('click', (e) => {
      e.preventDefault();
      helpPopup.classList.remove('active');
    });
  }

  // Close on backdrop click
  if (helpPopup) {
    helpPopup.addEventListener('click', (e) => {
      if (e.target === helpPopup) {
        helpPopup.classList.remove('active');
      }
    });
  }

  /* ========================================= */
  /* FORM */
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
  /* HEADER SHADOW */
  /* ========================================= */
  const header = document.querySelector(".header");
  
  const toggleHeaderShadow = () => {
    if (header) {
      header.classList.toggle("shadow", window.scrollY > 12);
    }
  };
  
  toggleHeaderShadow();
  window.addEventListener("scroll", toggleHeaderShadow, { passive: true });

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

  // Load saved language
  setLanguage(localStorage.getItem("villaLang") || "en");

  /* ========================================= */
  /* FOOTER YEAR */
  /* ========================================= */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ========================================= */
  /* ESC KEY */
  /* ========================================= */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (mainNav && mainNav.classList.contains('active')) {
        mainNav.classList.remove('active');
      }
      if (helpPopup && helpPopup.classList.contains('active')) {
        helpPopup.classList.remove('active');
      }
    }
  });

  console.log('✅ Villa Guide loaded!');
});
