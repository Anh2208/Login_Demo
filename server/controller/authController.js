import { createPool } from "../config/connect.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
    const pool = await createPool();
    const connection = await pool.getConnection();
    try {

        const [existingUsers] = await connection.query(
            "SELECT * FROM users WHERE email = ?",
            [req.body.email]
        );

        if (existingUsers.length > 0) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashPassword = await bcrypt.hash(req.body.password, 10);
        await connection.query(
            "INSERT INTO users (username, email, password, isAdmin) VALUES (?, ?, ?, ?)",
            [req.body.username, req.body.email, hashPassword, req.body.isAdmin]
        );

        res.status(200).json({ message: "Registered user successfully" });

    } catch (error) {
        res.status(400).json({ message: "Registration failed", error: error.message });
    } finally {
        connection.release();
    }
}


export const login = async (req, res) => {
    const pool = await createPool();
    const connection = await pool.getConnection();
    try {

        const [existingUsers] = await connection.query(
            "SELECT id, username, email, password, isAdmin FROM users WHERE email = ? LIMIT 1",
            [req.body.email]
        );

        if (existingUsers.length === 0) {

            res.status(401).json({ message: "Email or Password incorrect" });
            return;
        }

        const result = await bcrypt.compare(req.body.password, existingUsers[0].password);

        if (result) {
            const accessToken = generateAccessToken(existingUsers[0]);
            existingUsers[0].accessToken = accessToken;

            const { id, password, ...user } = existingUsers[0];

            res.cookie('accessToken', accessToken, { httpOnly: true })
            res.status(200).json({ message: "Login successfully", user: user });
        } else {
            res.status(401).json({ message: "Email or Password incorrect" });
        }

    } catch (error) {
        res.status(400).json({ success: false, error });
    } finally {
        connection.release();
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie('accessToken');
        res.status(200).json({ message: "logout success" })

    } catch (error) {
        res.status(500).json({ message: error });
    }
}

const generateAccessToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email, username: user.username, isAdmin: user.isAdmin }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1d",
    });
};