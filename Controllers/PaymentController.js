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