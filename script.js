document.addEventListener("DOMContentLoaded", () => {
  // menu toggle
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.toggle("show");
      menuToggle.classList.toggle("active", isOpen);
      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    document.querySelectorAll("#mobileMenu a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("show");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("click", (e) => {
      const clickedInsideMenu = mobileMenu.contains(e.target);
      const clickedToggle = menuToggle.contains(e.target);

      if (!clickedInsideMenu && !clickedToggle) {
        mobileMenu.classList.remove("show");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // login
  const loginForm = document.getElementById("loginForm");
  const demoLoginBtn = document.getElementById("demoLoginBtn");
  const logoutBtn = document.getElementById("logoutBtn");

  if (demoLoginBtn) {
    demoLoginBtn.addEventListener("click", () => {
      const email = document.getElementById("email");
      const password = document.getElementById("password");

      if (email) email.value = "demo@portfam.com";
      if (password) password.value = "123456";
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      if (!email || !password) return;

      const username = email.split("@")[0] || "demo";
      localStorage.setItem("portfamUser", username);
      window.location.href = "Homepage.html";
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("portfamUser");
      window.location.href = "index.html";
    });
  }

  // demo flow
  const step1 = document.getElementById("step1");
  if (!step1) return;

  const progressFill = document.getElementById("progressFill");
  const progressText = document.getElementById("progressText");
  const sidebarUserName = document.getElementById("sidebarUserName");
  const finalSelectedApp = document.getElementById("finalSelectedApp");
  const selectedAppText = document.getElementById("selectedAppText");
  const waitingPanel = document.getElementById("waitingPanel");
  const approvalPanel = document.getElementById("approvalPanel");
  const autoDemoBtn = document.getElementById("autoDemoBtn");

  const verifyBtn = document.getElementById("verifyBtn");
  const toProfileBtn = document.getElementById("toProfileBtn");
  const toAppBtn = document.getElementById("toAppBtn");
  const toConsentBtn = document.getElementById("toConsentBtn");
  const finishBtn = document.getElementById("finishBtn");
  const resetBtn = document.getElementById("resetBtn");
  const restartFlowBtn = document.getElementById("restartFlowBtn");

  const stepPages = ["step1", "step2", "step3", "step4", "step5", "step6"];

  let currentStep = 1;
  let selectedApp = "";
  let goalSelected = false;
  let riskSelected = false;

  const savedUser = localStorage.getItem("portfamUser");
  if (sidebarUserName) {
    sidebarUserName.textContent = savedUser ? savedUser : "Somchai";
  }

  function showStep(stepNumber) {
    currentStep = stepNumber;

    stepPages.forEach((id, index) => {
      const page = document.getElementById(id);
      if (!page) return;

      if (index + 1 === stepNumber) {
        page.classList.remove("hidden");
      } else {
        page.classList.add("hidden");
      }
    });

    updateSidebar();
    updateProgress();
  }

  function updateSidebar() {
    const stepItems = document.querySelectorAll(".step-item");

    stepItems.forEach((item) => {
      const step = Number(item.dataset.step);
      item.classList.remove("active", "done");

      if (step < currentStep) {
        item.classList.add("done");
      } else if (step === currentStep) {
        item.classList.add("active");
      }
    });
  }

  function updateProgress() {
    if (progressFill) {
      progressFill.style.width = `${(currentStep / 6) * 100}%`;
    }

    if (progressText) {
      progressText.textContent = `Step ${currentStep} of 6`;
    }
  }

  function checkProfileReady() {
    if (goalSelected && riskSelected && toAppBtn) {
      toAppBtn.disabled = false;
      toAppBtn.classList.remove("disabled");
    }
  }

  function resetFlow() {
    currentStep = 1;
    selectedApp = "";
    goalSelected = false;
    riskSelected = false;

    document.querySelectorAll(".option-card").forEach((card) => {
      card.classList.remove("active");
    });

    document.querySelectorAll('input[name="goal"], input[name="risk"]').forEach((input) => {
      input.checked = false;
    });

    document.querySelectorAll(".app-card").forEach((card) => {
      card.classList.remove("selected");
    });

    if (toAppBtn) {
      toAppBtn.disabled = true;
      toAppBtn.classList.add("disabled");
    }

    if (toConsentBtn) {
      toConsentBtn.disabled = true;
      toConsentBtn.classList.add("disabled");
    }

    if (selectedAppText) {
      selectedAppText.textContent = "ยังไม่ได้เลือกแอป";
    }

    if (finalSelectedApp) {
      finalSelectedApp.textContent = "-";
    }

    if (waitingPanel) {
      waitingPanel.classList.remove("hidden");
    }

    if (approvalPanel) {
      approvalPanel.classList.add("hidden");
    }

    showStep(1);
  }

  function simulateParentApproval() {
    if (waitingPanel) waitingPanel.classList.remove("hidden");
    if (approvalPanel) approvalPanel.classList.add("hidden");

    setTimeout(() => {
      if (waitingPanel) waitingPanel.classList.add("hidden");
      if (approvalPanel) approvalPanel.classList.remove("hidden");
    }, 2500);
  }

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function autoDemo() {
    if (!autoDemoBtn) return;

    autoDemoBtn.disabled = true;
    autoDemoBtn.textContent = "กำลังเล่น...";

    resetFlow();

    await sleep(700);
    showStep(2);

    await sleep(900);
    showStep(3);

    await sleep(700);
    selectGoal("goal2");

    await sleep(300);
    selectRisk("risk1");

    await sleep(700);
    showStep(4);

    await sleep(800);
    selectInvestmentApp("StockKids");

    await sleep(700);
    showStep(5);
    simulateParentApproval();

    await sleep(3200);
    showStep(6);

    autoDemoBtn.disabled = false;
    autoDemoBtn.textContent = "Auto Demo";
  }

  function selectGoal(id) {
    document.querySelectorAll('[id^="goal"]').forEach((card) => {
      card.classList.remove("active");
    });

    const card = document.getElementById(id);
    if (!card) return;

    const radio = card.querySelector('input[type="radio"]');
    card.classList.add("active");
    if (radio) radio.checked = true;

    goalSelected = true;
    checkProfileReady();
  }

  function selectRisk(id) {
    document.querySelectorAll('[id^="risk"]').forEach((card) => {
      card.classList.remove("active");
    });

    const card = document.getElementById(id);
    if (!card) return;

    const radio = card.querySelector('input[type="radio"]');
    card.classList.add("active");
    if (radio) radio.checked = true;

    riskSelected = true;
    checkProfileReady();
  }

  function selectInvestmentApp(appName) {
    document.querySelectorAll(".app-card").forEach((card) => {
      card.classList.remove("selected");
    });

    const selectedCard = document.querySelector(`.app-card[data-app="${appName}"]`);
    if (!selectedCard) return;

    if (selectedCard.classList.contains("blocked")) {
      selectedApp = "";

      if (selectedAppText) {
        selectedAppText.textContent = `${appName} ยังไม่ได้รับการรับรอง`;
      }

      if (toConsentBtn) {
        toConsentBtn.disabled = true;
        toConsentBtn.classList.add("disabled");
      }

      if (finalSelectedApp) {
        finalSelectedApp.textContent = "-";
      }

      return;
    }

    selectedCard.classList.add("selected");
    selectedApp = appName;

    if (selectedAppText) {
      selectedAppText.textContent = `เลือกแอปแล้ว: ${appName}`;
    }

    if (finalSelectedApp) {
      finalSelectedApp.textContent = appName;
    }

    if (toConsentBtn) {
      toConsentBtn.disabled = false;
      toConsentBtn.classList.remove("disabled");
    }
  }

  if (verifyBtn) {
    verifyBtn.addEventListener("click", () => showStep(2));
  }

  if (toProfileBtn) {
    toProfileBtn.addEventListener("click", () => showStep(3));
  }

  if (toAppBtn) {
    toAppBtn.addEventListener("click", () => {
      if (!goalSelected || !riskSelected) return;
      showStep(4);
    });
  }

  if (toConsentBtn) {
    toConsentBtn.addEventListener("click", () => {
      if (!selectedApp) return;
      showStep(5);
      simulateParentApproval();
    });
  }

  if (finishBtn) {
    finishBtn.addEventListener("click", () => showStep(6));
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", resetFlow);
  }

  if (restartFlowBtn) {
    restartFlowBtn.addEventListener("click", resetFlow);
  }

  if (autoDemoBtn) {
    autoDemoBtn.addEventListener("click", autoDemo);
  }

  const goal1 = document.getElementById("goal1");
  const goal2 = document.getElementById("goal2");
  const goal3 = document.getElementById("goal3");
  const risk1 = document.getElementById("risk1");
  const risk2 = document.getElementById("risk2");

  if (goal1) goal1.addEventListener("click", () => selectGoal("goal1"));
  if (goal2) goal2.addEventListener("click", () => selectGoal("goal2"));
  if (goal3) goal3.addEventListener("click", () => selectGoal("goal3"));
  if (risk1) risk1.addEventListener("click", () => selectRisk("risk1"));
  if (risk2) risk2.addEventListener("click", () => selectRisk("risk2"));

  document.querySelectorAll(".app-card").forEach((card) => {
    card.addEventListener("click", () => {
      const appName = card.dataset.app;
      selectInvestmentApp(appName);
    });
  });

  resetFlow();
});
