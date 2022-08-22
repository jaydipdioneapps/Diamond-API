const mongoose = require("mongoose");

const expenseSchema = mongoose.Schema({
    date: { type: Date, default: "" },
    voucher: { type: String, default: "" },
    category: { type: String, ref: "category", required: true },
    account: { type: String, default: "" },
    sub_category: { type: String, ref: "category", required: true },
    currency: { type: String, default: "" },
    amount: { type: Number, default: "" },
    to_name: { type: String, ref: "category", required: true },
    remark: { type: String, default: "" },
    current_date: { type: Date, default: "" },
    current_time: { type: Date, default: "" },
    user_id: { type: String, default: "" },
    branch_id: { type: String, default: "" },
    master_country_id: { type: String, default: "" },
});

module.exports = mongoose.model("Expense", expenseSchema);