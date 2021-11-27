const expressLoader = require("./express");
const mongooseLoader = require("./mongoose");

// handles loading of the server and the database
module.exports = async function (app, express) {
  await mongooseLoader();
  console.log("MongoDB Initialized");
  await expressLoader(app, express);
  console.log("Express Initialized");
};
