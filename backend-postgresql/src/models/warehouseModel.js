const pool = require("../config/db");

const createTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS warehouses (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      address1 VARCHAR(255) NOT NULL,
      address2 VARCHAR(255),
      stateName VARCHAR(100) NOT NULL,
      pincode VARCHAR(10) NOT NULL,
      plotArea INT NOT NULL,
      noOfDocs INT,
      storageHeight INT NOT NULL,
      frontViewImage VARCHAR(255),
      gateViewImage VARCHAR(255),
      coveredAreaImage VARCHAR(255),
      outsideImage VARCHAR(255),
      area VARCHAR(100) NOT NULL,
      city VARCHAR(100) NOT NULL,
      gstNo VARCHAR(50),
      coveredArea INT NOT NULL,
      noOfGate INT,
      parkingArea INT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
};

module.exports = { createTable };
