const mongoose = require("mongoose");
require("dotenv").config();
// const mongoURLLocal = "mongodb://0.0.0.0:27017/sports";
// const mongoURL = process.env.ONLINE_DB_URL;
const mongoURLLocal = process.env.LOCAL_DB_URL;

mongoose.connect(mongoURLLocal);

const db = mongoose.connection;
db.on("connected", () => {
  console.log("Connected to MongoDB");
});

db.on("error", (err) => {
  console.log("Error connecting to MongoDB", err);
});

db.on("disconnected", () => {
  console.log("Disconnected from MongoDB");
});

module.exports = db;
