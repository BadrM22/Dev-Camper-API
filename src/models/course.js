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
    let averageCost = bootcamp[0]
        ? Math.ceil(bootcamp[0].averageCost / 10) * 10
        : undefined;
    try {
        await this.model("Bootcamp").findByIdAndUpdate(bootcamp[0]._id, {
            averageCost,
        });
    } catch (error) {
        console.error(error);
    }
};

CoursesSchema.post("save", { document: true }, async function () {
    await this.constructor.getAverageCost(this.bootcamp);
});

CoursesSchema.pre("deleteOne", { document: true }, async function () {
    await this.constructor.getAverageCost(this.bootcamp);
});

CoursesSchema.post("updateOne", async function (doc) {
    if (this.tuition !== doc.tuition)
        await doc.constructor.getAverageCost(doc.bootcamp);
});

module.exports = mongoose.model("Course", CoursesSchema);
