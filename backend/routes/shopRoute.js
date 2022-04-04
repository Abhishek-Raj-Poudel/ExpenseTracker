const router = require("express").Router();
const ShopModel = require("../models/shopModel");
const {
  getAllData,
  addData,
  getDataById,
  updateDataById,
  deleteDataById,
} = require("../controller/baseController");

const shopOutput = "Shop";

router
  .route("/")
  .get((req, res, next) => {
    getAllData(res, ShopModel, `${shopOutput}s`);
  })
  .post((req, res, next) => {
    let data = new ShopModel(req.body);
    addData(res, data, shopOutput);
  });

router
  .route("/:id")
  .get((req, res, next) => {
    getDataById(req, res, ShopModel, shopOutput);
  })
  .put((req, res, next) => {
    let data = req.body;
    updateDataById(req, res, ShopModel, data, shopOutput);
  })
  .delete((req, res, next) => {
    deleteDataById(req, res, ShopModel, shopOutput);
  });

module.exports = router;
