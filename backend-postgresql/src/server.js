require("dotenv").config();
const express = require("express");
const cors = require("cors");
const warehouseRoutes = require("./routes/warehouseRoutes");
const { createTable } = require("./models/warehouseModel");
const path=require("path");

const app = express();
app.use(cors());
app.use(express.json());

createTable();

app.use("/api", warehouseRoutes);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.listen(5001, () => console.log("✅ Server running on port 5001"));
