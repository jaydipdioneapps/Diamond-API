const mongoose = require("mongoose");
const category = require("../Models/category");
const expense = require("../Models/expense");

exports.categoryEntry = async function (req, res, next) {
    try {
        let addData = await category.create(req.body);
        res.status(200).json({
            status: "200",
        });
    } catch (err) {
        res.status(200).json({
            status: "500",
            message: err.message,
        });
    }
};

exports.get_category = async function (req, res, next) {
    try {
        let data = await category.find();
        res.status(200).json({
            status: "200",
            data
        });
    } catch (err) {
        res.status(200).json({
            status: "500",
            message: err.message,
        });
    }
};

exports.expenseEntry = async function (req, res, next) {
    try {
        let addData = await expense.create(req.body);
        res.status(200).json({
            status: "200",
        });
    } catch (err) {
        res.status(200).json({
            status: "500",
            message: err.message,
        });
    }
};

exports.get_expense = async function (req, res, next) {
    try {
        let data = await expense.find({ date: { "$gte": new Date(req.body.from), "$lte": new Date(req.body.to) } });
        res.status(200).json({
            status: "200",
            data
        });
    } catch (err) {
        res.status(200).json({
            status: "500",
            message: err.message,
        });
    }
};