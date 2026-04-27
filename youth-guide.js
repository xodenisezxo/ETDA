document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, {
    threshold: 0.1
  });

  const revealElements = document.querySelectorAll(".reveal");
  revealElements.forEach((el) => {
    revealObserver.observe(el);
  });

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = mobileMenu.classList.toggle("show");
      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    mobileMenu.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    document.addEventListener("click", () => {
      mobileMenu.classList.remove("show");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  }
});
