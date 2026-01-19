// // src/routes/authRoutes.js
// const express = require("express");
// // const { register, login,me,logout } = require("../controllers/authController");
// const { register, login} = require("../controllers/authController");
// const { validateRegisterInput, validateLoginInput } = require("../validations/authValidation");

// const router = express.Router();

// router.post("/register", validateRegisterInput, register);
// router.post("/login", validateLoginInput, login);
// // router.get("/me", me);
// // router.post("/logout", logout);

// module.exports = router;

/////////////////////////////////////////////////////////////////////////////////////////
// const express = require("express");
// const { register, login } = require("../controllers/authController");
// const router = express.Router();

// router.post("/register", register);
// router.post("/login", login);

// module.exports = router;
////////////////////////////////////////////////////////////////////////////////////////////

// src/routes/authRoutes.js
const express = require("express");
const { register, login, me, refresh, logout } = require("../controllers/authController");
const router = express.Router();
const {validateRegisterInput,validateLoginInput}=require("../validations/authValidation")

router.post("/register",validateRegisterInput, register);
router.post("/login", login);
router.get("/me", me);
router.post("/refresh", refresh);
router.post("/logout", logout);

module.exports = router;

