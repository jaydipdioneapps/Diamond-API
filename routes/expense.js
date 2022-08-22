var express = require("express");
const ExpenseController = require("../Controllers/ExpenseController");
const AuthController = require("../Controllers/AuthController");
var router = express.Router();

router.post("/category", AuthController.protectGlobal, ExpenseController.categoryEntry);
router.get("/getcategory", AuthController.protectGlobal, ExpenseController.get_category);
router.post("/", AuthController.protectGlobal, ExpenseController.expenseEntry);
router.post("/getExpense", AuthController.protectGlobal, ExpenseController.get_expense);

module.exports = router;