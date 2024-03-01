const express = require("express");
const multer = require("multer");

const storageMulterHelper = require("../../helpers/storageMulter");
const storage = storageMulterHelper();

const upload = multer({storage: storage});

const router = express.Router();

const controller = require("../../controllers/admin/location.controller");
// const validate = require("../../validates/admin/employee.validate");

router.get("/", controller.index);

router.patch("/change-status/:status/:id/:diadiem", controller.changeStatus);

router.patch("/change-multi", controller.changeMulti);

router.delete(
  "/delete/:id",
  controller.deleteItem
);

router.get("/create", controller.create);

router.post(
  "/create", 
  upload.single("IMAGE"),
  controller.createPost
);

router.get("/edit/:id", controller.edit);

router.patch(
  "/edit/:id",
  upload.single('IMAGE'),
  controller.editPatch
);

router.get("/detail/:id", controller.detail);

module.exports = router;