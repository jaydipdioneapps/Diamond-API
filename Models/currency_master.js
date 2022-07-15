const mongoose = require("mongoose");

const currencyMasterSchema = mongoose.Schema({
    currency: { type: String, default: "" },
    rate: { type: String, default: "" },
    branch_id: { type: Schema.Types.Decimal, default: "" },
    master_country_id: { type: String, default: "" },
});

module.exports = mongoose.model("CurrencyMaster", currencyMasterSchema);