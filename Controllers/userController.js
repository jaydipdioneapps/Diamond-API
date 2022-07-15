var db = require("../Models/DB");

exports.user =  function (req, res, next) {
  try {
    db.query(
      "SELECT * FROM `user` where id like '" + req.headers.authorization + "'",
      async function (err, result, fields) {
        if (err) console.log(err);
      }
    );
    next();
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
