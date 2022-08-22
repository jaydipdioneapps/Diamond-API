var express = require("express");
var router = express.Router();
const AuthController = require("../Controllers/AuthController");
const StocktransEntry = require("../Controllers/Stock_transController");

router.post("/", AuthController.protectGlobal, StocktransEntry.StocktransEntry);
router.post("/get_stocktrans", AuthController.protectGlobal, StocktransEntry.get_stocktrans);

module.exports = router;