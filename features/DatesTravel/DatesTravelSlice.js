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
    clearDates: (state) => {
      state.value.dateOfArrival = null;
      state.value.dateOfDeparture = null;
    },
  },
});

export const { setDateOfArrival, setDateOfDeparture, clearDates } =
  datesTravelSlice.actions;

export default datesTravelSlice.reducer;
