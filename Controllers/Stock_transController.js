const mongoose = require("mongoose");
const stock_trans = require("../Models/stock_trans");

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
