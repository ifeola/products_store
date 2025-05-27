import express, { request } from "express";
import mongoose from "mongoose";
import { connectDB } from "./config/db.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.post("/api/products", (request, response) => {});

app.get("/", (request, response) => {});

app.listen(PORT, () => {
	connectDB();
	console.log(`Server is running on http://localhost:${PORT}`);
});
