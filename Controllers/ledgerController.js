const mongoose = require("mongoose");
const expense = require("../Models/expense");
const payment = require("../Models/payment");
const pur_entry = require("../Models/pur_entry");
const sale_entry = require("../Models/sale_entry");

exports.get_ledger = async function (req, res, next) {
    try {
        const account = req.body.account;
        let purchase_entries = await pur_entry.find({ party: account, date: { "$gte": new Date(req.body.from), "$lte": new Date(req.body.to) } });
        let sale_entries = await sale_entry.find({ party: account, date: { "$gte": new Date(req.body.from), "$lte": new Date(req.body.to) } });
        let payment_entries = await payment.find({ party: account, date: { "$gte": new Date(req.body.from), "$lte": new Date(req.body.to) } });
        let expense_entries = await expense.find({ account: account, date: { "$gte": new Date(req.body.from), "$lte": new Date(req.body.to) } });

        res.status(200).json({
            status: "200",
            purchase_entries,
            sale_entries,
            payment_entries,
            expense_entries
        });
    } catch (err) {
        res.status(200).json({
            status: "500",
            message: err.message,
        });
    }
};