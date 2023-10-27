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
        default: "all",
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

CoursesSchema.statics.getAverageCost = async function (bootcampId) {
    const bootcamp = await this.aggregate([
        { $match: { bootcamp: bootcampId } },
        {
            $group: {
                _id: "$bootcamp",
                averageCost: { $avg: "$tuition" },
            },
        },
    ]);
    console.log(bootcamp);
    const averageCost = bootcamp.averageCost
        ? Math.ceil(bootcamp.averageCost)
        : undefined;
    try {
        await this.model("Bootcamp").findByIdAndUpdate(
            bootcamp._id,
            averageCost,
            { new: false, runValidators: false }
        );
    } catch (error) {
        console.error(error);
    }
};

CoursesSchema.pre("save", { query: true }, function () {
    this.constructor.getAverageCost(this.bootcamp);
});

CoursesSchema.pre("deleteOne", { document: true }, function () {
    this.constructor.getAverageCost(this.bootcamp);
});

module.exports = mongoose.model("Course", CoursesSchema);
