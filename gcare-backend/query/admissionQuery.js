const db = require("../config/db");

const debugLog =
  require("../utils/debugLog");

/* =====================================================
   INSERT ADMISSION
===================================================== */

const insertAdmission = (data, callback) => {
  const values = [
    data.applicationNo || `GCARE${Date.now()}`,
    data.branch_name || null,
    data.courseName || null,
    data.title || null,
    data.fullName || null,
    data.dob || null,
    data.age || null,
    data.gender || null,
    data.hasAadhaar || null,
    data.aadhaarNumber || null,
    data.parentName || null,
    data.nationality || null,
    data.caste || null,
    data.otherCaste || null,
    data.presentAddress || null,
    data.pinCode || null,
    data.state || null,
    data.district || null,
    data.sameAddress || null,
    data.permanentAddress || null,
    data.telephone || null,
    data.mobile || null,
    data.alternateOne || null,
    data.alternateTwo || null,
    data.email || null,
    data.academicLevel || null,
    data.educationCourse || null,
    data.educationBoard || null,
    data.educationSubjects || null,
    data.educationYear || null,
    data.educationGrade || null,
    data.declarationDate || null,
    data.place || null,
    data.status || 'pending'
  ];

  const placeholders =
    values.map(() => "?").join(", ");

  const sql = `
    INSERT INTO admissions (
      application_no,
      branch_name,
      course_name,
      title,
      full_name,
      dob,
      age,
      gender,
      has_aadhaar,
      aadhaar_number,
      parent_name,
      nationality,
      caste,
      other_caste,
      present_address,
      pin_code,
      state,
      district,
      same_address,
      permanent_address,
      telephone,
      mobile,
      alternate_one,
      alternate_two,
      email,
      academic_level,
      education_course,
      education_board,
      education_subjects,
      education_year,
      education_grade,
      declaration_date,
      place,
      status
    )
    VALUES (${placeholders})
  `;

  debugLog(
    "INSERT ADMISSION VALUES:",
    values
  );

  db.query(
    sql,
    values,
    callback
  );
};


/* =====================================================
   INSERT ADMISSION DOCUMENT
===================================================== */

const insertAdmissionDocument = (
  documentData,
  callback
) => {
  const sql = `
    INSERT INTO admission_documents (
      admission_id,
      document_type,
      file_name,
      file_path,
      mime_type
    )
    VALUES (?, ?, ?, ?, ?)
  `;

  const values = [
    documentData.admissionId,
    documentData.documentType,
    documentData.fileName,
    documentData.filePath,
    documentData.mimeType
  ];

  debugLog(
    "INSERT DOCUMENT VALUES:",
    values
  );

  db.query(
    sql,
    values,
    callback
  );
};


/* =====================================================
   FETCH ALL ADMISSIONS
===================================================== */

const fetchAdmissions = (
  callback
) => {
  const sql = `
    SELECT
      id,
      application_no AS applicationNo,
      branch_name,
      branch_name AS branchName,
      course_name AS courseName,
      full_name AS fullName,
      mobile,
      email,
      status,
      created_at AS createdAt
    FROM admissions
    ORDER BY created_at DESC
  `;

  db.query(
    sql,
    callback
  );
};


/* =====================================================
   FETCH ADMISSION BY ID
===================================================== */

const fetchAdmissionById = (
  id,
  callback
) => {
  const sql = `
    SELECT
      id,
      application_no AS applicationNo,
      branch_name,
      branch_name AS branchName,
      course_name AS courseName,
      title,
      full_name AS fullName,
      dob,
      age,
      gender,
      has_aadhaar AS hasAadhaar,
      aadhaar_number AS aadhaarNumber,
      parent_name AS parentName,
      nationality,
      caste,
      other_caste AS otherCaste,
      present_address AS presentAddress,
      pin_code AS pinCode,
      state,
      district,
      same_address AS sameAddress,
      permanent_address AS permanentAddress,
      telephone,
      mobile,
      alternate_one AS alternateOne,
      alternate_two AS alternateTwo,
      email,
      academic_level AS academicLevel,
      education_course AS educationCourse,
      education_board AS educationBoard,
      education_subjects AS educationSubjects,
      education_year AS educationYear,
      education_grade AS educationGrade,
      declaration_date AS declarationDate,
      place,
      status,
      created_at AS createdAt,
      updated_at AS updatedAt
    FROM admissions
    WHERE id = ?
  `;

  db.query(
    sql,
    [id],
    callback
  );
};


/* =====================================================
   FETCH ADMISSION DOCUMENTS
===================================================== */

const fetchAdmissionDocuments = (
  admissionId,
  callback
) => {
  const sql = `
    SELECT
      id,

      admission_id AS admissionId,

      document_type AS documentType,

      file_name AS fileName,

      file_path AS filePath,

      mime_type AS mimeType,

      created_at AS createdAt

    FROM admission_documents

    WHERE admission_id = ?

    ORDER BY id ASC
  `;

  db.query(
    sql,
    [admissionId],
    callback
  );
};


/* =====================================================
   FETCH SINGLE ADMISSION DOCUMENT
===================================================== */

const fetchAdmissionDocumentById = (
  documentId,
  callback
) => {
  const sql = `
    SELECT
      id,

      admission_id AS admissionId,

      document_type AS documentType,

      file_name AS fileName,

      file_path AS filePath,

      mime_type AS mimeType,

      created_at AS createdAt

    FROM admission_documents

    WHERE id = ?

    LIMIT 1
  `;

  db.query(
    sql,
    [documentId],
    callback
  );
};


/* =====================================================
   UPDATE ADMISSION STATUS
===================================================== */

const updateStatus = (
  id,
  status,
  callback
) => {
  const sql = `
    UPDATE admissions

    SET status = ?

    WHERE id = ?
  `;

  db.query(
    sql,
    [
      status,
      id
    ],
    callback
  );
};


/* =====================================================
   DELETE ADMISSION
===================================================== */

const deleteAdmission = (
  id,
  callback
) => {
  const sql = `
    DELETE
    FROM admissions
    WHERE id = ?
  `;

  db.query(
    sql,
    [id],
    callback
  );
};


/* =====================================================
   EXPORTS
===================================================== */

module.exports = {
  insertAdmission,
  insertAdmissionDocument,
  fetchAdmissions,
  fetchAdmissionById,
  fetchAdmissionDocuments,
  fetchAdmissionDocumentById,
  updateStatus,
  deleteAdmission
};