import React, { useEffect, useState } from "react";
import "../styles/globals.css";

const Weather = () => {
  const NASA_WEATHER_URL =
    "https://mars.nasa.gov/rss/api/?feed=weather&category=insight_temperature&feedtype=json&ver=1.0";

  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    fetch(NASA_WEATHER_URL)
      .then((resp) => resp.json())
      .then((data) => {
        const weatherData = data.sol_keys.map((key) => {
          const entry = data[key];
          const firstDate = new Date(entry.First_UTC).toISOString().split("T");
          const firstUTCString = `${firstDate[0]} ${
            firstDate[1].split(".")[0]
          }`;
          const lastDate = new Date(entry.First_UTC).toISOString().split("T");
          const lastUTCString = `${firstDate[0]} ${firstDate[1].split(".")[0]}`;
          return {
            datapoint: key,
            temperature: entry.AT.av,
            wind: entry.HWS.av,
            pressure: entry.PRE.av,
            first_UTC: firstUTCString,
            last_UTC: lastUTCString,
          };
        });
        setWeatherData(weatherData);
      });
  }, []);

  return (
    <div className="page">
      <h1>Mars Weather</h1>
      <div className="cards">
        {!!weatherData &&
          weatherData.map((data) => (
            <div key={data.datapoint} className="card">
              <div className="dataLabel">Data point:</div>
              <div>{data.datapoint}</div>
              <div className="dataLabel">Temperature(AVG):</div>
              <div>{data.temperature}</div>
              <div className="dataLabel">Wind(AVG):</div>
              <div>{data.wind}</div>
              <div className="dataLabel">Pressure(AVG):</div>
              <div>{data.pressure}</div>
              <div className="dataLabel">First UTC:</div>
              <div>{data.first_UTC}</div>
              <div className="dataLabel">Last UTC:</div>
              <div>{data.last_UTC}</div>
            </div>
          ))}
      </div>
      <a className="nav-button" href="/">
        Home
      </a>
    </div>
  );
};

export default Weather;
