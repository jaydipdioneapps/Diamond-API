const mongoose = require("mongoose");
const Payment = require("../Models/payment");

exports.PaymentEntry = async function (req, res, next) {
    try {
        let addData = await Payment.create(req.body);
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

exports.get_payment = async function (req, res, next) {
    try {
        const pid = req.body.party;
        let data = await Payment.find({ party: pid, date: { "$gte": new Date(req.body.from), "$lte": new Date(req.body.to) } });
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