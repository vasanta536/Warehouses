//- dotenv is a Node.js library that loads environment variables from a .env file into process.env.
require('dotenv').config();
const express = require("express");
const warehouseRoutes = require("./routes/warehouseRoutes");
const connectDB = require("./config/db");
//enables your server to accept requests from different origins like fontend uses localhost:3000 and backend uses localhost:5000
const cors = require("cors");
const app = express();

const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

connectDB(); // connect to MongoDB
app.use(cors());

app.use(express.json()); // parse JSON
app.use("/api", warehouseRoutes); // mount routes

app.listen(5000, () => console.log(" Server running on port 5000"));
