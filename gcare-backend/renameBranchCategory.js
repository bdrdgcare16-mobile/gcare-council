/*
=====================================================================
  renameBranchCategory.js

  PURPOSE
  -------
  The admission form category "G Care Branch" has been renamed to
  "G Care Branch (CHA's)" in admission-online.html, the form JS
  (branchOptionsByCategory) and the backend validation map
  (branchCategories in admissionService.js).

  Rows stored BEFORE the rename still have
      branch_category = 'G Care Branch'
  in the database. The Admin Dashboard already maps the old value
  to the new label at display time, so this script is OPTIONAL —
  it simply aligns the stored value with the current category
  name so exports / raw queries stay consistent.

  SAFETY
  ------
  * Default run is a READ-ONLY preview — lists affected records.
  * `--apply` updates ONLY rows where
        branch_category = 'G Care Branch'
    — no other category is touched, nothing is deleted, and
    application numbers are unchanged.
  * branch_name and all other columns are untouched.

  USAGE
  -----
    node renameBranchCategory.js           (preview)
    node renameBranchCategory.js --apply   (rename stored value)

  Run with the production DB_* environment variables (same vars
  the backend uses) to target the Railway database.
=====================================================================
*/

const db = require("./config/db");

const OLD_CATEGORY = "G Care Branch";
const NEW_CATEGORY = "G Care Branch (CHA's)";

const doApply = process.argv.includes("--apply");

const selectSql = `
  SELECT id, application_no, full_name, branch_name, branch_category
  FROM admissions
  WHERE branch_category = ?
  ORDER BY id ASC
`;

db.query(selectSql, [OLD_CATEGORY], (selErr, rows) => {
  if (selErr) {
    console.error("Preview query failed:", selErr.message);
    process.exit(1);
  }

  console.log("==============================================");
  console.log(
    ` Records with branch_category = "${OLD_CATEGORY}":`,
    rows.length
  );
  console.log("==============================================");

  rows.forEach((row) => {
    console.log(
      `  ${row.application_no} | ${row.full_name || "-"} | ` +
        `branch_name: ${row.branch_name || "-"}`
    );
  });

  if (!doApply) {
    console.log(
      `\nPREVIEW ONLY — no changes were made.\n` +
        `Run "node renameBranchCategory.js --apply" to rename\n` +
        `the stored value to "${NEW_CATEGORY}" for these records.\n`
    );
    db.end();
    process.exit(0);
  }

  const updateSql = `
    UPDATE admissions
    SET branch_category = ?
    WHERE branch_category = ?
  `;

  db.query(updateSql, [NEW_CATEGORY, OLD_CATEGORY], (updErr, result) => {
    if (updErr) {
      console.error("Update failed:", updErr.message);
      db.end();
      process.exit(1);
    }

    console.log(
      `\nDone. ${result.affectedRows} row(s) updated to ` +
        `"${NEW_CATEGORY}".`
    );

    db.end();
    process.exit(0);
  });
});
