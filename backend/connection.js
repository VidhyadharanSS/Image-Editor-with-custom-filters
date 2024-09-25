const mongoose = require("mongoose");

const db = "IMAGEEDITOR";
const dbUrl = `mongodb://localhost:27017/Hash2`;

//Asynchronous Function - returns promise
mongoose
  .connect(dbUrl)
  .then((result) => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = mongoose;
