/* ==========================================
   Shared Gallery Lightbox
   Used by all Community College gallery pages.
   Injects its own DOM — no per-page markup
   required. Exposes window.GalleryLightbox.
========================================== */

(function () {
  let overlay = null;
  let imageEl = null;
  let spinnerEl = null;
  let counterEl = null;
  let closeBtn = null;
  let prevBtn = null;
  let nextBtn = null;

  let items = [];
  let currentIndex = 0;
  let lastFocusedElement = null;
  let isOpen = false;

  function buildDom() {
    overlay = document.createElement("div");
    overlay.className = "gallery-lightbox";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "Photograph preview");
    overlay.setAttribute("aria-hidden", "true");

    const backdrop = document.createElement("div");
    backdrop.className = "gl-backdrop";
    overlay.appendChild(backdrop);

    closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.className = "gl-close";
    closeBtn.setAttribute("aria-label", "Close preview");
    closeBtn.innerHTML = "&times;";
    overlay.appendChild(closeBtn);

    prevBtn = document.createElement("button");
    prevBtn.type = "button";
    prevBtn.className = "gl-nav gl-prev";
    prevBtn.setAttribute("aria-label", "Previous photograph");
    prevBtn.innerHTML = "&#10094;";
    overlay.appendChild(prevBtn);

    const stage = document.createElement("div");
    stage.className = "gl-stage";

    spinnerEl = document.createElement("div");
    spinnerEl.className = "gl-spinner";
    spinnerEl.setAttribute("aria-hidden", "true");
    stage.appendChild(spinnerEl);

    imageEl = document.createElement("img");
    imageEl.className = "gl-image";
    imageEl.alt = "";
    stage.appendChild(imageEl);

    counterEl = document.createElement("div");
    counterEl.className = "gl-counter";
    stage.appendChild(counterEl);

    overlay.appendChild(stage);

    nextBtn = document.createElement("button");
    nextBtn.type = "button";
    nextBtn.className = "gl-nav gl-next";
    nextBtn.setAttribute("aria-label", "Next photograph");
    nextBtn.innerHTML = "&#10095;";
    overlay.appendChild(nextBtn);

    document.body.appendChild(overlay);

    closeBtn.addEventListener("click", close);
    prevBtn.addEventListener("click", function () {
      show(currentIndex - 1);
    });
    nextBtn.addEventListener("click", function () {
      show(currentIndex + 1);
    });

    backdrop.addEventListener("click", close);

    imageEl.addEventListener("load", function () {
      spinnerEl.style.display = "none";
      imageEl.classList.add("loaded");
    });

    imageEl.addEventListener("error", function () {
      spinnerEl.style.display = "none";
    });
  }

  function show(index) {
    if (!items.length) return;

    currentIndex =
      (index % items.length + items.length) % items.length;

    const src =
      typeof items[currentIndex] === "string"
        ? items[currentIndex]
        : items[currentIndex].image;

    spinnerEl.style.display = "";
    imageEl.classList.remove("loaded");
    imageEl.src = src;
    imageEl.alt = "Photograph " + (currentIndex + 1);

    counterEl.textContent =
      currentIndex + 1 + " / " + items.length;

    const single = items.length <= 1;
    prevBtn.style.display = single ? "none" : "";
    nextBtn.style.display = single ? "none" : "";
  }

  function open(imageItems, startIndex) {
    if (!overlay) buildDom();
    if (isOpen) return;

    items = imageItems || [];
    if (!items.length) return;

    isOpen = true;
    lastFocusedElement = document.activeElement;

    overlay.classList.add("open");
    overlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    show(startIndex || 0);
    closeBtn.focus();
  }

  function close() {
    if (!overlay || !isOpen) return;

    isOpen = false;
    overlay.classList.remove("open");
    overlay.setAttribute("aria-hidden", "true");
    imageEl.removeAttribute("src");
    document.body.style.overflow = "";

    if (lastFocusedElement && lastFocusedElement.isConnected) {
      lastFocusedElement.focus();
    }
  }

  document.addEventListener("keydown", function (event) {
    if (!isOpen) return;

    if (event.key === "Escape") {
      event.preventDefault();
      close();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      show(currentIndex - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      show(currentIndex + 1);
    } else if (event.key === "Tab") {
      // Keep focus cycling within the dialog controls.
      const controls = [closeBtn, prevBtn, nextBtn].filter(
        (el) => el.style.display !== "none"
      );
      const idx = controls.indexOf(document.activeElement);
      event.preventDefault();
      const next =
        idx === -1
          ? 0
          : event.shiftKey
            ? (idx - 1 + controls.length) % controls.length
            : (idx + 1) % controls.length;
      controls[next].focus();
    }
  });

  window.GalleryLightbox = { open: open, close: close };
})();
