const router = require("express").Router();
const OrderModel = require("../models/orderModel");
const {
  getAllData,
  addData,
  getDataById,
  updateDataById,
  deleteDataById,
  uploadImage,
  updateImage,
} = require("../controller/baseController");

const uploader = require("../middleware/uploader");

const orderOutput = "Order";
const imageUploadList = ["image"];
const multiple_uploads = uploader.fields([{ name: imageUploadList[0] }]);

router
  .route("/")
  .get((req, res, next) => {
    getAllData(res, OrderModel, `${orderOutput}s`);
  })
  .post(multiple_uploads, (req, res, next) => {
    let data = new OrderModel(req.body);
    data = uploadImage(req, data, imageUploadList);
    addData(res, data, orderOutput);
  });

router
  .route("/:id")
  .get((req, res, next) => {
    getDataById(req, res, OrderModel, orderOutput);
  })
  .put(multiple_uploads, (req, res, next) => {
    let data = req.body;
    data = updateImage(req, data, imageUploadList);
    updateDataById(req, res, OrderModel, data, orderOutput);
  })
  .delete((req, res, next) => {
    deleteDataById(req, res, OrderModel, orderOutput);
  });

module.exports = router;
