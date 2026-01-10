const pool = require("../config/db");

const toNumberOrNull = (val) => { 
    if (val === undefined || val === null || val === "") 
        return null; return Number(val); 
    }; 

exports.createWarehouse = async (data) => { 
    const result = await pool.query( `INSERT INTO warehouses 
        (name, address1, address2, stateName, pincode, plotArea, noOfDocs, storageHeight, 
        frontViewImage, gateViewImage, coveredAreaImage, outsideImage, area, city, gstNo, 
        coveredArea, noOfGate, parkingArea) 
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18) 
        RETURNING *`, 
        [ data.name, data.address1, data.address2 || null, data.stateName, data.pincode || null, toNumberOrNull(data.plotArea), toNumberOrNull(data.noOfDocs),
             toNumberOrNull(data.storageHeight), 
             data.frontViewImage || null, data.gateViewImage || null, data.coveredAreaImage || null, data.outsideImage || null, data.area || null, data.city || null, data.gstNo || null,
              toNumberOrNull(data.coveredArea), 
              toNumberOrNull(data.noOfGate), 
              toNumberOrNull(data.parkingArea), ] 
            ); 
            return result.rows[0]; 
        };

exports.getWarehouseByID = async (id) => {
  const result = await pool.query("SELECT * FROM warehouses WHERE id = $1", [id]);
  return result.rows[0] || null;   
};

exports.updateWarehouseByID = async (id, data) => { 
    const result = await pool.query( `UPDATE warehouses SET name=$1, 
        address1=$2, address2=$3, stateName=$4, pincode=$5, plotArea=$6, 
        noOfDocs=$7, storageHeight=$8, frontViewImage=$9, gateViewImage=$10, 
        coveredAreaImage=$11, outsideImage=$12, area=$13, city=$14, gstNo=$15, 
        coveredArea=$16, noOfGate=$17, parkingArea=$18 WHERE id=$19 RETURNING *`, 
        [ data.name, data.address1, data.address2 || null, data.stateName, data.pincode || null, 
            toNumberOrNull(data.plotArea) || null, 
            toNumberOrNull(data.noOfDocs) || null,
             toNumberOrNull(data.storageHeight) || null, data.frontViewImage || null, data.gateViewImage || null,
              data.coveredAreaImage || null, data.outsideImage || null, data.area || null, data.city || null, 
              data.gstNo || null, toNumberOrNull(data.coveredArea) || null, toNumberOrNull(data.noOfGate) || null, toNumberOrNull(data.parkingArea) || null, 
              id ] ); return result.rows[0] || null; };

exports.getWarehouses = async ({ page = 1, limit = 10, name, stateName, city }) => {
  const where = [];
  const values = [];
  let idx = 1;

  if (name) {
    where.push(`name ILIKE $${idx++}`);
    values.push(`%${name}%`);
  }
  if (stateName) {
    where.push(`stateName ILIKE $${idx++}`);
    values.push(`%${stateName}%`);
  }
  if (city) {
    where.push(`city ILIKE $${idx++}`);
    values.push(`%${city}%`);
  }

  const whereClause = where.length ? `WHERE ${where.join(" AND ")}` : "";

  const countResult = await pool.query(`SELECT COUNT(*)::int AS total FROM warehouses ${whereClause}`, values);
  const total = countResult.rows[0].total;

  const offset = (Number(page) - 1) * Number(limit);
  const dataResult = await pool.query(
    `SELECT *
     FROM warehouses
     ${whereClause}
     ORDER BY id DESC
     OFFSET $${idx} LIMIT $${idx + 1}`,
    [...values, offset, Number(limit)]
  );

  return {
    data: dataResult.rows,
    total,
    page: Number(page),
    totalPages: Math.ceil(total / Number(limit)),
    count: total, 
  };
};