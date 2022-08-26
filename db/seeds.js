const seedData = require("./seeds.json");
const App = require("../models/App");

App.deleteMany({})
  .then(() => {
    App.insertMany(seedData).then((appData) => {
      console.log("appData loaded");
      console.log(appData);
      process.exit();
    });
  })
  .catch((err) => console.error(err));
