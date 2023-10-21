const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
        required: [true, "Please add bootcamp email"],
        trim: true,
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/g,
            "Please add a valid email address",
        ],
    },
    role: {
        type: String,
        enum: ["user", "publisher"],
        required: [true, "Please add a user role"],
    },
    password: {
        type: String,
        minlength: 8,
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
UsersSchema.methods.signToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXP,
        algorithm: "HS256",
    });
};
// Compare user entered password with hashed password in DB
UsersSchema.methods.comparePassword = async function (pswd) {
    return await bcrypt.compare(pswd, this.password);
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
