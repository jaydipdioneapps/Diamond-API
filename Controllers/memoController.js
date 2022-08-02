const mongoose = require("mongoose");
const memo_Entry = require("../Models/memo_entry");
const moment = require("moment");
const caratcounter = require("../Models/caratcounter");

exports.memoEntry = async function (req, res, next) {
    try {
        // let data
        // = {
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
        let addData = await memo_Entry.create(req.body);

        let trans_entries = req.body[0].trans_entries;
        let inMemo = trans_entries.filter((x) => x.status == "IN");
        let outMemo = trans_entries.filter((x) => x.status == "OUT");
        // console.log(outMemo);
        let old = [];
        let sortEdData = [];
        inMemo.map((e) => {
            let arry = old.filter((x) => x == e.refno);
            if (arry.length) {
                let num = sortEdData.findIndex((x) => x.refno == e.refno);
                sortEdData[num].carat = sortEdData[num].carat + e.carat;
                sortEdData[num].pcs = sortEdData[num].pcs + e.pcs;
            } else {
                old.push(e.refno);
                sortEdData.push(e);
            }
        })

        sortEdData.map(async (e) => {
            let updatedData = await caratcounter.findOne({ refno: e.refno });
            // console.log(updatedData);
            updatedData.memo_in = updatedData.memo_in + e.carat;
            updatedData.pcs = updatedData.pcs + e.pcs;

            await caratcounter.findByIdAndUpdate(updatedData._id, updatedData)

        })
        sortEdData = [];
        old = [];
        outMemo.map((e) => {
            let arry = old.filter((x) => x == e.refno);
            if (arry.length) {
                let num = sortEdData.findIndex((x) => x.refno == e.refno);
                sortEdData[num].carat = sortEdData[num].carat + e.carat;
            } else {
                old.push(e.refno);
                sortEdData.push(e);
            }
        })

        sortEdData.map(async (e) => {
            let updatedData = await caratcounter.findOne({ refno: e.refno });
            console.log(updatedData);
            updatedData.memo_out = updatedData.memo_out + e.carat;
            updatedData.pcs = updatedData.pcs - e.pcs;

            await caratcounter.findByIdAndUpdate(updatedData._id, updatedData)

        })
        res.status(200).json({
            status: "200",
            // sortEdData
            // addData,
            // data
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
            newdata = await memo_Entry.find({ bill_no: req.params.no });
        } else if (req.params.type == 'inv') {
            newdata = await memo_Entry.find({ inv_no: req.params.no });
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
            newdata = await memo_Entry.findOneAndUpdate({ bill_no: req.params.no }, req.body);
        } else if (req.params.type == 'inv') {
            newdata = await memo_Entry.findOneAndUpdate({ inv_no: req.params.no }, req.body);
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

exports.delete_entry = async function (req, res, next) {
    try {
        let newdata
        if (req.params.type == 'bill') {
            newdata = await memo_Entry.findOneAndDelete({ bill_no: req.params.no }, req.body);
        } else if (req.params.type == 'inv') {
            newdata = await memo_Entry.findOneAndDelete({ inv_no: req.params.no }, req.body);
        }
        res.status(200).json({
            status: "200",
            message: "delete successfully",
        });
    } catch (err) {
        res.status(200).json({
            status: "500",
            message: err.message,
        });
    }
};