const db = require("./config/db");

const dropAdmissionDocumentsTable = `
DROP TABLE IF EXISTS admission_documents;
`;

const dropAdmissionsTable = `
DROP TABLE IF EXISTS admissions;
`;

const createAdmissionsTable = `
CREATE TABLE admissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  application_no VARCHAR(50) NOT NULL UNIQUE,
  branch_name VARCHAR(100) NULL,
  branch_category VARCHAR(100) NULL,
  course_name VARCHAR(150) NOT NULL,

  title VARCHAR(10),
  full_name VARCHAR(150) NOT NULL,
  dob DATE,
  age INT,
  gender VARCHAR(20),
  has_aadhaar VARCHAR(10),
  aadhaar_number VARCHAR(20),
  parent_name VARCHAR(150),
  nationality VARCHAR(100),
  caste VARCHAR(50),
  other_caste VARCHAR(100),

  present_address TEXT,
  pin_code VARCHAR(10),
  state VARCHAR(100),
  district VARCHAR(100),
  same_address VARCHAR(10),
  permanent_address TEXT,
  telephone VARCHAR(20),

  mobile VARCHAR(20),
  alternate_one VARCHAR(20),
  alternate_two VARCHAR(20),
  email VARCHAR(150),

  academic_level VARCHAR(50),
  education_course VARCHAR(150),
  education_board VARCHAR(150),
  education_subjects VARCHAR(255),
  education_year VARCHAR(10),
  education_grade VARCHAR(50),

  declaration_date DATE,
  place VARCHAR(100),

  status VARCHAR(30) DEFAULT 'Pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
`;

const createAdmissionDocumentsTable = `
CREATE TABLE admission_documents (
  id INT AUTO_INCREMENT PRIMARY KEY,
  admission_id INT NOT NULL,
  document_type VARCHAR(100) NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  file_path VARCHAR(500) NOT NULL,
  mime_type VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (admission_id) REFERENCES admissions(id) ON DELETE CASCADE
);
`;

db.query(dropAdmissionDocumentsTable, (docDropErr) => {
  if (docDropErr) {
    console.error("Failed to drop admission_documents table:", docDropErr.message);
    process.exit(1);
  }

  console.log("Old admission_documents table removed.");

  db.query(dropAdmissionsTable, (admissionDropErr) => {
    if (admissionDropErr) {
      console.error("Failed to drop admissions table:", admissionDropErr.message);
      process.exit(1);
    }

    console.log("Old admissions table removed.");

    db.query(createAdmissionsTable, (admissionCreateErr) => {
      if (admissionCreateErr) {
        console.error("Failed to create admissions table:", admissionCreateErr.message);
        process.exit(1);
      }

      console.log("New admissions table created successfully.");

      db.query(createAdmissionDocumentsTable, (docCreateErr) => {
        if (docCreateErr) {
          console.error("Failed to create admission_documents table:", docCreateErr.message);
          process.exit(1);
        }

        console.log("New admission_documents table created successfully.");
        process.exit(0);
      });
    });
  });
});