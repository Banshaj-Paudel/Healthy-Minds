import dotenv from "dotenv";

dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET!;
export const API_URL = process.env.API_URL!;
export const FILE_STORE_URL = process.env.FILE_STORE_URL!;
