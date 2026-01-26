const express = require("express");
require("dotenv").config();

const app = express();

/* =======================
   CORS (Node 25 SAFE)
======================= */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

/* =======================
   BODY PARSER
======================= */
app.use(express.json());

/* =======================
   LOGGER
======================= */
app.use((req, res, next) => {
  console.log("➡️", req.method, req.url);
  next();
});

/* =======================
   HEALTH CHECK (IMPORTANT)
======================= */
app.get("/", (req, res) => {
  res.send(`✅ Backend is running on port ${process.env.PORT}`);
});

/* =======================
   ROUTES
======================= */
/* =======================
   ROUTES
======================= */
const authRoutes = require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionRoutes");

console.log("✅ authRoutes loaded");
console.log("🔥 Transaction routes loaded successfully");

app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);



/* =======================
   PROTECTED ROUTE (JWT TEST)
======================= */
const authMiddleware = require("./middleware/authMiddleware");

app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user
  });
});

/* =======================
   START SERVER
======================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
