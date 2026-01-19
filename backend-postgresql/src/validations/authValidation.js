// src/validations/authValidation.js
// function validateRegisterInput(req, res, next) {
//   const { email, password } = req.body;
// //   if (!email || !password) {
// //     return res.status(400).json({ message: "Email and password are required" });
// //   }
//   if(!email) return res.status(400).json({ error: "Email is required field" });
//   if(!password) return res.status(400).json({ error: "Password is required field" });
//   // Email validation (basic RFC compliant regex)
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
//   if (!emailRegex.test(email)) { 
//     return res.status(400).json({ message: "Invalid email format" }); 
// } 
// // Password validation: // - At least 6 characters // - At least one uppercase letter // - At least one number // - At least one special character 
// const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/; 
// if (!passwordRegex.test(password)) { 
//     return res.status(400).json({ message: "Password must be at least 6 characters, include one uppercase letter, one number, and one special character", }); }
//   next();
// }
function validateRegisterInput(req, res, next) {
  const { email, password } = req.body;
  console.log("Incoming body:", req.body);

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }
  if (!password) {
    return res.status(400).json({ error: "Password is required" });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  // Password validation
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      error:
        "Password must be at least 6 characters, include one uppercase letter, one number, and one special character",
    });
  }

  next();
}


function validateLoginInput(req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  next();
}

module.exports = { validateRegisterInput, validateLoginInput };
