const db = require("../config/db");

const createAffiliationTableQuery = `
  CREATE TABLE IF NOT EXISTS affiliation_applications (
    id INT NOT NULL AUTO_INCREMENT,
    institution_name_address TEXT NOT NULL,
    institution_seeking_recognition TEXT NOT NULL,
    institution_type VARCHAR(100) NOT NULL,
    application_category VARCHAR(100) NOT NULL,
    available_area VARCHAR(100) DEFAULT NULL,
    recognition_from_date DATE DEFAULT NULL,
    sought_courses LONGTEXT,
    year_first_starting VARCHAR(10) DEFAULT NULL,
    existing_courses LONGTEXT,
    building_type VARCHAR(50) NOT NULL,
    building_documents VARCHAR(50) NOT NULL,
    approved_plan VARCHAR(20) NOT NULL,
    stability_certificate VARCHAR(20) NOT NULL,
    power_phase VARCHAR(50) NOT NULL,
    service_connection_no VARCHAR(150) DEFAULT NULL,
    power_load_kw VARCHAR(100) DEFAULT NULL,
    water_supply VARCHAR(20) NOT NULL,
    toilets_available VARCHAR(20) NOT NULL,
    toilets_details TEXT,
    tools_list TEXT,
    tools_documents VARCHAR(50) NOT NULL,
    staff_present LONGTEXT,
    staff_existing LONGTEXT,
    other_courses_details TEXT,
    separate_workshop_classrooms VARCHAR(20) NOT NULL,
    fire_certificate VARCHAR(20) NOT NULL,
    declaration_accept TINYINT(1) NOT NULL DEFAULT '0',
    declaration_place VARCHAR(255) NOT NULL,
    declaration_date DATE NOT NULL,
    enclosure_data LONGTEXT,
    uploaded_files LONGTEXT,
    status VARCHAR(30) NOT NULL DEFAULT 'Pending',
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
`;

const insertAffiliationQuery = `
  INSERT INTO affiliation_applications (
    institution_name_address,
    institution_seeking_recognition,
    institution_type,
    application_category,
    available_area,
    recognition_from_date,

    sought_courses,

    year_first_starting,
    existing_courses,

    building_type,
    building_documents,
    approved_plan,
    stability_certificate,

    power_phase,
    service_connection_no,
    power_load_kw,
    water_supply,
    toilets_available,
    toilets_details,
    tools_list,
    tools_documents,

    staff_present,
    staff_existing,

    other_courses_details,
    separate_workshop_classrooms,
    fire_certificate,

    declaration_accept,
    declaration_place,
    declaration_date,

    enclosure_data,
    uploaded_files,

    status
  )
  VALUES (
    ?, ?, ?, ?, ?, ?,
    ?,
    ?, ?,
    ?, ?, ?, ?,
    ?, ?, ?, ?, ?, ?, ?, ?,
    ?, ?,
    ?, ?, ?,
    ?, ?, ?,
    ?, ?,
    ?
  )
`;

const getAllAffiliationsQuery = `
  SELECT *
  FROM affiliation_applications
  ORDER BY created_at DESC
`;

const getAffiliationByIdQuery = `
  SELECT *
  FROM affiliation_applications
  WHERE id = ?
  LIMIT 1
`;

const updateAffiliationStatusQuery = `
  UPDATE affiliation_applications
  SET status = ?
  WHERE id = ?
`;

const deleteAffiliationQuery = `
  DELETE FROM affiliation_applications
  WHERE id = ?
`;

module.exports = {
  createAffiliationTableQuery,
  insertAffiliationQuery,
  getAllAffiliationsQuery,
  getAffiliationByIdQuery,
  updateAffiliationStatusQuery,
  deleteAffiliationQuery,
};