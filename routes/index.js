var express = require('express');
var router = express.Router();
const AuthController = require("../Controllers/AuthController");
const caratController = require("../Controllers/caratController");
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post("/stock/report", AuthController.protectGlobal, caratController.stockReport);
module.exports = router;