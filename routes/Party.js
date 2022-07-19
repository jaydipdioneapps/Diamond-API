var express = require("express");
var router = express.Router();
const AuthController = require("../Controllers/AuthController");
const PartyController = require("../Controllers/PartyController");

router.post("/partyEntry", AuthController.protectGlobal, PartyController.partyEntry);

module.exports = router;