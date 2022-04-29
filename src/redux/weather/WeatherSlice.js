import { createSlice } from "@reduxjs/toolkit";

export const weatherSlice = createSlice({
  name: "weather",
  initialState: { value: 2 },
  reducers: {},
});

export default weatherSlice.reducer;
