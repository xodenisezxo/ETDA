document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const scenes = document.querySelectorAll(".scene");
  const stepCards = document.querySelectorAll(".step-card");

  let currentScene = 1;
  const totalScenes = 4;

  function showScene(sceneNumber) {
    scenes.forEach((scene) => {
      scene.classList.remove("scene-active");
      if (Number(scene.dataset.scene) === sceneNumber) {
        scene.classList.add("scene-active");
      }
    });

    stepCards.forEach((card) => {
      card.classList.remove("active");
      if (Number(card.dataset.target) === sceneNumber) {
        card.classList.add("active");
      }
    });
  }

  function nextScene() {
    currentScene += 1;
    if (currentScene > totalScenes) {
      currentScene = 1;
    }
    showScene(currentScene);
  }

  setInterval(nextScene, 1800);

  stepCards.forEach((card) => {
    card.addEventListener("click", () => {
      currentScene = Number(card.dataset.target);
      showScene(currentScene);
    });
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

  showScene(1);
});
