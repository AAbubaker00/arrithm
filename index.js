const PORT = process.env.PORT || 8000;

//! Packages
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();

var _FixedEndPoint = "https://mathsolver.microsoft.com/en/solve-problem/";

app.get("/", (req, res) => {
  res.json("Welcome to me api");
});

function formatEquation(equ) {
  equ = equ.replace(/\(/g, "{").replace(/\)/g, "}");
  equ = equ.replace(/\\\\/g, "`");
  equ = equ.replace(/sqrt/g, "\\sqrt");
  equ = equ.replace(/ /g, "");

  return equ;
}

app.get("/api/v1/:latextformat", (request, res) => {
  const expression = formatEquation(request.params.latextformat);

  console.log(_FixedEndPoint + expression);

  axios
    .get(_FixedEndPoint + expression)
    .then((response) => {
      const $ = cheerio.load(response.data);
      const scriptContent = $("script#__NEXT_DATA__", response.data).html();

      // Check if scriptContent is not empty
      if (scriptContent) {
        // Parse the JSON content of the script tag
        const jsonData = JSON.parse(scriptContent);

        //   console.log(jsonData["props"]["pageProps"]["response"]["mathSolverResult"]["actions"]);

        res.json(jsonData["props"]["pageProps"]["response"]["mathSolverResult"]["actions"]);
      } else {
        console.log("Script tag with ID '__NEXT_DATA__' not found or empty.");
      }
    })
    .catch((error) => console.log(error));
});


