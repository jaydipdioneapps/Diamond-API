const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema({
    date: { type: Date, default: "" },
    account: { type: String, ref: "Item_master", required: true },
    voucher: { type: String, default: "" },
    party: { type: String, default: "" },
    payment_type: { type: Boolean, default: "" },
    credit_debit: { type: String, default: "" },
    currency: { type: String, default: "" },
    usd: { type: String, default: "" },
    rate: { type: Number, default: "" },
    amount: { type: Number, default: "" },
    description: { type: String, default: "" },
    status: { type: String, default: "" },
    current_date: { type: Date, default: "" },
    current_time: { type: Date, default: "" },
    user_id: { type: String, default: "" },
    branch_id: { type: String, default: "" },
    master_country_id: { type: String, default: "" },
    party_entries: [{
        date: { type: Date, default: "" },
        party: { type: String, default: "" },
        debit: { type: String, default: "" },
        credit: { type: String, default: "" },
        rate: { type: Number, default: "" },
        amount: { type: Number, default: "" },
        description: { type: String, default: "" },
        voucher: { type: String, default: "" },
    }],
    voucher_entries: [{
        date: { type: Date, default: "" },
        voucher: { type: String, default: "" },
        bill_no: { type: Number, default: "" },
        inv_no: { type: Number, default: "" },
        inv_amt: { type: Number, default: "" },
        pay_amt: { type: Number, default: "" },
    }]
});

module.exports = mongoose.model("Payment", paymentSchema);