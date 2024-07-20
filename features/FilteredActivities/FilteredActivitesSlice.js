import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  resultsFilteredActivities: [],
};

export const filteredActivitiesSlice = createSlice({
  name: "resultsFilteredActivitiesData",
  initialState,
  reducers: {
    setResultsFilteredActivities: (state, { payload }) => {
      state.resultsFilteredActivities = payload;
    },
  },
});

export const { setResultsFilteredActivities } = filteredActivitiesSlice.actions;
export default filteredActivitiesSlice.reducer;
