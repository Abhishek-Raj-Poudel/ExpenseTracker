const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function tokenGenerate(user) {
  const token = jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      is_admin: user.is_admin,
    },
    "chitraakala"
  );
  return token;
}

class AuthController {
  login(req, res, next) {
    UserModel.findOne({ email: req.body.email })
      .then((user) => {
        if (user) {
          if (!bcrypt.compare(req.body.password, user.password)) {
            res.status(401).json({
              data: null,
              msg: "Passoword password not match",
              status: 401,
            });
          }
          res.json({
            data: { user: user, token: tokenGenerate(user) },
            msg: "User Found",
            status: 200,
          });
        } else {
          res
            .status(200)
            .json({ data: null, msg: "User not found", status: 404 });
        }
      })
      .catch((error) => {
        res.status(404).json({ data: null, msg: error, status: 404 });
        next(error);
      });
  }
}

module.exports = AuthController;

//chitraakala
