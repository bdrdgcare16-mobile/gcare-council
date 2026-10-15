/*
=====================================================================
  fixMissingBranchCategory.js

  PURPOSE
  -------
  Older student admission records were submitted before the
  "Branch Category" field existed, so admissions.branch_category
  is NULL for them and the Admin Dashboard shows "Not Provided".

  The project owner has confirmed that those existing students
  belong to Gandhi Community Colleges. This script back-fills
  branch_category with the EXACT option value used by
  admission-online.html:

      "Gandhi Community Colleges"

  SAFETY
  ------
  * Default run is a READ-ONLY preview — it only lists the
    records that are missing a branch category. Nothing changes.
  * `--apply` only updates the application numbers listed in
    CONFIRMED_APPLICATION_NOS below.
  * `--apply-all-missing` updates every record that is missing a
    branch category (use only after the preview confirms that ALL
    such records belong to Gandhi Community Colleges).
  * Every UPDATE is guarded by
        AND (branch_category IS NULL OR branch_category = '')
    so an existing category value can NEVER be overwritten.
  * branch_name and all other columns are untouched.
  * No rows are deleted, no application numbers are changed.

  USAGE
  -----
    node fixMissingBranchCategory.js                    (preview)
    node fixMissingBranchCategory.js --apply            (apply to
                                                         CONFIRMED_APPLICATION_NOS)
    node fixMissingBranchCategory.js --apply-all-missing

  Point it at the production database by running it with the
  production DB_* environment variables (same vars the app uses),
  e.g. inside the Railway backend shell or with a prod .env.
=====================================================================
*/

const db = require("./config/db");

/* Exact option value from admission-online.html */
const TARGET_CATEGORY = "Gandhi Community Colleges";

/*
  REVIEW STEP: after running the preview, paste the application
  numbers of the records confirmed to belong to Gandhi Community
  Colleges here, then run with --apply.
*/
const CONFIRMED_APPLICATION_NOS = [
  // "GCARE00001",
  // "GCARE00002",
];

const args = process.argv.slice(2);
const doApply = args.includes("--apply");
const doApplyAll = args.includes("--apply-all-missing");

const selectMissingSql = `
  SELECT
    id,
    application_no,
    full_name,
    branch_name,
    branch_category
  FROM admissions
  WHERE branch_category IS NULL
     OR branch_category = ''
  ORDER BY id ASC
`;

db.query(selectMissingSql, (selErr, missing) => {
  if (selErr) {
    console.error("Preview query failed:", selErr.message);
    process.exit(1);
  }

  console.log("==============================================");
  console.log(" Records missing branch_category:", missing.length);
  console.log("==============================================");

  missing.forEach((row) => {
    console.log(
      `  ${row.application_no} | ${row.full_name || "-"} | ` +
        `branch_name: ${row.branch_name || "-"}`
    );
  });

  if (!doApply && !doApplyAll) {
    console.log(
      "\nPREVIEW ONLY — no changes were made.\n" +
        "Review the list above. Then either:\n" +
        "  1. Add the confirmed application numbers to\n" +
        "     CONFIRMED_APPLICATION_NOS in this file and run\n" +
        "     node fixMissingBranchCategory.js --apply\n" +
        "  2. Or, if EVERY listed record belongs to\n" +
        `     "${TARGET_CATEGORY}", run\n` +
        "     node fixMissingBranchCategory.js --apply-all-missing\n"
    );
    db.end();
    process.exit(0);
  }

  let updateSql;
  let params;

  if (doApply) {
    if (!CONFIRMED_APPLICATION_NOS.length) {
      console.error(
        "\nCONFIRMED_APPLICATION_NOS is empty. " +
          "Add the reviewed application numbers first."
      );
      db.end();
      process.exit(1);
    }

    updateSql = `
      UPDATE admissions
      SET branch_category = ?
      WHERE application_no IN (?)
        AND (branch_category IS NULL OR branch_category = '')
    `;
    params = [TARGET_CATEGORY, CONFIRMED_APPLICATION_NOS];

    console.log(
      `\nApplying "${TARGET_CATEGORY}" to ` +
        `${CONFIRMED_APPLICATION_NOS.length} confirmed ` +
        "application number(s)…"
    );
  } else {
    updateSql = `
      UPDATE admissions
      SET branch_category = ?
      WHERE branch_category IS NULL
         OR branch_category = ''
    `;
    params = [TARGET_CATEGORY];

    console.log(
      `\nApplying "${TARGET_CATEGORY}" to ALL ` +
        `${missing.length} record(s) missing a category…`
    );
  }

  db.query(updateSql, params, (updErr, result) => {
    if (updErr) {
      console.error("Update failed:", updErr.message);
      db.end();
      process.exit(1);
    }

    console.log(
      `Done. ${result.affectedRows} row(s) updated ` +
        `(${result.changedRows} changed).`
    );

    db.query(
      `SELECT COUNT(*) AS still_missing
       FROM admissions
       WHERE branch_category IS NULL
          OR branch_category = ''`,
      (chkErr, rows) => {
        if (!chkErr) {
          console.log(
            `Records still missing branch_category: ` +
              rows[0].still_missing
          );
        }
        db.end();
        process.exit(chkErr ? 1 : 0);
      }
    );
  });
});
