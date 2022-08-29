var express = require("express");
const ExpenseController = require("../Controllers/ExpenseController");
const AuthController = require("../Controllers/AuthController");
var router = express.Router();

router.post("/category", AuthController.protectGlobal, ExpenseController.categoryEntry);
router.get("/getcategory", AuthController.protectGlobal, ExpenseController.get_category);
router.get("/get_expense", AuthController.protectGlobal, ExpenseController.get_expense);
router.post("/", AuthController.protectGlobal, ExpenseController.expenseEntry);
router.post("/getExpenseEntry", AuthController.protectGlobal, ExpenseController.get_expenseEntry);
router.post("/get_expenseReport", AuthController.protectGlobal, ExpenseController.get_expenseReport);

module.exports = router;