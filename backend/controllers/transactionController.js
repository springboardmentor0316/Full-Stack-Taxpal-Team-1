const db = require("../config/db");

/**
 * ADD TRANSACTION API
 * POST /api/transactions
 */
exports.addTransaction = async (req, res) => {
  try {
    const { user_id, type, category, amount, date } = req.body;

    if (!user_id || !type || !amount || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const sql = `
      INSERT INTO transactions (user_id, type, category, amount, date)
      VALUES (?, ?, ?, ?, ?)
    `;

    const [result] = await db.query(sql, [
      user_id,
      type,
      category,
      amount,
      date,
    ]);

    res.status(201).json({
      message: "Transaction added successfully",
      transactionId: result.insertId,
    });

  } catch (err) {
    console.error("Insert Transaction Error:", err);
    res.status(500).json({ message: "Database error" });
  }
};

/**
 * GET TRANSACTIONS API
 * GET /api/transactions/:userId
 */
exports.getTransactions = async (req, res) => {
  try {
    const userId = req.params.userId;

    const sql = `
      SELECT * FROM transactions
      WHERE user_id = ?
      ORDER BY date DESC
    `;

    const [rows] = await db.query(sql, [userId]);

    res.json(rows);

  } catch (err) {
    console.error("Fetch Transaction Error:", err);
    res.status(500).json({ message: "Database error" });
  }
};
