const mongoose = require("mongoose");
const Pur_entry = require("../Models/pur_entry");
const moment = require("moment");

exports.purchaseEntry = async function (req, res, next) {
    try {
        // let data = {
        //     date: req.body.date,
        //     purchaser: req.body.inv_type,
        //     currency: req.body.currency,
        //     curr_rate: req.body.curr_rate,
        //     bill_no: req.body.bill_no,
        //     Invoice_no: req.body.Invoice_no,
        //     party: req.body.party,
        //     broker: req.body.broker,
        //     due_days: req.body.due_days,
        //     due_date: req.body.due_date,
        //     over_due: req.body.over_due,
        //     over_due_date: req.body.over_due_date,
        //     type: req.body.type,
        //     p_r_type: req.body.p_r_type,
        //     adat: req.body.adat,
        //     adat_amt: req.body.adat_amt,
        // };
        // let data = req.body;
        let addData = await Pur_entry.create(req.body);
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

// exports.get_pur_saleEntry = async function (req, res, next) {
//     try {
//         // let data = req.body;
//         let Data = await pur_sale.find();
//         // var g = new Date();
//         // for (let i = 0; i < Data.length; i++) {
//         //     let eliment = moment(Data[i].due_date).format("l");
//         //     console.log(eliment);
//         // }
//         res.status(200).json({
//             status: "200",
//             data: Data,
//         });
//     } catch (err) {
//         res.status(200).json({
//             status: "500",
//             message: err.message,
//         });
//     }
// };

exports.get_entry = async function (req, res, next) {
    try {
        let newdata
        if (req.params.type == 'bill') {
            newdata = await Pur_entry.find({ bill_no: req.params.no });
        } else if (req.params.type == 'inv') {
            newdata = await Pur_entry.find({ inv_no: req.params.no });
        }
        res.status(200).json({
            status: "200",
            addData: newdata,
        });
    } catch (err) {
        res.status(200).json({
            status: "500",
            message: err.message,
        });
    }
};

exports.update_entry = async function (req, res, next) {
    try {
        let newdata
        if (req.params.type == 'bill') {
            newdata = await Pur_entry.findOneAndUpdate({ bill_no: req.params.no }, req.body);
        } else if (req.params.type == 'inv') {
            newdata = await Pur_entry.findOneAndUpdate({ inv_no: req.params.no }, req.body);
        }
        res.status(200).json({
            status: "200",
            data: newdata,
        });
    } catch (err) {
        res.status(200).json({
            status: "500",
            message: err.message,
        });
    }
};

exports.delete_entry = async function (req, res, next) {
    try {
        let newdata
        if (req.params.type == 'bill') {
            newdata = await Pur_entry.findOneAndDelete({ bill_no: req.params.no }, req.body);
        } else if (req.params.type == 'inv') {
            newdata = await Pur_entry.findOneAndDelete({ inv_no: req.params.no }, req.body);
        }
        res.status(200).json({
            status: "200",
            message: "delete successfully",
            deleted_data: newdata,
        });
    } catch (err) {
        res.status(200).json({
            status: "500",
            message: err.message,
        });
    }
};