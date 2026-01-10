const Warehouse = require("../models/Warehouse");

exports.getWarehouses = async ({ page, limit, name, stateName, city }) => {
  const filter = {};
  if (name) filter.name = new RegExp(name, "i");
  if (stateName) filter.stateName = new RegExp(stateName, "i");
  if (city) filter.city = new RegExp(city, "i"); 

  const warehouses = await Warehouse.find(filter)
    .sort({ _id: -1 })             // for ordering latest one first
    .skip((page - 1) * limit)  
    .limit(Number(limit));

  const total = await Warehouse.countDocuments(filter);
  const count=await Warehouse.countDocuments();

  return {
    data: warehouses,
    count,
    total,
    page: Number(page),
    totalPages: Math.ceil(total / limit),
  };
};

const toNumberOrUndefined = (val) => {
    if (val === undefined || val === null || val === "") return undefined;
    return Number(val);
};

exports.createWarehouse = async (data, files) => { 
    const warehouse = new Warehouse({ 
        name: data.name, 
        address2: data.address2, 
        stateName: data.stateName, 
        pincode: Number(data.pincode), 
        plotArea: Number(data.plotArea), 
        storageHeight: Number(data.storageHeight), 
        address1: data.address1, 
        area: data.area, 
        city: data.city, 
        gstNo: data.gstNo, 
        coveredArea: Number(data.coveredArea), 
        noOfDocs: toNumberOrUndefined(data.noOfDocs), 
        noOfGate: toNumberOrUndefined(data.noOfGate), 
        parkingArea: toNumberOrUndefined(data.parkingArea), 
        frontViewImage: files?.frontViewImage?.[0]?.filename, 
        gateViewImage: files?.gateViewImage?.[0]?.filename, 
        coveredAreaImage: files?.coveredAreaImage?.[0]?.filename, 
        outsideImage: files?.outsideImage?.[0]?.filename, 
    }); 
    await warehouse.save(); 
    return warehouse; 
};

exports.getWarehouseByID= async(id)=>{
const warehouse = await Warehouse.findById(id);
console.log("????warehouse",warehouse)
return warehouse;
}

exports.updateWarehouseByID = async (id, updatedData) => {
  return await Warehouse.findByIdAndUpdate(id, updatedData, { new: true });
};