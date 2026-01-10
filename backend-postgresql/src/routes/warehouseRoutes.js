const express = require("express");
const router = express.Router();
const warehouseController = require("../controllers/warehouseController");
const upload = require("../../middleware/upload");
const warehouseValidation=require("../validations/warehouseValidation")

router.get("/warehouses", warehouseController.getWarehouses);

router.post(
  "/warehouses",
  upload.fields([
    { name: "frontViewImage", maxCount: 1 },
    { name: "gateViewImage", maxCount: 1 },
    { name: "coveredAreaImage", maxCount: 1 },
    { name: "outsideImage", maxCount: 1 },
  ]),
  warehouseValidation.validateCreateWarehouse, 
  warehouseController.createWarehouse
);

router.get("/warehouse/:id", warehouseController.getWarehouseByID);

router.put(
  "/warehouse/:id",
  upload.fields([
    { name: "frontViewImage", maxCount: 1 },
    { name: "gateViewImage", maxCount: 1 },
    { name: "coveredAreaImage", maxCount: 1 },
    { name: "outsideImage", maxCount: 1 },
  ]),
  warehouseValidation.validateCreateWarehouse, 
  warehouseController.updateWarehouseByID
);

module.exports = router;
