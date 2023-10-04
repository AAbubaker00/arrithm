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
  console.log(request.params.latextFormat)

  math_solver.solver(request.params.latextFormat, axios, cheerio, response);

});

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));

//\\left[\\begin{array}{lll}1&2&1\\\\1&4&1\\\\2&2&1\\end{array}\\right]\\left[\\begin{array}{lll}5&2&1\\\\1&1&3\\\\0&2&1\\end{array}\\right]
//`left[`begin{array}{ll}{2}&{3}``{5}&{4}`end{array}`right]`left[`begin{array}{lll}{2}&{0}&{3}``{-1}&{1}&{5}`end{array}`right]