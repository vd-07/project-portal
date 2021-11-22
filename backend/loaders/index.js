const expressLoader = require("./express");
const mongooseLoader = require("./mongoose");

module.exports = async function (app, express) {
  await mongooseLoader();
  console.log("MongoDB Initialized");
  await expressLoader(app, express);
  console.log("Express Initialized");

  // ... more loaders can be here
  // ... Initialize agenda
  // ... or Redis, or whatever you want
};
