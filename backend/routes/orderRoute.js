const router = require("express").Router();
const OrderModel = require("../models/orderModel");
const {
  getAllData,
  addData,
  getDataById,
  updateDataById,
  deleteDataById,
  uploadImage,
  deleteOrder,
} = require("../controller/baseController");

const uploader = require("../middleware/uploader");

const orderOutput = "Order";

router
  .route("/")
  .get((req, res, next) => {
    getAllData(res, OrderModel, `${orderOutput}s`);
  })
  .post(uploader.single("image"), (req, res, next) => {
    let data = new OrderModel(req.body);
    data = uploadImage(req, data, "image");
    addData(res, data, orderOutput);
  });

router
  .route("/:id")
  .get((req, res, next) => {
    getDataById(req, res, OrderModel, orderOutput);
  })
  .put(uploader.single("image"), (req, res, next) => {
    let data = req.body;
    console.log(req.body.image);
    data = uploadImage(req, data, "image");
    updateDataById(req, res, OrderModel, data, orderOutput);
  })
  .delete((req, res, next) => {
    deleteOrder(req, res, OrderModel, orderOutput);
  });

module.exports = router;
