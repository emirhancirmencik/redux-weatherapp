import React from "react";

import { useSelector } from "react-redux";

function Weather() {
  const value = useSelector((state) => state.weather.value);
  return <div className=""></div>;
}

export default Weather;
