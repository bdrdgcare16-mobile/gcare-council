document.addEventListener("DOMContentLoaded", () => {
  const communityCollegeData = [
    {
      branch: "Thiruvallur",
      address:
        "No: 33 RL Tower Gandhipuram (GH Opposite) Thiruvallur,<br>Pincode - 602001."
    },
    {
      branch: "Tiruthani",
      address:
        "No. 141, Kongusami Nayudu Palli Street,<br>Tiruthani – 631209."
    },
    {
      branch: "Kanchipuram",
      address:
        "No. 57, Sekkupettai, Kavarai Street, (Bus Stand Backside),<br>Periya Kanchipuram – 631502"
    },
    {
      branch: "Ennore",
      address:
        "No. 37, Anna Sathya Nagar, Ennore market backside,<br>Ennore, Chennai – 57"
    },
    {
      branch: "Nimmilcerry",
      address:
        "No. 33, C.T.H. Road, Nemmilcerry, Near CSI Temple,<br>Thiruninravur, Pincode - 602024."
    },
    {
      branch: "Poonamallee",
      address:
        "No 33 2nd floor 2nd street Rukmani Nagar, Poonamallee,<br>Chennai - 600056"
    },
    {
      branch: "Nagapattinam",
      address:
        "No:170, First Floor, Public Office Road, Opp to Municipal Middle School,<br>Kadanpadi, Nagapattinam-611001"
    },
    {
      branch: "Saalai",
      address:
        "No. 235/7, Shop 14, J.K. Valaagam, Sholingar Road, Saalai Sandhippu,<br>Arakkonam Taluk, Ranipet District – 631 004"
    },
    {
      branch: "Pudur",
      address:
        "Gcare industrial centre, NH76, Puduru village,<br>Thiruvallur district, nearest GRD pharmacy college - 631210"
    }
  ];

  const rowsContainer = document.getElementById("communityCollegeRows");

  if (rowsContainer) {
    rowsContainer.innerHTML = communityCollegeData
      .map((item, index) => {
        return `
          <div class="community-row" data-index="${index}">
            <div class="college-card" data-index="${index}">
              <div class="college-content">
                <h3 class="branch-title">${item.branch}</h3>
                <div class="branch-address-box">
                  <div class="branch-icon">📍</div>
                  <p class="branch-address">${item.address}</p>
                </div>
              </div>
            </div>
          </div>
        `;
      })
      .join("");

    const cards = document.querySelectorAll(".college-card");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const card = entry.target;
            const delay = Number(card.dataset.index || 0) * 70;

            setTimeout(() => {
              card.classList.add("is-visible");
            }, delay);

            observer.unobserve(card);
          }
        });
      },
      {
        threshold: 0.12
      }
    );

    cards.forEach((card) => observer.observe(card));
  }

  const socialButtons = document.querySelectorAll(".social-btn");

  socialButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      event.preventDefault();

      socialButtons.forEach((btn) => btn.classList.remove("active-social"));
      this.classList.add("active-social");
    });
  });

  const footerTextLinks = document.querySelectorAll(".footer-text-link");

  footerTextLinks.forEach((link) => {
    link.addEventListener("click", function () {
      footerTextLinks.forEach((item) => item.classList.remove("active-footer-link"));
      this.classList.add("active-footer-link");
    });
  });
});