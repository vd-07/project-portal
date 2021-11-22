const mongoose = require("mongoose");
const { databaseURL } = require("../config");

module.exports = async () => {
  mongoose.connect(
    databaseURL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log("Connected to DB");
    }
  );
};
