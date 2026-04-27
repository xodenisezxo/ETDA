document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const header = document.querySelector(".site-header");
  const backToTop = document.getElementById("backToTop");
  const scrollProgress = document.getElementById("scrollProgress");
  const yearEl = document.getElementById("currentYear");

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = mobileMenu.classList.toggle("show");
      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    mobileMenu.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    document.querySelectorAll("#mobileMenu a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("show");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("click", () => {
      mobileMenu.classList.remove("show");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  }

  function handleScrollUI() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (header) {
      header.classList.toggle("scrolled", scrollTop > 10);
    }

    if (backToTop) {
      backToTop.classList.toggle("show", scrollTop > 250);
    }

    if (scrollProgress) {
      scrollProgress.style.width = `${progress}%`;
    }
  }

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  const revealTargets = document.querySelectorAll(".reveal");

  function revealOnScroll() {
    const trigger = window.innerHeight * 0.9;

    revealTargets.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < trigger) {
        el.classList.add("show");
      }
    });
  }

  handleScrollUI();
  revealOnScroll();

  window.addEventListener("scroll", () => {
    handleScrollUI();
    revealOnScroll();
  });

  window.addEventListener("resize", handleScrollUI);
});
