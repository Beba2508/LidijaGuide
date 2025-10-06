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
    const y = document.querySelector("main").getBoundingClientRect().top + window.scrollY - 12;
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
    // ostavi postojeći stil iz CSS-a — ne postavljamo više inline stilove

    const updateTabShadows = () => {
      const maxScroll = tabContainer.scrollWidth - tabContainer.clientWidth;
      const scrolled = tabContainer.scrollLeft > 2;
      const atEnd = tabContainer.scrollLeft >= maxScroll - 2;

      tabContainer.classList.toggle("is-scrolled", scrolled);
      tabContainer.classList.toggle("is-end", atEnd);
    };

    // inicijalno stanje (nakon što se fontovi/ikone učitaju)
    requestAnimationFrame(updateTabShadows);

    // slušaj skrol
    tabContainer.addEventListener("scroll", updateTabShadows, { passive: true });

    // također ažuriraj na resize (promjena orijentacije, iOS toolbar itd.)
    window.addEventListener("resize", updateTabShadows);
  }
/* ---------- Language Switch ---------- */
const translations = {
  en: {
    addonsTitle: "Add-ons & Experiences",
    addonsIntro: "Enhance your stay with our curated services.",
    formName: "Full Name",
    formEmail: "Email Address",
    formPhone: "Phone / WhatsApp",
    formDate: "Preferred Date & Time",
    formService: "Choose Service",
    selectOption: "Select an option",
    serviceChef: "Private Chef Experience",
    serviceGrocery: "Grocery Pre-Stocking",
    serviceCleaning: "Additional Cleaning",
    serviceTransfer: "Airport Transfer",
    serviceWine: "Wine Tasting / Sommelier",
    serviceBoat: "Private Boat Day Trip",
    formNotes: "Notes / Preferences",
    formSend: "Send Request",
    localTitle: "Local Tips",
    localIntro: "Practical links and resources for exploring Dubrovnik.",
    tipTransport: "Transport & Access",
    tipTransportText: "Check road updates and find your way around the city.",
    tipExplore: "Explore & Leisure",
    tipExploreText: "Discover beaches, restaurants, bars and local shops.",
    tipServices: "Useful Services",
    tipServicesText: "Everything you might need during your stay.",
    contactTitle: "Contact",
    contactIntro: "We’re always available for your comfort.",
    contactWA: "WhatsApp Concierge",
    contactCall: "Call Us",
    contactEmail: "Email: villas@irundo.com",
    contactEmergency: "Emergency Numbers",
    emergencyEU: "European Emergency: 112",
    emergencyMedical: "Medical (HMP Dubrovnik): +385 (0)20 431 600",
    emergencyPolice: "Police: 192",
    departureTitle: "Departure Info",
    departureIntro: "Before you leave, a few reminders for a smooth check-out.",
    departure1: "Check-out until 10:00 AM",
    departure2: "Contact your host or concierge to arrange check-out time",
    departure3: "Luggage storage or porter service available on request",
    departure4: "Please ensure all lights, AC, and appliances are off before departure",
    footerText: "All rights reserved."
  },
  hr: {
    addonsTitle: "Dodatne usluge i iskustva",
    addonsIntro: "Upotpunite svoj boravak našom pažljivo odabranom ponudom.",
    formName: "Ime i prezime",
    formEmail: "Email adresa",
    formPhone: "Telefon / WhatsApp",
    formDate: "Željeni datum i vrijeme",
    formService: "Odaberite uslugu",
    selectOption: "Odaberite opciju",
    serviceChef: "Privatni kuhar",
    serviceGrocery: "Nabava namirnica prije dolaska",
    serviceCleaning: "Dodatno čišćenje",
    serviceTransfer: "Zračna luka – prijevoz",
    serviceWine: "Degustacija vina / sommelier",
    serviceBoat: "Privatni izlet brodom",
    formNotes: "Napomene / želje",
    formSend: "Pošalji upit",
    localTitle: "Lokalni savjeti",
    localIntro: "Praktične poveznice i preporuke za istraživanje Dubrovnika.",
    tipTransport: "Prijevoz i dolazak",
    tipTransportText: "Provjerite stanje na cestama i jednostavno pronađite put.",
    tipExplore: "Istražite i uživajte",
    tipExploreText: "Otkrijte plaže, restorane, barove i trgovine u blizini.",
    tipServices: "Korisne usluge",
    tipServicesText: "Sve što bi vam moglo zatrebati tijekom boravka.",
    contactTitle: "Kontakt",
    contactIntro: "Uvijek smo dostupni za vašu udobnost.",
    contactWA: "WhatsApp Concierge",
    contactCall: "Nazovite nas",
    contactEmail: "Email: villas@irundo.com",
    contactEmergency: "Hitni brojevi",
    emergencyEU: "Europski broj hitne pomoći: 112",
    emergencyMedical: "Hitna medicinska pomoć Dubrovnik: +385 (0)20 431 600",
    emergencyPolice: "Policija: 192",
    departureTitle: "Informacije o odlasku",
    departureIntro: "Prije odlaska, nekoliko podsjetnika za ugodan check-out.",
    departure1: "Odjava do 10:00 sati",
    departure2: "Kontaktirajte domaćina ili conciergea radi dogovora o odlasku",
    departure3: "Skladištenje prtljage i porter dostupni na upit",
    departure4: "Molimo provjerite jesu li sva svjetla, klima uređaji i aparati isključeni",
    footerText: "Sva prava pridržana."
  }
};

function setLanguage(lang) {
  document.querySelectorAll("[data-translate]").forEach(el => {
    const key = el.getAttribute("data-translate");
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  localStorage.setItem("villaLang", lang);

  document.querySelectorAll(".lang-btn").forEach(btn =>
    btn.classList.toggle("active", btn.dataset.lang === lang)
  );
}

// Listen for button clicks
document.querySelectorAll(".lang-btn").forEach(btn => {
  btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
});

// Load saved language
setLanguage(localStorage.getItem("villaLang") || "en");

});
