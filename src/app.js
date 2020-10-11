const path = require("path");
const express = require("express");
const chalk = require("chalk");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const PORT = process.env.PORT || 3000;

//paths
var publicStaticFilesPath = path.join(__dirname, "../public");
var viewsPath = path.join(__dirname, "../templates/views");
var partialsPath = path.join(__dirname, "../templates/partials");

app.use(express.static(publicStaticFilesPath));
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Abhilash",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Abhilash",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Abhilash",
    message:
      "Need help? You've come to the right place. How can we help you? (^_^)/",
  });
});

app.get("/weather", (req, res) => {
  var address = req.query.location;

  if (!address) {
    return res.send({
      result: "error",
      message: "Please pass a location query",
    });
  }

  geocode(address, (error, { longitude, latitude, location } = {}) => {
    if (error) {
      return res.send(error);
    }

    forecast(longitude, latitude, (error, result) => {
      if (error) {
        return res.send(error);
      }
      return res.send({ location, result, address });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "Error Page",
    name: "Abhilash",
    message: "404 Help Page Not Found :(",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "Error Page",
    name: "Abhilash",
    message: "404 Page Not Found :(",
  });
});

app.listen(PORT, () => {
  console.log(chalk.green(`Server is running at port ${PORT}`));
});
