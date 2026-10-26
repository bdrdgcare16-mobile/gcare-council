document.addEventListener("DOMContentLoaded", function () {
  const cards = Array.from(document.querySelectorAll(".day-card"));
  if (!cards.length) return;

  const input = document.getElementById("chaSearch");
  const expandAllBtn = document.getElementById("chaExpandAll");
  const collapseAllBtn = document.getElementById("chaCollapseAll");
  const progressText = document.getElementById("chaProgressText");
  const progressFill = document.getElementById("chaProgressFill");
  const noResults = document.getElementById("chaNoResults");
  const groups = Array.from(document.querySelectorAll(".curriculum-day-group"));
  const navToggle = document.getElementById("chaNavToggle");
  const navList = document.getElementById("chaNavList");
  const navLinks = Array.from(document.querySelectorAll(".curriculum-nav-list a"));
  const total = cards.length;

  function normalize(text) {
    return text.toLowerCase().replace(/[^a-z0-9]/g, "");
  }

  function updateProgress() {
    const open = cards.filter(function (c) {
      return c.classList.contains("expanded");
    }).length;
    if (progressText) {
      progressText.textContent = open + " of " + total + " topics open";
    }
    if (progressFill) {
      progressFill.style.width = (open / total) * 100 + "%";
    }
  }

  function setCard(card, open) {
    card.classList.toggle("expanded", open);
    const head = card.querySelector(".day-card-head");
    const toggle = card.querySelector(".day-toggle-text");
    if (head) head.setAttribute("aria-expanded", open ? "true" : "false");
    if (toggle) toggle.textContent = open ? "Hide Topics" : "View Topics";
  }

  cards.forEach(function (card) {
    const head = card.querySelector(".day-card-head");
    if (head) {
      head.addEventListener("click", function () {
        setCard(card, !card.classList.contains("expanded"));
        updateProgress();
      });
    }
  });

  if (expandAllBtn) {
    expandAllBtn.addEventListener("click", function () {
      cards.forEach(function (card) {
        if (card.style.display !== "none") setCard(card, true);
      });
      updateProgress();
    });
  }

  if (collapseAllBtn) {
    collapseAllBtn.addEventListener("click", function () {
      cards.forEach(function (card) {
        setCard(card, false);
      });
      updateProgress();
    });
  }

  if (input) {
    input.addEventListener("input", function () {
      const query = normalize(this.value);
      let visible = 0;

      cards.forEach(function (card) {
        const match = !query || normalize(card.textContent).includes(query);
        card.style.display = match ? "" : "none";
        if (match) {
          visible++;
          if (query) setCard(card, true);
        }
      });

      groups.forEach(function (group) {
        const hasVisible = Array.from(
          group.querySelectorAll(".day-card")
        ).some(function (card) {
          return card.style.display !== "none";
        });
        group.style.display = hasVisible ? "" : "none";
      });

      if (noResults) noResults.hidden = visible !== 0;
      updateProgress();
    });
  }

  if (navToggle && navList) {
    navToggle.addEventListener("click", function () {
      const open = navList.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  navLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      if (navList) navList.classList.remove("open");
    });
  });

  function onScroll() {
    let currentId = null;
    groups.forEach(function (group) {
      if (group.style.display === "none") return;
      if (group.getBoundingClientRect().top <= 140) {
        currentId = group.id;
      }
    });
    navLinks.forEach(function (link) {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === "#" + currentId
      );
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  updateProgress();
});
