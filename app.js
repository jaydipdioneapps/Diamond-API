const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const cors = require("cors");
const app = express();

mongoose.connect('mongodb+srv://dione_apps:Dione&169@cluster0.5yxff.mongodb.net/diamond?retryWrites=true&w=majority',
  { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("DB connected established"))
  .catch(err => console.log("DB connection error: ", err));

app.use(morgan("dev"));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
  origin: '*'
}))
app.use("/purchase", require("./routes/pur_Entry"));
app.use("/sale", require("./routes/sale_Entry"));
app.use("/memo", require("./routes/memo_Entry"));
app.use("/types", require("./routes/Item"));
app.use("/party", require("./routes/Party"));
app.use("/", require("./routes/index"));

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;