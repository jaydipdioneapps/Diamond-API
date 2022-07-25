const mongoose = require("mongoose");

const partyMasterSchema = mongoose.Schema({
    type: { type: String, default: "" },
    name: { type: String, default: "" },
    local_name: { type: String, default: "" },
    short_name: { type: String, default: "" },
    currency: { type: String, default: "" },
    rate: { type: String, default: "" },
    area: { type: String, default: "" },
    contact_person: { type: String, default: "" },
    agent: { type: String, default: "" },
    executive: { type: String, default: "" },
    undergroup: { type: String, default: "" },
    account_type: { type: String, default: "" },
    broker: [{ type: String, default: "" }],
    address: { type: String, default: "" },
    phone1: { type: String, default: "" },
    phone2: { type: String, default: "" },
    mobile: { type: String, default: "" },
    fax: { type: String, default: "" },
    skype: { type: String, default: "" },
    email: { type: String, default: "" },
    website: { type: String, default: "" },
    city: { type: String, default: "" },
    state: { type: String, default: "" },
    country: { type: String, default: "" },
    zipcode: { type: String, default: "" },
    ref_party_1: { type: String, default: "" },
    ref_phone_1: { type: String, default: "" },
    ref_comment_1: { type: String, default: "" },
    ref_party_2: { type: String, default: "" },
    ref_phone_2: { type: String, default: "" },
    ref_comment_2: { type: String, default: "" },
    bank_account: { type: String, default: "" },
    bank_routing: { type: String, default: "" },
    swift_code: { type: String, default: "" },
    due_days: { type: Number, default: "" },
    overdue: { type: Number, default: "" },
    limit: { type: String, default: "" },
    opening_bal: { type: String, default: "" },
    debit_credit: { type: String, default: "" },
    remark: { type: String, default: "" },
    current_date: { type: Date, default: Date.now },
    current_time: { type: Date, default: "" },
    update_date: { type: Date, default: "" },
    update_time: { type: Date, default: "" },
    user_id: { type: String, default: "" },
    branch_id: { type: String, default: "" },
    master_country_id: { type: String, default: "" },
    party_code: { type: String, default: "" },
});

module.exports = mongoose.model("PartyMaster", partyMasterSchema);