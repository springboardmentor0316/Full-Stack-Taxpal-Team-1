const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "taxpal",
});

connection.connect((err) => {
  if (err) {
    console.error("❌ Direct DB test failed:", err.message);
    return;
  }
  console.log("✅ Direct DB test successful!");
  connection.end();
});

