const poonamalleeGalleryData = {
  classroom: [
    { image: "assets/images/Poonamalloo-classroom/Classroom (1).jpeg" },
    { image: "assets/images/Poonamalloo-classroom/Classroom (2).jpeg" },
    { image: "assets/images/Poonamalloo-classroom/Classroom (3).jpeg" },
    { image: "assets/images/Poonamalloo-classroom/Classroom (4).jpeg" },
    { image: "assets/images/Poonamalloo-classroom/Classroom (5).jpeg" },
    { image: "assets/images/Poonamalloo-classroom/Classroom (6).jpeg" }
  ],
  lab: [
    { image: "assets/images/Poonamalloo-classroom/lab (1).jpeg" },
    { image: "assets/images/Poonamalloo-classroom/lab (2).jpeg" },
    { image: "assets/images/Poonamalloo-classroom/lab (3).jpeg" }
  ]
};

document.addEventListener("DOMContentLoaded", function () {
  // Get URL parameter for type
  const urlParams = new URLSearchParams(window.location.search);
  const initialType = urlParams.get('type') || 'classroom';

  // Update page title based on type
  updatePageTitle(initialType);

  const buttons = document.querySelectorAll(".gallery-btn");

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      buttons.forEach((btn) => {
        btn.classList.remove("active");
      });

      this.classList.add("active");

      const type = this.getAttribute("data-type");

      updatePageTitle(type);
      showGalleryImages(type);
    });
  });

  // Set initial active button and show images
  buttons.forEach((button) => {
    if (button.getAttribute("data-type") === initialType) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });

  showGalleryImages(initialType);
});

function updatePageTitle(type) {
  const titleElement = document.getElementById("galleryTitle");

  if (type === "classroom") {
    titleElement.textContent = "Poonamallee Classroom Gallery";
  } else if (type === "lab") {
    titleElement.textContent = "Poonamallee Lab Gallery";
  }
}

function showGalleryImages(type) {
  const galleryGrid = document.getElementById("galleryGrid");

  galleryGrid.style.opacity = "0";
  galleryGrid.style.transform = "translateY(18px)";

  setTimeout(() => {
    let images = [];

    if (type === "classroom") {
      images = poonamalleeGalleryData.classroom;
    } else if (type === "lab") {
      images = poonamalleeGalleryData.lab;
    }

    galleryGrid.innerHTML = "";

    if (!images.length) {
      galleryGrid.innerHTML = `
        <div class="no-images">
          <h3>No images available</h3>
          <p>
            No gallery photos are available
            for this category right now.
          </p>
        </div>
      `;
    } else {
      images.forEach((item, index) => {
        const galleryItem = createGalleryItem(item, index, images);
        galleryGrid.appendChild(galleryItem);
      });
    }

    setTimeout(() => {
      galleryGrid.style.opacity = "1";
      galleryGrid.style.transform = "translateY(0)";
    }, 60);
  }, 220);
}

function createGalleryItem(item, index, images) {
  const div = document.createElement("div");
  div.className = "gallery-item";
  div.style.animationDelay = `${index * 0.06}s`;
  div.setAttribute("role", "button");
  div.setAttribute("tabindex", "0");
  div.setAttribute("aria-label", `View photograph ${index + 1}`);

  const img = document.createElement("img");
  img.src = item.image;
  img.alt = `Poonamallee gallery photograph ${index + 1}`;
  img.loading = "lazy";

  img.onerror = function() {
    console.error(`Gallery image not found: ${item.image}`);
    div.remove();
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
