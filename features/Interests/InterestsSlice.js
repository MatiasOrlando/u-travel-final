import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  travelerInterests: [],
  userInterests: [
    "Art",
    "Adventure",
    "Gastronomy",
    "Culture",
    "Sightseeing",
    "City",
    "Sports",
    "Relax",
    "Nature",
  ],
};

export const interestsSlice = createSlice({
  name: "interestsFilter",
  initialState,
  reducers: {
    setTravelerInterests: (state, { payload: { interest, index } }) => {
      const interestExists = state.travelerInterests.some(
        (existingInterest) => existingInterest.interest === interest
      );
      if (!interestExists) {
        state.travelerInterests.push({ interest, index });
      } else {
        state.travelerInterests = state.travelerInterests.filter(
          (existingInterest) => existingInterest.interest !== interest
        );
      }
    },
    clearTravelerInterests: (state) => {
      state.travelerInterests = [];
    },
  },
});

export const { setTravelerInterests, clearTravelerInterests } =
  interestsSlice.actions;
export default interestsSlice.reducer;
