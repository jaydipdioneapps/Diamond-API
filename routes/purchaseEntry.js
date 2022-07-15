var express = require("express");
const pur_saleController = require("../Controllers/pur_saleController");
const AuthController = require("../Controllers/AuthController");
const LotContoller = require("../Controllers/MasterController")
var router = express.Router();

router.post("/purchaseEntry", pur_saleController.purchaseEntry);
router.post("/updatepurchase", pur_saleController.updatepurchase);
router.post("/addtype", AuthController.protectGlobal, LotContoller.MasterEntry);

module.exports = router;
