var express = require("express");
const memoController = require("../Controllers/memoController");
const AuthController = require("../Controllers/AuthController");
var router = express.Router();

router.post("/entry", AuthController.protectGlobal, memoController.memoEntry);
router.post("/update_entry/:type/:no", AuthController.protectGlobal, memoController.update_entry);
router.get("/get_entry/:type/:no", AuthController.protectGlobal, memoController.get_entry);
// router.get("/pur_memoEntry", AuthController.protectGlobal, memoController.get_pur_memoEntry);
router.delete("/delete_entry/:type/:no", AuthController.protectGlobal, memoController.delete_entry);

module.exports = router;
