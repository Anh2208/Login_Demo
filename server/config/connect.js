import mysql from "mysql2/promise";

let pool;
export const createPool = async () => {
    if (!pool) {
        pool = mysql.createPool({
            host: 'localhost',
            user: 'root',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
            enableKeepAlive: true,
            keepAliveInitialDelay: 0,
        });

        const connection = await pool.getConnection();
        try {
            await connection.query("CREATE DATABASE IF NOT EXISTS `login_demo`");
            await connection.query("USE `login_demo`");
        } finally {
            connection.release();
        }
    }
    return pool;
};
