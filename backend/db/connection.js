const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.mongo_url);
        console.log("Connected to the database");
    } catch (error) {
        console.error("Error connecting to the database", error);
        throw error;
    }
};

module.exports = connect;

