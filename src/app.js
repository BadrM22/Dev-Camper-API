const express = require("express");
const morgan = require("morgan");
const apiV1 = require("./router/api-v1");
const errorHandler = require("./middleware/errorhandler");
const app = express();

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
} else {
    app.use(morgan("short"));
}

app.use(express.json());
app.use("/api/v1", apiV1);
app.use(errorHandler)

module.exports = app;
