import authReducer from "@/features/Auth/AuthSlice";
import budgetFilterReducer from "@/features/BudgetFilter/BudgetFilterSlice";
import datesTravelSlice from "@/features/DatesTravel/DatesTravelSlice";
import travelersCompanySlice from "@/features/TravelersCompany/TravelersCompanySlice";
import ageRangeSlice from "@/features/AgeRange/AgeRangeSlice";
import { authApi } from "@/services/authServices";
import { shopApi } from "@/services/shopServices";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import interestsSlice from "@/features/Interests/InterestsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    budgetFilter: budgetFilterReducer,
    travelersCompanyFilter: travelersCompanySlice,
    datesPicker: datesTravelSlice,
    ageRangeFilter: ageRangeSlice,
    interestsFilter: interestsSlice,
    [shopApi.reducerPath]: shopApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(shopApi.middleware)
      .concat(authApi.middleware),
});

setupListeners(store.dispatch);

export default store;
