import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
export const connectDB = async () => {
	try {
		const comm = await mongoose.connect(process.env.MONGO_URI);
		console.log("MongoDB connected:", comm.connection.host);
	} catch (error) {
		console.error("MongoDB connection error:", error.message);
		process.exit(1); // Exit the process with failure
	}
};
