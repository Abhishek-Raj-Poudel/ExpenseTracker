const mongoose = require("mongoose");
const dbUrl = "mongodb://localhost:27017/office-management-system";

mongoose.connect(dbUrl, (err, success) => {
  if (err) {
    console.log(`Error >>>> ${err}`);
  } else {
    console.log("Connected to Mongoose");
  }
});
