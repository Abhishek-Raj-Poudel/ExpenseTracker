const router = require("express").Router();
const CategoryModel = require("../models/categoryModel");
const {
  getAllData,
  addData,
  getDataById,
  updateDataById,
  deleteDataById,
} = require("../controller/baseController");

const categoryOutput = "Category";

router
  .route("/")
  .get((req, res, next) => {
    getAllData(res, CategoryModel, `${categoryOutput}s`);
  })
  .post((req, res, next) => {
    let data = new CategoryModel(req.body);
    addData(res, data, categoryOutput);
  });

router
  .route("/:id")
  .get((req, res, next) => {
    getDataById(req, res, CategoryModel, categoryOutput);
  })
  .put((req, res, next) => {
    let data = req.body;
    updateDataById(req, res, CategoryModel, data, categoryOutput);
  })
  .delete((req, res, next) => {
    deleteDataById(req, res, CategoryModel, categoryOutput);
  });

module.exports = router;
