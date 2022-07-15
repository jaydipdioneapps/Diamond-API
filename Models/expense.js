const mongoose = require("mongoose");

const expenseSchema = mongoose.Schema({
    date: { type: Date, default: "" },
    voucher: { type: String, default: "" },
    category: { type: String, default: "" },
    account: { type: String, default: "" },
    exp_to: { type: String, default: "" },
    currency: { type: String, default: "" },
    amount: { type: String, default: "" },
    exp_by: { type: String, default: "" },
    remark: { type: String, default: "" },
    current_date: { type: Date, default: "" },
    current_time: { type: Date, default: "" },
    user_id: { type: String, default: "" },
    Branch_id: { type: String, default: "" },
    master_country_id: { type: String, default: "" },
});

module.exports = mongoose.model("Expense", expenseSchema);