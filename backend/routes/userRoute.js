const router = require("express").Router();
const UserModel = require("../models/userModel");
const {
  getAllData,
  addData,
  getDataById,
  updateDataById,
  deleteDataById,
  uploadImage,
} = require("../controller/baseController");

const uploader = require("../middleware/uploader");

const userOutput = "User";
const imageUploadList = ["image"];
const multiple_uploads = uploader.fields([{ name: imageUploadList[0] }]);

router
  .route("/")
  .get((req, res, next) => {
    getAllData(res, UserModel, `${userOutput}s`);
  })
  .post(multiple_uploads, (req, res, next) => {
    let data = new UserModel(req.body);
    data = uploadImage(req, data, imageUploadList);
    addData(res, data, userOutput);
  });

router
  .route("/:id")
  .get((req, res, next) => {
    getDataById(req, res, UserModel, userOutput);
  })
  .put(multiple_uploads, (req, res, next) => {
    let data = req.body;
    data = uploadImage(req, data, imageUploadList);
    updateDataById(req, res, UserModel, data, userOutput);
  })
  .delete((req, res, next) => {
    deleteDataById(req, res, UserModel, userOutput);
  });

module.exports = router;
