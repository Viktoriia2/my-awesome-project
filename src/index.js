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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="day-forecast">${formatDay(forecastDay.dt)}</div>
        <img class="sun_day" src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png" alt="sun" width="45" class/>
        <div class = "forecast-temperature">
        <span class = "forecast-temperature-max">${Math.round(
          forecastDay.temp.max
        )}°</span> 
        <span class = "forecast-temperature-min">${Math.round(
          forecastDay.temp.min
        )}°</span>
        </div>
        <div class="max-min">max &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;min</div>
    </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
// display forecast API
function getForecast(coordinates) {
  let apiKey = "260bbaa7e84e6774b9f60ed1b0d90e23";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

/*
import React from "react";
import ReactAnimatedWeather from "react-animated-weather";

export default function WeatherIcon(props) {
  const codeMapping = {
    "01d": "CLEAR_DAY",
    "01n": "CLEAR_NIGHT",
    "02d": "PARTLY_CLOUDY_DAY",
    "02n": "PARTLY_CLOUDY_NIGHT",
    "03d": "PARTLY_CLOUDY_DAY",
    "03n": "PARTLY_CLOUDY_NIGHT",
    "04d": "CLOUDY",
    "04n": "CLOUDY",
    "09d": "RAIN",
    "09n": "RAIN",
    "10d": "RAIN",
    "10n": "RAIN",
    "11d": "RAIN",
    "11n": "RAIN",
    "13d": "SNOW",
    "13n": "SNOW",
    "50d": "FOG",
    "50n": "FOG",
  };

  return (
    <ReactAnimatedWeather
      icon={codeMapping[props.code]}
      color="#1e1e1e"
      size={props.size}
      animate={true}
    />
  );
}
*/

// API weather

function displayWeather(response) {
  let temperatureElement = document.querySelector("#convertTemperature");
  let userCityElement = document.querySelector("#userCityManualEnter");
  let maxTemperatureNow = document.querySelector("#maximumCelsius");
  let humidityElement = document.querySelector("#humidityProcent");
  let descriptionElement = document.querySelector("#description");
  let dateTimeElement = document.querySelector("#date-time");
  //let iconElement = document.querySelector("#icon");

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  userCityElement.innerHTML = response.data.name;
  maxTemperatureNow.innerHTML = Math.round(response.data.main.temp_max);
  humidityElement.innerHTML = response.data.main.humidity;
  descriptionElement.innerHTML = response.data.weather[0].main;
  dateTimeElement.innerHTML = formatDate(response.data.dt * 1000);
  // iconElement.setAttribute("src", `./img/${response.data.weather[0].icon}.png`);
  // iconElement.setAttribute("alt", response.data.weather[0].main);

  celsiusTemperature = response.data.main.temp;

  getForecast(response.data.coord);
}
//Show Current Location
function searchCity(city) {
  let apiKey = "260bbaa7e84e6774b9f60ed1b0d90e23";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
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
