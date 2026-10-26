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
    syllabusDetails: {
      papers: [
        {
          paperTitle: "Paper I",
          subject: "Fundamentals of Nursing",
          units: [
            {
              unitTitle: "Unit I",
              topics: [
                "Introduction to Nursing",
                "Nursing Ethics and Professionalism",
                "Communication Skills in Healthcare",
                "Basic Patient Care Procedures"
              ]
            },
            {
              unitTitle: "Unit II",
              topics: [
                "Infection Control",
                "Vital Signs Monitoring",
                "Patient Safety",
                "Documentation and Record Keeping"
              ]
            }
          ]
        },
        {
          paperTitle: "Paper II",
          subject: "Anatomy and Physiology",
          units: [
            {
              unitTitle: "Unit I",
              topics: [
                "Human Body Structure",
                "Skeletal System",
                "Muscular System",
                "Nervous System Basics"
              ]
            },
            {
              unitTitle: "Unit II",
              topics: [
                "Cardiovascular System",
                "Respiratory System",
                "Digestive System",
                "Excretory System"
              ]
            }
          ]
        }
      ],
      practicals: [
        "Basic Nursing Procedures",
        "Patient Care Demonstration",
        "First Aid Training",
        "Clinical Rotation Practice",
        "Medical Equipment Handling"
      ]
    },
    careerOpportunities: [
      "Nursing Assistant",
      "Hospital Staff Nurse",
      "Patient Care Coordinator",
      "Healthcare Provider"
    ],
    images: [
      "./assets/programmes/nursing1.jpeg"
    ],
    subcourses: [
      {
        id: "diploma-nursing",
        name: "ADFNA - Advanced Diploma in Female Nursing Assistant",
        title: "ADFNA - Advanced Diploma in Female Nursing Assistant",
        subtitle: "Advanced Nursing Education for Healthcare Excellence",
        description: "Comprehensive diploma programme in nursing focusing on advanced patient care, clinical practices, medical ethics, and professional healthcare standards. This course prepares students for diverse nursing roles in hospitals, clinics, and healthcare facilities.",
        duration: "3 Years",
        eligibility: "10+2 with Science (PCB)",
        certification: "ADFNA - Advanced Diploma in Female Nursing Assistant",
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
        syllabusDetails: {
          papers: [
            {
              paperTitle: "Paper I",
              subject: "Advanced Nursing Fundamentals",
              units: [
                {
                  unitTitle: "Unit I",
                  topics: [
                    "Advanced Patient Assessment",
                    "Critical Care Nursing",
                    "Emergency Nursing Procedures",
                    "Advanced Life Support"
                  ]
                },
                {
                  unitTitle: "Unit II",
                  topics: [
                    "Pharmacology in Nursing",
                    "Pain Management",
                    "Wound Care Management",
                    "IV Therapy Administration"
                  ]
                }
              ]
            },
            {
              paperTitle: "Paper II",
              subject: "Medical-Surgical Nursing",
              units: [
                {
                  unitTitle: "Unit I",
                  topics: [
                    "Pre-operative Care",
                    "Post-operative Care",
                    "Surgical Wound Management",
                    "Anesthesia Nursing"
                  ]
                },
                {
                  unitTitle: "Unit II",
                  topics: [
                    "Gastrointestinal Surgery",
                    "Cardiovascular Surgery",
                    "Orthopedic Surgery",
                    "Neurosurgery Nursing"
                  ]
                }
              ]
            }
          ],
          practicals: [
            "Advanced Clinical Procedures",
            "Surgical Nursing Practice",
            "ICU/CCU Training",
            "Emergency Response Drills",
            "Medical Administration"
          ]
        },
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
    syllabusDetails: {
      papers: [
        {
          paperTitle: "Paper I",
          subject: "Engineering Mathematics",
          units: [
            {
              unitTitle: "Unit I",
              topics: [
                "Calculus and Differential Equations",
                "Linear Algebra",
                "Probability and Statistics",
                "Complex Numbers"
              ]
            },
            {
              unitTitle: "Unit II",
              topics: [
                "Integration Techniques",
                "Vector Calculus",
                "Fourier Series",
                "Numerical Methods"
              ]
            }
          ]
        },
        {
          paperTitle: "Paper II",
          subject: "Technical Drawing",
          units: [
            {
              unitTitle: "Unit I",
              topics: [
                "Engineering Graphics Basics",
                "Orthographic Projections",
                "Isometric Views",
                "Sectional Views"
              ]
            },
            {
              unitTitle: "Unit II",
              topics: [
                "Assembly Drawings",
                "Machine Drawing",
                "CAD Fundamentals",
                "Blueprint Reading"
              ]
            }
          ]
        }
      ],
      practicals: [
        "Engineering Workshop Practice",
        "CAD/CAM Laboratory",
        "Surveying Practical",
        "Material Testing Lab",
        "Project Work"
      ]
    },
    careerOpportunities: [
      "Junior Engineer",
      "Technical Supervisor",
      "Project Assistant",
      "Quality Control Engineer"
    ],
    images: [
      "./assets/programmes/engineering1.jpeg",
  
    ],
    subcourses: [
      {
        id: "civil",
        name: "Dip.in.Civil Engineering",
        title: "Dip.in.Civil Engineering",
        subtitle: "Building Infrastructure",
        description: "Diploma in Civil Engineering is a diploma level engineering course that specializes in the design, construction, and maintenance of physical and naturally-built environment, such as roads, bridges, canals, dams and buildings. A Civil Engineer is responsible for all building structures- comprising the planning, design, budgeting, construction management, developing national wide transport systems, water supply networks, surveying and analysis-and civil engineers should except to use all these skills regardless of their specialization. Civil engineering is a rapidly advancing industry, constantly adapting to contemporary developments and concerns, such as pollution, water shortages and sustainable energies",
        careerOpportunities: [
          "CAD Engineer",
          "Construction Jobs",
          "Architects",
          "Structural Engineer",
          "Design Engineer",
          "Draughtsman",
          "Geotechnical Engineer",
          "Water Resources Engineer"
        ],
        careerProspectsIntro: "There are several jobs available after completing Diploma in Civil. This includes",
        careerProspects: [
          "CAD Engineer",
          "Construction Jobs",
          "Architects",
          "Structural Engineer",
          "Design Engineer",
          "Draughtsman",
          "Geotechnical Engineer",
          "Water Resources Engineer"
        ],
        duration: "1 Years",
        eligibility: "A Pass in 10th Standard",
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
        syllabusDetails: {
          papers: [
            {
              paperTitle: "Paper I",
              subject: "Basic Civil Engineering",
              units: [
                {
                  unitTitle: "Unit I",
                  topics: [
                    "Introduction to Civil Engineering",
                    "Building Materials",
                    "Types of Construction",
                    "Construction Technology"
                  ]
                },
                {
                  unitTitle: "Unit II",
                  topics: [
                    "Surveying Basics",
                    "Levelling Methods",
                    "Measurement Techniques",
                    "Modern Surveying Equipment"
                  ]
                }
              ]
            },
            {
              paperTitle: "Paper II",
              subject: "Structural Engineering",
              units: [
                {
                  unitTitle: "Unit I",
                  topics: [
                    "Structural Analysis Basics",
                    "Load Distribution",
                    "Beam Design",
                    "Column Design"
                  ]
                },
                {
                  unitTitle: "Unit II",
                  topics: [
                    "Foundation Design",
                    "Steel Structures",
                    "Concrete Technology",
                    "Earthquake Resistant Design"
                  ]
                }
              ]
            }
          ],
          practicals: [
            "Surveying Practical",
            "Building Drawing Practice",
            "Construction Material Testing",
            "Structural Design Lab",
            "Site Visit Training"
          ]
        },
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
        name: "Dip.in.Mechanical Engineering",
        title: "Dip.in.Mechanical Engineering",
        subtitle: "Powering Industrial Innovation",
        description: "Diploma in Mechanical programme teaches the students a basic understanding and knowledge of how heavy tools and machinery work. A student pursuing a mechanical engineering programme will acquire knowledge about designing automobiles, electric motors, aircraft and other heavy vehicles. Mechanical engineers design everything from new batteries and athletic equipment to medical devices and from personal computers, air conditioners, and automobile engines to electric power plants. These engineers also design machines that produce these innovations. The scope of mechanical engineering in India and abroad is huge because every aspect of our lives is touched by mechanical engineering in one way or the other.",
        duration: "1 Years",
        eligibility: "A Pass in 10th Standard",
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
        syllabusDetails: {
          papers: [
            {
              paperTitle: "Paper I",
              subject: "Basic Mechanical Engineering",
              units: [
                {
                  unitTitle: "Unit I",
                  topics: [
                    "Introduction to Mechanical Engineering",
                    "Engineering Materials",
                    "Manufacturing Processes",
                    "Machine Tools"
                  ]
                },
                {
                  unitTitle: "Unit II",
                  topics: [
                    "Thermodynamics Basics",
                    "Heat Transfer",
                    "Fluid Mechanics",
                    "Energy Systems"
                  ]
                }
              ]
            },
            {
              paperTitle: "Paper II",
              subject: "Machine Design",
              units: [
                {
                  unitTitle: "Unit I",
                  topics: [
                    "Design Principles",
                    "Mechanical Drawings",
                    "Gear Design",
                    "Bearing Selection"
                  ]
                },
                {
                  unitTitle: "Unit II",
                  topics: [
                    "CAD/CAM Applications",
                    "CNC Programming",
                    "3D Modeling",
                    "Product Design"
                  ]
                }
              ]
            }
          ],
          practicals: [
            "Machine Shop Practice",
            "CAD/CAM Laboratory",
            "Thermal Engineering Lab",
            "Fluid Mechanics Practical",
            "Project Fabrication"
          ]
        },
        careerOpportunities: [
          "Mechanical Engineer",
          "Maintenance Engineer",
          "Design Engineer",
          "Production Supervisor"
        ],
        careerProspectsIntro: "Some of the best scopes after finishing Diploma in Mechanical are:",
        careerProspects: [
          "Quality Control Engineer",
          "Production Supervisor",
          "Maintenance Engineer",
          "Automotive Engineer",
          "Assistant Executive Engineer"
        ],
        image: "./assets/programmes/machanical.jpeg"
      },
      {
        id: "electrical",
        name: "Dip.in.Electrical Engineering",
        title: "Dip.in.Electrical Engineering",
        subtitle: "Powering the Future with Electrical Innovation",
        description: "This branch of engineering focuses on electricity, electronics, and electromagnetism. After the commercialization of the electric telegraph and electrical power supply in the late nineteenth century, the area became a recognized vocation. In addition to electricity, it now encompasses electronics and control systems and signal processing, and telecommunications. The electrical engineering sector provides excellent career prospects.",
        duration: "1 Years",
        eligibility: "A Pass in 10th Standard",
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
        syllabusDetails: {
          papers: [
            {
              paperTitle: "Paper I",
              subject: "Basic Electrical Engineering",
              units: [
                {
                  unitTitle: "Unit I",
                  topics: [
                    "Introduction to Electrical Engineering",
                    "Basic Circuit Theory",
                    "Ohm's Law and Kirchhoff's Laws",
                    "Electrical Measurements"
                  ]
                },
                {
                  unitTitle: "Unit II",
                  topics: [
                    "AC and DC Circuits",
                    "Transformers",
                    "Electrical Machines Basics",
                    "Power Generation"
                  ]
                }
              ]
            },
            {
              paperTitle: "Paper II",
              subject: "Electrical Machines and Control",
              units: [
                {
                  unitTitle: "Unit I",
                  topics: [
                    "DC Machines",
                    "AC Machines",
                    "Motor Control",
                    "Generator Operations"
                  ]
                },
                {
                  unitTitle: "Unit II",
                  topics: [
                    "Power Systems",
                    "Transmission Lines",
                    "Distribution Systems",
                    "Electrical Safety"
                  ]
                }
              ]
            }
          ],
          practicals: [
            "Electrical Wiring Practice",
            "Machine Lab Practical",
            "Power System Laboratory",
            "Control System Lab",
            "Industrial Training"
          ]
        },
        careerOpportunities: [
          "Electrical Technician",
          "Maintenance Assistant",
          "Control Panel Technician",
          "Power Systems Assistant"
        ],
        careerProspectsIntro: "There are a lot of career opportunities after one finishes Diploma in Electrical. This includes",
        careerProspects: [
          "Electrical Engineer",
          "Electrical Design Engineer",
          "Telecommunications Engineer",
          "Micro Electrical Engineer",
          "Electrical Service Engineer"
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
    syllabusDetails: {
      papers: [
        {
          paperTitle: "Paper I",
          subject: "Medical Fundamentals",
          units: [
            {
              unitTitle: "Unit I",
              topics: [
                "Introduction to Paramedical Sciences",
                "Human Anatomy Basics",
                "Medical Terminology",
                "Healthcare Ethics"
              ]
            },
            {
              unitTitle: "Unit II",
              topics: [
                "Physiology Basics",
                "Pathology Fundamentals",
                "Microbiology Basics",
                "First Aid and Emergency Care"
              ]
            }
          ]
        },
        {
          paperTitle: "Paper II",
          subject: "Diagnostic Support",
          units: [
            {
              unitTitle: "Unit I",
              topics: [
                "Diagnostic Equipment Basics",
                "Patient Preparation",
                "Sample Collection",
                "Laboratory Procedures"
              ]
            },
            {
              unitTitle: "Unit II",
              topics: [
                "Radiography Basics",
                "ECG and EKG Procedures",
                "Ultrasound Fundamentals",
                "Diagnostic Report Analysis"
              ]
            }
          ]
        }
      ],
      practicals: [
        "Diagnostic Equipment Operation",
        "Patient Care Assistance",
        "Laboratory Procedures",
        "Emergency Response Training",
        "Clinical Internship"
      ]
    },
    careerOpportunities: [
      "Lab Technician",
      "X-Ray Technician",
      "Pharmacy Assistant",
      "Diagnostic Centre Support Staff"
    ],
    images: [
      "./assets/programmes/paramedical.jpeg",
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
        syllabusDetails: {
          papers: [
            {
              paperTitle: "Paper I",
              subject: "Radiography Fundamentals",
              units: [
                {
                  unitTitle: "Unit I",
                  topics: [
                    "Introduction to Radiography",
                    "Radiation Physics",
                    "X-Ray Equipment Operation",
                    "Radiation Safety Principles"
                  ]
                },
                {
                  unitTitle: "Unit II",
                  topics: [
                    "Patient Positioning Techniques",
                    "Image Quality Control",
                    "Contrast Studies",
                    "Radiation Protection"
                  ]
                }
              ]
            },
            {
              paperTitle: "Paper II",
              subject: "Advanced Radiography",
              units: [
                {
                  unitTitle: "Unit I",
                  topics: [
                    "Special Radiographic Procedures",
                    "CT Scan Basics",
                    "MRI Fundamentals",
                    "Ultrasound Principles"
                  ]
                },
                {
                  unitTitle: "Unit II",
                  topics: [
                    "Digital Radiography",
                    "PACS Systems",
                    "Quality Assurance",
                    "Professional Ethics"
                  ]
                }
              ]
            }
          ],
          practicals: [
            "X-Ray Equipment Operation",
            "Patient Positioning Practice",
            "Radiation Safety Drills",
            "Image Processing Lab",
            "Clinical Radiography"
          ]
        },
        image: "./assets/programmes/x-ray.jpeg"
      },
      {
        id: "lab-technician",
        name: "ADMLT - Advanced Diploma in Medical Lab Technician",
        title: "ADMLT - Advanced Diploma in Medical Lab Technician",
        subtitle: "Clinical Laboratory Excellence",
        description:"The Diploma in Medical Lab Technician (DMLT) is a one-year program designed to train individuals in the essential skills and knowledge required to perform laboratory tests and procedures that assist in the diagnosis and treatment of diseases. This course equips students with expertise in areas such as blood analysis, microbiology, immunology and biochemistry.",
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
        careerProspectsIntro: "Upon completion of the DMLT program, graduates are well-equipped to pursue careers in hospitals, clinics, diagnostic laboratories, research institutions, and pharmaceutical companies. They may work as Medical Lab Technicians, performing tests, analysing results, and preparing reports. Students may also find opportunities in quality control, research, and education sectors. The demand for qualified Medical Lab Technicians is consistently increasing, making this a promising career path with excellent job security and growth potential.",
        careerProspects: [
          "Medical Lab Technician",
          "Pathology Assistant",
          "Diagnostic Lab Staff",
          "Quality Control Technician",
          "Research Assistant",
          "Pharmaceutical Lab Technician"
        ],
        syllabus: [
          "Blood Testing",
          "Urine Analysis",
          "Lab Equipment Handling",
          "Microbiology Basics",
          "Sample Processing",
          "Practical Training"
        ],
        syllabusDetails: {
          papers: [
            {
              paperTitle: "Paper I",
              subject: "Clinical Laboratory Technology",
              units: [
                {
                  unitTitle: "Unit I",
                  topics: [
                    "Introduction to Laboratory Medicine",
                    "Laboratory Safety",
                    "Sample Collection Techniques",
                    "Quality Control in Lab"
                  ]
                },
                {
                  unitTitle: "Unit II",
                  topics: [
                    "Hematology Basics",
                    "Blood Banking Fundamentals",
                    "Clinical Chemistry",
                    "Microbiology Techniques"
                  ]
                }
              ]
            },
            {
              paperTitle: "Paper II",
              subject: "Advanced Laboratory Procedures",
              units: [
                {
                  unitTitle: "Unit I",
                  topics: [
                    "Advanced Hematology",
                    "Immunology and Serology",
                    "Histopathology Basics",
                    "Molecular Diagnostics"
                  ]
                },
                {
                  unitTitle: "Unit II",
                  topics: [
                    "Laboratory Management",
                    "Automation in Lab",
                    "Research Methodology",
                    "Professional Ethics"
                  ]
                }
              ]
            }
          ],
          practicals: [
            "Blood Sample Collection",
            "Urine Analysis Procedures",
            "Microscopy Practice",
            "Biochemistry Tests",
            "Laboratory Internship"
          ]
        },
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
        syllabusDetails: {
          papers: [
            {
              paperTitle: "Paper I",
              subject: "Pharmaceutical Sciences",
              units: [
                {
                  unitTitle: "Unit I",
                  topics: [
                    "Introduction to Pharmacy",
                    "Pharmacology Basics",
                    "Drug Classification",
                    "Pharmaceutical Chemistry"
                  ]
                },
                {
                  unitTitle: "Unit II",
                  topics: [
                    "Dosage Forms",
                    "Drug Interactions",
                    "Adverse Drug Reactions",
                    "Pharmacokinetics"
                  ]
                }
              ]
            },
            {
              paperTitle: "Paper II",
              subject: "Pharmacy Practice",
              units: [
                {
                  unitTitle: "Unit I",
                  topics: [
                    "Dispensing Procedures",
                    "Prescription Handling",
                    "Patient Counselling",
                    "Community Pharmacy"
                  ]
                },
                {
                  unitTitle: "Unit II",
                  topics: [
                    "Hospital Pharmacy",
                    "Drug Store Management",
                    "Pharmacy Law and Ethics",
                    "First Aid and Emergency"
                  ]
                }
              ]
            }
          ],
          practicals: [
            "Dispensing Practice",
            "Compounding Procedures",
            "Drug Store Management",
            "Patient Counselling Sessions",
            "Pharmacy Internship"
          ]
        },
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
    syllabusDetails: {
      papers: [
        {
          paperTitle: "Paper I",
          subject: "Computer Fundamentals",
          units: [
            {
              unitTitle: "Unit I",
              topics: [
                "Introduction to Computers",
                "Computer Hardware Components",
                "Operating Systems",
                "Software Basics"
              ]
            },
            {
              unitTitle: "Unit II",
              topics: [
                "File Management",
                "Computer Security",
                "Internet Basics",
                "Email Communication"
              ]
            }
          ]
        },
        {
          paperTitle: "Paper II",
          subject: "Office Applications",
          units: [
            {
              unitTitle: "Unit I",
              topics: [
                "Microsoft Word",
                "Document Formatting",
                "Templates and Styles",
                "Mail Merge"
              ]
            },
            {
              unitTitle: "Unit II",
              topics: [
                "Microsoft Excel",
                "Spreadsheet Formulas",
                "Charts and Graphs",
                "Data Analysis"
              ]
            }
          ]
        }
      ],
      practicals: [
        "Typing Practice",
        "MS Office Lab",
        "Internet Applications",
        "Hardware Assembly",
        "Project Work"
      ]
    },
    images: [
      "./assets/programmes/computer1.jpeg"
    ],
    subcourses: []
  },

  teachers: {
    id: "teachers",
    name: "Teachers Education",
    title: "Teachers Education",
    subtitle: "Shaping Future Educators",
    description:"Indian Association of Teacher Educators (IATE), the oldest and leading professional body of teacher educators of India was established on 25th Nov, 1950",
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
    careerProspectsIntro: "Objectives of the Association are:",
    careerProspects: [
      "To develop and promote teacher education",
      "To provide a forum for discussion and deliberations on issues and problems related to education in general and teacher education in particular",
      "To conduct workshops, seminars, conferences etc. on teacher education and related areas",
      "To publish journals, monographs and other literatures on teacher education",
      "To co-operate with organizations working in area of teacher education",
      "Tamilnadu Council for Open and Distance Learning is a member organisation of Indian Association of Teachers Educators (IATE) and is actively working towards creating better teachers for future"
    ],
    syllabus: [
      "Teaching Fundamentals",
      "Educational Psychology",
      "Classroom Management",
      "Lesson Planning",
      "Teaching Practice",
      "Assessment Methods"
    ],
    syllabusDetails: {
      papers: [
        {
          paperTitle: "Paper I",
          subject: "Educational Foundations",
          units: [
            {
              unitTitle: "Unit I",
              topics: [
                "Introduction to Education",
                "Educational Philosophy",
                "Educational Psychology",
                "Learning Theories"
              ]
            },
            {
              unitTitle: "Unit II",
              topics: [
                "Child Development",
                "Cognitive Development",
                "Social Development",
                "Emotional Development"
              ]
            }
          ]
        },
        {
          paperTitle: "Paper II",
          subject: "Teaching Methodology",
          units: [
            {
              unitTitle: "Unit I",
              topics: [
                "Teaching Methods",
                "Lesson Planning",
                "Classroom Management",
                "Teaching Aids"
              ]
            },
            {
              unitTitle: "Unit II",
              topics: [
                "Assessment Techniques",
                "Educational Technology",
                "Inclusive Education",
                "Professional Ethics"
              ]
            }
          ]
        }
      ],
      practicals: [
        "Teaching Practice",
        "Classroom Observation",
        "Lesson Plan Preparation",
        "Educational Technology Lab",
        "Internship"
      ]
    },
    images: [
      "./assets/programmes/teacher1.jpeg"
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
    syllabusDetails: {
      papers: [
        {
          paperTitle: "Paper I",
          subject: "Food and Nutrition",
          units: [
            {
              unitTitle: "Unit I",
              topics: [
                "Nutrition Basics",
                "Food Groups",
                "Balanced Diet",
                "Meal Planning"
              ]
            },
            {
              unitTitle: "Unit II",
              topics: [
                "Food Preservation",
                "Cooking Methods",
                "Food Safety",
                "Kitchen Management"
              ]
            }
          ]
        },
        {
          paperTitle: "Paper II",
          subject: "Human Development",
          units: [
            {
              unitTitle: "Unit I",
              topics: [
                "Child Development",
                "Adolescent Psychology",
                "Family Dynamics",
                "Life Skills"
              ]
            },
            {
              unitTitle: "Unit II",
              topics: [
                "Family Resource Management",
                "Home Economics",
                "Textile Science",
                "Interior Design Basics"
              ]
            }
          ]
        }
      ],
      practicals: [
        "Cooking Practical",
        "Nutrition Assessment",
        "Home Management Projects",
        "Textile Work",
        "Community Outreach"
      ]
    },
    images: [
      "./assets/programmes/homescience1.jpeg"
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
    syllabusDetails: {
      papers: [
        {
          paperTitle: "Paper I",
          subject: "Professional Development",
          units: [
            {
              unitTitle: "Unit I",
              topics: [
                "Communication Skills",
                "Verbal and Non-Verbal Communication",
                "Business Writing",
                "Presentation Skills"
              ]
            },
            {
              unitTitle: "Unit II",
              topics: [
                "Workplace Etiquette",
                "Professional Behavior",
                "Team Work",
                "Time Management"
              ]
            }
          ]
        },
        {
          paperTitle: "Paper II",
          subject: "Career Readiness",
          units: [
            {
              unitTitle: "Unit I",
              topics: [
                "Resume Building",
                "Interview Techniques",
                "Job Search Strategies",
                "Networking Skills"
              ]
            },
            {
              unitTitle: "Unit II",
              topics: [
                "Basic Computer Skills",
                "Digital Literacy",
                "Online Professionalism",
                "Career Planning"
              ]
            }
          ]
        }
      ],
      practicals: [
        "Communication Exercises",
        "Mock Interviews",
        "Computer Practice",
        "Team Projects",
        "Workplace Simulation"
      ]
    },
    images: [
      "./assets/programmes/skill1.jpeg"
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
        description: "A Diploma in Beautician is a one-year program that provides students with hands-on training and theoretical knowledge in various aspects of beauty therapy and skincare. The program covers topics such as skincare treatments, makeup application, hair styling, nail care, spa therapies, and salon management. Students learn about different beauty products, tools, and techniques used in the industry, as well as the importance of hygiene and safety practices in a salon setting.",
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
        syllabusDetails: {
          courseInfo: {
            title: "Diploma in Beautician / Beauty & Wellness",
            duration: "1 Year",
            eligibility: "10th / 12th Pass",
            certification: "Diploma in Beautician / Beauty & Wellness"
          },
          modules: [
            {
              moduleTitle: "Basic Beauty Therapy",
              subjects: [
                "Introduction to Beauty Therapy",
                "Professional Ethics & Grooming",
                "Skin Anatomy and Skin Types",
                "Personal Hygiene and Salon Safety",
                "Communication Skills"
              ],
              practicals: [
                "Salon Setup Practice",
                "Client Consultation",
                "Hygiene Procedures"
              ]
            },
            {
              moduleTitle: "Skin Care & Facial Treatments",
              subjects: [
                "Basic Facials",
                "Advanced Facial Techniques",
                "Bleach and Cleanup",
                "Acne and Pigmentation Care",
                "Facial Machines Basics"
              ],
              practicals: [
                "Fruit Facial",
                "Gold Facial",
                "Cleanup Procedure",
                "Face Massage Techniques"
              ]
            },
            {
              moduleTitle: " Hair Care & Hair Styling",
              subjects: [
                "Hair Structure and Hair Types",
                "Hair Spa Treatment",
                "Hair Cutting Techniques",
                "Hair Coloring Basics",
                "Hair Straightening & Curling"
              ],
              practicals: [
                "Layer Cut",
                "U Cut",
                "Hair Spa",
                "Blow Dry",
                "Hair Styling"
              ]
            },
            {
              moduleTitle: " Makeup Techniques",
              subjects: [
                "Basic Makeup",
                "Bridal Makeup",
                "Party Makeup",
                "HD Makeup Introduction",
                "Cosmetic Product Knowledge"
              ],
              practicals: [
                "Bridal Makeup Practice",
                "Saree Draping",
                "Eye Makeup",
                "Contouring and Highlighting"
              ]
            },
            {
              moduleTitle: "Nail & Hand Care",
              subjects: [
                "Manicure Techniques",
                "Pedicure Techniques",
                "Nail Art Basics",
                "Nail Extension Introduction"
              ],
              practicals: [
                "Spa Manicure",
                "Spa Pedicure",
                "Basic Nail Art"
              ]
            },
            {
              moduleTitle: "Module 6 – Spa & Wellness",
              subjects: [
                "Body Massage Basics",
                "Aroma Therapy",
                "Spa Treatments",
                "Wellness Therapy"
              ],
              practicals: [
                "Body Massage",
                "Spa Therapy Session",
                "Relaxation Techniques"
              ]
            }
          ],
          additionalSubjects: [
            "Entrepreneurship Development",
            "Customer Handling",
            "Salon Management",
            "Marketing Basics",
            "Beauty Product Knowledge"
          ],
          careerOpportunities: [
            "Beautician",
            "Bridal Makeup Artist",
            "Hair Stylist",
            "Salon Manager",
            "Spa Therapist",
            "Nail Technician",
            "Beauty Trainer",
            "Freelance Makeup Artist"
          ]
        },
        careerOpportunities: [
          "Salon Assistant",
          "Beauty Support Staff",
          "Spa Assistant",
          "Wellness Centre Trainee"
        ],
        careerProspectsIntro: "Graduates of a Diploma in Beautician program have a range of career opportunities available to them in beauty and wellness industry. Some potential career paths include:",
        careerProspects: [
          "Beauty Therapist: Providing a variety of beauty treatments and services to clients, such as facials, body massages, waxing, and manicures/pedicures",
          "Makeup Artist: Creating makeup looks for special events, photoshoots, film and television productions, fashion shows, and bridal clients",
          "Nail Technician: Providing nail care services such as manicures, pedicures, and nail enhancements like acrylics and gels",
          "Hair Stylist: Offering hair cutting, styling, colouring, and treatment services to clients in a salon setting",
          "Spa Therapist: Performing a range of spa treatments, such as body wraps, scrubs, massages, and hydrotherapy, to promote relaxation and rejuvenation",
          "Salon Manager: Overseeing day-to-day operations of a beauty salon, including staff management, client bookings, inventory management, and marketing strategies"
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
        image: "./assets/programmes/agricultures.jpeg",
      }
    ]  
  },

  cha: {
    id: "cha",
    name: "Chief Health Ambassador (CHA)",
    title: "Chief Health Ambassador (CHA)",
    subtitle: "Community Health Training Programme",
    description:
      "Community health training covering public healthcare, telemedicine, human anatomy and physiology, infection prevention and control, first aid and basic life support, laboratory procedures, and biomedical waste management.",
    duration: "3 Months",
    eligibility: "10th or 12th Pass",
    certification: "—",
    fee: "FREE",
    feeLabel: "Course Fee",
    highlights: [],
    syllabus: [
      "Public Health and Healthcare Delivery System",
      "Telemedicine and Healthcare Services",
      "Human Anatomy and Physiology",
      "Infection Prevention and Control",
      "First Aid and Basic Life Support",
      "Laboratory Procedures and Specimen Handling",
      "Biomedical Waste Management"
    ],
    careerOpportunities: [],
    images: [
      "./assets/programmes/health.jpeg"
    ],
    subcourses: []
  },

  gda: {
    id: "gda",
    name: "General Duty Assistant (GDA)",
    title: "General Duty Assistant (GDA)",
    subtitle: "Healthcare Support Training Programme",
    description:
      "The official course overview for the General Duty Assistant (GDA) programme will be published here once the approved curriculum details are provided.",
    duration: "6 Months",
    eligibility: "10th or 12th Pass",
    certification: "—",
    fee: "₹27,500",
    feeLabel: "Course Fee",
    highlights: [],
    syllabus: [
      "Human Anatomy and Physiology",
      "Fundamentals of Healthcare and Patient Care",
      "Personal Hygiene and Grooming",
      "Patient Mobility and Positioning",
      "Vital Signs Measurement",
      "Basic Nursing Care and Bedside Assistance",
      "Infection Prevention and Control",
      "Nutrition, Feeding and Elimination Care",
      "First Aid and Emergency Response",
      "Patient Communication, Safety and Documentation"
    ],
    careerOpportunities: [],
    images: [
      "./assets/programmes/health.jpeg"
    ],
    subcourses: []
  },

  "telemedicine-technician": {
    id: "telemedicine-technician",
    name: "Telehealth Services Coordinator",
    title: "Telehealth Services Coordinator",
    subtitle: "Remote Healthcare and Digital Health Support",
    description:
      "Professional training for delivering remote healthcare support through telemedicine platforms. Students learn to set up and manage virtual consultations, operate telehealth equipment, assist doctors during online consultations, handle remote patient monitoring devices, and maintain digital health records with confidentiality.",
    duration: "6 Months",
    eligibility: "10th or 12th Pass",
    certification: "Telehealth Services Coordinator Certificate",
    fee: "₹25,960",
    feeLabel: "Course Fee",
    highlights: [
      "Telemedicine platform operation",
      "Remote consultation support",
      "Digital health records management",
      "Patient data confidentiality"
    ],
    syllabus: [
      "Human Anatomy and Physiology",
      "Basic Healthcare and Medical Terminology",
      "Computer Fundamentals and Digital Literacy",
      "Telemedicine Technology and Telecommunication",
      "Medical Equipment Operation and Maintenance",
      "Vital Signs Measurement",
      "Teleconsultation and Patient Management",
      "Electronic Medical Records and Healthcare Documentation",
      "Patient Safety, Infection Control and Data Privacy",
      "Practical Training and Employability Skills"
    ],
    careerOpportunities: [
      "Telemedicine Technician",
      "Telehealth Support Staff",
      "Remote Patient Monitoring Assistant",
      "Telemedicine Centre Coordinator"
    ],
    images: [
      "./assets/programmes/health.jpeg"
    ],
    subcourses: []
  }

};

const officiallyFreeCourses = [
  "nursing",
  "diploma-nursing",
  "engineering",
  "civil",
  "mechanical",
  "electrical",
  "paramedical",
  "xray",
  "lab-technician",
  "d-pharm",
  "computer",
  "teachers",
  "science",
  "skill",
  "mining-sector",
  "rubber-chemical-plastic",
  "media-entertainment",
  "yoga-wellness",
  "beauty-wellness",
  "healthcare-sector",
  "handicrafts-carpet",
  "banking-bfsi",
  "electronics-sector",
  "food-industry",
  "agriculture-sector"
];

function isCourseFree(course) {
  return !!course && officiallyFreeCourses.includes(course.id);
}

const careerPathwayCategories = [
  { key: "entryLevel", icon: "💼", title: "Entry-Level Job Opportunities" },
  { key: "industry", icon: "🏭", title: "Industry-Based Employment" },
  { key: "selfEmployment", icon: "🧑‍💼", title: "Self-Employment" },
  { key: "apprenticeship", icon: "📝", title: "Apprenticeship and Internship" },
  { key: "higherEducation", icon: "🎓", title: "Higher Education and Skill Development" },
  { key: "entrepreneurship", icon: "💡", title: "Entrepreneurship" }
];

const courseCareerPathways = {
  nursing: {
    entryLevel: "Nursing Assistant, Ward Aide, Patient Care Attendant and Home Care Aide roles",
    industry: "Employment in hospitals, nursing homes, clinics, community health centres and home-healthcare agencies",
    selfEmployment: "Private duty nursing, home patient care and elderly care services",
    apprenticeship: "Clinical internships and apprenticeships in hospitals, primary health centres and community health programmes",
    higherEducation: "ANM, GNM, B.Sc Nursing and specialised certificate courses in critical care or midwifery",
    entrepreneurship: "Home healthcare agency, patient care services and community health awareness services"
  },
  "diploma-nursing": {
    entryLevel: "Staff Nurse, Community Health Nurse, Nursing Assistant and Private Duty Nurse positions",
    industry: "Multi-speciality hospitals, maternity homes, clinics, diagnostic centres and healthcare NGOs",
    selfEmployment: "Independent private duty nursing and home-based patient care services",
    apprenticeship: "Hospital clinical rotations and internships in ICU, emergency and community health departments",
    higherEducation: "B.Sc Nursing, Post Basic Nursing and advanced nursing specialisation programmes",
    entrepreneurship: "Nursing care agency, home healthcare services and patient support enterprise"
  },
  engineering: {
    entryLevel: "Junior Engineer, Technical Supervisor, Project Assistant and Quality Control Trainee roles",
    industry: "Construction companies, manufacturing units, infrastructure projects and plant maintenance departments",
    selfEmployment: "Contract-based technical services such as drafting, estimation and site supervision",
    apprenticeship: "Industrial apprenticeships with engineering firms, PSUs and manufacturing establishments",
    higherEducation: "B.E./B.Tech through lateral entry, AMIE and CAD/CAM or trade certifications",
    entrepreneurship: "Technical consultancy, fabrication or repair unit and project contracting services"
  },
  civil: {
    entryLevel: "Site Engineer, Draughtsman, Survey Assistant and Construction Supervisor roles",
    industry: "Construction firms, real estate developers, road and infrastructure projects and government contractors",
    selfEmployment: "Independent building plan drafting, estimation, surveying and site supervision services",
    apprenticeship: "Site-based apprenticeships and internships with construction and infrastructure companies",
    higherEducation: "B.E./B.Tech Civil Engineering (lateral entry), AutoCAD, Revit and quantity surveying certifications",
    entrepreneurship: "Civil contracting, building material supply, surveying services and construction consultancy"
  },
  mechanical: {
    entryLevel: "Mechanical Technician, Machine Operator, Maintenance Assistant and Quality Inspector roles",
    industry: "Manufacturing plants, automobile industry, fabrication units, power plants and HVAC services",
    selfEmployment: "Machine repair, maintenance services and job-work machining for local industries",
    apprenticeship: "Apprenticeships in manufacturing, automobile and fabrication industries",
    higherEducation: "B.E./B.Tech Mechanical Engineering (lateral entry), CNC, CAD/CAM and welding certifications",
    entrepreneurship: "Fabrication workshop, machinery service centre and spare-parts trading business"
  },
  electrical: {
    entryLevel: "Electrical Technician, Wireman, Control Panel Assistant and Maintenance Assistant roles",
    industry: "Power distribution companies, electrical contractors, manufacturing units and facility maintenance services",
    selfEmployment: "House wiring, electrical repair and appliance servicing work",
    apprenticeship: "Apprenticeships with power utilities, electrical contractors and industrial plants",
    higherEducation: "B.E./B.Tech Electrical Engineering (lateral entry), electrician licence and solar installation certification",
    entrepreneurship: "Electrical contracting, solar installation services and appliance service centre"
  },
  paramedical: {
    entryLevel: "Lab Technician, X-Ray Technician, Pharmacy Assistant and Diagnostic Centre Support Staff roles",
    industry: "Hospitals, diagnostic laboratories, clinics, blood banks and retail pharmacies",
    selfEmployment: "Home sample collection and patient support services",
    apprenticeship: "Internships in hospital departments and diagnostic centres",
    higherEducation: "B.Sc MLT, B.Pharm and specialised paramedical diploma programmes",
    entrepreneurship: "Diagnostic collection centre and allied healthcare support services"
  },
  xray: {
    entryLevel: "X-Ray Technician, Radiology Assistant and Imaging Support Staff roles",
    industry: "Hospitals, diagnostic imaging centres, orthopaedic and trauma clinics",
    selfEmployment: "Mobile X-ray and imaging support services in partnership with licensed radiologists",
    apprenticeship: "Internship in hospital radiology departments and scan centres",
    higherEducation: "B.Sc Radiography / Imaging Technology and CT, MRI or ultrasound technician courses",
    entrepreneurship: "Diagnostic imaging centre in partnership and X-ray equipment support services"
  },
  "lab-technician": {
    entryLevel: "Medical Lab Technician, Pathology Assistant and Phlebotomist (sample collection) roles",
    industry: "Diagnostic laboratories, hospitals, blood banks, research labs and pharmaceutical quality control",
    selfEmployment: "Home sample collection and freelance phlebotomy services",
    apprenticeship: "Internship in pathology laboratories and hospital clinical labs",
    higherEducation: "B.Sc Medical Laboratory Technology and advanced courses in microbiology or biochemistry",
    entrepreneurship: "Pathology sample collection centre in tie-up with diagnostic chains"
  },
  "d-pharm": {
    entryLevel: "Pharmacy Assistant, Medical Store Executive and Dispensing Assistant roles",
    industry: "Retail pharmacies, hospital pharmacies, pharmaceutical companies and medicine distributors",
    selfEmployment: "Registered pharmacist services as per Pharmacy Council norms",
    apprenticeship: "Internship in retail and hospital pharmacies",
    higherEducation: "B.Pharm (lateral entry) and pharmaceutical sales or marketing certifications",
    entrepreneurship: "Retail medical store and medicine distribution business with a valid drug licence"
  },
  "telemedicine-technician": {
    entryLevel: "Telemedicine Technician, Telehealth Support Staff, Remote Patient Monitoring Assistant and Telemedicine Centre Coordinator roles",
    industry: "Hospitals, telemedicine centres, e-health clinics, diagnostic centres and digital health service providers",
    selfEmployment: "Teleconsultation assistance and remote patient monitoring support services",
    apprenticeship: "Internships in hospital telemedicine units, e-health kiosks and telehealth programmes",
    higherEducation: "B.Sc in allied health sciences and advanced diplomas in digital health or health informatics",
    entrepreneurship: "Telemedicine facilitation centre and digital health support services"
  },
  computer: {
    entryLevel: "Computer Operator, Data Entry Executive, Office Assistant and IT Support Trainee roles",
    industry: "Offices, banks, schools, BPO/KPO units, service centres and e-governance centres",
    selfEmployment: "Freelance data entry, DTP, documentation and computer support services",
    apprenticeship: "Internships in IT support desks and office administration",
    higherEducation: "Advanced IT diplomas, programming courses, Tally and digital skill certifications",
    entrepreneurship: "Computer service centre, e-services centre and computer training institute"
  },
  teachers: {
    entryLevel: "Primary Teacher, Tutor, Learning Facilitator and Academic Coordinator roles",
    industry: "Schools, pre-schools, tuition centres and education-focused NGOs",
    selfEmployment: "Private tuition, home tutoring and coaching classes",
    apprenticeship: "Practice teaching and internship placements in schools",
    higherEducation: "B.Ed, D.El.Ed, CTET/TET preparation and specialised pedagogy courses",
    entrepreneurship: "Coaching centre, pre-school and educational consultancy services"
  },
  science: {
    entryLevel: "Nutrition Assistant, Community Worker and Wellness Support Executive roles",
    industry: "Anganwadi/ICDS projects, NGOs, wellness centres, hospitals (diet support) and food service institutions",
    selfEmployment: "Diet and nutrition guidance, home-based food services and tailoring or craft work",
    apprenticeship: "Internships with community nutrition programmes, NGOs and wellness centres",
    higherEducation: "B.Sc Home Science, dietetics and nutrition diplomas and childcare certifications",
    entrepreneurship: "Catering or tiffin service, boutique or tailoring unit and day-care centre"
  },
  skill: {
    entryLevel: "Office Assistant, Customer Support Executive, Sales Trainee and Team Support Staff roles",
    industry: "Retail, offices, service sector establishments and field support operations",
    selfEmployment: "Freelance support services and commission-based sales work",
    apprenticeship: "On-the-job training and apprenticeships with local employers",
    higherEducation: "Sector-specific skill certificates and NSDC-aligned advanced courses",
    entrepreneurship: "Small service businesses and local enterprises supported by skill training"
  },
  "mining-sector": {
    entryLevel: "Mining Field Assistant, Site Support Staff, Industrial Helper and Operations Trainee roles",
    industry: "Mining companies, quarrying operations and mineral processing units",
    selfEmployment: "Equipment support and transport or logistics services for mining areas",
    apprenticeship: "Mine-site apprenticeships and safety training programmes",
    higherEducation: "Mining mate and blaster certificate courses and heavy machinery operation training",
    entrepreneurship: "Earthworks contracting and transport services for mining operations"
  },
  "rubber-chemical-plastic": {
    entryLevel: "Production Assistant, Machine Helper, Packaging Staff and Factory Support Worker roles",
    industry: "Rubber product units, chemical plants and plastic moulding or processing industries",
    selfEmployment: "Plastic product trading and small-scale job-work services",
    apprenticeship: "Factory apprenticeships in rubber, chemical and plastic processing units",
    higherEducation: "Polymer technology diploma and machine operation or moulding certifications",
    entrepreneurship: "Small plastic or rubber goods manufacturing unit and recycling ventures"
  },
  "media-entertainment": {
    entryLevel: "Production Assistant, Media Support Staff, Content Assistant and Studio Coordinator roles",
    industry: "TV channels, production houses, event companies and digital media agencies",
    selfEmployment: "Freelance videography, content creation and event coverage",
    apprenticeship: "Internships with production houses, studios and local media channels",
    higherEducation: "Diplomas in mass media, video editing, photography and sound design",
    entrepreneurship: "Production unit, digital content or YouTube venture and event management services"
  },
  "yoga-wellness": {
    entryLevel: "Yoga Assistant, Wellness Support Staff, Fitness Centre Assistant and Community Wellness Trainer roles",
    industry: "Yoga studios, wellness centres, gyms, resorts, schools and corporate wellness programmes",
    selfEmployment: "Personal yoga training and home-visit wellness sessions",
    apprenticeship: "Assistantships under certified yoga instructors and wellness centres",
    higherEducation: "Yoga teacher training certifications and naturopathy or wellness diplomas",
    entrepreneurship: "Yoga studio, wellness coaching and corporate wellness services"
  },
  "beauty-wellness": {
    entryLevel: "Salon Assistant, Beauty Support Staff, Spa Assistant and Wellness Centre Trainee roles",
    industry: "Salons, spas, beauty clinics, bridal studios and wellness chains",
    selfEmployment: "Freelance beautician or makeup artist services and home beauty services",
    apprenticeship: "Salon apprenticeships and assistantships with senior beauticians",
    higherEducation: "Advanced cosmetology, spa therapy and beauty therapy certifications",
    entrepreneurship: "Own salon or parlour, bridal makeup studio and beauty product retail"
  },
  "healthcare-sector": {
    entryLevel: "Healthcare Assistant, Patient Support Staff, Ward Assistant and Clinic Helper roles",
    industry: "Hospitals, clinics, home healthcare providers and eldercare facilities",
    selfEmployment: "Home patient care and attendant services",
    apprenticeship: "Hospital ward internships and community health programme placements",
    higherEducation: "Nursing and paramedical diplomas and caregiver or phlebotomy certifications",
    entrepreneurship: "Home care agency and patient support services"
  },
  "handicrafts-carpet": {
    entryLevel: "Craft Assistant, Production Worker, Design Support Staff and Loom Assistant roles",
    industry: "Handicraft units, carpet weaving clusters, export houses and craft cooperatives",
    selfEmployment: "Self-employed artisan work and home-based craft production",
    apprenticeship: "Training under master craftspeople and craft cluster apprenticeships",
    higherEducation: "Design development workshops and craft technology or merchandising courses",
    entrepreneurship: "Craft business, carpet or handicraft unit and online craft sales"
  },
  "banking-bfsi": {
    entryLevel: "Office Assistant, Customer Support Executive, Back Office Staff and Financial Service Trainee roles",
    industry: "Banks, NBFCs, insurance companies, microfinance and fintech institutions",
    selfEmployment: "Insurance, loan or financial product agency work with required certifications",
    apprenticeship: "Internships in bank branches, NBFCs and insurance offices",
    higherEducation: "Banking diplomas, IIBF/NISM certifications and B.Com or BBA programmes",
    entrepreneurship: "Financial services agency, insurance consultancy and common service centre (CSC)"
  },
  "electronics-sector": {
    entryLevel: "Electronics Assistant, Assembly Line Support, Technical Helper and Production Trainee roles",
    industry: "Electronics manufacturing units, appliance companies and authorised service centres",
    selfEmployment: "Mobile and gadget repair services and home appliance servicing",
    apprenticeship: "Apprenticeships in service centres and electronics assembly units",
    higherEducation: "Electronics diploma or ITI trades and mobile repair or embedded systems courses",
    entrepreneurship: "Electronics repair shop, mobile service centre and accessories retail"
  },
  "food-industry": {
    entryLevel: "Food Processing Assistant, Packaging Staff, Production Helper and Quality Support Worker roles",
    industry: "Food processing units, bakeries, dairy and beverage plants and packaged food companies",
    selfEmployment: "Home-based food products, catering and tiffin services",
    apprenticeship: "Internships in food processing, packaging and quality control units",
    higherEducation: "Food technology diploma and FSSAI-recognised food safety certifications",
    entrepreneurship: "Small food processing unit, bakery and packaged snacks or pickles brand"
  },
  "agriculture-sector": {
    entryLevel: "Farm Assistant, Agriculture Support Worker, Field Helper and Nursery Assistant roles",
    industry: "Farms, agri-input companies, nurseries, food supply chains and farmer producer organisations",
    selfEmployment: "Own farming, nursery raising and organic produce sales",
    apprenticeship: "Field training with FPOs, agri-clinics and demonstration farms",
    higherEducation: "Agricultural skill certificates, polytechnic agriculture and organic farming courses",
    entrepreneurship: "Agri-input shop, nursery business and farm produce trading"
  },
  cha: {
    entryLevel: "Community Health Worker, Health Assistant, Telemedicine Support Assistant and First Aid Responder roles",
    industry: "Primary health centres, community health programmes, NGOs, telemedicine providers and wellness projects",
    selfEmployment: "Community health services, health awareness facilitation and first-aid support services",
    apprenticeship: "Field internships with primary health centres, NGO health missions and telemedicine programmes",
    higherEducation: "ANM or GNM courses and community health or public health certificate programmes",
    entrepreneurship: "Health awareness services, community wellness centre and health camp facilitation"
  },
  default: {
    entryLevel: "Entry-level assistant and trainee roles related to the programme field",
    industry: "Employment in organisations and establishments connected with the programme sector",
    selfEmployment: "Independent services and freelance work using the skills gained",
    apprenticeship: "Apprenticeship and internship opportunities with relevant employers",
    higherEducation: "Advanced diploma, degree and certification courses in the same field",
    entrepreneurship: "Small business and enterprise opportunities related to the programme skills"
  }
};

function getCareerPathways(courseId, parentProgrammeId) {
  return (
    courseCareerPathways[courseId] ||
    courseCareerPathways[parentProgrammeId] ||
    courseCareerPathways.default
  );
}

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
    const programmesMenu = e.target.closest('.dropdown.active-menu > a');
    if (programmesMenu && programmesMenu.textContent.trim() === "PROGRAMMES") {
      e.preventDefault();
      window.location.hash = "";
      return;
    }
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

  quickLinks.forEach((link) => {
    link.addEventListener("click", function () {
      quickLinks.forEach((item) => item.classList.remove("clicked"));
      this.classList.add("clicked");
    });
  });

  // Social buttons are standard anchor links with target="_blank"
  // No JavaScript interference needed - CSS handles hover states
}

function updateActiveTab(programmeKey) {
  document.querySelectorAll(".programme-tab").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.programme === programmeKey);
  });

  document.querySelectorAll("#programmesDropdown a").forEach((link) => {
    const linkProgramme = link.dataset.programme;
    const linkSubcourse = link.dataset.subcourse;
    if (!programmeKey) {
      link.classList.remove("active");
    } else if (linkSubcourse) {
      const currentHash = window.location.hash.replace("#", "");
      link.classList.toggle("active", currentHash === `${linkProgramme}/${linkSubcourse}`);
    } else {
      link.classList.toggle("active", linkProgramme === programmeKey);
    }
  });
}

function displayProgramme(programmeKey) {
  const programme = programmesData[programmeKey];
  if (!programme) return;
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

  const specializationSection = document.getElementById("specializationSection");
  if (specializationSection) {
    specializationSection.style.display = "none";
  }

  renderProgrammeShowcase(subcourse);
  renderSyllabusSection(subcourse);
  renderCareerSection(subcourse);
}

function renderProgrammeImages(data) {
  const singleImageCourses = [
    'civil', 'mechanical', 'electrical',
    'xray', 'lab-technician', 'd-pharm',
    'mining-sector', 'rubber-chemical-plastic', 'media-entertainment', 'yoga-wellness', 
    'beauty-wellness', 'healthcare-sector', 'handicrafts-carpet', 'banking-bfsi', 
    'electronics-sector', 'food-industry', 'agriculture-sector'
  ];
  
  const isSingleImageCourse = singleImageCourses.includes(data.id);
  
  if (isSingleImageCourse) {
    const image = data.image || "./assets/programmes/default-1.jpeg";
    return `
      <div class="course-single-image-container">
        <img src="${image}" alt="${data.title}">
      </div>
    `;
  } else {
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
  if (data.images && data.images.length) {
    return data.images.slice(0, 3);
  }

  if (data.image) {
    return [data.image];
  }

  return [];
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

      <div class="career-opportunities-grid">
        ${(data.careerOpportunities || []).map((item) => `
          <div class="career-item unified-career-item">
            <span class="career-icon-box">💼</span>
            <span class="career-text">${item}</span>
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
  if (!programmeKey) {
    Object.keys(programmesData).forEach(key => {
      const programme = programmesData[key];
      filteredCourses.push({
        ...programme,
        courseNumber: courseNumber++,
        isMainCourse: true,
        fee: isCourseFree(programme) ? "Free" : (programme.fee || "₹25,000 - ₹50,000"),
        feeLabel: isCourseFree(programme) ? "Course Fee" : programme.feeLabel
      });

      if (programme.subcourses && programme.subcourses.length > 0) {
        programme.subcourses.forEach(subcourse => {
          filteredCourses.push({
            ...subcourse,
            courseNumber: courseNumber++,
            isMainCourse: false,
            parentProgramme: key,
            fee: isCourseFree(subcourse) ? "Free" : "₹24,000",
            feeLabel: isCourseFree(subcourse) ? "Course Fee" : subcourse.feeLabel
          });
        });
      }
    });
  } else if (subcourseId) {
    const programme = programmesData[programmeKey];
    if (programme && programme.subcourses) {
      const subcourse = programme.subcourses.find(sub => sub.id === subcourseId);
      if (subcourse) {
        filteredCourses.push({
          ...subcourse,
          courseNumber: courseNumber++,
          isMainCourse: false,
          parentProgramme: programmeKey,
          fee: isCourseFree(subcourse) ? "Free" : "₹15,000 - ₹35,000",
          feeLabel: isCourseFree(subcourse) ? "Course Fee" : subcourse.feeLabel
        });
      }
    }
  } else {
    const programme = programmesData[programmeKey];
    if (programme) {
      if (!programme.subcourses || programme.subcourses.length === 0) {
        filteredCourses.push({
          ...programme,
          courseNumber: courseNumber++,
          isMainCourse: true,
          fee: isCourseFree(programme) ? "Free" : (programme.fee || "₹25,000 - ₹50,000"),
          feeLabel: isCourseFree(programme) ? "Course Fee" : programme.feeLabel
        });
      }
      if (programme.subcourses && programme.subcourses.length > 0) {
        programme.subcourses.forEach(subcourse => {
          filteredCourses.push({
            ...subcourse,
            courseNumber: courseNumber++,
            isMainCourse: false,
            parentProgramme: programmeKey,
            fee: isCourseFree(subcourse) ? "Free" : "₹27,000",
            feeLabel: isCourseFree(subcourse) ? "Course Fee" : subcourse.feeLabel
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
            <div class="course-card-detail-label">${course.feeLabel || "Annual Fee"}</div>
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
  const backArrowBtn = document.getElementById("modalBackArrow");
  const syllabusBackBtn = document.getElementById("syllabusBackBtn");

  if (closeBtn) {
    closeBtn.addEventListener("click", closeCourseModal);
  }

  if (backArrowBtn) {
    backArrowBtn.addEventListener("click", function() {
      closeCourseModal();
  
      const coursesSection = document.querySelector(".courses-section");
      if (coursesSection) {
        setTimeout(() => {
          coursesSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }, 300);
      }
    });
  }

  if (overlay) {
    overlay.addEventListener("click", closeCourseModal);
  }

  if (syllabusBackBtn) {
    syllabusBackBtn.addEventListener("click", closeSyllabusPage);
  }
  document.addEventListener("keydown", function(e) {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeCourseModal();
    }
    if (e.key === "Escape" && document.getElementById("syllabusPage").classList.contains("active")) {
      closeSyllabusPage();
    }
  });
}

function closeSyllabusPage() {
  const syllabusPage = document.getElementById("syllabusPage");
  syllabusPage.classList.remove("active");
  syllabusPage.style.display = "none";
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
  document.getElementById("modalHeroImage").src = course.image || course.images?.[0] || "./assets/programmes/default-1.jpeg";
  document.getElementById("modalTitle").textContent = course.title;
  document.getElementById("modalSubtitle").textContent = course.subtitle;
  document.getElementById("modalCourseNumber").textContent = `Course ${course.courseNumber || 'N/A'}`;
  document.getElementById("modalDuration").textContent = course.duration;
  document.getElementById("modalEligibility").textContent = course.eligibility;
  const courseIsFree = isCourseFree(course);
  const modalFeeEl = document.getElementById("modalFee");
  if (courseIsFree) {
    modalFeeEl.textContent = "₹0 (Free)";
    modalFeeEl.previousElementSibling.textContent = "Course Fee";
  } else {
    modalFeeEl.textContent = course.fee || "₹25,000 - ₹50,000";
    modalFeeEl.previousElementSibling.textContent = course.feeLabel || "Annual Fee";
  }

  let descriptionContent = course.description;
  if (course.careerProspectsIntro && course.careerProspects && course.careerProspects.length > 0) {
    descriptionContent += '\n\n<strong>Career Prospects:</strong> ' + course.careerProspectsIntro + '\n\n';
    descriptionContent += course.careerProspects.map(item => '• ' + item).join('\n');
  }
  document.getElementById("modalDescription").innerHTML = descriptionContent;
  document.getElementById("modalEligibilityDetail").textContent = course.eligibility;

  const syllabusContainer = document.getElementById("modalSyllabus");
  syllabusContainer.innerHTML = `
    <div class="modal-syllabus-center">
      <button class="view-syllabus-btn" id="viewSyllabusBtn">
        View Syllabus
      </button>
    </div>
  `;
  const careerContainer = document.getElementById("modalCareer");
  let careerHtml = "";

  if (course.careerOpportunities && course.careerOpportunities.length > 0) {
    careerHtml += '<div class="modal-career-roles">' + course.careerOpportunities.map(item =>
      `<div class="modal-career-item unified-career-item">
        <span class="career-icon-box">💼</span>
        <span class="career-text">${item}</span>
      </div>`
    ).join('') + '</div>';
  }

  const pathways = getCareerPathways(course.id, parentProgramme);
  careerHtml += '<h4 class="modal-career-subheading">Career Pathways</h4>';
  careerHtml += '<div class="modal-career-pathways">' + careerPathwayCategories.map(category =>
    `<div class="modal-career-pathway">
      <div class="modal-career-pathway-title">
        <span class="career-icon-box">${category.icon}</span>
        <span>${category.title}</span>
      </div>
      <p class="modal-career-pathway-desc">${pathways[category.key]}</p>
    </div>`
  ).join('') + '</div>';

  careerContainer.innerHTML = careerHtml;

  const modalFeesEl = document.getElementById("modalFees");
  if (modalFeesEl) {
    if (courseIsFree) {
      modalFeesEl.innerHTML = `
        <div class="modal-free-banner">
          <span class="modal-free-badge">&#10003;</span>
          <span>100% FREE COURSE</span>
        </div>
        <div class="modal-info-grid modal-fee-grid">
          <div class="modal-info-item">
            <span class="modal-info-label">Course Fee</span>
            <span class="modal-info-value">&#8377;0</span>
          </div>
          <div class="modal-info-item">
            <span class="modal-info-label">Training Fee</span>
            <span class="modal-info-value">Free</span>
          </div>
          <div class="modal-info-item">
            <span class="modal-info-label">Tuition Fee</span>
            <span class="modal-info-value">No Tuition Fees</span>
          </div>
        </div>
        <p class="modal-fee-note">This programme is offered completely free of cost by G Care Council. No course fee, training fee or tuition fee is charged to students.</p>
      `;
    } else {
      modalFeesEl.innerHTML = `
        <div class="modal-info-grid modal-fee-grid">
          <div class="modal-info-item">
            <span class="modal-info-label">${course.feeLabel || "Course Fee"}</span>
            <span class="modal-info-value">${course.fee || "As per council norms"}</span>
          </div>
        </div>
      `;
    }
  }

  const viewSyllabusBtn = document.getElementById("viewSyllabusBtn");
  if (viewSyllabusBtn) {
    viewSyllabusBtn.onclick = function () {
      openSyllabusPage(course.id);
    };
  }

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}
function closeCourseModal() {
  const modal = document.getElementById("courseModal");
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

function openSyllabusPage(courseId) {
  const syllabusPages = {
    nursing: "nursing-syllabus.html",
    "diploma-nursing": "diploma-nursing-syllabus.html",
    engineering: "engineering-syllabus.html",
    civil: "civil-syllabus.html",
    mechanical: "mechanical-syllabus.html",
    electrical: "electrical-syllabus.html",
    paramedical: "paramedical-syllabus.html",
    xray: "xray-syllabus.html",
    "lab-technician": "lab-technician-syllabus.html",
    "d-pharm": "dpharm-syllabus.html",
    "telemedicine-technician": "telemedicine-technician-syllabus.html",
    computer: "computer-syllabus.html",
    teachers: "teachers-syllabus.html",
    science: "home-science-syllabus.html",
    skill: "skill-development-syllabus.html",
    "mining-sector": "mining-sector-syllabus.html",
    "rubber-chemical-plastic": "rubber-chemical-plastic-syllabus.html",
    "media-entertainment": "media-entertainment-syllabus.html",
    "yoga-wellness": "yoga-wellness-syllabus.html",
    "beauty-wellness": "beautician-syllabus.html",
    "healthcare-sector": "healthcare-sector-syllabus.html",
    "handicrafts-carpet": "handicrafts-carpet-syllabus.html",
    "banking-bfsi": "banking-bfsi-syllabus.html",
    "electronics-sector": "electronics-sector-syllabus.html",
    "food-industry": "food-industry-syllabus.html",
    "agriculture-sector": "agriculture-sector-syllabus.html",
    cha: "cha-syllabus.html",
    gda: "gda-syllabus.html",
  };

  const page = syllabusPages[courseId];

  if (page) {
    window.location.href = page;
    return;
  }

  console.warn("No syllabus page mapped for:", courseId);
}


function renderSyllabusPage(course) {
  const syllabusContent = document.getElementById("syllabusContent");
  const syllabusDetails = course.syllabusDetails;
  
  if (!syllabusDetails) {
    syllabusContent.innerHTML = '<p class="no-syllabus">No detailed syllabus information available.</p>';
    return;
  }
  
  let html = '';
  if (syllabusDetails.courseInfo) {
    html += '<div class="syllabus-section">';
    html += '<div class="course-info-section">';
    html += '<div class="course-info-header">';
    html += '<h2 class="course-title-main">COURSE TITLE</h2>';
    html += '<div class="divider-line"></div>';
    html += '</div>';
    html += `<div class="course-info-content">
      <h3 class="course-name">${syllabusDetails.courseInfo.title}</h3>
      <div class="course-details-grid">
        <div class="course-detail-item">
          <span class="detail-label">Duration:</span>
          <span class="detail-value">${syllabusDetails.courseInfo.duration}</span>
        </div>
        <div class="course-detail-item">
          <span class="detail-label">Eligibility:</span>
          <span class="detail-value">${syllabusDetails.courseInfo.eligibility}</span>
        </div>
        <div class="course-detail-item">
          <span class="detail-label">Certification:</span>
          <span class="detail-value">${syllabusDetails.courseInfo.certification}</span>
        </div>
        <div class="course-detail-item">
          <span class="detail-label">Placement:</span>
          <span class="detail-value">95% Placement Assistance</span>
        </div>
      </div>
    </div>`;
    html += '</div>';
  }
  
  if (syllabusDetails.modules && syllabusDetails.modules.length > 0) {
    html += '<div class="syllabus-section">';
    html += '<div class="module-section-header">';
    html += '<h2 class="section-title-main">MODULE / SUBJECT SECTIONS</h2>';
    html += '<div class="divider-line"></div>';
    html += '</div>';
    html += '<div class="modules-container">';
    
    syllabusDetails.modules.forEach((module, index) => {
      html += `
        <div class="module-card">
          <div class="module-header">
            <h3 class="module-title">${module.moduleTitle}</h3>
          </div>
          <div class="module-content">
            <div class="module-subjects">
              <h4 class="module-section-title">Subjects:</h4>
              <ul class="subjects-list">
                ${module.subjects.map(subject => `<li>${subject}</li>`).join('')}
              </ul>
            </div>
            <div class="module-practicals">
              <h4 class="module-section-title">Practicals:</h4>
              <ul class="practicals-list">
                ${module.practicals.map(practical => `<li>${practical}</li>`).join('')}
              </ul>
            </div>
          </div>
        </div>
      `;
      if (index < syllabusDetails.modules.length - 1) {
        html += '<div class="module-divider"></div>';
      }
    });
    
    html += '</div>';
    html += '</div>';
  }
  
  if (syllabusDetails.additionalSubjects && syllabusDetails.additionalSubjects.length > 0) {
    html += '<div class="syllabus-section">';
    html += '<div class="additional-section-header">';
    html += '<h2 class="section-title-main">Additional Subjects</h2>';
    html += '<div class="divider-line"></div>';
    html += '</div>';
    html += '<div class="additional-subjects-container">';
    
    syllabusDetails.additionalSubjects.forEach(subject => {
      html += `<div class="additional-subject-item">${subject}</div>`;
    });
    
    html += '</div>';
    html += '</div>';
  }
  if (course.careerOpportunities && course.careerOpportunities.length > 0) {
    html += '<div class="syllabus-section">';
    html += '<div class="career-section-header">';
    html += '<h2 class="section-title-main">CAREER OPPORTUNITIES</h2>';
    html += '<div class="divider-line"></div>';
    html += '</div>';
    html += '<div class="career-opportunities-grid">';
    
    course.careerOpportunities.forEach(career => {
      html += `<div class="career-item unified-career-item">
        <span class="career-icon-box">💼</span>
        <span class="career-text">${career}</span>
      </div>`;
    });
    
    html += '</div>';
    html += '</div>';
  }

  if (syllabusDetails.papers && syllabusDetails.papers.length > 0) {
    html += '<div class="syllabus-section">';
    html += '<div class="module-section-header">';
    html += '<h2 class="section-title-main">COURSE PAPERS</h2>';
    html += '<div class="divider-line"></div>';
    html += '</div>';
    html += '<div class="papers-grid">';
    
    syllabusDetails.papers.forEach((paper, index) => {
      html += `
        <div class="paper-card">
          <div class="paper-header">
            <h4 class="paper-title">${paper.paperTitle}</h4>
            <p class="paper-subject">${paper.subject}</p>
          </div>
          <div class="paper-units">
            ${paper.units.map(unit => `
              <div class="unit-section">
                <h5 class="unit-title">${unit.unitTitle}</h5>
                <ul class="topics-list">
                  ${unit.topics.map(topic => `<li>${topic}</li>`).join('')}
                </ul>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    });
    
    html += '</div>';
    html += '</div>';
  }

  if (syllabusDetails.practicals && syllabusDetails.practicals.length > 0) {
    html += '<div class="syllabus-section">';
    html += '<div class="career-section-header">';
    html += '<h2 class="section-title-main">PRACTICAL TRAINING</h2>';
    html += '<div class="divider-line"></div>';
    html += '</div>';
    html += '<div class="practicals-grid">';
    html += '<ul class="practicals-list">';
    
    syllabusDetails.practicals.forEach(practical => {
      html += `<li>${practical}</li>`;
    });
    
    html += '</ul>';
    html += '</div>';
    html += '</div>';
  }
  
  syllabusContent.innerHTML = html;
}
function getCourseStructure(courseId) {
  const engineeringCourses = ['civil', 'mechanical', 'electrical'];
  const moduleCourses = ['computer', 'teachers', 'science', 'skill'];
  const trainingCourses = ['mining-sector', 'rubber-chemical-plastic', 'media-entertainment', 'yoga-wellness', 'healthcare-sector', 'handicrafts-carpet', 'banking-bfsi', 'electronics-sector', 'food-industry', 'agriculture-sector'];
  const paperCourses = ['nursing', 'diploma-nursing', 'xray', 'lab-technician', 'd-pharm'];
  
  if (engineeringCourses.includes(courseId)) {
    return 'paper';
  } else if (moduleCourses.includes(courseId)) {
    return 'module';
  } else if (trainingCourses.includes(courseId)) {
    return 'training';
  } else if (paperCourses.includes(courseId)) {
    return 'paper';
  } else {
    return 'paper'; 
  }
}
function updateCourseStructure(courseId, syllabusDetails) {
  const structureType = getCourseStructure(courseId);
  
  if (syllabusDetails.papers) {
    syllabusDetails.papers.forEach((paper, index) => {
      if (structureType === 'semester') {
        paper.paperTitle = `Semester ${index + 1}`;
      } else if (structureType === 'module') {
        paper.paperTitle = `Module ${index + 1}`;
      } else if (structureType === 'training') {
        paper.paperTitle = `Training Module ${index + 1}`;
      }
    });
  }
  
  return syllabusDetails;
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
