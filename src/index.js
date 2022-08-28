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
function submitcity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let cityname = document.querySelector("#city-name");
  cityname.innerHTML = `${cityInput.value}`;

  searchCity(cityInput.value);
}

function searchCity(city) {
  let apiKey = "462ba54e8cfba74fb731ce2be029cb2c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

searchCity("Kyiv");

let cityform = document.querySelector("#city-form");
cityform.addEventListener("submit", submitcity);

// Display temperature in Celsius and add a link to convert it to Fahrenheit.
// When clicking on it, it should convert the temperature to Fahrenheit. When clicking on Celsius, it should convert it back to Celsius.

function convertToFahrenheit(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#temp");
  let fahrenheitTemparature = (celsiusTemparature * 9) / 5 + 32; 
  currentTemperature.innerHTML = Math.round(fahrenheitTemparature);
}

function convertToCelsius(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#temp");
  currentTemperature.innerHTML = Math.round(celsiusTemparature);
}

let Fahrenheit = document.querySelector("#fahrenheit-link");
Fahrenheit.addEventListener("click", convertToFahrenheit);

// Go back to С from F
let Celsius = document.querySelector("#celsius-link");
Celsius.addEventListener("click", convertToCelsius);

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

// display forecast 
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
// creating a loop 
 let forecastHTML = `<div class="row">`;
 let days = ["Tue", "Wed", "Thu"];
 days.forEach(function (day) {

 
    forecastHTML = forecastHTML + `
      <div class="col-2">
        <div class="weather-forecast-date">${day}</div>
        <img
          src="http://openweathermap.org/img/wn/50d@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> 18° </span>
          <span class="weather-forecast-temperature-min"> 16° </span>
        </div>
      </div>
  `;
})
forecastHTMl = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
}

displayForecast();

// coordinates for the forecast 

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "62ba54e8cfba74fb731ce2be029cb2c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
  console.log(apiUrl);
}
 getForecast(); 