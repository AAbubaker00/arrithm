const PORT = process.env.PORT || 8000;

//! Packages
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

//* Custom packags
const math_solver = require("./methods_collection/math_solver.js");
const symbolab = require("./methods_collection/symbolab.js")

const app = express();

app.get("/", (req, res) => {
  res.sendfile("./templates/home.html");
});

app.get("/api/:latextformat", async (request, res) => {

  // symbolab.solver(request.params.latextformat, cheerio, res)

  math_solver.solver(request.params.latextformat, axios, cheerio, res);
});

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));