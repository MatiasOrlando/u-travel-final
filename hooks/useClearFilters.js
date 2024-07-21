import { clearAges } from "@/features/AgeRange/AgeRangeSlice";
import { clearBudgetValue } from "@/features/BudgetFilter/BudgetFilterSlice";
import { clearDates } from "@/features/DatesTravel/DatesTravelSlice";
import { clearTravelerInterests } from "@/features/Interests/InterestsSlice";
import { clearTravelersCompany } from "@/features/TravelersCompany/TravelersCompanySlice";
import { useDispatch } from "react-redux";

export const useClearFilters = () => {
  const dispatch = useDispatch();

  const removeAllFilters = () => {
    dispatch(clearAges());
    dispatch(clearDates());
    dispatch(clearBudgetValue());
    dispatch(clearTravelersCompany());
    dispatch(clearTravelerInterests());
  };

  return removeAllFilters;
};
