const mongoose = require("mongoose");

const MasterSchema = mongoose.Schema({
    priority: { type: String, default: "" },
    type: { type: String, default: "" },
    name: { type: String, default: "" },
    color: { type: String, default: "" },
    intensity: { type: String, default: "" },
    overtone: { type: String, default: "" },
    p_from: { type: String, default: "" },
    p_to: { type: String, default: "" },
    st_name: { type: String, default: "" },
    date: { type: Date, default: "" },
    time: { type: Date, default: "" },
    c_id: { type: String, default: "" },
    m_c_id: { type: String, default: "" },
});

module.exports = mongoose.model("Master", MasterSchema);