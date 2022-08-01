var express = require("express");
const memoController = require("../Controllers/memoController");
const AuthController = require("../Controllers/AuthController");
const caratController = require("../Controllers/caratController")
var router = express.Router();

router.post("/", AuthController.protectGlobal, memoController.memoEntry);
router.patch("/:type/:no", AuthController.protectGlobal, memoController.update_entry);
router.get("/:type/:no", AuthController.protectGlobal, memoController.get_entry);
router.get("/carat", AuthController.protectGlobal, caratController.get_carat);
// router.get("/pur_memoEntry", AuthController.protectGlobal, memoController.get_pur_memoEntry);
router.delete("/:type/:no", AuthController.protectGlobal, memoController.delete_entry);

module.exports = router;