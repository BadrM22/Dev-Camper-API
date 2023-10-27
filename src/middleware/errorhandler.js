const CustomError = require("../utils/error");

const errorHandler = (error, req, res, next) => {
    let err = { ...error };
    err.message = error.message;
    console.log(`${error}`.red);
    // if (error.name === "ValidationError") {
    // }
    // if (error.code === 11000) {
    // }
    // if (error.name === "CastError") {
    // }
    return res.status(err.statusCode || 500).json({
        success: false,
        error: err.message || "Internal server error",
    });
};

module.exports = errorHandler;
