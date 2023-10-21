require("colors");
const { join } = require("path");
require("dotenv").config({ path: join(__dirname, "config", ".env") });

const http = require("http");
const app = require("./app");

console.log(process.env.PORT);
console.log(process.env.NODE_ENV);

const server = http.createServer(app);

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
    console.log(
        `Server up and running in ${process.env.NODE_ENV} on port ${PORT}`.bold
            .bgGreen
    );
});
