const mongoose = require("mongoose");

const stock_transSchema = mongoose.Schema({
    date: { type: Date, default: "" },
    f_refno: { type: String, default: "" },
    f_lotno: { type: String, default: "" },
    total_carat: { type: String, default: "" },
    rate: { type: Number, default: "" },
    pcs: { type: Number, default: "" },
    carat: { type: Number, default: "" },
    t_refno: { type: String, default: "" },
    t_lotno: { type: String, default: "" },
    remark: { type: String, default: "" },
    current_date: { type: Date, default: "" },
    current_time: { type: Date, default: "" },
    user_id: { type: String, default: "" },
    branch_id: { type: String, default: "" },
    master_country_id: { type: String, default: "" },
});

module.exports = mongoose.model("Stock_trans", stock_transSchema);