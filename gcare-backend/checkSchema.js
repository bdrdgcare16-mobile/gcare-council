const db = require("./config/db");

db.query('DESCRIBE admissions', (err, results) => {
  if (err) {
    console.error('Error describing admissions table:', err);
    process.exit(1);
  }
  
  console.log('Admissions table schema:');
  console.log(JSON.stringify(results, null, 2));
  
  db.end();
  process.exit(0);
});
