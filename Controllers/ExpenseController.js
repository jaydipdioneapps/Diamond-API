const mongoose = require("mongoose");
const category = require("../Models/category");
const expense = require("../Models/expense");
const party_master = require("../Models/party_master");
const CC = require("currency-converter-lt");

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

exports.get_expenseReport = async function (req, res, next) {
    try {
        let newdata
        if (req.body.category) {
            newdata = await expense.find({
                category: req.body.category,
                date: { "$gt": new Date(req.body.from), "$lte": new Date(req.body.to) }
            });
        } else {
            newdata = await expense.find({
                toname: req.body.expby,
                date: { "$gte": new Date(req.body.from), "$lte": new Date(req.body.to) }
            });
        }
        res.status(200).json({
            status: "200",
            newdata
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

exports.get_expenseEntry = async function (req, res, next) {
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

exports.get_expense = async function (req, res, next) {
    try {
        let data = await category.find();
        let account = await party_master.find({ $or: [{ account_type: "bank" }, { account_type: "cash" }] },
            {
                name: 1,
            });
        let currencyConverter = new CC({ from: "USD", to: "INR", amount: 1 })
        currencyConverter.convert().then((response) => {
            res.status(200).json({
                status: "200",
                data,
                account,
                india: response,
            });
        });
    } catch (err) {
        res.status(200).json({
            status: "500",
            message: err.message,
        });
    }
};