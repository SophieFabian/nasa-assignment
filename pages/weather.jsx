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
        console.log("CALLING WEATHER", data);
        const weatherData = data.sol_keys.map((key) => {
          const entry = data[key];
          return {
            datapoint: key,
            temperature: entry.AT.av,
            wind: entry.HWS.av,
            pressure: entry.PRE.av,
            first_UTC: entry.First_UTC,
            last_UTC: entry.Last_UTC,
          };
        });
        setWeatherData(weatherData);
        // setCoins(json.coins);
        // setHasNext(json.hasNext);
        // coinsHistory[currentPage] = coins;
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
    </div>
  );
};

export default Weather;
