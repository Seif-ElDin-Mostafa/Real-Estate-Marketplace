import mongoose from "mongoose"
import { app } from "../app.mjs"
import { PORT, DATABASE } from "./config.mjs"

export default async () => {
    try {
    await mongoose.connect(DATABASE);
    app.listen(PORT);
    
    console.log(`Server running at Port ${PORT}`);
} catch (error) {
    throw error;
}}