import dotenv from "dotenv"

dotenv.config();

export const PORT = process.env.PORT || 5000;
export const DATABASE = process.env.DATABASE || "mongodb://localhost:27017/real-estate-marketplace";
export const JWT_SECRET = process.env.JWT_SECRET || "super_secret";