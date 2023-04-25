const request = require("postman-request");

const geoCode = (address, callBack) => {
  const apiKeyGeo =
    "pk.eyJ1IjoiZnI2bmsxMiIsImEiOiJjbGZrNzd5azQwMm0zNDNveDFxYTBjbWFyIn0.udY6Rewr9Slo6IhmnO24Bg";

  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?proximity=ip&access_token=${apiKeyGeo}&limit=1`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callBack(
        "Error: Unable to connect to the geocode services. Please check your internet connection.",
        undefined
      );
    } else if (response.body.features.length === 0) {
      callBack(
        "Error: No matching coordinates for the given address",
        undefined
      );
    } else {
      callBack(undefined, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = { geoCode };
