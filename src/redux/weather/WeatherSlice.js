import { createSlice } from "@reduxjs/toolkit";

export const weatherSlice = createSlice({
  name: "weather",
  initialState: { language: "tr", theme: "dark", search: "" },
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
  },
});

export const { changeLanguage, changeTheme } = weatherSlice.actions;
export default weatherSlice.reducer;
