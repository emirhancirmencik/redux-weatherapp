import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./weather/WeatherSlice";

export const store = configureStore({
  reducer: { weather: weatherReducer },
});
