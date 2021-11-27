const mongoose = require("mongoose");
const { databaseURL } = require("../config");

// establishing connection with the database
module.exports = async () => {
  mongoose.connect(
    databaseURL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log("Connected to DB");
    }
  );
};
