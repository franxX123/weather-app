const weatherForm = document.querySelector("form");
const locationField = document.querySelector("input");
const forecastPara = document.querySelector(".forecast");
const locationPara = document.querySelector(".location");
const isLoadingPara = document.querySelector(".isLoading");

const getLocationForecast = async (address = "boston") => {
  const response = await fetch(
    `http://localhost:3000/weather?address=${address}`,
    {
      method: "get",
    }
  );

  if (!response.ok) {
    throw new Error("Error in fetching data.");
  }

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error);
  }

  const { location, forecast } = data;
  return {
    location,
    forecast,
  };
};

weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    isLoadingPara.textContent = "Loading...";

    const locationStr = locationField.value;

    const { location, forecast } = await getLocationForecast(locationStr);

    locationPara.textContent = `Location: ${location}`;
    forecastPara.textContent = `Forecast:\n ${forecast}`;
    isLoadingPara.textContent = "";
    locationField.value = "";
  } catch (err) {
    isLoadingPara.textContent = "";
    window.alert(err);
  }
});
