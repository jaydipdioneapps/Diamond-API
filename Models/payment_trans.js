const mongoose = require("mongoose");

const payment_transSchema = mongoose.Schema({
    date: { type: Date, default: "" },
    inv_type: { type: String, default: "" },
    voucher: { type: String, default: "" },
    account: { type: String, default: "" },
    inv_no: { type: String, default: "" },
    bill_no: { type: String, default: "" },
    credit_debit: { type: String, default: "" },
    party: { type: String, default: "" },
    currency: { type: String, default: "" },
    usd: { type: String, default: "" },
    rate: { type: String, default: "" },
    amount: { type: String, default: "" },
    status: { type: String, default: "" },
    current_date: { type: Date, default: "" },
    current_time: { type: Date, default: "" },
    user_id: { type: String, default: "" },
    Branch_id: { type: String, default: "" },
    master_country_id: { type: String, default: "" },
});

module.exports = mongoose.model("Payment_trans", payment_transSchema);