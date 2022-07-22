var express = require("express");
const AuthController = require("../Controllers/AuthController");
const LotContoller = require("../Controllers/MasterController")
var router = express.Router();

router.post("/addtype", AuthController.protectGlobal, LotContoller.MasterEntry);

module.exports = router;