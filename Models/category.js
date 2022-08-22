const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
    priority: { type: Number, default: "" },
    main_category: { type: String, default: "" },
    sub_category: { type: String, default: "" },
    to_name: { type: String, default: "" }
});

module.exports = mongoose.model("category", categorySchema);