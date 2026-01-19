const pool = require("../config/db"); 

const createUserTable = async () => { 
    try {
         await pool.query(` 
            CREATE TABLE IF NOT EXISTS users ( 
            id SERIAL PRIMARY KEY, 
            email VARCHAR(255) UNIQUE NOT NULL,
             password_hash VARCHAR(255) NOT NULL, 
             role VARCHAR(50) DEFAULT 'user', 
             created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ); 
             `); 
             console.log("Users table created or already exists"); 
        } catch (err) { 
            console.error("Error creating users table:", err); } 
};
        
module.exports = { createUserTable };
