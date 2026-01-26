const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("TaxPal Backend Running 🚀");
});

// Routes
const authRoutes = require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
console.log("🔥 Transaction routes loaded successfully");
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);


// Auth middleware
const authMiddleware = require("./middleware/authMiddleware");

// Protected test route
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user,
  });
});

// INITIALIZE DATABASE TABLE
const db = require("./config/db");
const initDb = () => {
  const usersTableSql = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      full_name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      country VARCHAR(100),
      income_bracket VARCHAR(50),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  const resetsTableSql = `
    CREATE TABLE IF NOT EXISTS password_resets (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        token VARCHAR(10) NOT NULL,
        expires_at TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  db.query(usersTableSql, (err) => {
    if (err) {
      console.error("Error checking users table:", err);
    } else {
      console.log("✅ Users table checked/created");
      // Check for missing columns and add them if necessary (Migration logic)
      const alterSql = `
            SELECT count(*) as count FROM information_schema.columns 
            WHERE table_schema = '${process.env.DB_NAME}' 
            AND table_name = 'users' 
            AND column_name = 'country';
        `;
      db.query(alterSql, (err, result) => {
        if (!err && result[0].count === 0) {
          console.log("⚠️ Adding missing columns to users table...");
          db.query("ALTER TABLE users ADD COLUMN country VARCHAR(100), ADD COLUMN income_bracket VARCHAR(50)", (err) => {
            if (err) console.error("Error adding columns:", err);
            else console.log("✅ Columns added successfully");
          });
        }
      });
    }
  });

  db.query(resetsTableSql, (err) => {
    if (err) console.error("Error checking password_resets table:", err);
    else console.log("✅ Password Resets table checked/created");
  });
};
initDb();

// START SERVER (ALWAYS LAST)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
