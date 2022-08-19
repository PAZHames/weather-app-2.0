function displayTemperature(response) {
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
}

let apiKey = "49c1fd21e6977b5bebe55ea0fd25e68a";
let units = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=singapore&appid=${apiKey}&units=${units}`;

axios.get(apiUrl).then(displayTemperature);
