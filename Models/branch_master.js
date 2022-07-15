const mongoose = require("mongoose");

const branchMasterSchema = mongoose.Schema({
    country: { type: String, default: "" },
    branch_name: { type: String, default: "" },
    party: { type: String, default: "" },
    currency: { type: String, default: "" },
    rate: { type: String, default: "" },
    status: { type: String, default: "" },
    master_country_id: { type: String, default: "" },
});

module.exports = mongoose.model("BranchMaster", branchMasterSchema);