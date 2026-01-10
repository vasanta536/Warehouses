const warehouseService = require("../services/warehouseService");
const Warehouse=require("../models/Warehouse")

exports.getWarehouses = async (req, res) => {
  try {
     const { page = 1, limit = 5, name, stateName, city } = req.query; 
     const result = await warehouseService.getWarehouses({ page, limit, name, stateName, city }); 
     res.json(result);
    } 
    catch (err) {
       res.status(500).json({ error: err.message }); 
      }
};


exports.createWarehouse = async (req, res) => {
    try { 
      console.log("Files received:", req.files); 
      const warehouse = await warehouseService.createWarehouse(req.body, req.files); 
      res.status(201).json({ message: "Warehouse created successfully", warehouse, }); 
    } 
    catch (err) { 
      res.status(400).json({ error: err.message }); 
    }
};


exports.getWarehouseByID = async (req, res) => {
  try{
    const result= await warehouseService.getWarehouseByID(req.params.id)
     res.json(result);
  }
   catch (err) { 
      res.status(400).json({ error: err.message }); 
    }
}


exports.updateWarehouseByID = async (req, res) => {
  try {
    const id = req.params.id;

    const updatedData = {
      ...req.body,
      frontViewImage: req.files?.frontViewImage?.[0]?.filename || req.body.frontViewImage,
      gateViewImage: req.files?.gateViewImage?.[0]?.filename || req.body.gateViewImage,
      coveredAreaImage: req.files?.coveredAreaImage?.[0]?.filename || req.body.coveredAreaImage,
      outsideImage: req.files?.outsideImage?.[0]?.filename || req.body.outsideImage,
    };

    const warehouse = await warehouseService.updateWarehouseByID(id, updatedData);

    if (!warehouse) {
      return res.status(404).json({ message: "Warehouse not found" });
    }

    res.json(warehouse);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
