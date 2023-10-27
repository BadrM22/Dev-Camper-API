const mongoose = require("mongoose");
require("colors");
const { join } = require("path");
const fs = require("fs");
const User = require("./src/models/user");
require("dotenv").config({ path: "./src/config/.env" });

const users = JSON.parse(
    fs.readFileSync("./_data/users.json", { encoding: "utf-8" })
);

async function importData() {
    try {
        await User.create(users);
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
