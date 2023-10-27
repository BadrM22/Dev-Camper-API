const express = require("express");
const morgan = require("morgan");
const apiV1 = require("./router/api-v1");

const app = express();

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
} else {
    app.use(morgan("short"));
}

app.use(express.json());
app.use("/api/v1", apiV1);

module.exports = app;
