import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCities = createAsyncThunk(
  "weather/getCities",
  async (city) => {
    const res = await axios(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${process.env.REACT_APP_API}`
    );
    return res.data;
  }
);

export const fetchWeather = createAsyncThunk(
  "weather/getWeather",
  async (coordinates) => {
    const res = await axios(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=${coordinates.exclude}&units=metric&appid=${process.env.REACT_APP_API}&lang=${coordinates.language}`
    );
    return res.data;
  }
);

export const fetchCurrentWeather = createAsyncThunk(
  "weather/getCurrentWeather",
  async (coordinates) => {
    const res = await axios(
      `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${process.env.REACT_APP_API}&lang=${coordinates.language}`
    );
    return res.data;
  }
);

export const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    language: localStorage.getItem("language")
      ? localStorage.getItem("language")
      : "tr",
    cities: [],
    weather: [],
    currentWeather: [],
    weatherStatus: "idle",
    currentWeatherStatus: "idle",
    theme: localStorage.getItem("theme")
      ? Number(localStorage.getItem("theme"))
      : 0,
  },
  reducers: {
    changeLanguage: (state) => {
      if (state.language === "tr") {
        state.language = "en";
        localStorage.setItem("language", "en");
      } else {
        state.language = "tr";
        localStorage.setItem("language", "tr");
      }
    },
    changeTheme: (state) => {
      state.theme = !state.theme;
    },
    resetSearch: (state) => {
      state.cities = [];
    },
  },
  extraReducers: {
    [fetchCities.fulfilled]: (state, action) => {
      state.cities = action.payload;
    },
    [fetchCurrentWeather.fulfilled]: (state, action) => {
      state.currentWeather = action.payload;
      state.currentWeatherStatus = "succeeded";
    },
    [fetchCurrentWeather.pending]: (state, action) => {
      state.currentWeatherStatus = "pending";
    },
    [fetchCurrentWeather.rejected]: (state, action) => {
      state.currentWeatherStatus = "error";
      state.error = action.error.message;
    },
    [fetchWeather.fulfilled]: (state, action) => {
      state.weather = action.payload;
      state.weatherStatus = "succeeded";
    },
    [fetchWeather.pending]: (state, action) => {
      state.weatherStatus = "pending";
    },
    [fetchWeather.rejected]: (state, action) => {
      state.weatherStatus = "error";
      state.error = action.error.message;
    },
  },
});

export const { changeLanguage, changeTheme, resetSearch } =
  weatherSlice.actions;
export default weatherSlice.reducer;
