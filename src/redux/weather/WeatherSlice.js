import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCities = createAsyncThunk(
  "weather/getCities",
  async (city) => {
    const res = await axios(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${process.env.REACT_APP_API}`
    );
    return res.data;
  }
);

export const fetchWeather = createAsyncThunk(
  "weather/getWeather",
  async (coordinates) => {
    const res = await axios(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=${coordinates.exclude}&appid=${process.env.REACT_APP_API}`
    );
    return res.data;
  }
);

export const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    language: "tr",
    theme: "dark",
    cities: [],
    weather: [],
    weatherStatus: "idle",
  },
  reducers: {
    changeLanguage: (state) => {
      if (state.language === "tr") {
        state.language = "en";
      } else {
        state.language = "tr";
      }
    },
    changeTheme: (state) => {
      if (state.theme === "light") {
        state.theme = "dark";
      } else {
        state.theme = "light";
      }
    },
    resetSearch: (state) => {
      state.cities = [];
    },
  },
  extraReducers: {
    [fetchCities.fulfilled]: (state, action) => {
      state.cities = action.payload;
    },
    [fetchWeather.fulfilled]: (state, action) => {
      state.weather = action.payload;
      state.weatherStatus = "succeeded";
    },
    [fetchWeather.pending]: (state, action) => {
      state.weatherStatus = "pending";
    },
  },
});

export const { changeLanguage, changeTheme, resetSearch } =
  weatherSlice.actions;
export default weatherSlice.reducer;
