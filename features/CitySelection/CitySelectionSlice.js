import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  citySelected: null,
};

export const citySelectedSlice = createSlice({
  name: "citySelectedData",
  initialState,
  reducers: {
    setCitySelected: (state, { payload }) => {
      state.citySelected = payload;
    },
    clearCitySelected: (state) => {
      state.citySelected = null;
    },
  },
});

export const { setCitySelected, clearCitySelected } = citySelectedSlice.actions;
export default citySelectedSlice.reducer;
