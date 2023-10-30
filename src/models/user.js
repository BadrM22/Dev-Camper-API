const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const UsersSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        minlength: 2,
        maxlength: 120,
        require: [true, "Please add user name"],
    },
    email: {
        type: String,
        unique: [true, "email already registerd"],
        required: [true, "Please add bootcamp email"],
        trim: true,
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/g,
            "Please add a valid email address",
        ],
    },
    role: {
        type: String,
        trim: true,
        enum: ["user", "publisher"],
        required: [true, "Please add a user role"],
    },
    password: {
        type: String,
        minlength: 6,
        select: false,
        required: [true, "Please add a user password"],
        // match: [
        //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/g,
        //     "Please add a valid password",
        // ],
    },
    passwordResetToken: String,
    passwordResetTokenExpire: String,
});

// Generate JSON WEB TOKEN
UsersSchema.methods.getSignedToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: "30 days",
        issuer: "Mo.Badr",
    });
};

// Compare user entered password with hashed password in DB
UsersSchema.methods.comparePassword = async function (pswd) {
    return await bcrypt.compare(pswd, this.password);
};

UsersSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");
    this.passwordResetToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
        
    this.passwordResetTokenExpire = Date.now() + 10 * 60 * 1000;

    return resetToken;
};

// Hash password before saving to DB
UsersSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = mongoose.model("Users", UsersSchema);
