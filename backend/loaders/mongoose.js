const mongoose = require("mongoose");
const { databaseURL } = require("../config");

module.exports = async () => {
  await mongoose.connect(
    databaseURL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log("Connected to DB");
    }
  );
};
