const mongoose = require("mongoose");
const slugify = require("slugify");
const BootcampsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add bootcamp name"],
        trim: true,
        minlength: 5,
        maxlength: 120,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    slug: String,
    description: {
        type: String,
        trim: true,
        required: [true, "Please add bootcamp description"],
        maxlength: 500,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    website: {
        type: String,
        trim: true,
        match: [
            /^(https?|ftp):\/\/(([a-z\d]([a-z\d-]*[a-z\d])?\.)+[a-z]{2,}|localhost)(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/g,
            "Please add a valid url",
        ],
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
    averageCost: Number,
    phone: {
        type: String,
        trim: true,
    },
    address: String,
    careers: {
        type: [String],
        enum: [
            "Web Development",
            "Mobile Development",
            "UI/UX",
            "Data Science",
            "Business",
        ],
        require: [true, "Please add bootcamp careers"],
    },
    housing: {
        type: Boolean,
        default: false,
    },
    jobAssistance: {
        type: Boolean,
        default: false,
    },
    jobGuarantee: {
        type: Boolean,
        default: false,
    },
});

BootcampsSchema.pre("save", function (next) {
    this.slug = slugify(this.name, { trim: true, lower: true });
    next();
});

module.exports = mongoose.model("Bootcamp", BootcampsSchema);
