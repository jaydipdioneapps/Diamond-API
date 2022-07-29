const mongoose = require("mongoose");

const caratcounterSchema = mongoose.Schema({
    refno: { type: Number, require: true, unique: true },
    purchase: { type: Number, default: "0" },
    memo_in: { type: Number, default: "0" },
    memo_out: { type: Number, default: "0" },
    sale: { type: Number, default: "0" },
    pcs: { type: Number, default: "0" },
});

module.exports = mongoose.model("Carat_counter", caratcounterSchema);