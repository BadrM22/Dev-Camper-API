const CustomError = require("../utils/error");

const errorHandler = (error, req, res, next) => {
    let err = { ...error };
    err.message = error.message;
    console.log(`${error}`.red);

    return res.status(err.statusCode || 500).json({
        success: false,
        error: err.message || "Internal server error",
    });
};

module.exports = errorHandler;
