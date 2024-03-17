// const express = require("express");
// const router = express.Router();

// const controller = require("../../controllers/admin/account.controller");

// router.get("/", controller.index);

// router.get("/create", controller.create);

// router.post("/create", controller.createPost);

// module.exports = router;


const express = require("express");
const router = express.Router();
const multer = require("multer");

const upload = multer();

const controller = require("../../controllers/admin/account.controller");

// const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

router.get("/", controller.index);

router.get("/create", controller.create);

router.post(
  "/create",
  controller.createPost
);

router.get("/edit/:id", controller.edit);

router.patch(
  "/edit/:id",
  controller.editPatch
);

module.exports = router;