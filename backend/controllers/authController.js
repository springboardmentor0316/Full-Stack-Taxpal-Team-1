const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// REGISTER
exports.register = async (req, res) => {
  try {
    const { full_name, email, password, country, income_bracket } = req.body;

    if (!full_name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const checkSql = "SELECT id FROM users WHERE email = ?";
    db.query(checkSql, [email], async (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.length > 0) {
        return res.status(409).json({ message: "Email already registered" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      const insertSql =
        "INSERT INTO users (full_name, email, password_hash, country, income_bracket) VALUES (?, ?, ?, ?, ?)";

      db.query(
        insertSql,
        [full_name, email, hashedPassword, country || null, income_bracket || null],
        (err) => {
          if (err) return res.status(500).json(err);

          res.status(201).json({ message: "User registered successfully" });
        }
      );
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// LOGIN
exports.login = (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], async (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.length === 0) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const user = result[0];

      const isMatch = await bcrypt.compare(password, user.password_hash);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Create JWT
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      res.json({
        message: "Login successful",
        token,
        user: {
          id: user.id,
          full_name: user.full_name,
          email: user.email,
          country: user.country
        }
      });
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// FORGOT PASSWORD - Generate OTP
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  // Check if user exists
  db.query("SELECT id FROM users WHERE email = ?", [email], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.length === 0) return res.status(404).json({ message: "User not found" });

    // Generate 6 digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Expires in 10 minutes
    const expiresAt = new Date(Date.now() + 10 * 60000);

    // Store in password_resets
    const sql = "INSERT INTO password_resets (email, token, expires_at) VALUES (?, ?, ?)";
    db.query(sql, [email, otp, expiresAt], (err) => {
      if (err) return res.status(500).json(err);

      console.log(`[OTP LOG] OTP for ${email}: ${otp}`); // Log for dev since no email service
      res.json({ message: "OTP sent to email (Check ID console)" });
    });
  });
};

// VERIFY OTP
exports.verifyOtp = (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) return res.status(400).json({ message: "Email and OTP required" });

  const sql = "SELECT * FROM password_resets WHERE email = ? AND token = ? AND expires_at > NOW() ORDER BY created_at DESC LIMIT 1";
  db.query(sql, [email, otp], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length === 0) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    res.json({ message: "OTP Verified" });
  });
};

// RESET PASSWORD
exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({ message: "Email, OTP, and new password required" });
    }

    // Verify OTP again to be safe
    const verifySql = "SELECT * FROM password_resets WHERE email = ? AND token = ? AND expires_at > NOW()";
    db.query(verifySql, [email, otp], async (err, result) => {
      if (err) return res.status(500).json(err);
      if (result.length === 0) return res.status(400).json({ message: "Invalid or expired OTP" });

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      const updateSql = "UPDATE users SET password_hash = ? WHERE email = ?";
      db.query(updateSql, [hashedPassword, email], (err) => {
        if (err) return res.status(500).json(err);

        // Delete used OTPs
        db.query("DELETE FROM password_resets WHERE email = ?", [email]);

        res.json({ message: "Password updated successfully" });
      });
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
