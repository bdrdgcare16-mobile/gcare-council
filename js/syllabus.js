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
  socialButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      // Only prevent default for social buttons, not quick links
      if (this.classList.contains('social-btn')) {
        e.preventDefault();
      }
      // Remove clicked class from all buttons
      socialButtons.forEach(btn => btn.classList.remove('clicked'));
      // Add clicked class to clicked button
      this.classList.add('clicked');
    });
  });
});
