const db = require("../config/db");

/**
 * ADD TRANSACTION API
 * POST /api/transactions
 */
exports.addTransaction = (req, res) => {
  const { user_id, type, category, amount, date } = req.body;

  // Validation
  if (!user_id || !type || !amount || !date) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql = `
    INSERT INTO transactions (user_id, type, category, amount, date)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [user_id, type, category, amount, date], (err, result) => {
    if (err) {
      console.error("Insert Transaction Error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    res.status(201).json({
      message: "Transaction added successfully",
      transactionId: result.insertId
    });
  });
};

/**
 * GET TRANSACTIONS API
 * GET /api/transactions/:userId
 */
exports.getTransactions = (req, res) => {
  const userId = req.params.userId;

  const sql = `
    SELECT * FROM transactions
    WHERE user_id = ?
    ORDER BY date DESC
  `;

  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("Fetch Transaction Error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    res.json(result);
  });
};
