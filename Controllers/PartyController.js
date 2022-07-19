const mongoose = require("mongoose");
const PartyMaster = require("../Models/party_master");

function removeDubeliment(arr) {
    let duplicateIds = Object.values(
        arr.reduce(
            (acc, cur) => Object.assign(acc, { [cur.type]: cur }),
            {}
        )
    );
    return duplicateIds;
}

exports.partyEntry = async function (req, res, next) {
    try {
        let addData = await PartyMaster.create(req.body);
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