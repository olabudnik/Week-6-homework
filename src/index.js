let now = new Date();
let dates = document.querySelector("#date");
let day = now.getDay();
let hour = now.getHours();
let minutes = now.getMinutes();
if (hour < 10) {
  hour = `0${hour}`;
}
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let dayoftheweek = days[now.getDay()];

dates.innerHTML = `${dayoftheweek}, ${hour}:${minutes}`;

// Add a search engine, when searching for a city (i.e. Paris), display the city name on the page after the user submits the form.
//
function submitcity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let cityname = document.querySelector("#city-name");
  cityname.innerHTML = `${cityInput.value}`;
  let apiKey = "462ba54e8cfba74fb731ce2be029cb2c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

let cityform = document.querySelector("#city-form");
cityform.addEventListener("submit", submitcity);

// Display temperature in Celsius and add a link to convert it to Fahrenheit.
// When clicking on it, it should convert the temperature to Fahrenheit. When clicking on Celsius, it should convert it back to Celsius.

function convertToCelsius(event) {
  event.preventDefault();
//   let celsiusTemparature = 
//   let currentTemperatureC = document.querySelector("#temp");
//   currentTemperatureC.innerHTML = math.round(celsiusTemparature);
}

// let Celsius = document.querySelector("#celsius-link");
// Celsius.addEventListener("click", convertToCelsius);

function convertToFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemparature = (celsiusTemparature * 9) / 5 + 32; 
  let currentTemperatureF = document.querySelector("#temp");
  currentTemperatureF.innerHTML = Math.round(fahrenheitTemparature);
}

let Fahrenheit = document.querySelector("#fahrenheit-link");
Fahrenheit.addEventListener("click", convertToFahrenheit);

let celsiusTemparature = null; 

// Current Location button. When clicking on it, it uses the Geolocation API to get your GPS coordinates and display and the city and current temperature using the OpenWeather API.

function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  console.log(lat);
  console.log(lon);

  let apiKey = "462ba54e8cfba74fb731ce2be029cb2c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}
function showWeather(response) {

  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity; 
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed); 
   let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src",
 `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);
celsiusTemparature = response.data.main.temp;
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let button = document.querySelector("#current-position");
button.addEventListener("click", getCurrentPosition);

