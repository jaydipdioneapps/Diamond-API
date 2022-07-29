var express = require("express");
const purchaseController = require("../Controllers/purchaseController");
const AuthController = require("../Controllers/AuthController");
var router = express.Router();

router.post("/", AuthController.protectGlobal, purchaseController.purchaseEntry);
router.patch("/:type/:no", AuthController.protectGlobal, purchaseController.update_entry);
router.get("/:type/:no", AuthController.protectGlobal, purchaseController.get_entry);
// router.get("/pur_saleEntry", AuthController.protectGlobal, purchaseController.get_pur_saleEntry);
router.delete("/:type/:no", AuthController.protectGlobal, purchaseController.delete_entry);

module.exports = router;