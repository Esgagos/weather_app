// let weather = {
//   paris: {
//     temp: 19.7,
//     humidity: 80,
//   },
//   tokyo: {
//     temp: 17.3,
//     humidity: 50,
//   },
//   lisbon: {
//     temp: 30.2,
//     humidity: 20,
//   },
//   "san francisco": {
//     temp: 20.9,
//     humidity: 100,
//   },
//   oslo: {
//     temp: -5,
//     humidity: 20,
//   },
//   cityInput: {},
// };

// let cityInput = prompt("Enter a city").trim().toLowerCase();
// const city = weather[cityInput];
// if (city) {
//   alert(
//     `The temperature in ${cityInput} is ${Math.round(
//       city.temp
//     )} and the humidity is ${Math.round(city.humidity)}`
//   );
// } else {
//   alert(
//     `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${cityInput}`
//   );
// }

// function isWindy(speed) {
//   if (speed > 5) {
//     return true;
//   } else {
//     return false;
//   }
// };

const apiKey = "445905dadb3d2b0c6f1b916c9d0e3860";

let now = new Date();
let day = now.getDay();
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

let hour = now.getHours();
let minutes = now.getMinutes();

let dayHour = document.querySelector("#dayHour");
dayHour.innerHTML = dayName + "  " + hour + ":" + minutes;

let locationName;

function changeDegrees(temperature) {
  let degrees = document.querySelector("#tempValue");
  degrees.innerHTML = temperature;
}

function showTemperature(response) {
  console.log(response);
  temperature = Math.round(response.data.main.temp);
  document.querySelector("#searched-location").innerHTML = response.data.name;
  changeDegrees(temperature);
}

function cityLocation(event) {
  event.preventDefault();

  const location = document.querySelector("#location-input");
  locationName = location.value;

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${locationName}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
  // const mainCity = document.querySelector("#searched-location");
  // mainCity.innerHTML = locationName;
  // location.value = "";
}
let temperature;

let citySearch = document.querySelector("#form-search");
citySearch.addEventListener("submit", cityLocation);

const farenheight = 14;

const celsiusLink = document.querySelector("#celsiusLink");
const farenheightLink = document.querySelector("#farenheightLink");

function getCelsius(thisFarenheight) {
  return ((thisFarenheight - 32) * 5) / 9;
}

function onGetCelsius(event) {
  document.querySelector("#tempValue").innerHTML = getCelsius(farenheight);
  celsiusLink.classList.add("selected");
  farenheightLink.classList.remove("selected");
}

function onGetFarenheight(event) {
  const tempValue = document.querySelector("#tempValue");
  tempValue.innerHTML = farenheight;
  farenheightLink.classList.add("selected");
  celsiusLink.classList.remove("selected");
}

celsiusLink.addEventListener("click", onGetCelsius);
farenheightLink.addEventListener("click", onGetFarenheight);

document.onload = onGetFarenheight();

let currentTemp;
let tempValue;
function changeTemp(tempValue) {
  const degrees = document.querySelector("#searched-location");
  degrees.innerHTML = `Current temperature`;
  const searchedLocation = document.querySelector("#searched-location");
  searchedLocation.classList.add("show-current-temp");
  tempValue = document.querySelector("#tempValue");
  tempValue.innerHTML = `${currentTemp}`;
}
function getButton(tempValue) {
  tempValue = document.querySelector("#currentTemp");
  tempValue.addEventListener("click", changeTemp);
}
function showCity(response) {
  console.log(Math.round(response.data.main.temp));
  currentTemp = Math.round(response.data.main.temp);
  getButton(currentTemp);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "1ee4264117b73d2263eecd562f31ef5c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCity);
}

navigator.geolocation.getCurrentPosition(showPosition);
