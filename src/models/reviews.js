const mongoose = require("mongoose");

const ReviewsSchema = new mongoose.Schema({
    title: {
        type: String,
        // required: [true, "Review title is required"],
        trim: true,
        maxlength: 150,
    },
    text: {
        type: String,
        // required: [true, "Review text is required"],
        trim: true,
        maxlength: 500,
    },
    ratings: {
        type: String,
        required: [true, "ratings is requried"],
    },
    bootcamp: {
        type: mongoose.Schema.ObjectId,
        ref: "Bootcamp",
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
});

module.exports = mongoose.model("Review", ReviewsSchema);
