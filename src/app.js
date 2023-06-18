let celsiusTemperature = null;

function displayFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);
  let tempValue = document.querySelector("#tempValue");
  tempValue.innerHTML = fahrenheitTemperature;
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function displayCelsius(event) {
  event.preventDefault();
  let tempValue = document.querySelector("#tempValue");
  tempValue.innerHTML = celsiusTemperature;
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

let fahrenheitLink = document.querySelector("#fahrenheitLink");
fahrenheitLink.addEventListener("click", displayFahrenheit);

let celsiusLink = document.querySelector("#celsiusLink");
celsiusLink.addEventListener("click", displayCelsius);

function formatDate() {
  let date = new Date();
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let day = date.getDay();
  let dayList = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dayName = dayList[day];
  return `${dayName} at ${hours}:${minutes}`;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  let dateNumber = date.getDate();
  let month = date.getMonth();
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return days[day] + " " + dateNumber + " " + months[month];
}
function displayForecast(response) {
  console.log(response);

  let forecastday = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row main-row">`;
  forecastday.forEach(function (forecast, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `    <div class= "col">
            <div class="card">
              <h5 class="card-title">${formatDay(
                forecast.time
              )} <span class="date"></span></h5>

              <img
                src="${forecast.condition.icon_url}"
                class="card-img img-fluid position-relative top-0 start-50 translate-middle-x translate-middle sun"
                alt="weather icon"
              />

              <div class="card-degree">${Math.round(
                forecast.temperature.maximum
              )}º <small class= "min-temperature">  ${Math.round(
          forecast.temperature.minimum
        )}º</small></div>
              <p class="card-text">${forecast.condition.description}
                
              </p>
              <div class="card-wind">Wind gust ${Math.round(
                forecast.wind.speed
              )} mph</div>
              <div class= "card-humidity"> Humidity ${
                forecast.temperature.humidity
              } %</div>
            
            </div>
            </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  const apiKey = "6e77343taf210f7060a5ae1ab4ao9183";
  const apiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&key=${apiKey}`;

  axios.get(apiUrl).then(displayForecast);
}

function showLocation(response) {
  console.log(response);

  let cityName = response.data.city;
  let temperature = Math.round(response.data.temperature.current);

  let tempDescription = response.data.condition.description;
  let wind = response.data.wind.speed;
  let humidity = response.data.temperature.humidity;
  let iconElement = document.querySelector("#weatherIcon");
  let iconUrl = response.data.condition.icon;
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.time * 1000);
  celsiusTemperature = temperature;

  getForecast(response.data.coordinates);
  let searchedLocation = document.querySelector("#searched-location");
  searchedLocation.innerHTML = cityName;
  let tempValue = document.querySelector("#tempValue");
  tempValue.innerHTML = temperature;
  let descriptionLine = document.querySelector("#description");
  descriptionLine.innerHTML = tempDescription;
  let windGust = document.querySelector("#windGust");
  windGust.innerHTML = `Wind Gust ${wind} (mph)`;
  let humidityValue = document.querySelector("#humidity");
  humidityValue.innerHTML = `Humidity ${humidity}%`;
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${iconUrl}.png`
  );
  iconElement.setAttribute("alt", `${iconUrl}`);
}
function getLocation(event, overrideLocationInput) {
  event && event.preventDefault();
  let locationValue =
    overrideLocationInput || document.querySelector("#location-input").value;

  const apiKey = "6e77343taf210f7060a5ae1ab4ao9183";
  const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${locationValue}&key=${apiKey}`;
  axios.get(apiUrl).then(showLocation);
}

const citySearch = document.querySelector("#form-search");
citySearch.addEventListener("submit", getLocation);
window.onload = getLocation(undefined, "London");

// let currentTemp;
// let tempValue;
// function changeTemp(tempValue) {
//   const degrees = document.querySelector("#searched-location");
//   degrees.innerHTML = `Current temperature`;
//   const searchedLocation = document.querySelector("#searched-location");
//   searchedLocation.classList.add("show-current-temp");
//   tempValue = document.querySelector("#tempValue");
//   tempValue.innerHTML = `${currentTemp}`;
// }
// function getButton(tempValue) {
//   tempValue = document.querySelector("#currentTemp");
//   tempValue.addEventListener("click", changeTemp);
// }
// function showCity(response) {
//   console.log(Math.round(response.data.main.temp));
//   currentTemp = Math.round(response.data.main.temp);
//   getButton(currentTemp);
// }

// function showPosition(position) {
//   let latitude = data.coord.lat;
//   let longitude = data.coord.lon;
//   let apiKey = "6e77343taf210f7060a5ae1ab4ao9183";
//   let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${apiKey}`;
//   // let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
//   axios.get(apiUrl).then(showCity);
// }

// navigator.geolocation.getCurrentPosition(showPosition);
