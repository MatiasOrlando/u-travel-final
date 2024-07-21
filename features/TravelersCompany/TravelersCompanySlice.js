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
    clearTravelersCompany: (state) => {
      state.value.travelersCompany = "";
      state.value.travelersCompanyId = null;
    },
  },
});

export const { setTravelersCompany, clearTravelersCompany } =
  travelersCompanySlice.actions;
export default travelersCompanySlice.reducer;
