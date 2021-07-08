const express = require("express");
const app = express();
const axios = require("axios");
const moment = require("moment");
app.use(express.json());

app.get("/api/external-books", (req, res, next) => {
  const name = req.query.name;
  const url = `https://anapioficeandfire.com`;
  // console.log(name);
  if (name == null || name == "") {
    res.status(400).json({ message: "Please enter a valid book name" });
  } else {
    axios
      .get(`${url}/api/books?name=${name}`)
      .then((books) => {
        let js = books.data;
        let props = Object.keys(js);

        let result = props.map(function (prop) {
          return {
            name: js[prop].name,
            isbn: js[prop].isbn,
            authors: js[prop].authors,
            number_of_Pages: js[prop].numberOfPages,
            publisher: js[prop].publisher,
            country: js[prop].country,
            release_date: moment(js[prop].release).format("MMM D,YYYY"),
          };
        });

        res.status(200).json({
          status: true,
          message: "External Books searched",
          data: result,
        });
        if (!data) {
          res.status(404).json({
            status: true,
            message: "Book searched",
            data: [],
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          status: false,
          message: "Invalid Request",
        });
        console.log(err);
      });
  }
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`App is on port ${port}`);
});
