const mongoose = require('mongoose');
const serverConfig = require('./serverConfig');

/**
 * Global cache for MongoDB connection across serverless invocations
 */
let cachedConnection = null;

async function connectDB() {
    if (cachedConnection && mongoose.connection.readyState === 1) {
        return cachedConnection;
    }

    try {
        const conn = await mongoose.connect(serverConfig.DB_URL);
        cachedConnection = conn;
        console.log("Successfully connected to the mongo db server .....");
        return cachedConnection;
    } catch(error) {
        console.log("Not able to connect to the mongodb server:", error.message);
        throw error;
    }
}

module.exports = connectDB;