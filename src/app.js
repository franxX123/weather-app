const path = require("path");
const express = require("express");
const hbs = require("hbs");
const { forecast } = require("./utils/forecast");
const { geoCode } = require("./utils/geocode");

const app = express();
// NOTe: process.env.PORT is set by heroku during deployment
const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath); // This tells node look for the hbs files in the templates folder provided.
hbs.registerPartials(partialsPath); // This tells hbs where to look for partial hbs files

app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  // NOTE: first argument takes the name of hbs file,
  // and passes the object in the second parameter
  // as data to initialize the hbs file.
  res.render("index", {
    title: "Weather App",
    author: "Francis ",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    author: "Francis",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    author: "Francis",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam placerat libero vitae sem efficitur aliquet ac in urna. ",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    res.send({
      status: 400,
      error: "Address must be provided.",
    });

    return;
  }

  const { address } = req.query;

  geoCode(
    address,
    (errGeocode, { latitude: lat, longitude: long, location } = {}) => {
      if (errGeocode) {
        res.send({ error: errGeocode });
        return;
      }

      forecast(lat, long, (errForecast, forecastData) => {
        if (errForecast) {
          res.send({ error: errForecast });
          return;
        }

        res.send({
          address,
          location,
          forecast: forecastData,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    res.send({
      status: 400,
      error: "You must provide a search term.",
    });

    return;
  }

  console.log(req.query);

  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "Error",
    author: "Francis",
    message: "Error 404: Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "Error",
    author: "Francis",
    message: "Error 404: Page not found",
  });
});

// Starts up the server
app.listen(port, () => {
  console.log("Server starting up...");
});
