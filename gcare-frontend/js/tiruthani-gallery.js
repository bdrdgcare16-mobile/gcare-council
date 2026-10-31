const tiruthaniGalleryData = {
  classroom: [
    {
      image: "assets/images/Thiruthani-classroom/classroom (1).png"
    },
    {
      image: "assets/images/Thiruthani-classroom/classroom (2).png"
    },
    {
      image: "assets/images/Thiruthani-classroom/classroom (3).png"
    },
    {
      image: "assets/images/Thiruthani-classroom/classroom (4).png"
    },
    {
      image: "assets/images/Thiruthani-classroom/classroom (5).png"
    }
  ],
  lab: [
    {
      image: "assets/images/Thiruthani-classroom/lab (1).png"
    },
    {
      image: "assets/images/Thiruthani-classroom/lab (2).png"
    }
  ]
};

document.addEventListener("DOMContentLoaded", function () {
  // Get URL parameter for type (set by community-colleges.js buttons)
  const urlParams = new URLSearchParams(window.location.search);
  const initialType = urlParams.get("type") === "lab" ? "lab" : "classroom";

  updatePageTitle(initialType);

  const buttons = document.querySelectorAll(".gallery-btn");

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      buttons.forEach((btn) => {
        btn.classList.remove("active");
        btn.setAttribute("aria-pressed", "false");
      });

      this.classList.add("active");
      this.setAttribute("aria-pressed", "true");

      const type = this.getAttribute("data-type");
      updatePageTitle(type);
      showGalleryImages(type);
    });
  });

  // Set initial active button and show images
  buttons.forEach((button) => {
    if (button.getAttribute("data-type") === initialType) {
      button.classList.add("active");
      button.setAttribute("aria-pressed", "true");
    } else {
      button.classList.remove("active");
      button.setAttribute("aria-pressed", "false");
    }
  });

  showGalleryImages(initialType);
});

function updatePageTitle(type) {
  const titleElement = document.getElementById("galleryTitle");

  if (type === "classroom") {
    titleElement.textContent = "Tiruthani Classroom Gallery";
  } else if (type === "lab") {
    titleElement.textContent = "Tiruthani Lab Gallery";
  }
}

function showGalleryImages(type) {
  const galleryGrid = document.getElementById("galleryGrid");
  const emptyMessage = document.getElementById("galleryEmpty");

  galleryGrid.style.opacity = "0";
  galleryGrid.style.transform = "translateY(18px)";

  setTimeout(() => {
    const images = tiruthaniGalleryData[type] || [];

    galleryGrid.innerHTML = "";

    if (!images.length) {
      emptyMessage.hidden = false;
    } else {
      emptyMessage.hidden = true;

      images.forEach((item, index) => {
        const galleryItem = createGalleryItem(item, index, type, images);
        galleryGrid.appendChild(galleryItem);
      });
    }

    setTimeout(() => {
      galleryGrid.style.opacity = "1";
      galleryGrid.style.transform = "translateY(0)";
    }, 60);
  }, 220);
}

function getItemLabel(item, type, index) {
  if (item.title) return item.title;
  const typeLabel = type === "lab" ? "Lab" : "Classroom";
  return `Tiruthani ${typeLabel} ${index + 1}`;
}

function createGalleryItem(item, index, type, images) {
  const label = getItemLabel(item, type, index);

  const div = document.createElement("div");
  div.className = "gallery-item";
  div.style.animationDelay = `${index * 0.06}s`;
  div.setAttribute("role", "button");
  div.setAttribute("tabindex", "0");
  div.setAttribute("aria-label", `View ${label}`);

  const img = document.createElement("img");
  img.src = item.image;
  img.alt = label;
  img.loading = "lazy";

  img.onerror = function () {
    console.error(`Gallery image not found: ${item.image}`);
    div.remove();

    // Show the empty message if every image failed to load.
    const galleryGrid = document.getElementById("galleryGrid");
    const emptyMessage = document.getElementById("galleryEmpty");
    if (galleryGrid && emptyMessage &&
        !galleryGrid.querySelector("img")) {
      emptyMessage.hidden = false;
    }
  };

  div.appendChild(img);

  // Full-size preview via shared lightbox
  div.addEventListener("click", () => {
    if (window.GalleryLightbox) {
      window.GalleryLightbox.open(images, index);
    }
  });

  div.addEventListener("keydown", (event) => {
    if ((event.key === "Enter" || event.key === " ") && window.GalleryLightbox) {
      event.preventDefault();
      window.GalleryLightbox.open(images, index);
    }
  });

  return div;
}
