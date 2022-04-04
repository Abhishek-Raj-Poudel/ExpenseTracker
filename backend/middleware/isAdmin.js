const isAdmin = (req, res, next) => {
  if (req.user.is_admin) {
    next();
  } else {
    next("unauthorized");
  }
};
module.exports = isAdmin;
