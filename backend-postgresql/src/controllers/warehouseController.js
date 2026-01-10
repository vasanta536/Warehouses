const warehouseService = require("../services/warehouseService");

const { mapWarehouses } = require("../utils/warehouseMapper"); 
exports.getWarehouses = async (req, res) => { 
    try { 
        const { page = 1, limit = 10, name, stateName, city } = req.query; 
        const result = await warehouseService.getWarehouses({ page, limit, name, stateName, city }); 
        const data = mapWarehouses(result.data); 
        res.json({ data, total: result.total, page: result.page, totalPages: result.totalPages, count: result.count }); 
    } catch (err) { 
        res.status(400).json({ error: err.message }); 
    } };

exports.getWarehouseByID = async (req, res) => {
     try { 
        const { id } = req.params; 
        const warehouse = await warehouseService.getWarehouseByID(id); 
        if (!warehouse) { 
            return res.status(404).json({ message: "Warehouse not found" }); 
        } 
        const mapped = mapWarehouses([warehouse])[0]; res.json(mapped); 
    } catch (err) { res.status(400).json({ error: err.message }); } };

exports.createWarehouse = async (req, res) => { 
    try { 
        const body = req.body; 
        const files = req.files;  
        const frontViewImage = files?.frontViewImage?.[0]?.filename || null; 
        const gateViewImage = files?.gateViewImage?.[0]?.filename || null; 
        const coveredAreaImage = files?.coveredAreaImage?.[0]?.filename || null; 
        const outsideImage = files?.outsideImage?.[0]?.filename || null; 
        const data = { ...body, frontViewImage, gateViewImage, coveredAreaImage, outsideImage, 
        }; 
        const warehouse = await warehouseService.createWarehouse(data); 
        res.status(201).json(warehouse); 
    } catch (err) { res.status(400).json({ error: err.message }); } };

    
exports.updateWarehouseByID = async (req, res) => { 
    try { const { id } = req.params; const body = req.body; 
    const files = req.files; 
    const updatedData = { ...body, frontViewImage: files?.frontViewImage?.[0]?.filename || body.frontViewImage || null, 
        gateViewImage: files?.gateViewImage?.[0]?.filename || body.gateViewImage || null, 
        coveredAreaImage: files?.coveredAreaImage?.[0]?.filename || body.coveredAreaImage || null, 
        outsideImage: files?.outsideImage?.[0]?.filename || body.outsideImage || null, 
    }; 
    const warehouse = await warehouseService.updateWarehouseByID(id, updatedData); 
    if (!warehouse) { 
        return res.status(404).json({ message: "Warehouse not found" }); 
    } res.json(warehouse); 
} catch (err) { 
    res.status(400).json({ error: err.message }); 
} };