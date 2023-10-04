const _FixedEndPoint = "https://mathsolver.microsoft.com/en/solve-problem/";

function formatEquation(equ) {
  equ = equ.replace(/\(/g, "{").replace(/\)/g, "}");
  equ = equ.replace(/\\\\/g, "`");
  equ = equ.replace(/\\/g, "`");
  equ = equ.replace(/sqrt/g, "\\sqrt");
  // equ = equ.replace(/ /g, "");

  return equ;
}

function solver(exp, axios, cheerio, res) {
  const expression = (exp);

  // console.log(_FixedEndPoint+expression)

  axios
    .get(_FixedEndPoint + expression)
    .then((response) => {
      const $ = cheerio.load(response.data);
      const scriptContent = $("script#__NEXT_DATA__", response.data).html();

      // Check if scriptContent is not empty
      if (scriptContent) {
        // Parse the JSON content of the script tag
        var jsonData = JSON.parse(scriptContent);

        var removeKeys = [
          "allGraphData",
          "isError",
          "errorCode",
          "errorMessage",
          "bingWebAnswerUrl",
          "hasBingWebAnswer",
          "bingWebAnswerHeading",
          "shouldContainGraphs",
        ];

        jsonData = jsonData["props"]["pageProps"]["response"]["mathSolverResult"];

        for (let key in removeKeys) {
          delete jsonData[removeKeys[key]];
        }

        res.json(jsonData);
      } else {
        console.log("Script tag with ID '__NEXT_DATA__' not found or empty.");
      }
    })
    .catch((error) => console.log(error));
}

module.exports.solver = solver