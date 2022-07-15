const mongoose = require("mongoose");

const stock_transSchema = mongoose.Schema({
    date: { type: Date, default: "" },
    f_refno: { type: String, default: "" },
    f_lotno: { type: String, default: "" },
    total_carat: { type: String, default: "" },
    rate: { type: String, default: "" },
    pcs: { type: String, default: "" },
    carat: { type: String, default: "" },
    t_refno: { type: String, default: "" },
    t_lotno: { type: String, default: "" },
    remark: { type: String, default: "" },
    current_date: { type: Date, default: "" },
    current_time: { type: Date, default: "" },
    user_id: { type: String, default: "" },
    Branch_id: { type: String, default: "" },
    master_country_id: { type: String, default: "" },
});

module.exports = mongoose.model("Stock_trans", stock_transSchema);