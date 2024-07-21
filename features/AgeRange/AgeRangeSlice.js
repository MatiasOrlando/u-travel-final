import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ageValues: {
    minAge: 6,
    maxAge: 6,
  },
};

export const ageRangeSlice = createSlice({
  name: "ageRangeFilter",
  initialState,
  reducers: {
    setMinAge: (state, { payload }) => {
      state.ageValues.minAge = payload;
    },
    setMaxAge: (state, { payload }) => {
      state.ageValues.maxAge = payload;
    },
    clearAges: (state) => {
      state.ageValues.minAge = 6;
      state.ageValues.maxAge = 6;
    },
  },
});

export const { setMinAge, setMaxAge, clearAges } = ageRangeSlice.actions;
export default ageRangeSlice.reducer;
