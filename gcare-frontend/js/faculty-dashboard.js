document.addEventListener("DOMContentLoaded", function () {
  // Current date
  const currentDateEl = document.getElementById("currentDate");
  if (currentDateEl) {
    currentDateEl.textContent = new Date().toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  }

  // Mobile sidebar toggle
  const hamburger = document.getElementById("hamburgerBtn");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebarOverlay");

  function toggleSidebar() {
    if (sidebar) sidebar.classList.toggle("open");
    if (overlay) overlay.classList.toggle("active");
  }

  if (hamburger && sidebar && overlay) {
    hamburger.addEventListener("click", toggleSidebar);
    overlay.addEventListener("click", toggleSidebar);
  }

  // Top profile dropdown
  const profileToggle = document.getElementById("profileToggle");
  const profileDropdown = document.getElementById("profileDropdown");

  if (profileToggle && profileDropdown) {
    profileToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      profileDropdown.classList.toggle("show");
    });

    document.addEventListener("click", function () {
      profileDropdown.classList.remove("show");
    });

    profileDropdown.addEventListener("click", function (e) {
      e.stopPropagation();
    });
  }

  // Sidebar / hash navigation
  const dashboardPage = document.getElementById("dashboard-page");
  const placeholderPage = document.getElementById("placeholder-page");
  const placeholderTitle = document.getElementById("placeholderTitle");
  const menuLinks = document.querySelectorAll(".sidebar-menu a[data-page]");

  function setActiveMenu(route) {
    menuLinks.forEach(function (link) {
      if (link.getAttribute("data-page") === route) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  function showPage(route, title) {
    if (!route || route === "dashboard") {
      if (dashboardPage) dashboardPage.classList.add("active");
      if (placeholderPage) placeholderPage.classList.remove("active");
      setActiveMenu("dashboard");
    } else {
      if (dashboardPage) dashboardPage.classList.remove("active");
      if (placeholderPage) {
        placeholderPage.classList.add("active");
        if (placeholderTitle) {
          placeholderTitle.textContent = title
            ? title
                .replace(/-/g, " ")
                .replace(/\b\w/g, function (c) { return c.toUpperCase(); })
            : route.replace(/-/g, " ").replace(/\b\w/g, function (c) { return c.toUpperCase(); });
        }
      }
      setActiveMenu(route);
    }
    window.scrollTo(0, 0);
  }

  menuLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      var page = this.getAttribute("data-page");
      if (page) {
        e.preventDefault();
        if (window.innerWidth < 992 && sidebar && overlay) {
          sidebar.classList.remove("open");
          overlay.classList.remove("active");
        }
        window.location.hash = page;
      }
    });
  });

  document.querySelectorAll(".view-all[data-page], .btn[data-page]").forEach(function (link) {
    link.addEventListener("click", function (e) {
      var page = this.getAttribute("data-page");
      if (page) {
        e.preventDefault();
        window.location.hash = page;
      }
    });
  });

  function handleHash() {
    var hash = window.location.hash.replace("#", "");
    if (!hash) {
      showPage("dashboard");
      return;
    }
    var link = document.querySelector('.sidebar-menu a[data-page="' + hash + '"]');
    if (link) {
      showPage(hash, link.textContent.trim());
    } else {
      showPage("dashboard");
    }
  }

  window.addEventListener("hashchange", handleHash);
  handleHash();

  // Assignment progress bars
  document.querySelectorAll(".progress-fill[data-value]").forEach(function (bar) {
    var value = parseFloat(bar.getAttribute("data-value"));
    if (!isNaN(value)) {
      bar.style.width = Math.min(100, Math.max(0, value)) + "%";
    }
  });
});
