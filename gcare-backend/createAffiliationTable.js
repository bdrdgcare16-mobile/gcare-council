const db = require("./config/db");
const {
  createAffiliationTableQuery,
} = require("./query/affiliationQuery");

db.query(createAffiliationTableQuery, (err) => {
  if (err) {
    console.error(
      "Failed to create affiliation_applications table:",
      err.message
    );
    process.exit(1);
  }

  console.log(
    "affiliation_applications table created successfully."
  );
  process.exit(0);
});
