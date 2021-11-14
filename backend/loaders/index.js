const expressLoader = require("./express");
// import mongooseLoader from './mongoose';

module.exports = async function (app) {
  //   const mongoConnection = await mongooseLoader();
  //   console.log('MongoDB Initialized');
  await expressLoader(app);
  console.log("Express Initialized");

  // ... more loaders can be here
  // ... Initialize agenda
  // ... or Redis, or whatever you want
};
