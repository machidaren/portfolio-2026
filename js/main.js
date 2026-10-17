
/* ========================================
   PORTFOLIO — MAIN.JS
======================================== */

document.addEventListener("DOMContentLoaded", () => {
  /* ========================================
     MOBILE MENU
  ======================================== */

  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  const navLinks = document.querySelectorAll(".nav a");

  if (menuToggle && nav) {
    const closeMenu = () => {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "メニューを開く");
      nav.classList.remove("is-open");
    };

    menuToggle.addEventListener("click", () => {
      const isExpanded =
        menuToggle.getAttribute("aria-expanded") === "true";

      menuToggle.setAttribute("aria-expanded", String(!isExpanded));
      menuToggle.setAttribute(
        "aria-label",
        isExpanded ? "メニューを開く" : "メニューを閉じる"
      );

      nav.classList.toggle("is-open", !isExpanded);
    });

    // メニュー内のリンクを押したら閉じる
    navLinks.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    // メニュー外をクリックしたら閉じる
    document.addEventListener("click", (event) => {
      if (
        nav.classList.contains("is-open") &&
        !nav.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMenu();
      }
    });

    // PC表示に切り替えたらメニュー状態をリセット
    window.addEventListener("resize", () => {
      if (window.innerWidth > 600) {
        closeMenu();
      }
    });

    // Escapeキーでメニューを閉じる
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
        menuToggle.focus();
      }
    });
  }

  /* ========================================
     SCROLL REVEAL
  ======================================== */

  const revealTargets = document.querySelectorAll(
    ".section-heading, .about-content, .skill-card, .work-card, .works-coming, .contact .container"
  );

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    revealTargets.forEach((element) => {
      element.classList.add("reveal");
    });

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    revealTargets.forEach((element) => {
      revealObserver.observe(element);
    });
  }

  /* ========================================
     CURRENT YEAR
  ======================================== */

  const copyright = document.querySelector(".copyright");

  if (copyright) {
    copyright.textContent = `© ${new Date().getFullYear()} PORTFOLIO`;
  }
});
