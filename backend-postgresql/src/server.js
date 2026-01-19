// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const warehouseRoutes = require("./routes/warehouseRoutes");
// const { createTable } = require("./models/warehouseModel");
// const { createUserTable } = require("./models/usersModel");
// // const cookieParser = require("cookie-parser"); 
// const authRoutes = require("./routes/authRoutes");
// const path=require("path");

// const app = express();
// app.use(cors());
// app.use(express.json());

// createTable();
// createUserTable();

// // app.use(cors({ origin: "http://localhost:3000", // must exactly match your React dev server
// //  credentials: true // allow cookies 
// //  })); 
// // app.use(cors({ origin: [ "http://localhost:3000", "http://127.0.0.1:3000", "http://[::1]:3000" ], credentials: true }));
// //  app.use(express.json()); // parse JSON bodies 
// //  app.use(cookieParser()); // parse cookies


// app.use("/api/auth", authRoutes);
// app.use("/api", warehouseRoutes);
// app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// app.listen(5001, () => console.log(" Server running on port 5001"));

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");

const warehouseRoutes = require("./routes/warehouseRoutes");
const authRoutes = require("./routes/authRoutes");
const { createTable } = require("./models/warehouseModel");
const { createUserTable } = require("./models/usersModel");

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

createTable();
createUserTable();

app.use("/api/auth", authRoutes);
app.use("/api", warehouseRoutes);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.listen(5001, () => console.log(" Server running on port 5001"));
