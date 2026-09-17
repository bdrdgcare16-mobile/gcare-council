const db = require("../config/db");

const {
  createAffiliationTableQuery,
  insertAffiliationQuery,
  getAllAffiliationsQuery,
  getAffiliationByIdQuery,
  updateAffiliationStatusQuery,
  deleteAffiliationQuery,
} = require("../query/affiliationQuery");

const executeQuery = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (error, results) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(results);
    });
  });
};

const ensureAffiliationTable = async () => {
  await executeQuery(createAffiliationTableQuery);
};

const createAffiliation = async (data) => {
  await ensureAffiliationTable();

  const values = [
    data.institutionNameAddress,
    data.institutionSeekingRecognition,
    data.institutionType,
    data.applicationCategory,
    data.availableArea || null,
    data.recognitionFromDate || null,

    JSON.stringify(data.soughtCourses || []),

    data.yearFirstStarting || null,
    JSON.stringify(data.existingCourses || []),

    data.buildingType,
    data.buildingDocuments,
    data.approvedPlan,
    data.stabilityCertificate,

    data.powerPhase,
    data.serviceConnectionNo || null,
    data.powerLoadKW || null,
    data.waterSupply,
    data.toiletsAvailable,
    data.toiletsDetails || null,
    data.toolsList || null,
    data.toolsDocuments,

    JSON.stringify(data.staffPresent || []),
    JSON.stringify(data.staffExisting || []),

    data.otherCoursesDetails || null,
    data.separateWorkshopClassrooms,
    data.fireCertificate,

    data.declarationAccept ? 1 : 0,
    data.declarationPlace,
    data.declarationDate,

    JSON.stringify(data.enclosures || []),
    JSON.stringify(data.uploadedFiles || {}),

    "Pending",
  ];

  return executeQuery(insertAffiliationQuery, values);
};

const getAllAffiliations = async () => {
  await ensureAffiliationTable();
  return executeQuery(getAllAffiliationsQuery);
};

const getAffiliationById = async (id) => {
  await ensureAffiliationTable();
  const rows = await executeQuery(getAffiliationByIdQuery, [id]);

  return rows.length ? rows[0] : null;
};

const updateAffiliationStatus = async (id, status) => {
  await ensureAffiliationTable();
  return executeQuery(updateAffiliationStatusQuery, [status, id]);
};

const deleteAffiliation = async (id) => {
  await ensureAffiliationTable();
  return executeQuery(deleteAffiliationQuery, [id]);
};

module.exports = {
  createAffiliation,
  getAllAffiliations,
  getAffiliationById,
  updateAffiliationStatus,
  deleteAffiliation,
};