const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));
app.set("views", "./views");
app.get("/", (req, res) => {
  res.render("index.ejs", {
    title: "Our Basking Ridge Community",
  });
});

app.listen(8080, (req, res) => {
  console.log(req, res);
});
