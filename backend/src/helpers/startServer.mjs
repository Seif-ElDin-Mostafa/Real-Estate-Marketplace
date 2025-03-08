import mongoose from "mongoose"
import {app} from "../app.mjs"
import dotenv from "dotenv"

dotenv.config();

const PORT = process.env.PORT || 5000;
const DATABASE = process.env.DATABASE || "mongodb://localhost:27017/real-estate-marketplace";

export default async () => {
    try {
    await mongoose.connect(DATABASE);
    app.listen(PORT);
    
    console.log(`Server running at Port ${PORT}`);
} catch (error) {
    throw error;
}}