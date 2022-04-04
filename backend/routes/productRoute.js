const router = require("express").Router();
const ProductModel = require("../models/productModel");
const {
  getAllData,
  addData,
  getDataById,
  updateDataById,
  deleteDataById,
  uploadImage,
} = require("../controller/baseController");

const uploader = require("../middleware/uploader");

const productOutput = "Product";
const imageUploadList = ["image"];
const multiple_uploads = uploader.fields([{ name: imageUploadList[0] }]);

router
  .route("/")
  .get((req, res, next) => {
    getAllData(res, ProductModel, `${productOutput}s`);
  })
  .post(multiple_uploads, (req, res, next) => {
    let data = new ProductModel(req.body);
    data = uploadImage(req, data, imageUploadList);
    addData(res, data, productOutput);
  });

router
  .route("/:id")
  .get((req, res, next) => {
    getDataById(req, res, ProductModel, productOutput);
  })
  .put(multiple_uploads, (req, res, next) => {
    let data = req.body;
    data = uploadImage(req, data, imageUploadList);
    updateDataById(req, res, ProductModel, data, productOutput);
  })
  .delete((req, res, next) => {
    deleteDataById(req, res, ProductModel, productOutput);
  });

module.exports = router;
