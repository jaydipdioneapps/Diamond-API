const mongoose = require("mongoose");
const item_master = require("../Models/item_master");

exports.lotEntry = async function (req, res, next) {
    try {
        let data = req.body;
        for (let i = 0; i < data.length; i++) {
            data[i].type = data[i].type.id;
            data[i].color = data[i].color.id;
            data[i].clarity = data[i].clarity.id;
            data[i].shape = data[i].shape.id;
            data[i].size = data[i].size.id;
        }
        // let addData = await item_master.create(
        //     req.body.index[1]
        // );
        let addData = await item_master.insertMany(data)

        // console.log(data);
        res.status(200).json({
            status: "200",
            addData
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
        let addData = await item_master.find({},
            {
                refno: 1,
                lotno: 1,
                kapan: 1
            })
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