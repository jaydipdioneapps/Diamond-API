var express = require("express");
const saleController = require("../Controllers/saleController");
const AuthController = require("../Controllers/AuthController");
var router = express.Router();

router.post("/entry", AuthController.protectGlobal, saleController.saleEntry);
router.post("/update_entry/:type/:no", AuthController.protectGlobal, saleController.update_entry);
router.get("/get_entry/:type/:no", AuthController.protectGlobal, saleController.get_entry);
// router.get("/pur_saleEntry", AuthController.protectGlobal, saleController.get_pur_saleEntry);
router.delete("/delete_entry/:type/:no", AuthController.protectGlobal, saleController.delete_entry);

module.exports = router;
