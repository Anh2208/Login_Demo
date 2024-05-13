import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";

import authRouter from "./router/auth.js"
import { User } from "./model/user.js";

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser())
app.use(bodyParser.json());
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true,
}));

app.use("/auth", authRouter);

User().catch(err => console.error("Error creating table:", err));

app.listen(port, () => {
    console.log("Server listen at port ", port);
})