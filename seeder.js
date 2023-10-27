const mongoose = require("mongoose");
const fs = require("fs");
const User = require("./src/models/user");
const Bootcamp = require("./src/models/bootcamp");
const Course = require("./src/models/course");

require("colors");
require("dotenv").config({ path: "./src/config/.env" });

const users = JSON.parse(
    fs.readFileSync("./_data/users.json", { encoding: "utf-8" })
);

const bootcamps = JSON.parse(
    fs.readFileSync("./_data/bootcamps.json", { encoding: "utf-8" })
);

const courses = JSON.parse(
    fs.readFileSync("./_data/courses.json", { encoding: "utf-8" })
);

async function importData() {
    try {
        await User.create(users);
        await Bootcamp.create(bootcamps);
        await Course.create(courses);
        console.log("Data Imported...".bgGreen);
        process.exit(0);
    } catch (error) {
        console.error(`${error}`.red.bold);
        process.exit(1);
    }
}

async function deleteData() {
    try {
        await User.deleteMany({});
        await Bootcamp.deleteMany({});
        await Course.deleteMany({});
        console.log("Data Deleted...".bgRed);
        process.exit(0);
    } catch (error) {
        console.error(`${error}`.red.bold);
        process.exit(1);
    }
}
mongoose.connect(process.env.MONGO_URL);

if (process.argv[2] === "-i") {
    importData();
} else if (process.argv[2] === "-d") {
    deleteData();
} else {
    console.log("Please inter -i or -d to import or delete data from database");
    process.exit(1);
}
