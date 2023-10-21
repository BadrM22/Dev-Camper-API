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
});

module.exports = mongoose.model("Users", UsersSchema);

