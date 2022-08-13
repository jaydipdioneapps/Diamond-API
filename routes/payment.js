var express = require("express");
var router = express.Router();
const AuthController = require("../Controllers/AuthController");
const PaymentController = require("../Controllers/PaymentController");

router.post("/", AuthController.protectGlobal, PaymentController.PaymentEntry);
router.post("/get_payment", AuthController.protectGlobal, PaymentController.get_payment);

module.exports = router;