var User = require("../Models/pur_sale");
const mongoose = require("mongoose");
const Type = require("../Models/Type");

function removeDubeliment(arr) {
    let duplicateIds = Object.values(
        arr.reduce(
            (acc, cur) => Object.assign(acc, { [cur.type]: cur }),
            {}
        )
    );
    return duplicateIds;
}

exports.TypeEntry = async function (req, res, next) {
    try {
        let data = {
            priority: req.body.priority,
            type: req.body.type,
            name: req.body.name,
            color: req.body.color,
            intensity: req.body.intensity,
            overtone: req.body.overtone,
            p_from: req.body.p_from,
            p_to: req.body.p_to,
            st_name: req.body.st_name,
            date: req.body.date,
            time: req.body.time,
            Branch_id: req.body.Branch_id,
            master_country_id: req.body.master_country_id
        };
        let addData = await Type.create(data);
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

exports.updatepurchase = async function (req, res, next) {
    try {
        let newdata = await User.findByIdAndUpdate(req.body.userId,
            {
                purchase: req.body.purchase,
                bill_no: req.body.bill_no,
                party: req.body.party,
                broker: req.body.broker,
                over_due: req.body.over_due,
                type: req.body.type,
                p_r_type: req.body.p_r_type,
                adat: req.body.adat,
                adat_amt: req.body.adat_amt,
                over_due_date: req.body.over_due_date
            })
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

exports.gettypes = async function (req, res, next) {
    try {
        let addData = await Type.find();
        addData = removeDubeliment(addData);
        let Primery_arry = {};
        for (let index = 0; index < addData.length; index++) {
            let type = addData[index].type;
            let Secendory_arry = await Type.find({ "type": type });
            // console.log(type);
            Primery_arry[type] = Secendory_arry;
        }
        Primery_arry = [Primery_arry];
        res.status(200).json({
            status: "200",
            Primery_arry,
        });
    } catch (err) {
        res.status(200).json({
            status: "500",
            message: err.message,
        });
    }
}