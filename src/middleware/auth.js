const jwt = require("jsonwebtoken");
const HttpError = require("../utils/error");
const User = require("../models/user");

exports.protect = async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }
    console.log("token: ", token);
    if (!token) {
        return next(new HttpError(`Unauthorized`, 401));
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET, {
            algorithms: ["HS256"],
        });
        req.user = await User.findById(decode.id);
        next();
    } catch (error) {
        console.log(error);
    }
};

exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user.role.includes(roles)) {
            return next(
                new HttpError(
                    `User role ${req.user.role} is not authorized to access this route`,
                    403
                )
            );
        }
        next();
    };
};
