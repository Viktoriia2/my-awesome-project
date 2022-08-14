function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day}, ${hours}:${minutes}`;
}
//display forecast
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        <div class="day-forecast">${day}</div>
        <img class="sun_day" src="img/cloud_sun.png" alt="sun" width="30" class/>
        <div class = "forecast-temperature">
        <span class = "forecast-temperature-max">18°</span> 
        <span class = "forecast-temperature-min">16°</span>
        </div>
        <div class="max-min">max &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;min</div>
    </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
// API weather
function displayWeatherCondition(response) {
  console.log(response);

  document.querySelector("#userCityManualEnter").innerHTML = response.data.name;
  document.querySelector("#convertTemperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#maximumCelsius").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#humidityProcent").innerHTML =
    response.data.main.humidity;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#date-time").innerHTML = formatDate(
    response.data.dt * 1000
  );
  celsiusTemperature = response.data.main.temp;
}

//Show Current Location
function searchCity(city) {
  let apiKey = "260bbaa7e84e6774b9f60ed1b0d90e23";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
function userCityEnter(event) {
  event.preventDefault();
  let city = document.querySelector("#name").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "260bbaa7e84e6774b9f60ed1b0d90e23";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let buttonLocation = document.querySelector("#currentLocationButton");
buttonLocation.addEventListener("click", getCurrentLocation);

//Challenge 3 - менять С на F
function convertToFahrenheit(event) {
  event.preventDefault();
  // remove the active class the celsius link
  celsius.classList.remove("linkC");
  fahrenheit.classList.add("linkC");
  let temperatureElement = document.querySelector("#convertTemperature");
  let temperatureFahrenheit = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(temperatureFahrenheit);
}

function convertToCelsius(event) {
  event.preventDefault();
  celsius.classList.add("linkC");
  fahrenheit.classList.remove("linkC");
  let temperatureElement2 = document.querySelector("#convertTemperature");
  temperatureElement2.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let formCity = document.querySelector("form");
formCity.addEventListener("submit", userCityEnter);

let fahrenheit = document.querySelector("#fahrenheitLink");
fahrenheit.addEventListener("click", convertToFahrenheit);

let celsius = document.querySelector("#celsiusLink");
celsius.addEventListener("click", convertToCelsius);

searchCity("Warsaw");
displayForecast();

/*Менять цвет фона взависимости от времени суток (день/ночь)
let date = new Date(); // Получаем текущие дату и время
let h = date.getHours(); // Получаем текущий час
if (h < 6 || h > 22) {
  document.getElementById("style").href = "src/style-night.css";
  console.log(document.getElementById("style"));
  console.log(h + " Enable Dark");
} else {
  document.getElementById("style").href = "src/style.css";
  console.log(document.getElementById("style"));
  console.log(h + " Enable Light");
}
*/
// Заменить слово в новостях
function currentCityNews(event) {
  event.preventDefault();
  let inputUser = document.querySelector("#name");
  document.getElementById("cityNews").innerHTML = inputUser.value;
}
let cityName = document.querySelector("form");
cityName.addEventListener("submit", currentCityNews);
