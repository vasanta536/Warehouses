// src/services/authService.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

const ACCESS_SECRET = "supersecret_access";
const REFRESH_SECRET = "supersecret_refresh";

async function registerUser(email, password) {
  const existing = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
  if (existing.rows.length > 0) {
    throw new Error("User already registered");
  }

  const hash = await bcrypt.hash(password, 12);
  const result = await pool.query(
    "INSERT INTO users (email, password_hash) VALUES ($1,$2) RETURNING id,email,role",
    [email, hash]
  );
  return result.rows[0];
}

async function loginUser(email, password) {
  const result = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
  const user = result.rows[0];
  if (!user) throw new Error("Invalid credentials");

  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) throw new Error("Invalid credentials");

  return { id: user.id, email: user.email, role: user.role };
}

function generateTokens(user) {
  const accessToken = jwt.sign({ sub: user.id, role: user.role }, ACCESS_SECRET, { expiresIn: "15m" });
  const refreshToken = jwt.sign({ sub: user.id }, REFRESH_SECRET, { expiresIn: "7d" });
  return { accessToken, refreshToken };
}

module.exports = { registerUser, loginUser, generateTokens };
// module.exports = { registerUser, loginUser};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const bcrypt = require("bcrypt");
// const pool = require("../config/db");

// async function registerUser(email, password) {
//     console.log("email,password",email,password)
//   const existing = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
//   if (existing.rows.length > 0) {
//     throw new Error("User already registered");
//   }

//   const hash = await bcrypt.hash(password, 12);
//   const result = await pool.query(
//     "INSERT INTO users (email, password_hash) VALUES ($1,$2) RETURNING id,email,role",
//     [email, hash]
//   );
//   return result.rows[0];
// }

// async function loginUser(email, password) {
//   const result = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
//   const user = result.rows[0];
//   if (!user) throw new Error("Invalid credentials");

//   const ok = await bcrypt.compare(password, user.password_hash);
//   if (!ok) throw new Error("Invalid credentials");

//   return { id: user.id, email: user.email, role: user.role };
// }

// module.exports = { registerUser, loginUser };
