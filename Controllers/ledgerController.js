const mongoose = require("mongoose");
const expense = require("../Models/expense");
const party_master = require("../Models/party_master");
const payment = require("../Models/payment");
const pur_entry = require("../Models/pur_entry");
const sale_entry = require("../Models/sale_entry");

exports.get_ledger = async function (req, res, next) {
    try {
        const account = req.body.account;
        let opening_balance = await party_master.find({ name: account }, { opening_bal: 1, _id: 0 })
        let purchase_entries = await pur_entry.find({
            party: account,
            date: { "$gte": new Date(req.body.from), "$lte": new Date(req.body.to) }
        }, {
            date: 1,
            inv_no: 1,
            account: "pur",
            credit: "0.00",
            final_amount: 1,
        });
        let sale_entries = await sale_entry.find({
            party: account,
            date: { "$gte": new Date(req.body.from), "$lte": new Date(req.body.to) }
        }, {
            date: 1,
            inv_no: 1,
            account: "sale",
            debit: "0.00",
            final_amount: 1,
        });
        let payment_entries = await payment.find({
            party: account,
            date: { "$gte": new Date(req.body.from), "$lte": new Date(req.body.to) }
        }, {
            date: 1,
            voucher: 1,
            account: 1,
            party: 1,
            credit_debit: 1,
            amount: 1,
        });

        let expense_entries = await expense.find({
            account: account,
            date: { "$gte": new Date(req.body.from), "$lte": new Date(req.body.to) }
        }, {
            date: 1,
            voucher: 1,
            account: 1,
            amount: 1,
            credit: "0.00",
        });

        let newArry = [...opening_balance, ...purchase_entries, ...sale_entries, ...payment_entries, ...expense_entries]
        newArry.sort('-date')
        res.status(200).json({
            status: "200",
            newArry
        });
    } catch (err) {
        res.status(200).json({
            status: "500",
            message: err.message,
        });
    }
};