// const affiliationService = require("../services/affiliationService");
// const { uploadFileToDrive } = require("../services/driveService");

// const clean = (value) => {
//   if (typeof value !== "string") {
//     return value;
//   }

//   return value.trim();
// };

// const buildSoughtCourses = (body) => {
//   const courses = [];

//   for (let i = 1; i <= 4; i++) {
//     const row = {
//       sno: i,
//       course: clean(body[`soughtCourse${i}`]) || "",
//       duration: clean(body[`soughtDuration${i}`]) || "",
//       availableArea: clean(body[`soughtArea${i}`]) || "",
//       practical: clean(body[`soughtPractical${i}`]) || "",
//       classroom: clean(body[`soughtClassroom${i}`]) || "",
//     };

//     const hasData =
//       row.course ||
//       row.duration ||
//       row.availableArea ||
//       row.practical ||
//       row.classroom;

//     if (hasData) {
//       courses.push(row);
//     }
//   }

//   return courses;
// };

// const buildExistingCourses = (body) => {
//   const courses = [];

//   for (let i = 1; i <= 4; i++) {
//     const row = {
//       sno: i,
//       course: clean(body[`existingCourse${i}`]) || "",
//       duration: clean(body[`existingDuration${i}`]) || "",
//       recognition:
//         clean(body[`existingRecognition${i}`]) || "",
//       availableArea:
//         clean(body[`existingArea${i}`]) || "",
//       practical:
//         clean(body[`existingPractical${i}`]) || "",
//       classroom:
//         clean(body[`existingClassroom${i}`]) || "",
//     };

//     const hasData =
//       row.course ||
//       row.duration ||
//       row.recognition ||
//       row.availableArea ||
//       row.practical ||
//       row.classroom;

//     if (hasData) {
//       courses.push(row);
//     }
//   }

//   return courses;
// };

// const buildStaff = (body, prefix) => {
//   const staff = [];

//   for (let i = 1; i <= 6; i++) {
//     const row = {
//       sno: i,
//       name: clean(body[`${prefix}_name_${i}`]) || "",
//       dateOfJoining: body[`${prefix}_date_${i}`] || "",
//       qualification:
//         clean(body[`${prefix}_qual_${i}`]) || "",
//       experience:
//         clean(body[`${prefix}_exp_${i}`]) || "",
//     };

//     const hasData =
//       row.name ||
//       row.dateOfJoining ||
//       row.qualification ||
//       row.experience;

//     if (hasData) {
//       staff.push(row);
//     }
//   }

//   return staff;
// };

// const uploadAllFiles = async (files = {}) => {
//   const uploadedFiles = {};

//   for (const fieldName of Object.keys(files)) {
//     const fieldFiles = files[fieldName];

//     if (!Array.isArray(fieldFiles) || !fieldFiles.length) {
//       continue;
//     }

//     const uploaded = [];

//     for (const file of fieldFiles) {
//       const driveFile = await uploadFileToDrive(file);

//       if (driveFile) {
//         uploaded.push(driveFile);
//       }
//     }

//     uploadedFiles[fieldName] =
//       uploaded.length === 1 ? uploaded[0] : uploaded;
//   }

//   return uploadedFiles;
// };

// const buildEnclosures = (body, uploadedFiles) => {
//   const enclosureNumbers = [
//     1,
//     3,
//     4,
//     5,
//     6,
//     7,
//     9,
//     10,
//     11,
//     12,
//     13,
//   ];

//   return enclosureNumbers.map((number) => {
//     return {
//       enclosureNumber: number,

//       selected: Boolean(body[`enclosure_${number}`]),

//       description:
//         body[`enclosure_${number}`] || null,

//       file:
//         uploadedFiles[`enclosure_file_${number}`] || null,
//     };
//   });
// };

// const submitAffiliation = async (req, res) => {
//   try {
//     const body = req.body || {};

//     const requiredFields = [
//       "institutionNameAddress",
//       "institutionSeekingRecognition",
//       "institutionType",
//       "applicationCategory",
//       "buildingType",
//       "buildingDocuments",
//       "approvedPlan",
//       "stabilityCertificate",
//       "powerPhase",
//       "waterSupply",
//       "toiletsAvailable",
//       "toolsDocuments",
//       "separateWorkshopClassrooms",
//       "fireCertificate",
//       "declarationPlace",
//       "declarationDate",
//     ];

//     for (const field of requiredFields) {
//       if (!body[field] || !String(body[field]).trim()) {
//         return res.status(400).json({
//           success: false,
//           message: `${field} is required.`,
//         });
//       }
//     }

//     const declarationAccepted =
//       body.declarationAccept === "on" ||
//       body.declarationAccept === "true" ||
//       body.declarationAccept === "1";

//     if (!declarationAccepted) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "Please accept the declaration before submitting.",
//       });
//     }

//     if (!req.files?.institutionHeadSignature?.length) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "Institution Head / Coordinator signature is required.",
//       });
//     }

//     if (
//       body.buildingType === "Own" &&
//       !req.files?.saleDeedFile?.length
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: "Sale Deed document is required.",
//       });
//     }

//     if (
//       body.buildingType === "Rent" &&
//       !req.files?.rentalAgreementFile?.length
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: "Rental Agreement is required.",
//       });
//     }

//     if (
//       body.buildingDocuments === "Available" &&
//       !req.files?.buildingDocumentsFile?.length
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: "Building Documents file is required.",
//       });
//     }

//     const uploadedFiles = await uploadAllFiles(req.files);

//     const data = {
//       institutionNameAddress:
//         clean(body.institutionNameAddress),

//       institutionSeekingRecognition:
//         clean(body.institutionSeekingRecognition),

//       institutionType:
//         clean(body.institutionType),

//       applicationCategory:
//         clean(body.applicationCategory),

//       availableArea:
//         clean(body.availableArea),

//       recognitionFromDate:
//         body.recognitionFromDate || null,

//       soughtCourses:
//         buildSoughtCourses(body),

//       yearFirstStarting:
//         clean(body.yearFirstStarting),

//       existingCourses:
//         buildExistingCourses(body),

//       buildingType:
//         clean(body.buildingType),

//       buildingDocuments:
//         clean(body.buildingDocuments),

//       approvedPlan:
//         clean(body.approvedPlan),

//       stabilityCertificate:
//         clean(body.stabilityCertificate),

//       powerPhase:
//         clean(body.powerPhase),

//       serviceConnectionNo:
//         clean(body.serviceConnectionNo),

//       powerLoadKW:
//         clean(body.powerLoadKW),

//       waterSupply:
//         clean(body.waterSupply),

//       toiletsAvailable:
//         clean(body.toiletsAvailable),

//       toiletsDetails:
//         clean(body.toiletsDetails),

//       toolsList:
//         clean(body.toolsList),

//       toolsDocuments:
//         clean(body.toolsDocuments),

//       staffPresent:
//         buildStaff(body, "staffA"),

//       staffExisting:
//         buildStaff(body, "staffB"),

//       otherCoursesDetails:
//         clean(body.otherCoursesDetails),

//       separateWorkshopClassrooms:
//         clean(body.separateWorkshopClassrooms),

//       fireCertificate:
//         clean(body.fireCertificate),

//       declarationAccept:
//         declarationAccepted,

//       declarationPlace:
//         clean(body.declarationPlace),

//       declarationDate:
//         body.declarationDate,

//       uploadedFiles,

//       enclosures:
//         buildEnclosures(body, uploadedFiles),
//     };

//     const result =
//       await affiliationService.createAffiliation(data);

//     return res.status(201).json({
//       success: true,
//       message:
//         "Affiliation application submitted successfully.",
//       applicationId: result.insertId,
//     });
//   } catch (error) {
//     console.error(
//       "Affiliation submission error:",
//       error
//     );

//     return res.status(500).json({
//       success: false,
//       message:
//         "Unable to submit affiliation application. Please try again.",
//     });
//   }
// };

// const getAllAffiliations = async (req, res) => {
//   try {
//     const rows =
//       await affiliationService.getAllAffiliations();

//     return res.status(200).json({
//       success: true,
//       count: rows.length,
//       data: rows,
//     });
//   } catch (error) {
//     console.error(
//       "Get affiliations error:",
//       error
//     );

//     return res.status(500).json({
//       success: false,
//       message:
//         "Unable to retrieve affiliation applications.",
//     });
//   }
// };

// const getAffiliationById = async (req, res) => {
//   try {
//     const application =
//       await affiliationService.getAffiliationById(
//         req.params.id
//       );

//     if (!application) {
//       return res.status(404).json({
//         success: false,
//         message:
//           "Affiliation application not found.",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       data: application,
//     });
//   } catch (error) {
//     console.error(
//       "Get affiliation error:",
//       error
//     );

//     return res.status(500).json({
//       success: false,
//       message:
//         "Unable to retrieve affiliation application.",
//     });
//   }
// };

// const updateStatus = async (req, res) => {
//   try {
//     const { status } = req.body;

//     const allowedStatuses = [
//       "Pending",
//       "Approved",
//       "Rejected",
//     ];

//     if (!allowedStatuses.includes(status)) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "Status must be Pending, Approved, or Rejected.",
//       });
//     }

//     await affiliationService.updateAffiliationStatus(
//       req.params.id,
//       status
//     );

//     return res.status(200).json({
//       success: true,
//       message:
//         "Affiliation status updated successfully.",
//     });
//   } catch (error) {
//     console.error(
//       "Affiliation status update error:",
//       error
//     );

//     return res.status(500).json({
//       success: false,
//       message:
//         "Unable to update affiliation status.",
//     });
//   }
// };

// const deleteAffiliation = async (req, res) => {
//   try {
//     await affiliationService.deleteAffiliation(
//       req.params.id
//     );

//     return res.status(200).json({
//       success: true,
//       message:
//         "Affiliation application deleted successfully.",
//     });
//   } catch (error) {
//     console.error(
//       "Delete affiliation error:",
//       error
//     );

//     return res.status(500).json({
//       success: false,
//       message:
//         "Unable to delete affiliation application.",
//     });
//   }
// };

// module.exports = {
//   submitAffiliation,
//   getAllAffiliations,
//   getAffiliationById,
//   updateStatus,
//   deleteAffiliation,
// };




const affiliationService = require("../services/affiliationService");
const { uploadFileToDrive } = require("../services/driveService");
const debugLog = require("../utils/debugLog");

const clean = (value) => {
  if (typeof value !== "string") {
    return value;
  }

  return value.trim();
};

const buildSoughtCourses = (body) => {
  const courses = [];

  for (let i = 1; i <= 4; i++) {
    const row = {
      sno: i,
      course: clean(body[`soughtCourse${i}`]) || "",
      duration: clean(body[`soughtDuration${i}`]) || "",
      availableArea: clean(body[`soughtArea${i}`]) || "",
      practical: clean(body[`soughtPractical${i}`]) || "",
      classroom: clean(body[`soughtClassroom${i}`]) || "",
    };

    const hasData =
      row.course ||
      row.duration ||
      row.availableArea ||
      row.practical ||
      row.classroom;

    if (hasData) {
      courses.push(row);
    }
  }

  return courses;
};

const buildExistingCourses = (body) => {
  const courses = [];

  for (let i = 1; i <= 4; i++) {
    const row = {
      sno: i,
      course: clean(body[`existingCourse${i}`]) || "",
      duration: clean(body[`existingDuration${i}`]) || "",
      recognition: clean(body[`existingRecognition${i}`]) || "",
      availableArea: clean(body[`existingArea${i}`]) || "",
      practical: clean(body[`existingPractical${i}`]) || "",
      classroom: clean(body[`existingClassroom${i}`]) || "",
    };

    const hasData =
      row.course ||
      row.duration ||
      row.recognition ||
      row.availableArea ||
      row.practical ||
      row.classroom;

    if (hasData) {
      courses.push(row);
    }
  }

  return courses;
};

const buildStaff = (body, prefix) => {
  const staff = [];

  for (let i = 1; i <= 6; i++) {
    const row = {
      sno: i,
      name: clean(body[`${prefix}_name_${i}`]) || "",
      dateOfJoining: body[`${prefix}_date_${i}`] || "",
      qualification: clean(body[`${prefix}_qual_${i}`]) || "",
      experience: clean(body[`${prefix}_exp_${i}`]) || "",
    };

    const hasData =
      row.name ||
      row.dateOfJoining ||
      row.qualification ||
      row.experience;

    if (hasData) {
      staff.push(row);
    }
  }

  return staff;
};

const uploadAllFiles = async (files = {}) => {
  const uploadedFiles = {};

  for (const fieldName of Object.keys(files)) {
    const fieldFiles = files[fieldName];

    if (!Array.isArray(fieldFiles) || !fieldFiles.length) {
      continue;
    }

    const uploaded = [];

    for (const file of fieldFiles) {
      const driveFile = await uploadFileToDrive(file);

      if (driveFile) {
        uploaded.push(driveFile);
      }
    }

    uploadedFiles[fieldName] =
      uploaded.length === 1 ? uploaded[0] : uploaded;
  }

  return uploadedFiles;
};

const buildEnclosures = (body, uploadedFiles) => {
  const enclosureNumbers = [
    1,
    3,
    4,
    5,
    6,
    7,
    9,
    10,
    11,
    12,
    13,
  ];

  return enclosureNumbers.map((number) => {
    return {
      enclosureNumber: number,

      selected: Boolean(body[`enclosure_${number}`]),

      description: body[`enclosure_${number}`] || null,

      file: uploadedFiles[`enclosure_file_${number}`] || null,
    };
  });
};

const submitAffiliation = async (req, res) => {
  try {
    const body = req.body || {};

    debugLog("Affiliation form body:", body);
    debugLog(
      "Affiliation file fields:",
      Object.keys(req.files || {})
    );

    const requiredFields = [
      "institutionNameAddress",
      "institutionSeekingRecognition",
      "institutionType",
      "applicationCategory",
      "buildingType",
      "buildingDocuments",
      "approvedPlan",
      "stabilityCertificate",
      "powerPhase",
      "waterSupply",
      "toiletsAvailable",
      "toolsDocuments",
      "separateWorkshopClassrooms",
      "fireCertificate",
      "declarationPlace",
      "declarationDate",
    ];

    for (const field of requiredFields) {
      if (!body[field] || !String(body[field]).trim()) {
        return res.status(400).json({
          success: false,
          message: `${field} is required.`,
        });
      }
    }

    /*
     * Declaration checkbox validation
     *
     * Supports both:
     * declarationAccept
     * declarationAccepted
     *
     * Supported values:
     * true
     * on
     * 1
     * yes
     */
    const declarationRawValue =
      body.declarationAccepted ??
      body.declarationAccept;

    const declarationValue = String(
      declarationRawValue || ""
    )
      .trim()
      .toLowerCase();

    const declarationAccepted = [
      "true",
      "on",
      "1",
      "yes",
    ].includes(declarationValue);

    if (!declarationAccepted) {
      return res.status(400).json({
        success: false,
        message:
          "Please accept the declaration before submitting.",
      });
    }

    if (!req.files?.institutionHeadSignature?.length) {
      return res.status(400).json({
        success: false,
        message:
          "Institution Head / Coordinator signature is required.",
      });
    }

    console.log(
      "[AFFILIATION] Starting Google Drive upload"
    );

    const uploadedFiles = await uploadAllFiles(
      req.files || {}
    );

    console.log(
      "[AFFILIATION] Google Drive upload completed:",
      Object.keys(uploadedFiles)
    );

    const data = {
      institutionNameAddress: clean(
        body.institutionNameAddress
      ),

      institutionSeekingRecognition: clean(
        body.institutionSeekingRecognition
      ),

      institutionType: clean(
        body.institutionType
      ),

      applicationCategory: clean(
        body.applicationCategory
      ),

      availableArea: clean(
        body.availableArea
      ),

      recognitionFromDate:
        body.recognitionFromDate || null,

      soughtCourses: buildSoughtCourses(body),

      yearFirstStarting: clean(
        body.yearFirstStarting
      ),

      existingCourses:
        buildExistingCourses(body),

      buildingType: clean(
        body.buildingType
      ),

      buildingDocuments: clean(
        body.buildingDocuments
      ),

      approvedPlan: clean(
        body.approvedPlan
      ),

      stabilityCertificate: clean(
        body.stabilityCertificate
      ),

      powerPhase: clean(
        body.powerPhase
      ),

      serviceConnectionNo: clean(
        body.serviceConnectionNo
      ),

      powerLoadKW: clean(
        body.powerLoadKW
      ),

      waterSupply: clean(
        body.waterSupply
      ),

      toiletsAvailable: clean(
        body.toiletsAvailable
      ),

      toiletsDetails: clean(
        body.toiletsDetails
      ),

      toolsList: clean(
        body.toolsList
      ),

      toolsDocuments: clean(
        body.toolsDocuments
      ),

      staffPresent: buildStaff(
        body,
        "staffA"
      ),

      staffExisting: buildStaff(
        body,
        "staffB"
      ),

      otherCoursesDetails: clean(
        body.otherCoursesDetails
      ),

      separateWorkshopClassrooms: clean(
        body.separateWorkshopClassrooms
      ),

      fireCertificate: clean(
        body.fireCertificate
      ),

      declarationAccept:
        declarationAccepted,

      declarationAccepted:
        declarationAccepted,

      declarationPlace: clean(
        body.declarationPlace
      ),

      declarationDate:
        body.declarationDate,

      uploadedFiles,

      enclosures: buildEnclosures(
        body,
        uploadedFiles
      ),
    };

    debugLog(
      "Affiliation data prepared successfully:",
      {
        ...data,
        uploadedFiles: Object.keys(
          uploadedFiles
        ),
      }
    );

    console.log(
      "[AFFILIATION] Starting database insert"
    );

    const result =
      await affiliationService.createAffiliation(
        data
      );

    console.log(
      "[AFFILIATION] Database insert completed, id:",
      result && result.insertId
    );

    return res.status(201).json({
      success: true,
      message:
        "Affiliation application submitted successfully.",
      applicationId: result.insertId,
    });
  } catch (error) {
    console.error(
      "AFFILIATION SUBMISSION ERROR:",
      error
    );

    if (error && error.stack) {
      console.error(
        "AFFILIATION SUBMISSION STACK:",
        error.stack
      );
    }

    return res.status(500).json({
      success: false,
      message:
        "Unable to submit affiliation application. Please try again.",
      error:
        error && error.message
          ? error.message
          : "Unknown error",
    });
  }
};

const getAllAffiliations = async (req, res) => {
  try {
    const rows =
      await affiliationService.getAllAffiliations();

    return res.status(200).json({
      success: true,
      count: rows.length,
      data: rows,
    });
  } catch (error) {
    console.error(
      "Get affiliations error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to retrieve affiliation applications.",
    });
  }
};

const getAffiliationById = async (
  req,
  res
) => {
  try {
    const application =
      await affiliationService.getAffiliationById(
        req.params.id
      );

    if (!application) {
      return res.status(404).json({
        success: false,
        message:
          "Affiliation application not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: application,
    });
  } catch (error) {
    console.error(
      "Get affiliation error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to retrieve affiliation application.",
    });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "Pending",
      "Approved",
      "Rejected",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message:
          "Status must be Pending, Approved, or Rejected.",
      });
    }

    await affiliationService.updateAffiliationStatus(
      req.params.id,
      status
    );

    return res.status(200).json({
      success: true,
      message:
        "Affiliation status updated successfully.",
    });
  } catch (error) {
    console.error(
      "Affiliation status update error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to update affiliation status.",
    });
  }
};

const deleteAffiliation = async (
  req,
  res
) => {
  try {
    await affiliationService.deleteAffiliation(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message:
        "Affiliation application deleted successfully.",
    });
  } catch (error) {
    console.error(
      "Delete affiliation error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to delete affiliation application.",
    });
  }
};

module.exports = {
  submitAffiliation,
  getAllAffiliations,
  getAffiliationById,
  updateStatus,
  deleteAffiliation,
};