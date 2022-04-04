const jwt = require("jsonwebtoken");

const isLoggedIn = (req, res, next) => {
  let token = null;

  if (req.headers["authorization"]) {
    token = req.headers["authorization"];
  }

  if (req.headers["x-access-token"]) {
    token = req.headers["x-access-token"];
  }

  if (req.query.token) {
    token = req.query.token;
  }

  if (token === null) {
    next("unauthorized access");
  }

  const data = jwt.verify(token, "chitraakala");

  if (!data._id) {
    next("unauthorized access.");
  }

  req.user = data;

  next();
};

module.exports = isLoggedIn;
