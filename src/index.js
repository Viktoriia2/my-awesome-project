function formatDate(today) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[today.getDay()];

  let hours = today.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = today.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day}, ${hours}:${minutes}`;
}
let dateElement = document.querySelector("#date-time");
let currentDateTime = new Date();

dateElement.innerHTML = formatDate(currentDateTime);

// API weather
function displayWeatherCondition(response) {
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
  console.log(response);
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

searchCity("Warsaw");
//
let formCity = document.querySelector("form");
formCity.addEventListener("submit", userCityEnter);

//Challenge 3 - менять С на F
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#convertTemperature");
  let temperatureChange = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round((temperatureChange * 9) / 5 + 32);
}
let fahrenheit = document.querySelector("#fahrenheitLink");
fahrenheit.addEventListener("click", convertToFahrenheit);

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#convertTemperature");
  temperatureElement.innerHTML = 29;
}
let celsius = document.querySelector("#celsiusLink");
celsius.addEventListener("click", convertToCelsius);

//Менять цвет фона взависимости от времени суток (день/ночь)
let date = new Date(); // Получаем текущие дату и время
let h = date.getHours(); // Получаем текущий час
if (h < 6 || h > 18) {
  document.getElementById("style").href = "src/style-night.css";
  console.log(document.getElementById("style"));
  console.log(h + " Enable Dark");
} else {
  document.getElementById("style").href = "src/style.css";
  console.log(document.getElementById("style"));
  console.log(h + " Enable Light");
}

// Заменить слово в новостях
function currentCityNews(event) {
  event.preventDefault();
  let inputUser = document.querySelector("#name");
  console.log(inputUser.velue);
  document.getElementById("cityNews").innerHTML = inputUser.value;
}
let cityName = document.querySelector("form");
cityName.addEventListener("submit", currentCityNews);
