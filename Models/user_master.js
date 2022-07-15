const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  user_name: { type: String, default: "" },
  email: { type: String, required: true, unique: true },
  user_password: { type: String, required: true },
  user_type: { type: String, default: "" },
  user_sec_question: { type: String, default: "" },
  user_sec_answer: { type: String, default: "" },
  user_status: { type: String, default: "" },
  add: { type: String, default: "" },
  delete: { type: String, default: "" },
  edit: { type: String, default: "" },
  a_status: { type: String, default: "" },
  branch_id: { type: String, default: "" },
  master_country_id: { type: String, default: "" },
});

module.exports = mongoose.model("User", userSchema);