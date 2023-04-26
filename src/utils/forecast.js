const request = require("postman-request");

const forecast = (lat, long, callBack) => {
  const apiKeyWeather = "3ae27f5fdff53fe2f2b929820b7aa309";
  const urlWeather = `http://api.weatherstack.com/current?access_key=${apiKeyWeather}&query=${lat},${long}&units=m`;

  request({ url: urlWeather, json: true }, (error, response) => {
    if (error) {
      callBack(
        "Unable to connect to the weather services. Please check your internet connection.",
        undefined
      );

      return;
    } else if (response.body.error) {
      callBack(response.body.error.info, undefined);
      return;
    }

    const currentData = response.body.current;

    console.log(currentData);

    callBack(
      undefined,
      `${currentData.weather_descriptions[0]} at ${
        currentData.observation_time
      } UTC. It is currently ${
        currentData.temperature
      } degrees out, but it feels like ${currentData.feelslike}. There is a ${
        currentData.precip.toFixed(1) * 100.0
      }% chance of rain`
    );
  });
};

// forecast(40.7648, -73.9808, (error, data) => {
//   console.log("Error", error);
//   console.log("Data", data);
// });

module.exports = {
  forecast,
};
