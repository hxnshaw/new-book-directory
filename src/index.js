const express = require("express");
const app = express();
const fetch = require("node-fetch");

app.use(express.json());

const port = process.env.PORT || 8080;

app.get("/:apiRoute", async (req, res) => {
  try {
    const { apiRoute } = req.params;
    const apiResponse = await fetch(
      "https://anapioficeandfire.com/api/" + apiRoute
    );

    const apiResponseJson = await apiResponse.json();

    //console.log(apiResponseJson);
    res.send(apiResponseJson);
  } catch (e) {
    console.log(e);
  }
});

app.listen(port, () => {
  console.log(`App is on port ${port}`);
});
