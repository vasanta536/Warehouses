// // src/controllers/authController.js
// // const { registerUser, loginUser, generateTokens } = require("../services/authService");
// const { registerUser, loginUser } = require("../services/authService");


// // function setAuthCookies(res, accessToken, refreshToken) {
// //   res.cookie("accessToken", accessToken, {
// //     httpOnly: true,
// //     sameSite: "lax",
// //     secure: false,
// //     maxAge: 15 * 60 * 1000,
// //   });
// //   res.cookie("refreshToken", refreshToken, {
// //     httpOnly: true,
// //     sameSite: "lax",
// //     secure: false,
// //     maxAge: 7 * 24 * 60 * 60 * 1000,
// //   });
// // }

// const register = async (req, res) => {
//   try {
//     console.log(req.body)
//     const user = await registerUser(req.body.email, req.body.password);
//     // const { accessToken, refreshToken } = generateTokens(user);
//     // setAuthCookies(res, accessToken, refreshToken);
//     res.status(201).json({ user });
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// const login = async (req, res) => {
//   try {
//     const user = await loginUser(req.body.email, req.body.password);
//     // const { accessToken, refreshToken } = generateTokens(user);
//     // setAuthCookies(res, accessToken, refreshToken);
//     res.json({ user });
//   } catch (err) {
//     res.status(401).json({ message: err.message });
//   }
// };

// // const me = (req, res) => { 
// //     const token = req.cookies.accessToken; 
// //     if (!token) return res.status(401).json({ message: "No token" });
// //      try { 
// //          const payload = jwt.verify(token, ACCESS_SECRET);
// //          res.json({ user: payload }); 
// //         } catch { res.status(401).json({ message: "Invalid token" }); } };

// // const logout = (req, res) => { try { 
// //     // Clear both cookies 
// //     res.clearCookie("accessToken", { httpOnly: true, sameSite: "lax", secure: false, });
// //      res.clearCookie("refreshToken", { httpOnly: true, sameSite: "lax", secure: false, }); 
// //      return res.json({ message: "Logged out successfully" });
// //      } catch (err) { 
// //         console.error("Logout error:", err); 
// //         res.status(500).json({ message: "Server error during logout" }); 
// //     } 
// //     };

// // module.exports = { register, login, me, logout };
// module.exports = { register, login };

//////////////////////////////////////////////////////////////////////////////////////////////////

// const { registerUser, loginUser } = require("../services/authService");

// // const register = async (req, res) => {
// //   try {
// //     console.log(req.body)
// //     const user = await registerUser(req.body.email, req.body.password);
// //     // const { accessToken, refreshToken } = generateTokens(user);
// //     // setAuthCookies(res, accessToken, refreshToken);
// //     res.status(201).json({ user });
// //   } catch (err) {
// //     res.status(400).json({ message: err.message });
// //   }
// // };
// const register = async (req, res) => {
//   try {
//     console.log("Register body:", req.body);
//     const user = await registerUser(req.body.email, req.body.password);
//     res.status(201).json({ user });
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// const login = async (req, res) => {
//   try {
//     const user = await loginUser(req.body.email, req.body.password);
//     res.json({ user });
//   } catch (err) {
//     res.status(401).json({ message: err.message });
//   }
// };

// module.exports = { register, login };
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// src/controllers/authController.js
const { registerUser, loginUser } = require("../services/authService");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken
} = require("../utils/tokens");
const { setAuthCookies, clearAuthCookies } = require("../utils/cookies");

const register = async (req, res) => {
  try {
    const user = await registerUser(req.body.email, req.body.password);
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    setAuthCookies(res, accessToken, refreshToken);
    res.status(201).json({ user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const user = await loginUser(req.body.email, req.body.password);
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    setAuthCookies(res, accessToken, refreshToken);
    res.json({ user });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

const me = (req, res) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    const payload = verifyAccessToken(token);
    res.json({ user: { id: payload.id, email: payload.email, role: payload.role } });
  } catch {
    res.status(401).json({ message: "Unauthorized" });
  }
};

const refresh = (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    const payload = verifyRefreshToken(token);
    // fetch user if needed; here we reuse payload.id
    const user = { id: payload.id, email: req.body?.email, role: "user" }; // adjust to your DB
    const newAccess = generateAccessToken(user);
    setAuthCookies(res, newAccess, null);
    res.json({ ok: true });
  } catch {
    res.status(401).json({ message: "Unauthorized" });
  }
};

const logout = (req, res) => {
  clearAuthCookies(res);
  res.json({ ok: true });
};

module.exports = { register, login, me, refresh, logout };
