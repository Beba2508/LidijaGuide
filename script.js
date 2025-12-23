/* =========================================
   Majestic Villa Lidija – script.js
   Hamburger Menu, Tabs, Accordion & More
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
  // Render Lucide icons
  lucide.createIcons();

  /* ---------- Hamburger Menu Logic ---------- */
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileNavClose = document.querySelector('.mobile-nav-close');
  const body = document.body;

  // Create overlay element
  const overlay = document.createElement('div');
  overlay.className = 'mobile-nav-overlay';
  body.appendChild(overlay);

  function openMobileNav() {
    mobileNav.classList.add('open');
    overlay.classList.add('visible');
    hamburger.classList.add('active');
    body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    mobileNav.classList.remove('open');
    overlay.classList.remove('visible');
    hamburger.classList.remove('active');
    body.style.overflow = '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', openMobileNav);
  }

  if (mobileNavClose) {
    mobileNavClose.addEventListener('click', closeMobileNav);
  }

  overlay.addEventListener('click', closeMobileNav);

  // Close mobile nav on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
      closeMobileNav();
    }
  });

  /* ---------- Tab Navigation Logic ---------- */
  const tabButtons = document.querySelectorAll('.tab-btn, .nav-item');
  const tabPanels = document.querySelectorAll('.tab-panel');

  function activateTab(targetId) {
    // Hide all panels
    tabPanels.forEach(panel => {
      panel.classList.remove('active');
      panel.setAttribute('aria-hidden', 'true');
    });

    // Show target panel
    const targetPanel = document.getElementById(targetId);
    if (targetPanel) {
      targetPanel.classList.add('active');
      targetPanel.setAttribute('aria-hidden', 'false');
    }

    // Update button states (desktop)
    document.querySelectorAll('.tab-btn').forEach(btn => {
      const isActive = btn.dataset.tab === targetId;
      btn.setAttribute('aria-selected', isActive);
    });

    // Update nav item states (mobile)
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.toggle('active', item.dataset.tab === targetId);
    });

    // Close mobile nav if open
    closeMobileNav();

    // Scroll to top of main content
    const mainElement = document.querySelector('main');
    if (mainElement) {
      const offset = mainElement.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }

    // Re-render icons for newly visible content
    lucide.createIcons();
  }

  // Add click handlers to all tab buttons
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.dataset.tab;
      if (targetTab) {
        activateTab(targetTab);
      }
    });

    // Keyboard navigation
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const targetTab = btn.dataset.tab;
        if (targetTab) {
          activateTab(targetTab);
        }
      }
    });
  });

  /* ---------- Accordion Logic ---------- */
  const accordionHeaders = document.querySelectorAll('.acc-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.closest('.acc-item');
      const wasOpen = item.classList.contains('open');

      // Close all items in this accordion
      const accordion = item.closest('.accordion');
      if (accordion) {
        accordion.querySelectorAll('.acc-item').forEach(accItem => {
          accItem.classList.remove('open');
        });
      }

      // Toggle current item
      if (!wasOpen) {
        item.classList.add('open');
        // Re-render icons when accordion opens
        setTimeout(() => lucide.createIcons(), 100);
      }
    });
  });

  /* ---------- Form Submission ---------- */
  const addonsForm = document.getElementById('addonsForm');
  
  if (addonsForm) {
    addonsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const formData = new FormData(addonsForm);
      const name = formData.get('name') || '';
      const email = formData.get('email') || '';
      const phone = formData.get('phone') || '';
      const service = formData.get('service') || '';
      const datetime = formData.get('datetime') || '';
      const notes = formData.get('notes') || '';

      const subject = encodeURIComponent('Villa Lidija Add-on Request');
      const body = encodeURIComponent(
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Phone: ${phone}\n` +
        `Service: ${service}\n` +
        `Preferred Date/Time: ${datetime}\n\n` +
        `Notes:\n${notes}`
      );

      window.location.href = `mailto:concierge@irundo.com?subject=${subject}&body=${body}`;
    });
  }

  /* ---------- Language Switching ---------- */
  const langButtons = document.querySelectorAll('.lang-btn');

  async function setLanguage(lang) {
    try {
      const response = await fetch(`lang-${lang}.json`);
      if (!response.ok) throw new Error('Failed to load language file');
      
      const translations = await response.json();

      // Update all elements with data-translate attribute
      document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.dataset.translate;
        if (translations[key]) {
          el.innerHTML = translations[key];
        }
      });

      // Update active language button
      langButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
      });

      // Save language preference
      localStorage.setItem('villaLang', lang);

      // Re-render icons after language change
      lucide.createIcons();

    } catch (error) {
      console.error('Language loading error:', error);
    }
  }

  // Add click handlers to language buttons
  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      setLanguage(btn.dataset.lang);
    });
  });

  // Load saved language or default to English
  const savedLang = localStorage.getItem('villaLang') || 'en';
  setLanguage(savedLang);

  /* ---------- Header Shadow on Scroll ---------- */
  const header = document.querySelector('.header');

  function updateHeaderShadow() {
    if (!header) return;
    const shouldHaveShadow = window.scrollY > 20;
    header.classList.toggle('shadow', shouldHaveShadow);
  }

  updateHeaderShadow();
  window.addEventListener('scroll', updateHeaderShadow, { passive: true });

  /* ---------- Dynamic Footer Year ---------- */
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  /* ---------- Smooth Scroll for Internal Links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offset = 80;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });

  /* ---------- Initialize Icons After Everything Loads ---------- */
  setTimeout(() => {
    lucide.createIcons();
  }, 100);

  // Re-render icons on window resize (for responsive changes)
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      lucide.createIcons();
    }, 250);
  }, { passive: true });
});
