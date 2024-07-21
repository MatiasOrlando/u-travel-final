import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  budgetValue: 500,
};

export const budgetFilterSlice = createSlice({
  name: "budgetFilter",
  initialState,
  reducers: {
    setBudgetValue: (state, { payload }) => {
      state.budgetValue = payload;
    },
    clearBudgetValue: (state) => {
      state.budgetValue = 500;
    },
  },
});

export const { setBudgetValue, clearBudgetValue } = budgetFilterSlice.actions;
export default budgetFilterSlice.reducer;
