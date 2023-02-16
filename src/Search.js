import React, { useState } from "react";
import axios from "axios";

export default function Search() {
  let [city, setCity] = useState(null);
  let [temperature, setTemperature] = useState(null);
  let [sky, setSky] = useState(null);
  let [humidity, setHumidity] = useState(null);
  let [wind, setWind] = useState("");
  let [icon, setIcon] = useState("");
  let [rain, setRain] = useState("");
  let [cityName, setCityName] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2d45cd9aba9578de617649933c326fdc&units=metric`;
    axios.get(url).then(showWeather);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  function showWeather(response) {
    setRain(response.data.weather[0].main);
    setTemperature(Math.round(response.data.main.temp * 10) / 10);
    setSky(response.data.weather[0].description);
    setHumidity(response.data.main.humidity);
    setWind(response.data.wind.speed);
    setCityName(response.data.name);
    setIcon(
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  }

  if (rain === "Rain") {
    return (
      <div>
        <div>
          <div className="Forecast">
            <h2>Currently, in {cityName}:</h2>
            <p> Weather App</p>
            <table>
              <tr>
                <td>The temperature is {temperature}°C</td>
                <td>The sky is {sky}</td>
                <td>There is {humidity}% humidity</td>
                <td>The wind speed is {wind} km/h</td>
              </tr>
            </table>
            <p>
              <img src={icon} />
            </p>
          </div>
          <div className="Search">
            <form onSubmit={handleSubmit}>
              <input
                type="search"
                Placeholder="Enter a city..."
                onChange={updateCity}
              />
              <input className="button" type="submit" value="Search" />
            </form>
          </div>
        </div>{" "}
      </div>
    );
  } else if (rain) {
    return (
      <div>
        <div>
          <div className="Forecast">
            <h2>Currently, in {cityName}:</h2>
            <ul>
              <li>The temperature is {temperature}°C</li>
              <li>The sky is {sky}</li>
              <li>There is {humidity}% humidity</li>
              <li>The wind speed is {wind} km/h</li>
            </ul>
            <p>
              <img src={icon} />
            </p>
          </div>
        </div>{" "}
      </div>
    );
  } else {
    return (
      <div>
        <div className="Search">
          <form onSubmit={handleSubmit}>
            <input
              type="search"
              Placeholder="Enter a city..."
              onChange={updateCity}
            />
            <input className="button" type="submit" value="Search" />
          </form>
        </div>
      </div>
    );
  }
}
