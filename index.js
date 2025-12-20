const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));
app.set("views", "./views");
app.get("/", (req, res) => {
  res.render("index.ejs", {
    title: "EJS Node.js Boilerplate",
    message: "Welcome to your EJS Express app!",
  });
});
clear;

app.listen(8080, (req, res) => {
  console.log(req, res);
});
