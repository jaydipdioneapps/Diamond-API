var User = require("../Models/pur_entry");
const mongoose = require("mongoose");
const Type = require("../Models/Type");
const CC = require("currency-converter-lt");
const party_master = require("../Models/party_master");
const Pur_entry = require("../Models/pur_entry");

function removeDubeliment(arr) {
  let duplicateIds = Object.values(
    arr.reduce((acc, cur) => Object.assign(acc, { [cur.type]: cur }), {})
  );
  return duplicateIds;
}

exports.TypeEntry = async function (req, res, next) {
  try {
    // let data = {
    //   priority: req.body.priority,
    //   type: req.body.type,
    //   name: req.body.name,
    //   color: req.body.color,
    //   intensity: req.body.intensity,
    //   overtone: req.body.overtone,
    //   p_from: req.body.p_from,
    //   p_to: req.body.p_to,
    //   st_name: req.body.st_name,
    //   date: req.body.date,
    //   time: req.body.time,
    //   Branch_id: req.body.Branch_id,
    //   master_country_id: req.body.master_country_id,
    // };
    await Type.insertMany(req.body);
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

exports.updateType = async function (req, res, next) {
  try {
    let data = await Type.findOneAndUpdate(
      { type: req.params.type, priority: req.body.priority },
      req.body
    );
    // let newdata = await Type.find({ bill_no: req.params.no }, req.body);
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

exports.gettypes = async function (req, res, next) {
  try {
    let addData = await Type.find();
    addData = removeDubeliment(addData);
    let Primery_arry = {};
    for (let index = 0; index < addData.length; index++) {
      let type = addData[index].type;
      let Secendory_arry = await Type.find({ type: type });
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
};

exports.getEntryType = async function (req, res, next) {
  try {
    // let fromCurrency = "USD";
    // let toCurrency = "PKR";
    // let amountToConvert = 1;
    //   let currencyConverter = new CC({
    //     form: fromCurrency,
    //     to: toCurrency,
    //     amount: 3,
    //   });
    let invoice = await pur_entry
      .find({}, { inv_no: 1 })
      .sort({ inv_no: -1 })
      .limit(1);
    // console.log(invoice);
    let currencyConverter = new CC({ from: "USD", to: "INR", amount: 1 });
    let addData = await Type.find(
      { type: "ENTRY_TYPE" },
      {
        priority: 1,
        type: 1,
        name: 1,
      }
    );
    let party = await party_master.find(
      {},
      {
        name: 1,
        broker: 1,
        due_days: 1,
        overdue: 1,
      }
    );
    currencyConverter.convert().then((response) => {
      res.status(200).json({
        status: "200",
        addData,
        india: response,
        party,
        invoice,
      });
    });
  } catch (err) {
    res.status(200).json({
      status: "500",
      message: err.message,
    });
  }
};

exports.getaccountType = async function (req, res, next) {
  try {
    // let fromCurrency = "USD";
    // let toCurrency = "PKR";
    // let amountToConvert = 1;
    //   let currencyConverter = new CC({
    //     form: fromCurrency,
    //     to: toCurrency,
    //     amount: 3,
    //   });
    let account = await party_master.find(
      { $or: [{ account_type: "bank" }, { account_type: "cash" }] },
      {
        name: 1,
      }
    );

    res.status(200).json({
      status: "200",
      account,
    });
  } catch (err) {
    res.status(200).json({
      status: "500",
      message: err.message,
    });
  }
};
exports.getFilterType = async function (req, res, next) {
  try {
    let Data = await Type.find(
      {},
      {
        name: 1,
        type: 1,
        color: 1,
        intensity: 1,
        overtone: 1,
      }
    );
    res.status(200).json({
      status: "200",
      Data,
    });
  } catch (err) {
    res.status(200).json({
      status: "500",
      message: err.message,
    });
  }
};
