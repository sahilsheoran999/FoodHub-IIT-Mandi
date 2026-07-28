const dotenv = require('dotenv');
dotenv.config();

// Validate required environment variables
if (!process.env.DB_URL) {
    console.error('Missing DB_URL environment variable');
    process.exit(1);
}

if (!process.env.JWT_SECRET) {
    console.error('Missing JWT_SECRET environment variable');
    process.exit(1);
}

const isSecureCookie = process.env.COOKIE_SECURE === 'true';
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

// Here we are exporting all the env variables that the project uses
module.exports = {
    PORT: process.env.PORT || 8080,
    DB_URL: process.env.DB_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRY: process.env.JWT_EXPIRY || '7d',
    FRONTEND_URL: frontendUrl,
    COOKIE_SECURE: isSecureCookie,
};