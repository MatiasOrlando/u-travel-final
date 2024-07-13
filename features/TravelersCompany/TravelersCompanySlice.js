import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    travelersCompany: "",
    travelersCompanyId: null,
  },
};

export const travelersCompanySlice = createSlice({
  name: "travelersCompanyFilter",
  initialState,
  reducers: {
    setTravelersCompany: (state, { payload }) => {
      state.value.travelersCompany = payload.travelersCompany;
      state.value.travelersCompanyId = payload.travelersCompanyId;
    },
  },
});

export const { setTravelersCompany } = travelersCompanySlice.actions;
export default travelersCompanySlice.reducer;
