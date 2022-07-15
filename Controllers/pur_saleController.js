var User = require("../Models/pur_sale");
const mongoose = require("mongoose");
const pur_sale = require("../Models/pur_sale");
const pur_sale_trans = require("../Models/pur_sale_trans");

exports.pur_saleEntry = async function (req, res, next) {
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
        let addData = await pur_sale.create(req.body);
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

exports.get_pur_saleEntry = async function (req, res, next) {
    try {
        // let data = req.body;
        let Data = await pur_sale.find();
        res.status(200).json({
            status: "200",
            data: Data[0],
        });
    } catch (err) {
        res.status(200).json({
            status: "500",
            message: err.message,
        });
    }
};

exports.pur_saleEntryTBL = async function (req, res, next) {
    try {
        let data = req.body;
        let addData = await pur_sale_trans.create(data);
        res.status(200).json({
            status: "200",
            addData: data,
        });
    } catch (err) {
        res.status(200).json({
            status: "500",
            message: err.message,
        });
    }
};

exports.getpurchaseTBL = async function (req, res, next) {
    try {
        let data = await User.findById(req.body.userId);
        // let addData = await User.create(data);
        res.status(200).json({
            status: "200",
            data,
        });
    } catch (err) {
        res.status(200).json({
            status: "500",
            message: err.message,
        });
    }
};

// exports.updatepurchase = async function (req, res, next) {
//     try {
//         let newdata = await User.findByIdAndUpdate(req.body.userId,
//             {
//                 purchase: req.body.purchase,
//                 bill_no: req.body.bill_no,
//                 party: req.body.party,
//                 broker: req.body.broker,
//                 over_due: req.body.over_due,
//                 type: req.body.type,
//                 p_r_type: req.body.p_r_type,
//                 adat: req.body.adat,
//                 adat_amt: req.body.adat_amt,
//                 over_due_date: req.body.over_due_date
//             })
//         res.status(200).json({
//             status: "200",
//             data: newdata,
//         });
//     } catch (err) {
//         res.status(200).json({
//             status: "500",
//             message: err.message,
//         });
//     }
// };