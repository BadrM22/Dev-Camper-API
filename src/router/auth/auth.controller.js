const User = require("../../models/user.js");
const asyncHandler = require("../../middleware/asynchandler.js");
const HttpError = require("../../utils/error.js");

/**
 * @description register new user
 * @method POST
 * @route /api/v1/auth/register
 * @access public
 */
exports.register = asyncHandler(async (req, res, next) => {
    const user = await User.create(req.body);
    sendTokenResponse(user, res);
});

/**
 * @description login new user
 * @method POST
 * @route /api/v1/auth/login
 * @access public
 */
exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new HttpError("email and password required to login", 400));
    }
    const user = await User.findOne({ email }).select("+password");
    const isMatch = user.comparePassword(password);
    if (!isMatch) {
        return next(new HttpError("Invalid credentials", 401));
    }
    sendTokenResponse(user, res);
});

/**
 * @description helper function to sign token and send response
 * @param user user query
 * @param res response
 */
function sendTokenResponse(user, res) {
    const token = user.getSignedToken();
    return res.status(200).json({ success: true, token });
}
