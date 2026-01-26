const express = require("express");
const router = express.Router();

console.log("✅ transactionRoutes file loaded");   // 👈 ADD THIS

const {
  addTransaction,
  getTransactions
} = require("../controllers/transactionController");

// Add transaction
router.post("/", (req, res, next) => {
  console.log("👉 POST /api/transactions hit");   // 👈 ADD THIS
  next();
}, addTransaction);

// Get transactions by user ID
router.get("/:userId", (req, res, next) => {
  console.log("👉 GET /api/transactions/:userId hit");   // 👈 ADD THIS
  next();
}, getTransactions);

module.exports = router;
