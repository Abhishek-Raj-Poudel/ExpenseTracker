const mongoose = require("mongoose");
const dbUrl =
  "mongodb+srv://chronoabi:22chronoabi31@mern-database-chronoabi.rfhg6de.mongodb.net/office-management-system?retryWrites=true&w=majority";
//mongodb+srv://chronoabi:<password>@mern-database-chronoabi.rfhg6de.mongodb.net/?retryWrites=true&w=majority

mongoose.connect(dbUrl, (err, success) => {
  if (err) {
    console.log(`Error >>>> ${err}`);
  } else {
    console.log("Connected to Mongoose");
  }
});
