const mongoose = require("mongoose");
const stock_trans = require("../Models/stock_trans");
const Item_entry = require("../Models/item_master");

exports.StocktransEntry = async function (req, res, next) {
    try {
        let addData = await stock_trans.create(req.body);
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

exports.get_stocktrans = async function (req, res, next) {
    try {
        const refno = req.body.refno;
        let data = await stock_trans.find({ f_refno: refno, date: { "$gte": new Date(req.body.from), "$lte": new Date(req.body.to) } });
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


