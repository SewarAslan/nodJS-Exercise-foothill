const mongoose = require("mongoose");

const connectionString = "mongodb://localhost:27017/notesDB";
const connectDB = async () => {
  try {
    await mongoose.connect(connectionString);
    console.log("connected successfully");
  } catch (err) {
    console.error("Error : ", err);
  }
};
module.exports = connectDB;
