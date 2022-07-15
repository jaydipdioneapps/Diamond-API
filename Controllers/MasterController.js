var User = require("../Models/pur_sale");
const mongoose = require("mongoose");
const Master = require("../Models/master");

exports.MasterEntry = async function (req, res, next) {
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
            c_id: req.body.c_id,
            m_c_id: req.body.m_c_id
        };
        let addData = await Master.create(data);
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

exports.updatedocument = async function (req, res, next) {
    try {
        // console.log(req.body.userId);
        let newdata = await User.findByIdAndUpdate(req.body.userId,
            {
                adharcard: req.files.adharcard[0].filename,
                pancard: req.files.pancard[0].filename,
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

exports.updatebank = async function (req, res, next) {
    try {
        let newdata = await User.findByIdAndUpdate(req.body.userId,
            {
                acnumber: req.body.acnumber,
                ifsccode: req.body.ifsccode,
                nameinbank: req.body.nameinbank,
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