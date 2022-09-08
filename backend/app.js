var createError = require("http-errors");
var express = require("express");
const cors = require("cors");
var api_routes = require("./routes/apiRoute");

var app = express();
app.use(cors());

require("./db_init");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/assets", express.static(process.cwd() + "/public"));

//mount all routes
app.use("/api", api_routes); //chaal challan

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  console.log("err msg " + err.message);
  // render the error page
  res.status(err.status || 500);
  res.json({
    data: null,
    status: err.status,
    message: err,
  });
});

module.exports = app;
