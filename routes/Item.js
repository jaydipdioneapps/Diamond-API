var express = require("express");
const AuthController = require("../Controllers/AuthController");
const TypeController = require("../Controllers/TypeController");
const ItemController = require("../Controllers/ItemController");
var router = express.Router();

router.post("/addtype", AuthController.protectGlobal, TypeController.TypeEntry);
router.get("/gettypes", AuthController.protectGlobal, TypeController.gettypes);
router.get("/getEntryType", AuthController.protectGlobal, TypeController.getEntryType);
router.get("/getaccounts", AuthController.protectGlobal, TypeController.getaccountType);
router.post("/lotEntry", AuthController.protectGlobal, ItemController.lotEntry);
router.get("/getlots", AuthController.protectGlobal, ItemController.getlots);

module.exports = router;
