var express = require('express');
var router = express.Router();
var AuthController = require('../Controllers/AuthController');
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
router.post('/login', AuthController.protectGlobal, AuthController.login);
router.post('/signup', AuthController.protectGlobal, AuthController.signUp);

module.exports = router;