const express = require("express");
const app = express();
const port = 3000;

app.get("/bd-cities", (req, res) => {
  const cityName = req.query.areasin;
  let dataPath = `./data_src/bd_cities.json`;
  if (cityName) {
    dataPath = `./data_src/citydata/${cityName}.json`;
  }
  const data = require(dataPath);
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
