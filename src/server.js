require("colors");
const { join } = require("path");
require("dotenv").config({ path: join(__dirname, "config", ".env") });

const http = require("http");
const app = require("./app");
const { connectDB, disconnectDB } = require("./config/db");
const { log } = require("console");

const server = http.createServer(app);

const PORT = process.env.PORT || 8080;

async function startServer() {
    server.listen(PORT, () => {
        console.log(
            `Server up and running in ${process.env.NODE_ENV} on port ${PORT}`
                .bold.bgGreen
        );
    });
    await connectDB();
}

startServer();

process.on("unhandledRejection", (err, p) => {
    console.log(err);
    disconnectDB();
    server.close((err) => {
        console.log(err);
        process.exit(1);
    });
});
