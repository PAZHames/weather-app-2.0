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
  let tempertaureElement = document.querySelector("#current-temp");
  tempertaureElement.innerHTML = Math.round(response.data.main.temp);
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
  celsiusTemperature = response.data.main.temp;

  getForecast(response.data.coord);
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Thurs", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
            <div class="card">
              <div class="card-body">
                <div>${day}</div>
                <i class="fa-solid fa-sun"></i>
                <br>
                <span class="forecast-temp-max">15°</span>
                <span class="forecast-temp-min">10°</span>
              </div>
            </div>
          </div>`;
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

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#current-temp");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
