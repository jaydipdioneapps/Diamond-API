const mongoose = require("mongoose");

const pur_sale_transSchema = mongoose.Schema({
    p_s_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Pur_sale' },
    inv_type: { type: String, default: "" },
    type: { type: String, default: "" },
    date: { type: Date, default: "" },
    party: { type: String, default: "" },
    refno: { type: String, default: "" },
    lotno: { type: mongoose.Schema.Types.ObjectId, ref: 'Item_master' },
    pcs: { type: String, default: "" },
    carat: { type: String, default: "" },
    rate: { type: String, default: "" },
    amount: { type: String, default: "" },
    l1: { type: String, default: "" },
    l2: { type: String, default: "" },
    net_amount: { type: String, default: "" },
    kapan: { type: String, default: "" },
    remark: { type: String, default: "" },
    asking_rate: { type: String, default: "" },
    cost: { type: String, default: "" },
    stock_value: { type: String, default: "" },
    status: { type: String, default: "" },
    c_u_id: { type: String, default: "" },
    current_date: { type: Date, default: "" },
    current_time: { type: Date, default: "" },
    u_u_id: { type: String, default: "" },
    u_date: { type: Date, default: "" },
    u_time: { type: Date, default: "" },
    branch_id: { type: String, default: "" },
    master_country_id: { type: String, default: "" },
});

module.exports = mongoose.model("Pur_sale_trans", pur_sale_transSchema);