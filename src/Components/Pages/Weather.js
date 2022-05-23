/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";

import Nav from "../Nav/Nav";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCurrentWeather,
  fetchWeather,
} from "../../redux/weather/WeatherSlice";

import csDay from "../../icons/01d.svg";
import csNight from "../../icons/01n.svg";
import clDay from "../../icons/02d.svg";
import clNight from "../../icons/02n.svg";
import raDay from "../../icons/10d.svg";
import raNight from "../../icons/10n.svg";
import snDay from "../../icons/13d.svg";
import snNight from "../../icons/13n.svg";
import tsDay from "../../icons/11d.svg";
import tsNight from "../../icons/11n.svg";
import miDay from "../../icons/50d.svg";
import miNight from "../../icons/50n.svg";
import humidity from "../../icons/humidity.svg";
import sunrise from "../../icons/sunrise.svg";
import sunset from "../../icons/sunset.svg";
import warmer from "../../icons/thermometer-warmer.svg";
import colder from "../../icons/thermometer-colder.svg";
import compass from "../../icons/compass.svg";
import windsock from "../../icons/windsock.svg";
import barometer from "../../icons/barometer.svg";

function Weather() {
  const { lat, lon } = useParams();
  const dispatch = useDispatch();
  const weather = useSelector((state) => state.weather.weather);
  const language = useSelector((state) => state.weather.language);
  const currentWeather = useSelector((state) => state.weather.currentWeather);
  const status = useSelector((state) => state.weather.weatherStatus);
  const currentWeatherStatus = useSelector(
    (state) => state.weather.currentWeatherStatus
  );

  function calcTime(t) {
    const weekDay = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    var date = new Date(t * 1000).toLocaleDateString("tr-TR");
    var time = new Date(t * 1000).toLocaleTimeString("tr-TR");
    var _day = new Date(t * 1000).getUTCDay();

    return { date, time, day: weekDay[_day] };
  }

  function setIcon(id, ic) {
    if (id >= 200 && id <= 232) {
      return ic[2] === "d" ? tsDay : tsNight;
    } else if (id >= 300 && id <= 321) {
      return ic[2] === "d" ? raDay : raNight;
    } else if (id >= 500 && id <= 531) {
      return ic[2] === "d" ? raDay : raNight;
    } else if ((id >= 600 && id <= 622) || id === 511) {
      return ic[2] === "d" ? snDay : snNight;
    } else if (id >= 700 && id <= 781) {
      return ic[2] === "d" ? miDay : miNight;
    } else if (id === 800) {
      return ic[2] === "d" ? csDay : csNight;
    } else if (id >= 801 && id <= 804) {
      return ic[2] === "d" ? clDay : clNight;
    }
  }

  if (currentWeatherStatus === "idle") {
    dispatch(fetchCurrentWeather({ lat: lat, lon: lon, language: language }));
  }

  if (status === "idle") {
    dispatch(
      fetchWeather({
        lat: lat,
        lon: lon,
        exclude: "minutely,hourly,alerts,current",
        language: language,
      })
    );
  }

  useEffect(() => {
    if (status !== "idle")
      dispatch(fetchCurrentWeather({ lat: lat, lon: lon, language: language }));
  }, [language]);

  console.log(currentWeather);

  return (
    <div className="">
      <Nav />
      <div className="container">
        <div className="row mt-5 current-weather">
          {currentWeatherStatus === "succeeded" ? (
            <>
              <div className="col-xl-8 col-md-7 col-sm-12  current-weather current-weather-main">
                <div className="row">
                  <div>
                    <div className="current-weather-text">
                      {language === "tr"
                        ? "GÜNCEL HAVA DURUMU"
                        : "CURRENT WEATHER"}
                    </div>
                  </div>
                  <div className="current-weather-time">
                    {calcTime(currentWeather.dt).time.slice(0, 5)}
                  </div>
                  <div className="row">
                    <div className="col-xl-4 col-lg-3 col-sm-4 col-6 text-center icon">
                      <img
                        src={setIcon(
                          currentWeather.weather[0].id,
                          currentWeather.weather[0].icon
                        )}
                        alt="Weather icon"
                        height="125px"
                      />
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-5 col-sm-4 col-6 temp-text">
                      <span className="temp-text">
                        {Math.round(currentWeather.main.temp)}
                      </span>
                      <sup className="degree">°C</sup>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-3 col-sm-4 col-4 offset-4 offset-sm-0 text-nowrap">
                      <div className="weather-main text-nowrap title">
                        {currentWeather.weather[0].description}
                      </div>
                      <div>
                        {language === "tr" ? "Hissedilen" : "Feels Like"}{" "}
                        {Math.round(currentWeather.main.feels_like)}{" "}
                        <sup>°</sup>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-3 ">
                    <div className="col-6">
                      <div className="text-nowrap title">
                        {language === "tr" ? "Gün Doğumu" : "Sunrise"}
                        <img src={sunrise} alt="sunrise" width="50px" />
                      </div>
                      <div className="values">
                        {calcTime(currentWeather.sys.sunrise).time.slice(0, 5)}
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="text-nowrap title">
                        {language === "tr" ? "Gün Batımı" : "Sunset"}
                        <img src={sunset} alt="sunset" width="50px" />
                      </div>
                      <div className="values">
                        {calcTime(currentWeather.sys.sunset).time.slice(0, 5)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-md-5 col-sm-12 current-weather current-weather-other">
                <div className="row ">
                  <div className="col-6">
                    <div className="text-nowrap title">
                      {language === "tr" ? "Nem" : "Humidity"}
                      <img src={humidity} alt="humidity" width="50px" />
                    </div>
                    <div className="values">
                      {currentWeather.main.humidity}%
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="text-nowrap title">
                      {language === "tr" ? "Rüzgar" : "Wind"}
                      <img src={windsock} alt="windsock" width="50px" />
                    </div>
                    <div className="text-nowrap values">
                      {Math.round(currentWeather.wind.speed * 3.6)} KM/S
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="text-nowrap title">
                      {language === "tr" ? "Basınç" : "Pressure"}
                      <img src={barometer} alt="barometer" width="50px" />
                    </div>
                    <div className="values">
                      {Math.round(currentWeather.main.pressure)} hPa
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="title text-nowrap">
                      {language === "tr" ? "Rüzgar Yönü" : "Wind Direction"}

                      <img
                        src={compass}
                        alt="humidity"
                        width="50px"
                        style={{
                          transform: `rotate(${
                            currentWeather.wind.deg + 180
                          }deg)`,
                        }}
                      />
                    </div>
                  </div>

                  <div className=""></div>
                </div>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default Weather;
