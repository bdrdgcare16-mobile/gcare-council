document.addEventListener("DOMContentLoaded", function () {
  const careerCards = document.querySelectorAll(
    ".career-opportunities-grid .career-item, .career-opportunities-grid .unified-career-item"
  );

  careerCards.forEach(function (card) {
    card.addEventListener("click", function () {
      careerCards.forEach(function (item) {
        item.classList.remove("selected");
      });

      this.classList.add("selected");
    });
  });
});

// Footer social button click effect
document.addEventListener('DOMContentLoaded', function() {
  const socialButtons = document.querySelectorAll('.social-btn');
  socialButtons.forEach((button) => {
  button.addEventListener("click", function () {
    socialButtons.forEach((btn) => btn.classList.remove("active-social"));
    this.classList.add("active-social");
  });
});
});
