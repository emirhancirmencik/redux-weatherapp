import React, { useEffect, useState } from "react";

import Nav from "../Nav/Nav";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "../../redux/weather/WeatherSlice";

function Weather() {
  const { lat, lon } = useParams();
  const dispatch = useDispatch();
  const weather = useSelector((state) => state.weather.weather);
  const status = useSelector((state) => state.weather.weatherStatus);

  if (status === "idle") {
    dispatch(fetchWeather({ lat: lat, lon: lon }));
  }

  return (
    <div className="">
      <Nav />
      <div className="container">
        <div className="row mt-5">{weather && console.log(weather)}</div>
      </div>
    </div>
  );
}

export default Weather;
