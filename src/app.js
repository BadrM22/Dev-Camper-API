const express = require("express");
const morgan = require("morgan");
// require("dotenv").config({ path: "./config/.env" });

const app = express();
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
} else {
    app.use(morgan("short"));
}

app.use(express.json());

module.exports = app;
