const request = require("postman-request");
const properties = require("./properties");

const forecast = (longitude, latitude, callback) => {
  url = `http://api.weatherstack.com/current?query=${encodeURIComponent(
    latitude
  )}, ${encodeURIComponent(longitude)}&access_key=${
    properties.weatherStackAccessKey
  }`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback({ result: "error", message: "Weather Service is unavailable" });
    } else if (body.error) {
      callback({ result: "error", message: "Unable to find the location" });
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}. It is ${body.current.temperature} degrees outside but it feels like ${body.current.feelslike} degrees.`
      );
    }
  });
};

module.exports = forecast;
