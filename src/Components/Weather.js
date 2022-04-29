import React from "react";

import { useSelector } from "react-redux";

function Weather() {
  const value = useSelector((state) => state.weather.value);
  return <div className="search-button">a</div>;
}

export default Weather;
