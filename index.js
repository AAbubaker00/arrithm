const PORT = process.env.PORT || 8000;

//! Packages
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

//* Custom packags
const math_solver = require("./methods_collection/math_solver.js");

const app = express();

app.get("/", (req, res) => {
  res.sendfile("./templates/home.html");
});

app.get("/api/v1/solve-expression/:latextFormat", async (request, response) => {
  // Retrieve the expression from the query string
  // console.log(request.params.latextFormat)

  math_solver.solver(request.params.latextFormat, axios, cheerio, response);

});

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
