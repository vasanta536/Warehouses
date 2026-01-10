exports.validateCreateWarehouse = (req, res, next) => {
  const {
    name, stateName, pincode, plotArea,
    storageHeight, address1, area, city, coveredArea
  } = req.body;
  if(!name) return res.status(400).json({ error: "Name is required field" });
  if(!stateName) return res.status(400).json({ error: "StateName is required field" });
  if(!pincode) return res.status(400).json({ error: "Pincode is required field" });
  if (typeof pincode === "number") { const padded = doc.pincode.toString().padStart(6, "0"); db.warehouses.updateOne( { _id: doc._id }, { $set: { pincode: padded } } ); }
  if(!plotArea) return res.status(400).json({ error: "PlotArea is required field" });
  if(!storageHeight) return res.status(400).json({ error: "Storage Height is required field" });
  if(!address1) return res.status(400).json({ error: "Address1 is required field" });
  if(!area) return res.status(400).json({ error: "Area is required field" });
  if(!city) return res.status(400).json({ error: "City is required field" });
  if(!coveredArea) return res.status(400).json({ error: "Covered Area is required field" });

  next();
};
