// /* ===== PROFESSIONAL PROGRAMMES PAGE JAVASCRIPT ===== */

// const programmesData = {
//   nursing: {
//     id: "nursing",
//     name: "Nursing Course",
//     title: "Nursing Course",
//     subtitle: "Healthcare Excellence Through Professional Training",
//     description:
//       "Professional nursing education designed to prepare students for healthcare services, hospital assistance, and patient care responsibilities. This programme combines theoretical understanding, basic clinical exposure, and professional discipline to support strong career readiness in healthcare environments.",
//     duration: "1 Year",
//     eligibility: "10+2 with Science",
//     certification: "Nursing Assistant Certificate",
//     highlights: [
//       "Comprehensive healthcare training",
//       "Hands-on clinical experience",
//       "Patient care techniques",
//       "Medical ethics and professionalism"
//     ],
//     syllabus: [
//       "Fundamentals of Nursing",
//       "Anatomy and Physiology",
//       "Patient Care Management",
//       "Medical Terminology",
//       "Clinical Practices",
//       "Healthcare Ethics"
//     ],
//     careerOpportunities: [
//       "Nursing Assistant",
//       "Hospital Staff Nurse",
//       "Patient Care Coordinator",
//       "Healthcare Provider"
//     ],
//     subcourses: []
//   },
//   engineering: {
//     id: "engineering",
//     name: "Engineering Courses",
//     title: "Engineering Courses",
//     subtitle: "Building Technical Excellence for Modern Industries",
//     description:
//       "Comprehensive engineering programmes covering multiple disciplines with focus on practical skills, theoretical knowledge, and industry readiness. Students gain expertise in core engineering principles, modern technologies, and professional practices.",
//     duration: "2 Years",
//     eligibility: "10+2 with PCM",
//     certification: "Engineering Diploma",
//     highlights: [
//       "Multi-disciplinary approach",
//       "Industry-relevant curriculum",
//       "Practical workshop training",
//       "Career placement support"
//     ],
//     syllabus: [
//       "Engineering Mathematics",
//       "Technical Drawing",
//       "Workshop Practices",
//       "Computer Applications",
//       "Project Management",
//       "Industrial Training"
//     ],
//     careerOpportunities: [
//       "Junior Engineer",
//       "Technical Supervisor",
//       "Project Assistant",
//       "Quality Control Engineer"
//     ],
//     subcourses: [
//       {
//         id: "civil",
//         name: "Civil Engineering",
//         title: "Civil Engineering",
//         subtitle: "Building Infrastructure for Tomorrow",
//         description: "Focus on construction, design, and infrastructure development with modern engineering practices.",
//         duration: "2 Years",
//         eligibility: "10+2 with PCM",
//         certification: "Civil Engineering Diploma",
//         highlights: [
//           "Construction technology",
//           "Structural design",
//           "Project management",
//           "Surveying techniques"
//         ],
//         syllabus: [
//           "Construction Materials",
//           "Structural Analysis",
//           "Surveying and Leveling",
//           "Building Design",
//           "Project Management",
//           "Safety Engineering"
//         ],
//         careerOpportunities: [
//           "Site Engineer",
//           "Construction Supervisor",
//           "Structural Designer",
//           "Project Manager"
//         ],
//         images: ["civil1.jpg", "civil2.jpg", "civil3.jpg"]
//       },
//       {
//         id: "mechanical",
//         name: "Mechanical Engineering",
//         title: "Mechanical Engineering",
//         subtitle: "Powering Industrial Innovation",
//         description: "Comprehensive study of machines, tools, and mechanical systems with practical applications.",
//         duration: "2 Years",
//         eligibility: "10+2 with PCM",
//         certification: "Mechanical Engineering Diploma",
//         highlights: [
//           "Machine design",
//           "Manufacturing processes",
//           "Thermal engineering",
//           "CAD/CAM applications"
//         ],
//         syllabus: [
//           "Machine Design",
//           "Thermodynamics",
//           "Manufacturing Technology",
//           "CAD/CAM",
//           "Fluid Mechanics",
//           "Industrial Engineering"
//         ],
//         careerOpportunities: [
//           "Mechanical Engineer",
//           "Maintenance Engineer",
//           "Design Engineer",
//           "Production Supervisor"
//         ],
//         images: ["mech1.jpg", "mech2.jpg", "mech3.jpg"]
//       },
//       {
//         id: "electrical",
//         name: "Electrical Engineering",
//         title: "Electrical Engineering",
//         subtitle: "Powering the Future with Electrical Innovation",
//         description: "Study of electrical systems, power generation, and modern electrical technologies.",
//         duration: "2 Years",
//         eligibility: "10+2 with PCM",
//         certification: "Electrical Engineering Diploma",
//         highlights: [
//           "Power systems",
//           "Control systems",
//           "Electrical machines",
//           "Renewable energy"
//         ],
//         syllabus: [
//           "Electrical Machines",
//           "Wiring Practice",
//           "Power Systems",
//           "Control Basics",
//           "Lab Work"
//         ]
//       }
//     ]
//   },

//   paramedical: {
//     id: "paramedical",
//     name: "Paramedical Course",
//     title: "Paramedical Course",
//     subtitle: "Healthcare Support Excellence Through Specialized Training",
//     description:
//       "Comprehensive paramedical education focusing on diagnostic support, patient assistance, and healthcare technology. Students gain expertise in medical diagnostics, laboratory procedures, and patient care support systems.",
//     duration: "1 Year",
//     eligibility: "10+2 with Science",
//     certification: "Paramedical Certificate",
//     highlights: [
//       "Diagnostic technology training",
//       "Laboratory procedures",
//       "Patient care support",
//       "Medical equipment handling"
//     ],
//     syllabus: [
//       "Medical Diagnostics",
//       "Laboratory Techniques",
//       "Patient Care Support",
//       "Medical Equipment",
//       "Healthcare Safety",
//       "Clinical Procedures",
//       "Clinical training support",
//       "Modern equipment exposure",
//       "Medical fundamentals",
//       "Career-oriented structure"
//     ],
//     careerOpportunities: [
//       "Lab Technician",
//       "X-Ray Technician",
//       "Pharmacy Assistant",
//       "Diagnostic Centre Support Staff"
//     ],
//     images: [
//       "assets/images/programmes/paramedical-1.jpg",
//       "assets/images/programmes/paramedical-2.jpg",
//       "assets/images/programmes/paramedical-3.jpg"
//     ],
//     syllabus: [
//       "Medical Fundamentals",
//       "Diagnostic Support Basics",
//       "Patient Handling",
//       "Clinical Procedures",
//       "Laboratory Awareness",
//       "Practical Internship"
//     ],
//     subcourses: [
//       {
//         id: "xray",
//         name: "X-Ray",
//         title: "X-Ray Technician",
//         subtitle: "Diagnostic Imaging Excellence",
//         description:
//           "Professional training for diagnostic imaging support with patient positioning, equipment handling, and radiation safety procedures.",
//         duration: "1 Year",
//         eligibility: "10+2 with Science",
//         certification: "X-Ray Technician Certificate",
//         highlights: [
//           "Radiology basics",
//           "Equipment operation",
//           "Imaging support training"
//         ],
//         careerOpportunities: [
//           "X-Ray Technician",
//           "Radiology Assistant",
//           "Diagnostic Centre Staff"
//         ],
//         images: [
//           "assets/images/programmes/xray-1.jpg",
//           "assets/images/programmes/xray-2.jpg",
//           "assets/images/programmes/xray-3.jpg"
//         ],
//         syllabus: [
//           "Radiology Basics",
//           "X-Ray Equipment",
//           "Patient Positioning",
//           "Radiation Safety",
//           "Image Handling",
//           "Practical Training"
//         ]
//       },
//       {
//         id: "lab-technician",
//         name: "Lab Technician",
//         title: "Lab Technician",
//         subtitle: "Clinical Laboratory Excellence",
//         description:
//           "Training in sample handling, blood testing, laboratory process support, and basic diagnostic procedures using standard lab protocols.",
//         duration: "1 Year",
//         eligibility: "10+2 with Science",
//         certification: "Lab Technician Certificate",
//         highlights: [
//           "Laboratory procedures",
//           "Diagnostic support skills",
//           "Testing workflow practice"
//         ],
//         careerOpportunities: [
//           "Lab Technician",
//           "Pathology Assistant",
//           "Medical Lab Staff"
//         ],
//         images: [
//           "assets/images/programmes/lab-1.jpg",
//           "assets/images/programmes/lab-2.jpg",
//           "assets/images/programmes/lab-3.jpg"
//         ],
//         syllabus: [
//           "Blood Testing",
//           "Urine Analysis",
//           "Lab Equipment Handling",
//           "Microbiology Basics",
//           "Sample Processing",
//           "Practical Training"
//         ]
//       },
//       {
//         id: "d-pharm",
//         name: "D.Pharm",
//         title: "Diploma in Pharmacy",
//         subtitle: "Pharmaceutical Sciences and Practice",
//         description:
//           "Pharmacy-focused training for medicine dispensing, pharmacy operations, drug handling, and patient interaction support.",
//         duration: "2 Years",
//         eligibility: "10+2 with PCM / PCB",
//         certification: "Diploma in Pharmacy",
//         highlights: [
//           "Pharmacy practice",
//           "Medicine handling",
//           "Drug classification basics"
//         ],
//         careerOpportunities: [
//           "Pharmacy Assistant",
//           "Medical Store Executive",
//           "Pharmaceutical Support Staff"
//         ],
//         images: [
//           "assets/images/programmes/pharmacy-1.jpg",
//           "assets/images/programmes/pharmacy-2.jpg",
//           "assets/images/programmes/pharmacy-3.jpg"
//         ],
//         syllabus: [
//           "Pharmacology Basics",
//           "Drug Classification",
//           "Dispensing Procedures",
//           "Pharmacy Law Basics",
//           "Patient Counselling",
//           "Practical Training"
//         ]
//       }
//     ]
//   },

//   computer: {
//     id: "computer",
//     name: "Computer & IT",
//     title: "Computer & IT",
//     subtitle: "Digital Skills for the Modern Workplace",
//     description:
//       "Practical computer education focused on software usage, office productivity, internet skills, and basic technical understanding.",
//     duration: "6 Months",
//     eligibility: "Basic Computer Knowledge",
//     certification: "IT Skills Certificate",
//     highlights: [
//       "Office applications",
//       "Digital productivity",
//       "Basic hardware awareness",
//       "Job-oriented training"
//     ],
//     careerOpportunities: [
//       "Computer Operator",
//       "Office Assistant",
//       "IT Support Trainee",
//       "Data Entry Executive"
//     ],
//     images: [
//       "assets/images/programmes/computer-1.jpg",
//       "assets/images/programmes/computer-2.jpg",
//       "assets/images/programmes/computer-3.jpg"
//     ],
//     syllabus: [
//       "Computer Fundamentals",
//       "MS Office Tools",
//       "Internet and Email",
//       "Typing Practice",
//       "Basic Hardware",
//       "Practical Assignments"
//     ],
//     subcourses: []
//   },

//   teachers: {
//     id: "teachers",
//     name: "Teachers Education",
//     title: "Teachers Education",
//     subtitle: "Shaping Future Educators",
//     description:
//       "Teacher training designed to improve classroom communication, instructional methods, child understanding, and educational professionalism.",
//     duration: "1 Year",
//     eligibility: "Graduation",
//     certification: "Diploma in Teacher Education",
//     highlights: [
//       "Teaching methodology",
//       "Classroom management",
//       "Child psychology basics",
//       "Practice teaching"
//     ],
//     careerOpportunities: [
//       "Primary Teacher",
//       "Tutor",
//       "Academic Coordinator",
//       "Learning Facilitator"
//     ],
//     images: [
//       "assets/images/programmes/teachers-1.jpg",
//       "assets/images/programmes/teachers-2.jpg",
//       "assets/images/programmes/teachers-3.jpg"
//     ],
//     syllabus: [
//       "Teaching Fundamentals",
//       "Educational Psychology",
//       "Classroom Management",
//       "Lesson Planning",
//       "Teaching Practice",
//       "Assessment Methods"
//     ],
//     subcourses: []
//   },

//   science: {
//     id: "science",
//     name: "Home Science",
//     title: "Home Science",
//     subtitle: "Science for Better Living",
//     description:
//       "Applied learning in nutrition, family welfare, lifestyle science, and home resource management for practical and professional development.",
//     duration: "1 Year",
//     eligibility: "10+2 with Science",
//     certification: "Diploma in Home Science",
//     highlights: [
//       "Nutrition awareness",
//       "Family resource management",
//       "Applied life science"
//     ],
//     careerOpportunities: [
//       "Nutrition Assistant",
//       "Community Worker",
//       "Wellness Support Executive"
//     ],
//     images: [
//       "assets/images/programmes/homescience-1.jpg",
//       "assets/images/programmes/homescience-2.jpg",
//       "assets/images/programmes/homescience-3.jpg"
//     ],
//     syllabus: [
//       "Food and Nutrition",
//       "Human Development",
//       "Family Resource Management",
//       "Textile Basics",
//       "Home Management",
//       "Field Work"
//     ],
//     subcourses: []
//   },

//   skill: {
//     id: "skill",
//     name: "Skill Development Course",
//     title: "Skill Development Course",
//     subtitle: "Enhancing Employability Through Practical Skills",
//     description:
//       "Short-term programmes focused on communication, work readiness, professionalism, and employability improvement.",
//     duration: "3 Months",
//     eligibility: "Basic Education",
//     certification: "Skill Development Certificate",
//     highlights: [
//       "Short duration learning",
//       "Workplace readiness",
//       "Communication improvement",
//       "Practical outcomes"
//     ],
//     careerOpportunities: [
//       "Office Assistant",
//       "Customer Support Executive",
//       "Sales Trainee",
//       "Team Support Staff"
//     ],
//     images: [
//       "assets/images/programmes/skills-1.jpg",
//       "assets/images/programmes/skills-2.jpg",
//       "assets/images/programmes/skills-3.jpg"
//     ],
//     syllabus: [
//       "Communication Skills",
//       "Workplace Etiquette",
//       "Basic Computer Usage",
//       "Interview Skills",
//       "Career Guidance",
//       "Practical Sessions"
//     ],
//     subcourses: []
//   },

//   beautician: {
//     id: "beautician",
//     name: "Beautician Course",
//     title: "Beautician Course",
//     subtitle: "Professional Beauty and Wellness Training",
//     description:
//       "Beauty and wellness training focused on skincare, makeup techniques, client interaction, and salon support services.",
//     duration: "6 Months",
//     eligibility: "10th Pass",
//     certification: "Beautician Certificate",
//     highlights: [
//       "Beauty therapy basics",
//       "Makeup application",
//       "Client service training",
//       "Salon-oriented learning"
//     ],
//     careerOpportunities: [
//       "Beautician",
//       "Makeup Artist",
//       "Salon Assistant",
//       "Wellness Consultant"
//     ],
//     images: [
//       "assets/images/programmes/beautician-1.jpg",
//       "assets/images/programmes/beautician-2.jpg",
//       "assets/images/programmes/beautician-3.jpg"
//     ],
//     syllabus: [
//       "Beauty Fundamentals",
//       "Skin Care",
//       "Makeup Techniques",
//       "Hair Care Basics",
//       "Client Handling",
//       "Practical Training"
//     ],
//     subcourses: []
//   },

//   tailoring: {
//     id: "tailoring",
//     name: "Tailoring Course",
//     title: "Tailoring Course",
//     subtitle: "Professional Garment Design and Stitching Training",
//     description:
//       "Structured training in stitching, measurement, pattern cutting, garment construction, and design basics.",
//     duration: "6 Months",
//     eligibility: "8th Pass",
//     certification: "Tailoring Certificate",
//     highlights: [
//       "Garment creation",
//       "Pattern cutting",
//       "Fabric understanding",
//       "Practical tailoring"
//     ],
//     careerOpportunities: [
//       "Tailor",
//       "Boutique Assistant",
//       "Garment Worker",
//       "Fashion Support Designer"
//     ],
//     images: [
//       "assets/images/programmes/tailoring-1.jpg",
//       "assets/images/programmes/tailoring-2.jpg",
//       "assets/images/programmes/tailoring-3.jpg"
//     ],
//     syllabus: [
//       "Measurement Techniques",
//       "Pattern Making",
//       "Fabric Knowledge",
//       "Stitching Methods",
//       "Garment Construction",
//       "Practical Work"
//     ],
//     subcourses: []
//   }
// };

// // Initialize the page
// document.addEventListener("DOMContentLoaded", function () {
//   populateProgrammeTabs();
//   displayProgramme("nursing");
//   setupEventListeners();
// });

// // Populate programme tabs
// function populateProgrammeTabs() {
//   const programmeTabs = document.getElementById("programmeTabs");
//   if (!programmeTabs) return;

//   programmeTabs.innerHTML = "";

//   Object.keys(programmesData).forEach((key) => {
//     const programme = programmesData[key];
//     const tab = document.createElement("div");
//     tab.className = "programme-tab";
//     tab.dataset.programme = key;
//     tab.textContent = programme.name;
//     programmeTabs.appendChild(tab);
//   });
// }

// // Populate categories grid
// function populateCategoriesGrid() {
//   const categoriesGrid = document.getElementById("categoriesGrid");
//   if (!categoriesGrid) return;

//   categoriesGrid.innerHTML = "";

//   Object.keys(programmesData).forEach((key) => {
//     const programme = programmesData[key];
//     const card = document.createElement("div");
//     card.className = "category-card";
//     card.dataset.programme = key;
    
//     const icon = getProgrammeIcon(key);
    
//     card.innerHTML = `
//       <div class="category-icon">${icon}</div>
//       <h3 class="category-name">${programme.name}</h3>
//       <p class="category-description">${programme.description.substring(0, 120)}...</p>
//     `;
    
//     categoriesGrid.appendChild(card);
//   });
// }

// // Get programme icon
// function getProgrammeIcon(key) {
//   const icons = {
//     nursing: "N",
//     engineering: "E",
//     paramedical: "P",
//     computer: "IT",
//     teachers: "T",
//     science: "HS",
//     skill: "S",
//     beautician: "B",
//     tailoring: "TL"
//   };
//   return icons[key] || "P";
// }

// // Setup event listeners
// function setupEventListeners() {
//   document.addEventListener("click", function (e) {
//     const programmeTab = e.target.closest(".programme-tab");
//     const dropLink = e.target.closest("#programmesDropdown a");

//     if (programmeTab) {
//       e.preventDefault();
//       displayProgramme(programmeTab.dataset.programme);
//       updateActiveTab(programmeTab.dataset.programme);
//       return;
//     }

//     if (dropLink) {
//       e.preventDefault();
//       const programmeKey = dropLink.dataset.programme;
//       const subcourseId = dropLink.dataset.subcourse;

//       if (subcourseId) {
//         displaySubcourse(programmeKey, subcourseId);
//       } else {
//         displayProgramme(programmeKey);
//       }
//       updateActiveTab(programmeKey);
//     }
//   });
// }

// // Update active programme tab
// function updateActiveTab(programmeKey) {
//   document.querySelectorAll(".programme-tab").forEach((tab) => {
//     tab.classList.toggle("active", tab.dataset.programme === programmeKey);
//   });
// }

// // Display main programme
// function displayProgramme(programmeKey) {
//   const programme = programmesData[programmeKey];
//   if (!programme) return;

//   renderProgrammeShowcase(programme);
//   renderSyllabusSection(programme);
//   renderCareerSection(programme);
//   renderSpecializationSection(programme);
// }

// // Display subcourse
// function displaySubcourse(programmeKey, subcourseId) {
//   const programme = programmesData[programmeKey];
//   if (!programme) return;

//   const subcourse = programme.subcourses.find((item) => item.id === subcourseId);
//   if (!subcourse) return;

//   renderProgrammeShowcase(subcourse);
//   renderSyllabusSection(subcourse);
//   renderCareerSection(subcourse);
//   renderSpecializationSection(programme);
// }

// // Render programme showcase
// function renderProgrammeShowcase(data) {
//   const programmeShowcase = document.getElementById("programmeShowcase");
//   if (!programmeShowcase) return;

//   programmeShowcase.innerHTML = `
//     <div class="programme-header">
//       <h1 class="programme-title">${data.title}</h1>
//       <p class="programme-subtitle">${data.subtitle}</p>
//     </div>
//     <div class="programme-content">
//       <div class="programme-info">
//         <p class="programme-description">${data.description}</p>
//         <div class="programme-highlights">
//           <div class="highlight-item">
//             <div class="highlight-label">Duration</div>
//             <div class="highlight-value">${data.duration}</div>
//           </div>
//           <div class="highlight-item">
//             <div class="highlight-label">Eligibility</div>
//             <div class="highlight-value">${data.eligibility}</div>
//           </div>
//           <div class="highlight-item">
//             <div class="highlight-label">Certification</div>
//             <div class="highlight-value">${data.certification}</div>
//           </div>
//           <div class="highlight-item">
//             <div class="highlight-label">Key Highlights</div>
//             <div class="highlight-value">
//               <ul style="margin: 0; padding-left: 16px;">
//                 ${data.highlights.map(item => `<li style="margin-bottom: 4px;">${item}</li>`).join("")}
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div class="programme-sidebar">
//         <h3 class="sidebar-title">Course Overview</h3>
//         <div class="sidebar-image">
//           ${data.title} Image
//         </div>
//         <div style="text-align: center; color: #64748b; font-family: Arial, sans-serif; font-size: 1rem;">
//           Professional training with modern facilities and experienced faculty
//         </div>
//       </div>
//     </div>
//   `;
// }

// // Render syllabus section
// function renderSyllabusSection(data) {
//   const syllabusSection = document.getElementById("syllabusSection");
//   if (!syllabusSection) return;

//   syllabusSection.innerHTML = `
//     <div class="info-block">
//       <div class="info-block-header">
//         <div class="info-block-icon">S</div>
//         <h2 class="info-block-title">Course Syllabus</h2>
//       </div>
//       <div class="syllabus-grid">
//         ${data.syllabus.map((item, index) => `
//           <div class="syllabus-item">
//             <div class="syllabus-number">${index + 1}</div>
//             <h3 class="syllabus-name">${item}</h3>
//           </div>
//         `).join("")}
//       </div>
//     </div>
//   `;
// }

// // Render career section
// function renderCareerSection(data) {
//   const careerSection = document.getElementById("careerSection");
//   if (!careerSection) return;

//   careerSection.innerHTML = `
//     <div class="info-block">
//       <div class="info-block-header">
//         <div class="info-block-icon">C</div>
//         <h2 class="info-block-title">Career Opportunities</h2>
//       </div>
//       <div class="career-grid">
//         ${data.careerOpportunities.map((item) => `
//           <div class="career-item">
//             <div class="career-icon">C</div>
//             <h3 class="career-title">${item}</h3>
//           </div>
//         `).join("")}
//       </div>
//     </div>
//   `;
// }

// // Render specialization section
// function renderSpecializationSection(programme) {
//   const specializationSection = document.getElementById("specializationSection");
//   if (!specializationSection) return;

//   if (!programme.subcourses || !programme.subcourses.length) {
//     specializationSection.innerHTML = "";
//     return;
//   }

//   specializationSection.innerHTML = `
//     <div class="info-block">
//       <div class="info-block-header">
//         <div class="info-block-icon">S</div>
//         <h2 class="info-block-title">Specializations</h2>
//       </div>
//       <div class="specializations-grid">
//         ${programme.subcourses.map((subcourse) => `
//           <div class="specialization-card">
//             <div class="specialization-image">
//               ${subcourse.name}
//             </div>
//             <div class="specialization-content">
//               <h3 class="specialization-title">${subcourse.name}</h3>
//               <p class="specialization-description">${subcourse.description}</p>
//               <div class="specialization-details">
//                 <div class="specialization-detail">
//                   <div class="detail-label">Duration</div>
//                   <div class="detail-value">${subcourse.duration}</div>
//                 </div>
//                 <div class="specialization-detail">
//                   <div class="detail-label">Eligibility</div>
//                   <div class="detail-value">${subcourse.eligibility}</div>
//                 </div>
//                 <div class="specialization-detail">
//                   <div class="detail-label">Certification</div>
//                   <div class="detail-value">${subcourse.certification}</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         `).join("")}
//       </div>
//     </div>
//   `;
// }







/* ===== PROFESSIONAL PROGRAMMES PAGE JAVASCRIPT ===== */

const programmesData = {
  nursing: {
    id: "nursing",
    name: "Nursing Course",
    title: "Nursing Course",
    subtitle: "Healthcare Excellence Through Professional Training",
    description:
      "Professional nursing education designed to prepare students for healthcare services, hospital assistance, and patient care responsibilities. This programme combines theoretical understanding, basic clinical exposure, and professional discipline to support strong career readiness in healthcare environments.",
    duration: "1 Year",
    eligibility: "10+2 with Science",
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
    subcourses: []
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
        images: ["civil1.jpg", "civil2.jpg", "civil3.jpg"]
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
        images: ["mech1.jpg", "mech2.jpg", "mech3.jpg"]
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
        ]
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
      "assets/images/programmes/paramedical-1.jpg",
      "assets/images/programmes/paramedical-2.jpg",
      "assets/images/programmes/paramedical-3.jpg"
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
        images: [
          "assets/images/programmes/xray-1.jpg",
          "assets/images/programmes/xray-2.jpg",
          "assets/images/programmes/xray-3.jpg"
        ],
        syllabus: [
          "Radiology Basics",
          "X-Ray Equipment",
          "Patient Positioning",
          "Radiation Safety",
          "Image Handling",
          "Practical Training"
        ]
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
        images: [
          "assets/images/programmes/lab-1.jpg",
          "assets/images/programmes/lab-2.jpg",
          "assets/images/programmes/lab-3.jpg"
        ],
        syllabus: [
          "Blood Testing",
          "Urine Analysis",
          "Lab Equipment Handling",
          "Microbiology Basics",
          "Sample Processing",
          "Practical Training"
        ]
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
        images: [
          "assets/images/programmes/pharmacy-1.jpg",
          "assets/images/programmes/pharmacy-2.jpg",
          "assets/images/programmes/pharmacy-3.jpg"
        ],
        syllabus: [
          "Pharmacology Basics",
          "Drug Classification",
          "Dispensing Procedures",
          "Pharmacy Law Basics",
          "Patient Counselling",
          "Practical Training"
        ]
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
    images: [
      "assets/images/programmes/computer-1.jpg",
      "assets/images/programmes/computer-2.jpg",
      "assets/images/programmes/computer-3.jpg"
    ],
    syllabus: [
      "Computer Fundamentals",
      "MS Office Tools",
      "Internet and Email",
      "Typing Practice",
      "Basic Hardware",
      "Practical Assignments"
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
    images: [
      "assets/images/programmes/teachers-1.jpg",
      "assets/images/programmes/teachers-2.jpg",
      "assets/images/programmes/teachers-3.jpg"
    ],
    syllabus: [
      "Teaching Fundamentals",
      "Educational Psychology",
      "Classroom Management",
      "Lesson Planning",
      "Teaching Practice",
      "Assessment Methods"
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
    images: [
      "assets/images/programmes/homescience-1.jpg",
      "assets/images/programmes/homescience-2.jpg",
      "assets/images/programmes/homescience-3.jpg"
    ],
    syllabus: [
      "Food and Nutrition",
      "Human Development",
      "Family Resource Management",
      "Textile Basics",
      "Home Management",
      "Field Work"
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
    images: [
      "assets/images/programmes/skills-1.jpg",
      "assets/images/programmes/skills-2.jpg",
      "assets/images/programmes/skills-3.jpg"
    ],
    syllabus: [
      "Communication Skills",
      "Workplace Etiquette",
      "Basic Computer Usage",
      "Interview Skills",
      "Career Guidance",
      "Practical Sessions"
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
      }
    ]
  },

  beautician: {
    id: "beautician",
    name: "Beautician Course",
    title: "Beautician Course",
    subtitle: "Professional Beauty and Wellness Training",
    description:
      "Beauty and wellness training focused on skincare, makeup techniques, client interaction, and salon support services.",
    duration: "6 Months",
    eligibility: "10th Pass",
    certification: "Beautician Certificate",
    highlights: [
      "Beauty therapy basics",
      "Makeup application",
      "Client service training",
      "Salon-oriented learning"
    ],
    careerOpportunities: [
      "Beautician",
      "Makeup Artist",
      "Salon Assistant",
      "Wellness Consultant"
    ],
    images: [
      "assets/images/programmes/beautician-1.jpg",
      "assets/images/programmes/beautician-2.jpg",
      "assets/images/programmes/beautician-3.jpg"
    ],
    syllabus: [
      "Beauty Fundamentals",
      "Skin Care",
      "Makeup Techniques",
      "Hair Care Basics",
      "Client Handling",
      "Practical Training"
    ],
    subcourses: []
  },

  tailoring: {
    id: "tailoring",
    name: "Tailoring Course",
    title: "Tailoring Course",
    subtitle: "Professional Garment Design and Stitching Training",
    description:
      "Structured training in stitching, measurement, pattern cutting, garment construction, and design basics.",
    duration: "6 Months",
    eligibility: "8th Pass",
    certification: "Tailoring Certificate",
    highlights: [
      "Garment creation",
      "Pattern cutting",
      "Fabric understanding",
      "Practical tailoring"
    ],
    careerOpportunities: [
      "Tailor",
      "Boutique Assistant",
      "Garment Worker",
      "Fashion Support Designer"
    ],
    images: [
      "assets/images/programmes/tailoring-1.jpg",
      "assets/images/programmes/tailoring-2.jpg",
      "assets/images/programmes/tailoring-3.jpg"
    ],
    syllabus: [
      "Measurement Techniques",
      "Pattern Making",
      "Fabric Knowledge",
      "Stitching Methods",
      "Garment Construction",
      "Practical Work"
    ],
    subcourses: []
  }
};

// Initialize the page
document.addEventListener("DOMContentLoaded", function () {
  populateProgrammeTabs();
  displayProgramme("nursing");
  setupEventListeners();
});

// Populate programme tabs
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

// Setup event listeners
function setupEventListeners() {
  document.addEventListener("click", function (e) {
    const programmeTab = e.target.closest(".programme-tab");
    const dropLink = e.target.closest("#programmesDropdown a");

    if (programmeTab) {
      e.preventDefault();
      displayProgramme(programmeTab.dataset.programme);
      updateActiveTab(programmeTab.dataset.programme);
      return;
    }

    if (dropLink) {
      e.preventDefault();
      const programmeKey = dropLink.dataset.programme;
      const subcourseId = dropLink.dataset.subcourse;

      if (subcourseId) {
        displaySubcourse(programmeKey, subcourseId);
      } else {
        displayProgramme(programmeKey);
      }

      updateActiveTab(programmeKey);
    }
  });
}

// Update active programme tab
function updateActiveTab(programmeKey) {
  document.querySelectorAll(".programme-tab").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.programme === programmeKey);
  });
}

// Display main programme
function displayProgramme(programmeKey) {
  const programme = programmesData[programmeKey];
  if (!programme) return;

  renderProgrammeShowcase(programme);
  renderSyllabusSection(programme);
  renderCareerSection(programme);
  renderSpecializationSection(programme);
}

// Display subcourse
function displaySubcourse(programmeKey, subcourseId) {
  const programme = programmesData[programmeKey];
  if (!programme || !programme.subcourses) return;

  const subcourse = programme.subcourses.find((item) => item.id === subcourseId);
  if (!subcourse) return;

  renderProgrammeShowcase(subcourse);
  renderSyllabusSection(subcourse);
  renderCareerSection(subcourse);
  renderSpecializationSection(programme);
}

// Render programme showcase
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
              <ul style="margin: 0; padding-left: 16px;">
                ${(data.highlights || []).map(item => `<li style="margin-bottom: 4px;">${item}</li>`).join("")}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="programme-sidebar">
        <h3 class="sidebar-title">Course Overview</h3>
        <div class="sidebar-image">
          ${data.title} Image
        </div>
        <div style="text-align: center; color: #64748b; font-family: Arial, sans-serif; font-size: 1rem;">
          Professional training with modern facilities and experienced faculty
        </div>
      </div>
    </div>
  `;
}

// Render syllabus section
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

// Render career section
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

// Render specialization section
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
            <div class="specialization-image">
              ${subcourse.name}
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