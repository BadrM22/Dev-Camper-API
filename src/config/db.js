const mongoose = require("mongoose");

async function connectDB() {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB connected: ${conn.connection.host}`.bgCyan.bold);
    } catch (error) {
        console.error(error);
    }
}

async function disconnectDB() {
    await mongoose.disconnect();
    console.log(`Disconnection DB....`);
}
module.exports = { connectDB, disconnectDB };
