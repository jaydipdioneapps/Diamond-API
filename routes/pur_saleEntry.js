var express = require("express");
const pur_saleController = require("../Controllers/pur_saleController");
const AuthController = require("../Controllers/AuthController");
var router = express.Router();

router.post("/pur_saleEntry", AuthController.protectGlobal, pur_saleController.pur_saleEntry);
router.post("/update_pur_sale/:type/:no", AuthController.protectGlobal, pur_saleController.update_pur_sale);
router.post("/pur_sale_trans", AuthController.protectGlobal, pur_saleController.pur_sale_trans);
router.get("/pur_sale_trans/:type/:no", AuthController.protectGlobal, pur_saleController.get_pur_saleEntry);
// router.get("/pur_saleEntry", AuthController.protectGlobal, pur_saleController.get_pur_saleEntry);
router.delete("/delete_pur_sale/:type/:no", AuthController.protectGlobal, pur_saleController.delete_pur_sale);

module.exports = router;
