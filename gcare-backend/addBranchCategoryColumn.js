const db = require("./config/db");

const checkColumnSql = `
SELECT COUNT(*) AS column_count
FROM information_schema.COLUMNS
WHERE TABLE_SCHEMA = DATABASE()
  AND TABLE_NAME = 'admissions'
  AND COLUMN_NAME = 'branch_category';
`;

const addColumnSql = `
ALTER TABLE admissions
ADD COLUMN branch_category VARCHAR(100) NULL
AFTER branch_name;
`;

db.query(checkColumnSql, (checkErr, rows) => {
  if (checkErr) {
    console.error("Failed to check admissions schema:", checkErr.message);
    process.exit(1);
  }

  if (rows && rows[0] && rows[0].column_count > 0) {
    console.log("branch_category column already exists. No changes made.");
    process.exit(0);
  }

  db.query(addColumnSql, (alterErr) => {
    if (alterErr) {
      console.error("Failed to add branch_category column:", alterErr.message);
      process.exit(1);
    }

    console.log("branch_category column added to admissions table.");
    process.exit(0);
  });
});
