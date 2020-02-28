const express = require("express");
const bodyParser = require("body-parser");
const planetRoutes = require("./routes/planets");
const mongoose = require("mongoose");

const app = express();
mongoose
  // Password:4w9VC6mOaNYbFkSX
  .connect(
    "mongodb+srv://admin-flaviu:4w9VC6mOaNYbFkSX@cluster0-o34db.mongodb.net/PlanetsDB?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to the database");
  })
  .catch(() => {
    console.log("Connection to the database failed!");
  });

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );

  next();
});

app.use(planetRoutes);

module.exports = app;