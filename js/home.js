// document.addEventListener("DOMContentLoaded", function () {

// const slides = document.querySelectorAll("#homeSlideshow .slide");
// let currentSlide = 0;

// if (slides.length > 0) {
// setInterval(() => {
// slides[currentSlide].classList.remove("active");
// currentSlide = (currentSlide + 1) % slides.length;
// slides[currentSlide].classList.add("active");
// }, 3000);
// }

// const readMoreBtn = document.getElementById("readMoreBtn");

// if (readMoreBtn) {
// readMoreBtn.addEventListener("click", function (event) {
// event.preventDefault();
// window.location.href = "about.html";
// });
// }


// const socialButtons = document.querySelectorAll(".social-btn");

// socialButtons.forEach(button => {

// button.addEventListener("click", function(e){

// e.preventDefault();

// socialButtons.forEach(btn => btn.classList.remove("active"));

// this.classList.add("active");

// });

// });

// });






document.addEventListener("DOMContentLoaded", function () {

  const slides = document.querySelectorAll("#homeSlideshow .slide");
  let currentSlide = 0;

  if (slides.length > 0) {
    setInterval(() => {
      slides[currentSlide].classList.remove("active");
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add("active");
    }, 3000);
  }

  const readMoreBtn = document.getElementById("readMoreBtn");

  if (readMoreBtn) {
    readMoreBtn.addEventListener("click", function (event) {
      event.preventDefault();
      window.location.href = "about.html";
    });
  }

  const socialButtons = document.querySelectorAll(".social-btn");

  socialButtons.forEach(button => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      socialButtons.forEach(btn => btn.classList.remove("active"));
      this.classList.add("active");
    });
  });

  const dropLinks = document.querySelectorAll("#programmesDropdown a[data-programme]");

  dropLinks.forEach((link) => {
    link.addEventListener("click", function () {
      const programmeKey = this.dataset.programme;
      const subcourseId = this.dataset.subcourse;

      if (programmeKey && subcourseId) {
        this.href = `programmes.html#${programmeKey}/${subcourseId}`;
      } else if (programmeKey) {
        this.href = `programmes.html#${programmeKey}`;
      }
    });
  });

});