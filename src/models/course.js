const mongoose = require("mongoose");

const CoursesSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, "Please add course title"],
        minlength: 2,
        maxlength: 120,
    },
    description: {
        type: String,
        trim: true,
        required: [true, "Please add course description"],
        maxlength: 500,
    },
    weeks: { type: Number, required: [true, "Please add course duration"] },
    tuition: { type: Number, required: [true, "Please add course fees"] },
    minimumSkill: {
        type: String,
        enum: ["beginner", "intermediate", "advanced", "all"],
        default: 'all',
    },
    scholarshipsAvailable: {
        type: Boolean,
        default: false,
    },
    bootcamp: {
        type: mongoose.Schema.ObjectId,
        ref: "Bootcamp",
        required: true,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
});



module.exports = mongoose.model("Course", CoursesSchema);
