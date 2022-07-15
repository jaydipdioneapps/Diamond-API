const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema({
    date: { type: Date, default: "" },
    account: { type: String, default: "" },
    voucher: { type: String, default: "" },
    party: { type: String, default: "" },
    payment_type: { type: String, default: "" },
    credit_debit: { type: String, default: "" },
    currency: { type: String, default: "" },
    usd: { type: String, default: "" },
    rate: { type: String, default: "" },
    amount: { type: String, default: "" },
    description: { type: String, default: "" },
    status: { type: String, default: "" },
    current_date: { type: Date, default: "" },
    current_time: { type: Date, default: "" },
    user_id: { type: String, default: "" },
    branch_id: { type: String, default: "" },
    master_country_id: { type: String, default: "" },
});

module.exports = mongoose.model("Payment", paymentSchema);