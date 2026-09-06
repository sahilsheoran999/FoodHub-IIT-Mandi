const dotenv = require('dotenv');
dotenv.config();

// Validate required environment variables in runtime
if (!process.env.DB_URL && process.env.NODE_ENV === 'production') {
    console.warn("WARNING: DB_URL environment variable is not defined!");
}

if (!process.env.JWT_SECRET && process.env.NODE_ENV === 'production') {
    console.warn("WARNING: JWT_SECRET environment variable is not defined!");
}

// Support comma-separated FRONTEND_URL origins or single origin
const rawFrontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
const allowedOrigins = rawFrontendUrl.includes(',') 
    ? rawFrontendUrl.split(',').map(s => s.trim()) 
    : [rawFrontendUrl.trim()];

// Here we are exporting all the env variables that the project uses
module.exports = {
    PORT: process.env.PORT || 8080,
    DB_URL: process.env.DB_URL || 'mongodb://localhost:27017/foodhub',
    JWT_SECRET: process.env.JWT_SECRET || 'foodhub_secret_key_12345',
    JWT_EXPIRY: process.env.JWT_EXPIRY || '7d',
    FRONTEND_URL: rawFrontendUrl,
    ALLOWED_ORIGINS: allowedOrigins,
    COOKIE_SECURE: process.env.COOKIE_SECURE === 'true', // dynamic secure cookie flag
}