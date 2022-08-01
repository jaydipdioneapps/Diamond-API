const mongoose = require("mongoose");
const caratcounter = require("../Models/caratcounter");
const item_master = require("../Models/item_master");

exports.get_carat = async function (req, res, next) {
    try {
        let newArry = [];
        let newdata = await caratcounter.find();
        for (let i = 0; i < newdata.length; i++) {
            let lotdata = await item_master.findOne({ refno: newdata[i].refno }, {
                lotno: 1
            });
            let newObj = {
                refno: newdata[i].refno,
                lotno: lotdata.lotno,
                total_carat: newdata[i].purchase + newdata[i].memo_in - newdata[i].sale - newdata[i].memo_out,
            }
            newArry.push(newObj);
        }
        // newdata.map(async (e, i) => {
        // })
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
