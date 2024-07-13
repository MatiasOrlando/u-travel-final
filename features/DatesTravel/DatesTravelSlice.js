import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    dateOfArrival: null,
    dateOfDeparture: null,
  },
};

export const datesTravelSlice = createSlice({
  name: "datesPicker",
  initialState,
  reducers: {
    setDateOfArrival: (state, { payload }) => {
      state.value.dateOfArrival = payload;
    },
    setDateOfDeparture: (state, { payload }) => {
      state.value.dateOfDeparture = payload;
    },
  },
});

export const { setDateOfArrival, setDateOfDeparture } =
  datesTravelSlice.actions;

export default datesTravelSlice.reducer;
