import dotenv from 'dotenv';

dotenv.config();
const BACKEND_URI = process.env.BACKEND_URI || "http://localhost:9000/api";

export { BACKEND_URI };