var express = require("express");
var router = express.Router();
const AuthController = require("../Controllers/AuthController");
const ledgerController = require("../Controllers/ledgerController");

router.post("/", AuthController.protectGlobal, ledgerController.get_ledger);

module.exports = router;