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
  return `${day} ${hours}:${minutes}`;
}

function getForecast(coordinates) {
  let apiKey = "49c1fd21e6977b5bebe55ea0fd25e68a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric `;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  let cityElement = document.querySelector("#city-element");
  cityElement.innerHTML = response.data.name;
  let conditionElement = document.querySelector("#condition-element");
  conditionElement.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity-element");
  humidityElement.innerHTML = response.data.main.humidity;
  let windspeedElement = document.querySelector("#windspeed-element");
  windspeedElement.innerHTML = Math.round(response.data.wind.speed);
  let dateElement = document.querySelector("#date-element");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute(
    "alt",
    `http://openweathermap.org/img/wn/${response.data.weather[0].description}@2x.png`
  );

  if (response.data.main.temp > 16) {
    let weatherImage = document.querySelector("#weather-image");
    weatherImage.innerHTML = `
      <img
                src="src/images/undraw_sunny_day_re_gyxr.svg"
                alt="sunny-image"
                class="sunny-image weather-image"
      />
    `;
  } else {
    if (response.data.main.temp < 16 && response.data.main.temp > 0) {
      let weatherImage = document.querySelector("#weather-image");
      weatherImage.innerHTML = `
      <img
        src="src/images/undraw_winter_road_mcqj.svg"
        alt="chilly-image"
        class="chilly-image weather-image"
      />
    `;
    } else {
      let weatherImage = document.querySelector("#weather-image");
      weatherImage.innerHTML = `
      <img
        src="src/images/undraw_snowman_re_guxt.svg"
        alt="cold-image"
        class="cold-image weather-image"
      />
    `;
    }
  }

  getForecast(response.data.coord);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

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
        `<div class="col-2">
            <div class="card">
              <div class="card-body">
                <div>${formatDay(forecastDay.dt)}</div>
                
                <img src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png" alt="" class="forecast-icon">

                <br>
                <span class="forecast-temp-max">${Math.round(
                  forecastDay.temp.max
                )}°</span>
                <span class="forecast-temp-min">${Math.round(
                  forecastDay.temp.min
                )}°</span>
              </div>
            </div>
          </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

function enterCity(city) {
  let apiKey = "49c1fd21e6977b5bebe55ea0fd25e68a";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  enterCity(cityInput.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiKey = "49c1fd21e6977b5bebe55ea0fd25e68a";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(displayWeather);
}

function geolocate(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocationButton = document.querySelector(".currentLocation");
currentLocationButton.addEventListener("click", geolocate);
