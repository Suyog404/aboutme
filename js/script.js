/* =========================================================
   PORTFOLIO JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     CURRENT YEAR
  ======================================================= */

  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
  

  /* =======================================================
   CLEAN URL NAVIGATION
======================================================= */

document.querySelectorAll('a[href^="#"]').forEach((link) => {

  link.addEventListener("click", (event) => {

    const targetId = link.getAttribute("href");

    const target = document.querySelector(targetId);

    if (!target) {
      return;
    }

    event.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

    // Keep the URL clean
    history.replaceState(
      null,
      "",
      window.location.pathname
    );

  });

});


  /* =======================================================
     MOBILE NAVIGATION
  ======================================================= */

  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-menu a");

  if (navToggle && navMenu) {

    navToggle.addEventListener("click", () => {

      const isOpen = navMenu.classList.toggle("open");

      navToggle.classList.toggle("open", isOpen);

      navToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      navToggle.setAttribute(
        "aria-label",
        isOpen
          ? "Close navigation"
          : "Open navigation"
      );

    });


    /* Close mobile navigation after clicking a link */

    navLinks.forEach((link) => {

      link.addEventListener("click", () => {

        navMenu.classList.remove("open");

        navToggle.classList.remove("open");

        navToggle.setAttribute(
          "aria-expanded",
          "false"
        );

        navToggle.setAttribute(
          "aria-label",
          "Open navigation"
        );

      });

    });

  }

  /* =========================================
   HERO WELCOME MESSAGE
========================================= */

const welcomeText = document.querySelector(".welcome-text");

if (welcomeText) {
  const message = welcomeText.dataset.message || "";
  let index = 0;

  const typeMessage = () => {
    if (index <= message.length) {
      welcomeText.textContent = message.slice(0, index);
      index++;

      setTimeout(typeMessage, index === 1 ? 500 : 42);
    }
  };

  setTimeout(typeMessage, 700);
}


  /* =======================================================
     SCROLL REVEAL
  ======================================================= */

  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("visible");

          observer.unobserve(entry.target);

        });

      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }
    );


    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });

  } else {

    revealElements.forEach((element) => {
      element.classList.add("visible");
    });

  }


  /* =======================================================
     SCROLL PROGRESS
  ======================================================= */

  const progress = document.querySelector(".progress");

  function updateProgress() {

    if (!progress) {
      return;
    }

    const scrollTop = window.scrollY;

    const documentHeight =
      document.documentElement.scrollHeight -
      window.innerHeight;

    if (documentHeight <= 0) {
      progress.style.width = "0%";
      return;
    }

    const percentage =
      (scrollTop / documentHeight) * 100;

    progress.style.width = `${percentage}%`;

  }


  /* =======================================================
     HEADER SCROLL STATE
  ======================================================= */

  const header = document.querySelector(".header");

  function updateHeader() {

    if (!header) {
      return;
    }

    if (window.scrollY > 30) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

  }


  /* =======================================================
     ACTIVE NAVIGATION
  ======================================================= */

  const sections = document.querySelectorAll(
    "main section[id]"
  );

  const navigationLinks =
    document.querySelectorAll(
      ".nav-menu .nav-link"
    );


  function updateActiveNavigation() {

    const scrollPosition =
      window.scrollY + 180;

    let currentSection = "home";

    sections.forEach((section) => {

      const sectionTop =
        section.offsetTop;

      if (scrollPosition >= sectionTop) {
        currentSection = section.id;
      }

    });


    navigationLinks.forEach((link) => {

      const target =
        link.getAttribute("href");

      link.classList.toggle(
        "active",
        target === `#${currentSection}`
      );

    });

  }


  /* =======================================================
     SCROLL EVENT
  ======================================================= */

  let ticking = false;

  function handleScroll() {

    if (!ticking) {

      window.requestAnimationFrame(() => {

        updateProgress();

        updateHeader();

        updateActiveNavigation();

        ticking = false;

      });

      ticking = true;

    }

  }

  window.addEventListener(
    "scroll",
    handleScroll,
    { passive: true }
  );


  /* Initial state */

  updateProgress();

  updateHeader();

  updateActiveNavigation();


  /* =======================================================
     CLOSE MOBILE NAV WHEN CLICKING OUTSIDE
  ======================================================= */

  document.addEventListener("click", (event) => {

    if (!navMenu || !navToggle) {
      return;
    }

    const clickedInsideNavigation =
      navMenu.contains(event.target);

    const clickedToggle =
      navToggle.contains(event.target);

    if (
      !clickedInsideNavigation &&
      !clickedToggle &&
      navMenu.classList.contains("open")
    ) {

      navMenu.classList.remove("open");

      navToggle.classList.remove("open");

      navToggle.setAttribute(
        "aria-expanded",
        "false"
      );

      navToggle.setAttribute(
        "aria-label",
        "Open navigation"
      );

    }

  });


  /* =======================================================
     ESCAPE KEY — CLOSE MOBILE NAV
  ======================================================= */

  document.addEventListener("keydown", (event) => {

    if (
      event.key === "Escape" &&
      navMenu &&
      navMenu.classList.contains("open")
    ) {

      navMenu.classList.remove("open");

      navToggle.classList.remove("open");

      navToggle.setAttribute(
        "aria-expanded",
        "false"
      );

      navToggle.setAttribute(
        "aria-label",
        "Open navigation"
      );

      navToggle.focus();

    }

  });


  /* =======================================================
     REDUCE MOTION SUPPORT
  ======================================================= */

  const prefersReducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

  if (prefersReducedMotion) {

    document.documentElement.style.scrollBehavior =
      "auto";

    revealElements.forEach((element) => {
      element.classList.add("visible");
    });

  }

});