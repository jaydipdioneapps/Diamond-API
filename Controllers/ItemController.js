const mongoose = require("mongoose");
const item_master = require("../Models/item_master");

exports.lotEntry = async function (req, res, next) {
    try {
        // let data = {
        //     Type: req.body.Type,
        //     kapan: req.body.kapan,
        //     Ref_no: req.body.Ref_no,
        //     Color: req.body.Color,
        //     Clarity: req.body.Clarity,
        //     Shape: req.body.Shape,
        //     Size: req.body.Size,
        //     lotno: req.body.lotno,
        //     certificate_no: req.body.certificate_no,
        //     Remarks: req.body.Remarks,
        // };
        // let data = req.body;
        let addData = await item_master.create(req.body);
        res.status(200).json({
            status: "200",
            addData,
        });
    } catch (err) {
        res.status(200).json({
            status: "500",
            message: err.message,
        });
    }
};

exports.getlots = async function (req, res, next) {
    try {
        let addData = await item_master.find()
            .select("lotno")
        res.status(200).json({
            status: "200",
            addData,
        });
    } catch (err) {
        res.status(200).json({
            status: "500",
            message: err.message,
        });
    }
}