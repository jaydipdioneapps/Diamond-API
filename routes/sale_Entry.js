var express = require("express");
const saleController = require("../Controllers/saleController");
const AuthController = require("../Controllers/AuthController");
var router = express.Router();

router.post("/", AuthController.protectGlobal, saleController.saleEntry);
router.patch("/:type/:no", AuthController.protectGlobal, saleController.update_entry);
router.get("/:type/:no", AuthController.protectGlobal, saleController.get_entry);
// router.get("/pur_saleEntry", AuthController.protectGlobal, saleController.get_pur_saleEntry);
router.delete("/:type/:no", AuthController.protectGlobal, saleController.delete_entry);

module.exports = router;