const loaders = require("./loaders");
const express = require("express");
const config = require("./config");

async function startServer() {
  const app = express();

  await loaders(app, express);

  app.listen(config.port || 8080, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Server running at http://localhost:${process.env.PORT}`);
  });
};

startServer();
