import { createPool } from "../config/connect.js";

export const User = async () => {
    const pool = await createPool();
    const connection = await pool.getConnection();

    try {
        await connection.query(`CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(50) NOT NULL,
            email VARCHAR(50) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            isAdmin BOOLEAN DEFAULT FALSE
        )`);
    } finally {
        connection.release();
    }
};
