require("./db/connection");
const express = require("express");
const app = express();
const cors = require("cors");
PORT = 8000;
app.set("port", process.env.PORT || PORT);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// FWD request to /app
app.get("/", (req, res) => {
  res.redirect("/app");
});

// Controllers
// FWD request to /app
const productController = require("./controllers/appController");
app.use("/app", productController);

const userController = require("./controllers/userController");
app.use("/users", userController);

app.listen(app.get("port"), () => {
  console.log(`🏃 on port: {app.get("port")}, better catch it!`);
});
