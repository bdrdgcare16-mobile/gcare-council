// const defaultProgrammeImage = "../assets/images/programmes/default-main.jpg";

const programmesData = {
  nursing: {
    id: "nursing",
    name: "Nursing Course",
    title: "Nursing Course",
    subtitle: "Healthcare Excellence Through Professional Training",
    description:
      "Professional nursing education designed to prepare students for healthcare services, hospital assistance, and patient care responsibilities. This programme combines theoretical understanding, basic clinical exposure, and professional discipline to support strong career readiness in healthcare environments.",
    duration: "4 Year",
    eligibility: "10,+2 with Science",
    certification: "Nursing Assistant Certificate",
    highlights: [
      "Comprehensive healthcare training",
      "Hands-on clinical experience",
      "Patient care techniques",
      "Medical ethics and professionalism"
    ],
    syllabus: [
      "Fundamentals of Nursing",
      "Anatomy and Physiology",
      "Patient Care Management",
      "Medical Terminology",
      "Clinical Practices",
      "Healthcare Ethics"
    ],
    careerOpportunities: [
      "Nursing Assistant",
      "Hospital Staff Nurse",
      "Patient Care Coordinator",
      "Healthcare Provider"
    ],
    images: [
      "./assets/programmes/nursing1.jpeg",
      "./assets/programmes/nursing2.jpeg",
      "./assets/programmes/nursing3.jpeg"
    ],
    subcourses: [
      {
        id: "diploma-nursing",
        name: "Diploma Nursing",
        title: "Diploma in Nursing",
        subtitle: "Advanced Nursing Education for Healthcare Excellence",
        description: "Comprehensive diploma programme in nursing focusing on advanced patient care, clinical practices, medical ethics, and professional healthcare standards. This course prepares students for diverse nursing roles in hospitals, clinics, and healthcare facilities.",
        duration: "3 Years",
        eligibility: "10+2 with Science (PCB)",
        certification: "Diploma in Nursing",
        highlights: [
          "Advanced clinical training",
          "Comprehensive patient care",
          "Medical and surgical nursing",
          "Professional healthcare standards"
        ],
        syllabus: [
          "Advanced Nursing Fundamentals",
          "Medical-Surgical Nursing",
          "Pediatric Nursing",
          "Obstetric and Gynecological Nursing",
          "Community Health Nursing",
          "Psychiatric Nursing",
          "Nursing Research and Statistics",
          "Nursing Management and Leadership"
        ],
        careerOpportunities: [
          "Staff Nurse",
          "Nursing Supervisor",
          "Clinical Nurse Specialist",
          "Nurse Educator",
          "Community Health Nurse",
          "Private Duty Nurse"
        ],
        image: "./assets/programmes/diploma.jpeg"
      }
    ]
  },

  engineering: {
    id: "engineering",
    name: "Engineering Courses",
    title: "Engineering Courses",
    subtitle: "Building Technical Excellence for Modern Industries",
    description:
      "Comprehensive engineering programmes covering multiple disciplines with focus on practical skills, theoretical knowledge, and industry readiness. Students gain expertise in core engineering principles, modern technologies, and professional practices.",
    duration: "2 Years",
    eligibility: "10+2 with PCM",
    certification: "Engineering Diploma",
    highlights: [
      "Multi-disciplinary approach",
      "Industry-relevant curriculum",
      "Practical workshop training",
      "Career placement support"
    ],
    syllabus: [
      "Engineering Mathematics",
      "Technical Drawing",
      "Workshop Practices",
      "Computer Applications",
      "Project Management",
      "Industrial Training"
    ],
    careerOpportunities: [
      "Junior Engineer",
      "Technical Supervisor",
      "Project Assistant",
      "Quality Control Engineer"
    ],
    images: [
      "./assets/programmes/engineering1.jpeg",
      "./assets/programmes/engineering2.jpeg",
      "./assets/programmes/engineering3.jpeg"
    ],
    subcourses: [
      {
        id: "civil",
        name: "Civil Engineering",
        title: "Civil Engineering",
        subtitle: "Building Infrastructure for Tomorrow",
        description: "Focus on construction, design, and infrastructure development with modern engineering practices.",
        duration: "2 Years",
        eligibility: "10+2 with PCM",
        certification: "Civil Engineering Diploma",
        highlights: [
          "Construction technology",
          "Structural design",
          "Project management",
          "Surveying techniques"
        ],
        syllabus: [
          "Construction Materials",
          "Structural Analysis",
          "Surveying and Leveling",
          "Building Design",
          "Project Management",
          "Safety Engineering"
        ],
        careerOpportunities: [
          "Site Engineer",
          "Construction Supervisor",
          "Structural Designer",
          "Project Manager"
        ],
        image: "./assets/programmes/civili1.jpeg"
      },
      {
        id: "mechanical",
        name: "Mechanical Engineering",
        title: "Mechanical Engineering",
        subtitle: "Powering Industrial Innovation",
        description: "Comprehensive study of machines, tools, and mechanical systems with practical applications.",
        duration: "2 Years",
        eligibility: "10+2 with PCM",
        certification: "Mechanical Engineering Diploma",
        highlights: [
          "Machine design",
          "Manufacturing processes",
          "Thermal engineering",
          "CAD/CAM applications"
        ],
        syllabus: [
          "Machine Design",
          "Thermodynamics",
          "Manufacturing Technology",
          "CAD/CAM",
          "Fluid Mechanics",
          "Industrial Engineering"
        ],
        careerOpportunities: [
          "Mechanical Engineer",
          "Maintenance Engineer",
          "Design Engineer",
          "Production Supervisor"
        ],
        image: "./assets/programmes/machanical.jpeg"
      },
      {
        id: "electrical",
        name: "Electrical Engineering",
        title: "Electrical Engineering",
        subtitle: "Powering the Future with Electrical Innovation",
        description: "Study of electrical systems, power generation, and modern electrical technologies.",
        duration: "2 Years",
        eligibility: "10+2 with PCM",
        certification: "Electrical Engineering Diploma",
        highlights: [
          "Power systems",
          "Control systems",
          "Electrical machines",
          "Renewable energy"
        ],
        syllabus: [
          "Electrical Machines",
          "Wiring Practice",
          "Power Systems",
          "Control Basics",
          "Lab Work"
        ],
        careerOpportunities: [
          "Electrical Technician",
          "Maintenance Assistant",
          "Control Panel Technician",
          "Power Systems Assistant"
        ],
        image: "./assets/programmes/eee.jpeg"
      }
    ]
  },

  paramedical: {
    id: "paramedical",
    name: "Paramedical Course",
    title: "Paramedical Course",
    subtitle: "Healthcare Support Excellence Through Specialized Training",
    description:
      "Comprehensive paramedical education focusing on diagnostic support, patient assistance, and healthcare technology. Students gain expertise in medical diagnostics, laboratory procedures, and patient care support systems.",
    duration: "1 Year",
    eligibility: "10+2 with Science",
    certification: "Paramedical Certificate",
    highlights: [
      "Diagnostic technology training",
      "Laboratory procedures",
      "Patient care support",
      "Medical equipment handling"
    ],
    syllabus: [
      "Medical Fundamentals",
      "Diagnostic Support Basics",
      "Patient Handling",
      "Clinical Procedures",
      "Laboratory Awareness",
      "Practical Internship"
    ],
    careerOpportunities: [
      "Lab Technician",
      "X-Ray Technician",
      "Pharmacy Assistant",
      "Diagnostic Centre Support Staff"
    ],
    images: [
      "./assets/programmes/paramedical1.jpeg",
      "./assets/programmes/paramedical2.jpeg",
      "./assets/programmes/paramedical3.jpeg"
    ],
    subcourses: [
      {
        id: "xray",
        name: "X-Ray",
        title: "X-Ray Technician",
        subtitle: "Diagnostic Imaging Excellence",
        description:
          "Professional training for diagnostic imaging support with patient positioning, equipment handling, and radiation safety procedures.",
        duration: "1 Year",
        eligibility: "10+2 with Science",
        certification: "X-Ray Technician Certificate",
        highlights: [
          "Radiology basics",
          "Equipment operation",
          "Imaging support training"
        ],
        careerOpportunities: [
          "X-Ray Technician",
          "Radiology Assistant",
          "Diagnostic Centre Staff"
        ],
        syllabus: [
          "Radiology Basics",
          "X-Ray Equipment",
          "Patient Positioning",
          "Radiation Safety",
          "Image Handling",
          "Practical Training"
        ],
        image: "./assets/programmes/x-ray.jpeg"
      },
      {
        id: "lab-technician",
        name: "Lab Technician",
        title: "Lab Technician",
        subtitle: "Clinical Laboratory Excellence",
        description:
          "Training in sample handling, blood testing, laboratory process support, and basic diagnostic procedures using standard lab protocols.",
        duration: "1 Year",
        eligibility: "10+2 with Science",
        certification: "Lab Technician Certificate",
        highlights: [
          "Laboratory procedures",
          "Diagnostic support skills",
          "Testing workflow practice"
        ],
        careerOpportunities: [
          "Lab Technician",
          "Pathology Assistant",
          "Medical Lab Staff"
        ],
        syllabus: [
          "Blood Testing",
          "Urine Analysis",
          "Lab Equipment Handling",
          "Microbiology Basics",
          "Sample Processing",
          "Practical Training"
        ],
        image: "./assets/programmes/lab.jpeg"
      },
      {
        id: "d-pharm",
        name: "D.Pharm",
        title: "Diploma in Pharmacy",
        subtitle: "Pharmaceutical Sciences and Practice",
        description:
          "Pharmacy-focused training for medicine dispensing, pharmacy operations, drug handling, and patient interaction support.",
        duration: "2 Years",
        eligibility: "10+2 with PCM / PCB",
        certification: "Diploma in Pharmacy",
        highlights: [
          "Pharmacy practice",
          "Medicine handling",
          "Drug classification basics"
        ],
        careerOpportunities: [
          "Pharmacy Assistant",
          "Medical Store Executive",
          "Pharmaceutical Support Staff"
        ],
        syllabus: [
          "Pharmacology Basics",
          "Drug Classification",
          "Dispensing Procedures",
          "Pharmacy Law Basics",
          "Patient Counselling",
          "Practical Training"
        ],
        image: "./assets/programmes/D.pharm.jpeg"
      }
    ]
  },

  computer: {
    id: "computer",
    name: "Computer & IT",
    title: "Computer & IT",
    subtitle: "Digital Skills for the Modern Workplace",
    description:
      "Practical computer education focused on software usage, office productivity, internet skills, and basic technical understanding.",
    duration: "6 Months",
    eligibility: "Basic Computer Knowledge",
    certification: "IT Skills Certificate",
    highlights: [
      "Office applications",
      "Digital productivity",
      "Basic hardware awareness",
      "Job-oriented training"
    ],
    careerOpportunities: [
      "Computer Operator",
      "Office Assistant",
      "IT Support Trainee",
      "Data Entry Executive"
    ],
    syllabus: [
      "Computer Fundamentals",
      "MS Office Tools",
      "Internet and Email",
      "Typing Practice",
      "Basic Hardware",
      "Practical Assignments"
    ],
    images: [
      "./assets/programmes/computer1.jpeg",
      "./assets/programmes/computer2.jpeg",
      "./assets/programmes/computer3.jpeg"
    ],
    subcourses: []
  },

  teachers: {
    id: "teachers",
    name: "Teachers Education",
    title: "Teachers Education",
    subtitle: "Shaping Future Educators",
    description:
      "Teacher training designed to improve classroom communication, instructional methods, child understanding, and educational professionalism.",
    duration: "1 Year",
    eligibility: "Graduation",
    certification: "Diploma in Teacher Education",
    highlights: [
      "Teaching methodology",
      "Classroom management",
      "Child psychology basics",
      "Practice teaching"
    ],
    careerOpportunities: [
      "Primary Teacher",
      "Tutor",
      "Academic Coordinator",
      "Learning Facilitator"
    ],
    syllabus: [
      "Teaching Fundamentals",
      "Educational Psychology",
      "Classroom Management",
      "Lesson Planning",
      "Teaching Practice",
      "Assessment Methods"
    ],
    images: [
      "./assets/programmes/teacher1.jpeg",
      "./assets/programmes/teacher2.jpeg",
      "./assets/programmes/teacher3.jpeg"
    ],
    subcourses: []
  },

  science: {
    id: "science",
    name: "Home Science",
    title: "Home Science",
    subtitle: "Science for Better Living",
    description:
      "Applied learning in nutrition, family welfare, lifestyle science, and home resource management for practical and professional development.",
    duration: "1 Year",
    eligibility: "10+2 with Science",
    certification: "Diploma in Home Science",
    highlights: [
      "Nutrition awareness",
      "Family resource management",
      "Applied life science"
    ],
    careerOpportunities: [
      "Nutrition Assistant",
      "Community Worker",
      "Wellness Support Executive"
    ],
    syllabus: [
      "Food and Nutrition",
      "Human Development",
      "Family Resource Management",
      "Textile Basics",
      "Home Management",
      "Field Work"
    ],
    images: [
      "./assets/programmes/homescience1.jpeg",
      "./assets/programmes/homescience2.jpeg",
      "./assets/programmes/homescience3.jpeg"
    ],
    subcourses: []
  },

  skill: {
    id: "skill",
    name: "Skill Development Course",
    title: "Skill Development Course",
    subtitle: "Enhancing Employability Through Practical Skills",
    description:
      "Short-term programmes focused on communication, work readiness, professionalism, and employability improvement.",
    duration: "3 Months",
    eligibility: "Basic Education",
    certification: "Skill Development Certificate",
    highlights: [
      "Short duration learning",
      "Workplace readiness",
      "Communication improvement",
      "Practical outcomes"
    ],
    careerOpportunities: [
      "Office Assistant",
      "Customer Support Executive",
      "Sales Trainee",
      "Team Support Staff"
    ],
    syllabus: [
      "Communication Skills",
      "Workplace Etiquette",
      "Basic Computer Usage",
      "Interview Skills",
      "Career Guidance",
      "Practical Sessions"
    ],
    images: [
      "./assets/programmes/skill1.jpeg",
      "./assets/programmes/skill2.jpeg",
      "./assets/programmes/skill3.jpeg"
    ],
    subcourses: [
      {
        id: "mining-sector",
        name: "Mining Sector",
        title: "Mining Sector",
        subtitle: "Skill Training for Mining Operations and Field Support",
        description: "Sector-based training designed for mining support roles, operational discipline, industrial safety, and field-ready technical knowledge.",
        duration: "3 to 6 Months",
        eligibility: "Basic Education",
        certification: "Skill Development Sector Certificate",
        highlights: [
          "Mining operations basics",
          "Safety and field practices",
          "Industrial equipment awareness",
          "Job-oriented sector training"
        ],
        syllabus: [
          "Mine Safety Basics",
          "Mining Operations Support",
          "Equipment Handling Awareness",
          "Field Communication",
          "Workplace Discipline",
          "Practical Exposure"
        ],
        careerOpportunities: [
          "Mining Field Assistant",
          "Site Support Staff",
          "Industrial Helper",
          "Operations Trainee"
        ],
        image: "./assets/programmes/mining.jpeg"
      },
      {
        id: "rubber-chemical-plastic",
        name: "Rubber / Chemical / Plastic",
        title: "Rubber / Chemical / Plastic",
        subtitle: "Process and Production Skill Development",
        description: "Training focused on production support, material handling, manufacturing practices, and workplace safety in rubber, chemical, and plastic industries.",
        duration: "3 to 6 Months",
        eligibility: "Basic Education",
        certification: "Skill Development Sector Certificate",
        highlights: [
          "Production floor basics",
          "Material process awareness",
          "Safety-oriented learning",
          "Industry support training"
        ],
        syllabus: [
          "Material Basics",
          "Production Workflow",
          "Machine Safety",
          "Packaging Support",
          "Quality Awareness",
          "Practical Sessions"
        ],
        careerOpportunities: [
          "Production Assistant",
          "Machine Helper",
          "Packaging Staff",
          "Factory Support Worker"
        ],
        image: "./assets/programmes/rubber.jpeg"
      },
      {
        id: "media-entertainment",
        name: "Media and Entertainment",
        title: "Media and Entertainment",
        subtitle: "Creative Industry Skill Enhancement",
        description: "Practical training for entry-level roles in media production, communication support, content assistance, and creative coordination.",
        duration: "3 to 6 Months",
        eligibility: "Basic Education",
        certification: "Skill Development Sector Certificate",
        highlights: [
          "Creative communication skills",
          "Media workflow awareness",
          "Content support basics",
          "Industry exposure"
        ],
        syllabus: [
          "Media Fundamentals",
          "Communication Skills",
          "Production Support",
          "Presentation Basics",
          "Creative Coordination",
          "Practical Assignments"
        ],
        careerOpportunities: [
          "Production Assistant",
          "Media Support Staff",
          "Content Assistant",
          "Studio Coordinator"
        ],
        image: "./assets/programmes/media.jpeg"
      },
      {
        id: "yoga-wellness",
        name: "Yoga / Wellness",
        title: "Yoga / Wellness",
        subtitle: "Wellness and Lifestyle Skill Training",
        description: "Training in wellness support, yoga assistance, healthy lifestyle awareness, and basic instruction support for community and institutional settings.",
        duration: "3 to 6 Months",
        eligibility: "Basic Education",
        certification: "Skill Development Sector Certificate",
        highlights: [
          "Wellness-oriented training",
          "Yoga practice basics",
          "Lifestyle awareness",
          "Community support skills"
        ],
        syllabus: [
          "Introduction to Yoga",
          "Basic Wellness Practices",
          "Breathing Techniques",
          "Body Awareness",
          "Healthy Routine Guidance",
          "Practical Sessions"
        ],
        careerOpportunities: [
          "Yoga Assistant",
          "Wellness Support Staff",
          "Community Wellness Trainer",
          "Fitness Centre Assistant"
        ],
        image: "./assets/programmes/yoga.jpeg"
      },
      {
        id: "beauty-wellness",
        name: "Beauty and Wellness",
        title: "Beauty and Wellness",
        subtitle: "Salon and Wellness Industry Skill Development",
        description: "Professional grooming, personal care, client handling, and wellness service support training for entry-level beauty industry roles.",
        duration: "3 to 6 Months",
        eligibility: "Basic Education",
        certification: "Skill Development Sector Certificate",
        highlights: [
          "Beauty service basics",
          "Client interaction skills",
          "Salon workflow understanding",
          "Hands-on practical training"
        ],
        syllabus: [
          "Beauty Fundamentals",
          "Skin and Hair Basics",
          "Client Handling",
          "Salon Hygiene",
          "Service Assistance",
          "Practical Training"
        ],
        careerOpportunities: [
          "Salon Assistant",
          "Beauty Support Staff",
          "Spa Assistant",
          "Wellness Centre Trainee"
        ],
        image: "./assets/programmes/beauty.jpeg"
      },
      {
        id: "healthcare-sector",
        name: "Healthcare Sector",
        title: "Healthcare Sector",
        subtitle: "Support Skills for Healthcare Environments",
        description: "Entry-level healthcare sector training with focus on patient support, hospital workflow basics, hygiene, and service discipline.",
        duration: "3 to 6 Months",
        eligibility: "Basic Education",
        certification: "Skill Development Sector Certificate",
        highlights: [
          "Hospital support basics",
          "Patient service awareness",
          "Healthcare hygiene practices",
          "Service-oriented training"
        ],
        syllabus: [
          "Healthcare Basics",
          "Patient Support",
          "Hospital Etiquette",
          "Safety and Hygiene",
          "Record Support",
          "Practical Exposure"
        ],
        careerOpportunities: [
          "Healthcare Assistant",
          "Patient Support Staff",
          "Ward Assistant",
          "Clinic Helper"
        ],
        image: "./assets/programmes/health.jpeg"
      },
      {
        id: "handicrafts-carpet",
        name: "Handicrafts and Carpet",
        title: "Handicrafts and Carpet",
        subtitle: "Traditional Craft and Production Skills",
        description: "Skill development for handicraft production, finishing work, design support, and traditional industry-based livelihood opportunities.",
        duration: "3 to 6 Months",
        eligibility: "Basic Education",
        certification: "Skill Development Sector Certificate",
        highlights: [
          "Craft-based practical training",
          "Traditional skill support",
          "Design and finishing basics",
          "Self-employment opportunities"
        ],
        syllabus: [
          "Craft Fundamentals",
          "Material Handling",
          "Pattern and Design Basics",
          "Finishing Techniques",
          "Production Practice",
          "Market Awareness"
        ],
        careerOpportunities: [
          "Craft Assistant",
          "Production Worker",
          "Design Support Staff",
          "Self-employed Artisan"
        ],
        image: "./assets/programmes/hand.jpeg"
      },
      {
        id: "banking-bfsi",
        name: "Banking / BFSI",
        title: "Banking / BFSI",
        subtitle: "Financial Service Support Skill Training",
        description: "Practical sector training for banking, finance, insurance, and customer-facing support roles with communication and service knowledge.",
        duration: "3 to 6 Months",
        eligibility: "Basic Education",
        certification: "Skill Development Sector Certificate",
        highlights: [
          "Customer service training",
          "Banking support basics",
          "Professional communication",
          "Office readiness"
        ],
        syllabus: [
          "Introduction to BFSI",
          "Customer Interaction",
          "Basic Office Processes",
          "Documentation Support",
          "Professional Etiquette",
          "Interview Readiness"
        ],
        careerOpportunities: [
          "Office Assistant",
          "Customer Support Executive",
          "Back Office Staff",
          "Financial Service Trainee"
        ],
        image: "./assets/programmes/bank.jpeg"
      },
      {
        id: "electronics-sector",
        name: "Electronics Sector",
        title: "Electronics Sector",
        subtitle: "Technical Support Skills for Electronics Industries",
        description: "Training in assembly support, electronics component awareness, testing basics, and entry-level technical work discipline.",
        duration: "3 to 6 Months",
        eligibility: "Basic Education",
        certification: "Skill Development Sector Certificate",
        highlights: [
          "Electronics basics",
          "Component handling awareness",
          "Assembly support skills",
          "Technical workplace readiness"
        ],
        syllabus: [
          "Electronics Fundamentals",
          "Component Identification",
          "Basic Assembly Support",
          "Safety Measures",
          "Testing Awareness",
          "Practical Training"
        ],
        careerOpportunities: [
          "Electronics Assistant",
          "Assembly Line Support",
          "Technical Helper",
          "Production Trainee"
        ],
        image: "./assets/programmes/electronic.jpeg"
      },
      {
        id: "food-industry",
        name: "Food Industry",
        title: "Food Industry",
        subtitle: "Food Processing and Industry Support Skills",
        description: "Sector training for food handling, hygiene, packaging, processing support, and operational discipline in food industry environments.",
        duration: "3 to 6 Months",
        eligibility: "Basic Education",
        certification: "Skill Development Sector Certificate",
        highlights: [
          "Food handling basics",
          "Packaging and hygiene",
          "Industry support training",
          "Practical workplace readiness"
        ],
        syllabus: [
          "Food Safety Basics",
          "Hygiene Standards",
          "Packaging Support",
          "Processing Awareness",
          "Quality Basics",
          "Practical Sessions"
        ],
        careerOpportunities: [
          "Food Processing Assistant",
          "Packaging Staff",
          "Production Helper",
          "Quality Support Worker"
        ],
        image: "./assets/programmes/food.jpeg"
      },
      {
        id: "agriculture-sector",
        name: "Agriculture Sector",
        title: "Agriculture Sector",
        subtitle: "Practical Agricultural Skill Development",
        description: "Training focused on agricultural support activities, farm operations, basic equipment awareness, and rural livelihood enhancement.",
        duration: "3 to 6 Months",
        eligibility: "Basic Education",
        certification: "Skill Development Sector Certificate",
        highlights: [
          "Agriculture support skills",
          "Farm operations basics",
          "Rural employment readiness",
          "Practical field learning"
        ],
        syllabus: [
          "Agriculture Basics",
          "Farm Support Practices",
          "Soil and Crop Awareness",
          "Basic Tool Handling",
          "Field Safety",
          "Practical Exposure"
        ],
        careerOpportunities: [
          "Farm Assistant",
          "Agriculture Support Worker",
          "Field Helper",
          "Rural Livelihood Trainee"
        ],
        image: "./assets/programmes/agri.jpeg"
      }
    ]
  },

};

document.addEventListener("DOMContentLoaded", function () {
  populateProgrammeTabs();
  setupEventListeners();
  setupFooterInteractions();
  setupModalListeners();
  loadProgrammeFromHash();
});

window.addEventListener("hashchange", loadProgrammeFromHash);

function populateProgrammeTabs() {
  const programmeTabs = document.getElementById("programmeTabs");
  if (!programmeTabs) return;

  programmeTabs.innerHTML = "";

  Object.keys(programmesData).forEach((key) => {
    const programme = programmesData[key];
    const tab = document.createElement("div");
    tab.className = "programme-tab";
    tab.dataset.programme = key;
    tab.textContent = programme.name;
    programmeTabs.appendChild(tab);
  });
}

function setupEventListeners() {
  document.addEventListener("click", function (e) {
    const programmeTab = e.target.closest(".programme-tab");
    const dropLink = e.target.closest("#programmesDropdown a");
    
    // Check if clicking on the main PROGRAMMES menu item
    const programmesMenu = e.target.closest('.dropdown.active-menu > a');
    if (programmesMenu && programmesMenu.textContent.trim() === "PROGRAMMES") {
      e.preventDefault();
      // Clear hash and show all courses
      window.location.hash = "";
      return;
    }
    
    // Also check direct match
    if (e.target.matches('.dropdown.active-menu > a') && e.target.textContent.trim() === "PROGRAMMES") {
      e.preventDefault();
      window.location.hash = "";
      return;
    }

    if (programmeTab) {
      e.preventDefault();
      const programmeKey = programmeTab.dataset.programme;
      window.location.hash = programmeKey;
      return;
    }

    if (dropLink) {
      e.preventDefault();
      const programmeKey = dropLink.dataset.programme;
      const subcourseId = dropLink.dataset.subcourse;

      if (programmeKey && subcourseId) {
        window.location.hash = `${programmeKey}/${subcourseId}`;
      } else if (programmeKey) {
        window.location.hash = programmeKey;
      }
    }
  });
}

function scrollToCoursesSection() {
  const coursesSection = document.querySelector(".courses-section");
  if (coursesSection) {
    setTimeout(() => {
      coursesSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 150);
  } else {
    // Fallback: scroll to top if courses section not found
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }, 150);
  }
}

function loadProgrammeFromHash() {
  const hash = window.location.hash.replace("#", "").trim();

  if (!hash) {
    // Show all courses when no hash
    renderFilteredCourses();
    updateActiveTab(null);
    scrollToCoursesSection();
    return;
  }

  if (hash.includes("/")) {
    const [programmeKey, subcourseId] = hash.split("/");
    renderFilteredCourses(programmeKey, subcourseId);
    updateActiveTab(programmeKey);
    scrollToCoursesSection();
    return;
  }

  renderFilteredCourses(hash);
  updateActiveTab(hash);
  scrollToCoursesSection();
}

function setupFooterInteractions() {
  const quickLinks = document.querySelectorAll(".footer-text-link");
  const socialButtons = document.querySelectorAll(".social-btn");

  quickLinks.forEach((link) => {
    link.addEventListener("click", function () {
      quickLinks.forEach((item) => item.classList.remove("clicked"));
      this.classList.add("clicked");
    });
  });

  socialButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      socialButtons.forEach((item) => item.classList.remove("clicked"));
      this.classList.add("clicked");
    });
  });
}

function updateActiveTab(programmeKey) {
  document.querySelectorAll(".programme-tab").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.programme === programmeKey);
  });
  
  // Also update dropdown active state
  document.querySelectorAll("#programmesDropdown a").forEach((link) => {
    const linkProgramme = link.dataset.programme;
    const linkSubcourse = link.dataset.subcourse;
    
    if (!programmeKey) {
      // Show all courses - no active state
      link.classList.remove("active");
    } else if (linkSubcourse) {
      // Subcourse link - check if it matches current hash
      const currentHash = window.location.hash.replace("#", "");
      link.classList.toggle("active", currentHash === `${linkProgramme}/${linkSubcourse}`);
    } else {
      // Main programme link
      link.classList.toggle("active", linkProgramme === programmeKey);
    }
  });
}

function displayProgramme(programmeKey) {
  const programme = programmesData[programmeKey];
  if (!programme) return;

  // Show specialization section for main programmes
  const specializationSection = document.getElementById("specializationSection");
  if (specializationSection) {
    specializationSection.style.display = "block";
  }

  renderProgrammeShowcase(programme);
  renderSyllabusSection(programme);
  renderCareerSection(programme);
  renderSpecializationSection(programme);
}

function displaySubcourse(programmeKey, subcourseId) {
  const programme = programmesData[programmeKey];
  if (!programme || !programme.subcourses) return;

  const subcourse = programme.subcourses.find((item) => item.id === subcourseId);
  if (!subcourse) {
    displayProgramme(programmeKey);
    return;
  }

  // Hide specialization section when subcourse is selected
  const specializationSection = document.getElementById("specializationSection");
  if (specializationSection) {
    specializationSection.style.display = "none";
  }

  renderProgrammeShowcase(subcourse);
  renderSyllabusSection(subcourse);
  renderCareerSection(subcourse);
}

function renderProgrammeImages(data) {
  // Check if this is a specific course that should show only one image
  const singleImageCourses = [
    'civil', 'mechanical', 'electrical', // Engineering subcourses
    'xray', 'lab-technician', 'd-pharm', // Paramedical subcourses
    'mining-sector', 'rubber-chemical-plastic', 'media-entertainment', 'yoga-wellness', 
    'beauty-wellness', 'healthcare-sector', 'handicrafts-carpet', 'banking-bfsi', 
    'electronics-sector', 'food-industry', 'agriculture-sector' // Skill Development subcourses
  ];
  
  const isSingleImageCourse = singleImageCourses.includes(data.id);
  
  if (isSingleImageCourse) {
    // Show only one image for specific courses
    const image = data.image || "./assets/programmes/default-1.jpeg";
    return `
      <div class="course-single-image-container">
        <img src="${image}" alt="${data.title}">
      </div>
    `;
  } else {
    // Show 3 images for other courses
    const images = getProgrammeImages(data);
    return `
      <div class="course-image-gallery">
        ${images.map((image, index) => `
          <div class="course-large-image">
            <img src="${image}" alt="${data.title} - Image ${index + 1}">
          </div>
        `).join("")}
      </div>
    `;
  }
}

function getProgrammeImages(data) {
  // If course has images array, use it
  if (data.images && data.images.length >= 3) {
    return data.images.slice(0, 3);
  }
  
  // If subcourse has single image, create 3 images from it
  if (data.image) {
    return [
      data.image,
      data.image.replace('.jpeg', '-2.jpeg'),
      data.image.replace('.jpeg', '-3.jpeg')
    ];
  }
  
  // Fallback default images
  return [
    "./assets/programmes/default-1.jpeg",
    "./assets/programmes/default-2.jpeg",
    "./assets/programmes/default-3.jpeg"
  ];
}

function renderProgrammeShowcase(data) {
  const programmeShowcase = document.getElementById("programmeShowcase");
  if (!programmeShowcase) return;

  programmeShowcase.innerHTML = `
    <div class="programme-header">
      <h1 class="programme-title">${data.title}</h1>
      <p class="programme-subtitle">${data.subtitle}</p>
    </div>

    <div class="programme-content">
      <div class="programme-info">
        <p class="programme-description">${data.description}</p>

        <div class="programme-highlights">
          <div class="highlight-item">
            <div class="highlight-label">Duration</div>
            <div class="highlight-value">${data.duration}</div>
          </div>

          <div class="highlight-item">
            <div class="highlight-label">Eligibility</div>
            <div class="highlight-value">${data.eligibility}</div>
          </div>

          <div class="highlight-item">
            <div class="highlight-label">Certification</div>
            <div class="highlight-value">${data.certification}</div>
          </div>

          <div class="highlight-item">
            <div class="highlight-label">Key Highlights</div>
            <div class="highlight-value">
              <ul>
                ${(data.highlights || []).map(item => `<li>${item}</li>`).join("")}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="programme-sidebar">
        ${renderProgrammeImages(data)}
      </div>
    </div>
  `;

  // Add fade-in animation
  programmeShowcase.style.opacity = '0';
  programmeShowcase.style.transform = 'translateY(20px)';
  setTimeout(() => {
    programmeShowcase.style.transition = 'all 0.6s ease';
    programmeShowcase.style.opacity = '1';
    programmeShowcase.style.transform = 'translateY(0)';
  }, 100);
}

function renderSyllabusSection(data) {
  const syllabusSection = document.getElementById("syllabusSection");
  if (!syllabusSection) return;

  syllabusSection.innerHTML = `
    <div class="info-block">
      <div class="info-block-header">
        <div class="info-block-icon">S</div>
        <h2 class="info-block-title">Course Syllabus</h2>
      </div>

      <div class="syllabus-grid">
        ${(data.syllabus || []).map((item, index) => `
          <div class="syllabus-item">
            <div class="syllabus-number">${index + 1}</div>
            <h3 class="syllabus-name">${item}</h3>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

function renderCareerSection(data) {
  const careerSection = document.getElementById("careerSection");
  if (!careerSection) return;

  careerSection.innerHTML = `
    <div class="info-block">
      <div class="info-block-header">
        <div class="info-block-icon">C</div>
        <h2 class="info-block-title">Career Opportunities</h2>
      </div>

      <div class="career-grid">
        ${(data.careerOpportunities || []).map((item) => `
          <div class="career-item">
            <div class="career-icon">C</div>
            <h3 class="career-title">${item}</h3>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

function getSpecializationImage(subcourse) {
  return subcourse.image || defaultProgrammeImage;
}

function renderFilteredCourses(programmeKey = null, subcourseId = null) {
  const coursesGrid = document.getElementById("coursesGrid");
  if (!coursesGrid) return;

  let filteredCourses = [];
  let courseNumber = 1;

  // If no programmeKey specified, show all courses
  if (!programmeKey) {
    // Add all main courses and subcourses
    Object.keys(programmesData).forEach(key => {
      const programme = programmesData[key];
      filteredCourses.push({
        ...programme,
        courseNumber: courseNumber++,
        isMainCourse: true,
        fee: "₹25,000 - ₹50,000"
      });

      if (programme.subcourses && programme.subcourses.length > 0) {
        programme.subcourses.forEach(subcourse => {
          filteredCourses.push({
            ...subcourse,
            courseNumber: courseNumber++,
            isMainCourse: false,
            parentProgramme: key,
            fee: "₹24,000"
          });
        });
      }
    });
  } else if (subcourseId) {
    // Show only specific subcourse
    const programme = programmesData[programmeKey];
    if (programme && programme.subcourses) {
      const subcourse = programme.subcourses.find(sub => sub.id === subcourseId);
      if (subcourse) {
        filteredCourses.push({
          ...subcourse,
          courseNumber: courseNumber++,
          isMainCourse: false,
          parentProgramme: programmeKey,
          fee: "₹15,000 - ₹35,000"
        });
      }
    }
  } else {
    // Show only specific programme and its subcourses
    const programme = programmesData[programmeKey];
    if (programme) {
      // Only show parent course if it has no subcourses
      if (!programme.subcourses || programme.subcourses.length === 0) {
        filteredCourses.push({
          ...programme,
          courseNumber: courseNumber++,
          isMainCourse: true,
          fee: "₹25,000 - ₹50,000"
        });
      }

      // Show subcourses if they exist
      if (programme.subcourses && programme.subcourses.length > 0) {
        programme.subcourses.forEach(subcourse => {
          filteredCourses.push({
            ...subcourse,
            courseNumber: courseNumber++,
            isMainCourse: false,
            parentProgramme: programmeKey,
            fee: "₹27,000"
          });
        });
      }
    }
  }

  coursesGrid.innerHTML = filteredCourses.map(course => renderCourseCard(course)).join("");
}

function renderCourseCard(course) {
  const image = course.image || course.images?.[0] || "./assets/programmes/default-1.jpeg";
  let tags;
  
  if (course.isMainCourse) {
    tags = [course.name];
  } else {
    // All subcourses: Show only subcourse name, remove parent pills
    tags = [course.name];
  }
  
  return `
    <div class="course-card" data-course-id="${course.id}">
      <img class="course-card-image" src="${image}" alt="${course.title}">
      
      <div class="course-card-content">
        <div class="course-card-tags">
          ${tags.map(tag => `<span class="course-card-tag">${tag}</span>`).join('')}
        </div>
        
        <div class="course-card-header">
          <div class="course-card-number">Course ${course.courseNumber}</div>
          <h3 class="course-card-title">${course.title}</h3>
          <div class="course-card-duration">${course.duration}</div>
        </div>
        
        <p class="course-card-description">${course.description}</p>
        
        <div class="course-card-details">
          <div class="course-card-detail">
            <div class="course-card-detail-label">Eligibility</div>
            <div class="course-card-detail-value">${course.eligibility}</div>
          </div>
          
          <div class="course-card-detail">
            <div class="course-card-detail-label">Annual Fee</div>
            <div class="course-card-detail-value">${course.fee}</div>
          </div>
        </div>
        
        <div class="course-card-action">
          <button class="course-card-button" onclick="openCourseModal('${course.id}', ${course.isMainCourse}, '${course.parentProgramme || ''}')">
            View Full Details →
          </button>
        </div>
      </div>
    </div>
  `;
}

function getParentProgrammeName(programmeKey) {
  const programme = programmesData[programmeKey];
  return programme ? programme.name : '';
}

function setupModalListeners() {
  const modal = document.getElementById("courseModal");
  const overlay = document.getElementById("modalOverlay");
  const closeBtn = document.getElementById("modalClose");

  if (closeBtn) {
    closeBtn.addEventListener("click", closeCourseModal);
  }

  if (overlay) {
    overlay.addEventListener("click", closeCourseModal);
  }

  // Close modal with Escape key
  document.addEventListener("keydown", function(e) {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeCourseModal();
    }
  });
}

function openCourseModal(courseId, isMainCourse, parentProgramme) {
  const modal = document.getElementById("courseModal");
  let course;

  if (isMainCourse) {
    course = programmesData[courseId];
  } else {
    const programme = programmesData[parentProgramme];
    course = programme.subcourses.find(sub => sub.id === courseId);
  }

  if (!course) return;

  // Populate modal content
  document.getElementById("modalHeroImage").src = course.image || course.images?.[0] || "./assets/programmes/default-1.jpeg";
  document.getElementById("modalTitle").textContent = course.title;
  document.getElementById("modalSubtitle").textContent = course.subtitle;
  document.getElementById("modalCourseNumber").textContent = `Course ${course.courseNumber || 'N/A'}`;
  document.getElementById("modalDuration").textContent = course.duration;
  document.getElementById("modalEligibility").textContent = course.eligibility;
  document.getElementById("modalFee").textContent = course.fee || "₹25,000 - ₹50,000";
  document.getElementById("modalDescription").textContent = course.description;
  document.getElementById("modalEligibilityDetail").textContent = course.eligibility;

  // Populate syllabus
  const syllabusContainer = document.getElementById("modalSyllabus");
  if (course.syllabus && course.syllabus.length > 0) {
    syllabusContainer.innerHTML = course.syllabus.map((item, index) => 
      `<div class="modal-syllabus-item" data-index="${index + 1}">${item}</div>`
    ).join('');
  } else {
    syllabusContainer.innerHTML = '<p>No syllabus information available.</p>';
  }

  // Populate career opportunities
  const careerContainer = document.getElementById("modalCareer");
  if (course.careerOpportunities && course.careerOpportunities.length > 0) {
    careerContainer.innerHTML = course.careerOpportunities.map(item => 
      `<div class="modal-career-item">${item}</div>`
    ).join('');
  } else {
    careerContainer.innerHTML = '<p>No career information available.</p>';
  }

  // Show modal
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeCourseModal() {
  const modal = document.getElementById("courseModal");
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

function renderSpecializationSection(programme) {
  const specializationSection = document.getElementById("specializationSection");
  if (!specializationSection) return;

  if (!programme.subcourses || !programme.subcourses.length) {
    specializationSection.innerHTML = "";
    return;
  }

  specializationSection.innerHTML = `
    <div class="info-block">
      <div class="info-block-header">
        <div class="info-block-icon">S</div>
        <h2 class="info-block-title">Specializations</h2>
      </div>

      <div class="specializations-grid">
        ${programme.subcourses.map((subcourse) => `
          <div class="specialization-card">
            <div class="specialization-image" style="background-image: url('${getSpecializationImage(subcourse)}');">
              <span>${subcourse.name}</span>
            </div>

            <div class="specialization-content">
              <h3 class="specialization-title">${subcourse.name}</h3>
              <p class="specialization-description">${subcourse.description}</p>

              <div class="specialization-details">
                <div class="specialization-detail">
                  <div class="detail-label">Duration</div>
                  <div class="detail-value">${subcourse.duration}</div>
                </div>

                <div class="specialization-detail">
                  <div class="detail-label">Eligibility</div>
                  <div class="detail-value">${subcourse.eligibility}</div>
                </div>

                <div class="specialization-detail">
                  <div class="detail-label">Certification</div>
                  <div class="detail-value">${subcourse.certification}</div>
                </div>
              </div>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}