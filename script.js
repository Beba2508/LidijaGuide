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
  /* ---------- WELCOME ---------- */
  welcomeTitle: "Dobrodošli u Majestic Villu Lidiju by Irundo",
  welcomeText: "Drago nam je što ste naš gost! Opustite se i uživajte u boravku u Majestic Villi Lidiji — vašem privatnom dubrovačkom utočištu.",
  checkinLabel: "Prijava:",
  checkinTime: "od 15:00 sati",
  checkoutLabel: "Odjava:",
  checkoutTime: "do 10:00 sati",
  wifiInfo: "Villa Lidija / lozinka: lidija2023",
  conciergeLabel: "Concierge:",
  conciergeText: "Dostupan svaki dan za vašu pomoć",

  /* ---------- ARRIVAL INFO ---------- */
  arrivalTitle: "Informacije o dolasku",
  arrivalIntro: "Sve što trebate za ugodan i jednostavan dolazak.",
  addressTitle: "Adresa",
  addressText: "Pelješka ulica 2A, 20000 Dubrovnik, Hrvatska",
  viewMap: "Otvori na Google karti",
  accessTitle: "Pristup i upute",
  access1: "Vila se nalazi u stambenoj zoni i nije izravno dostupna automobilom.",
  access2: "Najbliža točka za iskrcaj: Pogledajte lokaciju ovdje.",
  access3: "Slijedite pješačku stazu i stepenice do ulaza u vilu.",
  access4: "Ako je potrebno, dostupan je porter — javite nam unaprijed.",
  entranceTitle: "Ulaz i tipkovnica",
  entrance1: "Tipkovnica se nalazi s desne strane ulaznih vrata.",
  entrance2: "Unesite šifru koja vam je poslana na dan dolaska.",
  entrance3: "Vrata uvijek držite zatvorena kad nisu u upotrebi.",
  photoEntrance: "Ulaz",
  photoKeypad: "Tipkovnica",
  parkingTitle: "Parkiralište",
  parking1: "Privatno parkirno mjesto u obližnjoj garaži.",
  parking2: "Do vile se dolazi stepenicama.",
  parking3: "Ako vam treba pomoć s prtljagom, zatražite porter uslugu unaprijed.",
  arrivalTip: "Molimo kontaktirajte svog domaćina najmanje 1 sat prije dolaska kako bi vas dočekala osobno i pomogla s prtljagom ili pristupom.",

  /* ---------- ABOUT VILLA ---------- */
  aboutTitle: "O vili",
  aboutIntro: "Kratki pregled vile i njezinih sadržaja.",
  aboutMain: "Dobrodošli u Majestic Villu Lidiju, gdje se udobnost susreće s elegantnom jednostavnošću. Smještena u srcu Dubrovnika, vila nudi prekrasan pogled na Jadransko more i jednostavan pristup znamenitostima, plažama i restoranima.",
  aboutList1: "Dnevni boravak s pogledom na more, terasa i infinity bazen",
  aboutList2: "Potpuno opremljena kuhinja s modernim uređajima",
  aboutList3: "Blagovaonica za 8 osoba",
  aboutList4: "3 spavaće sobe s vlastitim kupaonicama, bračnim krevetima i pametnim TV-om",
  aboutList5: "Sauna u glavnoj spavaćoj sobi na katu",
  aboutList6: "Privatna teretana i dodatna kupaonica u prizemlju",
  aboutList7: "Brzi Wi-Fi, klima uređaj i podno grijanje",
  aboutBtn: "Pogledajte stranicu vile na Irundo.com",

  /* ---------- VILLA GUIDE ---------- */
  guideTitle: "Vodič kroz vilu",
  guideIntro: "Korisne informacije o uređajima, sadržajima i udobnosti.",
  tip1: "Voda iz slavine je pitka",
  tip2: "Isključite klimu kada napuštate prostor",
  tip3: "Podno grijanje se podešava u svakoj sobi",
  sectionComfort: "Udobnost i klima",
  waterTitle: "Voda",
  waterText: "Voda iz slavine je pitka. Topla voda se automatski grije u bojleru u podrumu.",
  coolingTitle: "Hlađenje",
  coolingText: "Stropni klima uređaji s TOSHIBA termostatom. Koristite tipku za uključivanje i podešavajte temperaturu s + / – gumbima.",
  heatingTitle: "Grijanje",
  heatingText: "Podno grijanje — podesite temperaturu na termostatu u svakoj sobi.",
  sectionTech: "Tehnologija i povezanost",
  wifiTitle: "Wi-Fi",
  wifiText: "Mreža: Villa Lidija<br>Lozinka: lidija2023",
  tvTitle: "Pametni TV",
  tvText: "Pritisnite <strong>Home</strong> → odaberite TV ili aplikaciju. Pametni TV uređaji u svim sobama.",
  sectionWellness: "Wellness i kućanski uređaji",
  saunaTitle: "Sauna",
  saunaText: "Nalazi se u spavaćoj sobi na katu. Pritisnite tipku za uključivanje/isključivanje. Istuširajte se prije korištenja i ostanite hidrirani. Preporučeno trajanje sesije 10–15 minuta.",
  poolTitle: "Bazen",
  poolText: "Infinity bazen se automatski čisti. Otvoren od 08:00 do 21:00. Tuširajte se prije korištenja i nadgledajte djecu.",
  ovenTitle: "Pećnica",
  ovenLink: "Pogledaj Bosch priručnik za pećnicu",
  washerTitle: "Perilica rublja",
  washerLink: "Pogledaj Bosch priručnik za perilicu",

  /* ---------- ADD-ONS ---------- */
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
  serviceTransfer: "Prijevoz iz zračne luke",
  serviceWine: "Degustacija vina / sommelier",
  serviceBoat: "Privatni izlet brodom",
  formNotes: "Napomene / želje",
  formSend: "Pošalji upit",

  /* ---------- LOCAL TIPS ---------- */
  localTitle: "Lokalni savjeti",
  localIntro: "Praktične poveznice i preporuke za istraživanje Dubrovnika.",
  tipTransport: "Prijevoz i dolazak",
  tipTransportText: "Provjerite stanje na cestama i lako pronađite svoj put.",
  tipExplore: "Istražite i uživajte",
  tipExploreText: "Otkrijte plaže, restorane, barove i lokalne trgovine.",
  tipServices: "Korisne usluge",
  tipServicesText: "Sve što bi vam moglo zatrebati tijekom boravka.",

  /* ---------- CONTACT ---------- */
  contactTitle: "Kontakt",
  contactIntro: "Uvijek smo dostupni za vašu udobnost.",
  contactWA: "WhatsApp Concierge",
  contactCall: "Nazovite nas",
  contactEmail: "Email: villas@irundo.com",
  contactEmergency: "Hitni brojevi",
  emergencyEU: "Europski broj hitne pomoći: 112",
  emergencyMedical: "Hitna medicinska pomoć Dubrovnik: +385 (0)20 431 600",
  emergencyPolice: "Policija: 192",

  /* ---------- DEPARTURE ---------- */
  departureTitle: "Informacije o odlasku",
  departureIntro: "Prije odlaska, nekoliko podsjetnika za ugodan check-out.",
  departure1: "Odjava do 10:00 sati",
  departure2: "Kontaktirajte domaćina ili conciergea radi dogovora o odlasku",
  departure3: "Skladištenje prtljage ili porter dostupni na upit",
  departure4: "Molimo provjerite jesu li sva svjetla, klima uređaji i aparati isključeni",

  /* ---------- FOOTER ---------- */
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
  /* ---------- Header shadow on scroll ---------- */
  const header = document.querySelector(".header");
  const toggleHeaderShadow = () => {
    if (!header) return;
    header.classList.toggle("shadow", window.scrollY > 12);
  };
  toggleHeaderShadow();
  window.addEventListener("scroll", toggleHeaderShadow, { passive: true });

});
