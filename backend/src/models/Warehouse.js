const mongoose = require('mongoose');

const warehouseSchema = new mongoose.Schema({
  // _id: String,
  name: { type: String, required: true },
  address2: String,
  stateName: { type: String, required: true },
  pincode: { type: String, required: true },
  plotArea: { type: Number, required: true },
  noOfDocs: Number,
  storageHeight: { type: Number, required: true },
   frontViewImage: { type: String },
  gateViewImage: { type: String },
  coveredAreaImage: { type: String },
  outsideImage: { type: String },
  address1: { type: String, required: true },
  area: { type: String, required: true },
  city: { type: String, required: true },
  gstNo: String,
  coveredArea: { type: Number, required: true },
  noOfGate: Number,
  parkingArea: Number,
}, { timestamps: true });

module.exports = mongoose.model('Warehouse', warehouseSchema);