export const budgetAssignation = (budget) => {
  if (budget >= 500 && budget <= 1500) return "$";
  if (budget > 1500 && budget <= 2500) return "$$";
  if (budget > 2500 && budget <= 3500) return "$$$";
};

export const filterByBudget = (arr, budget) => {
  const budgetType = budgetAssignation(budget);
  return arr.filter((activity) => activity.budget.includes(budgetType));
};

export const filterByTravelingCompany = (arr, travelingCompany) => {
  return arr.filter((activity) => {
    const groupTypes = activity.groupType
      .toLowerCase()
      .split(",")
      .map((type) => type.trim());
    return (
      groupTypes.includes(travelingCompany.toLowerCase()) ||
      groupTypes.includes("all")
    );
  });
};

export const filterByInterests = (arr, arrOfInterests) =>
  arr.filter((activity) =>
    activity.interests.some((interest) =>
      arrOfInterests
        .map((el) => el.toLowerCase())
        .includes(interest.toLowerCase())
    )
  );

export const ageRangeAssignation = (minAge, maxAge) => {
  if (minAge >= 6 && maxAge <= 13) return "kids";
  if (minAge >= 14 && maxAge <= 17) return "teens";
  if (minAge >= 18) return "adults";
  return null;
};

export const filterByAgeRange = (arr, minAge, maxAge) => {
  return arr.filter((activity) => {
    if (activity.ageRange === "all ages") {
      return true;
    } else {
      const activityAgeRange = activity.ageRange.split(", ");
      for (let range of activityAgeRange) {
        if (range.includes("kids")) {
          if (ageRangeAssignation(minAge, maxAge) === "kids") {
            return true;
          }
        } else if (range.includes("teens")) {
          if (ageRangeAssignation(minAge, maxAge) === "teens") {
            return true;
          }
        } else if (range.includes("adults")) {
          if (ageRangeAssignation(minAge, maxAge) === "adults") {
            return true;
          }
        }
      }
      return false;
    }
  });
};

export const filteredActivities = (activities, filters) => {
  let filteredActivities = activities;

  if (filters.budget) {
    filteredActivities = filterByBudget(filteredActivities, filters.budget);
  }

  if (filters.travelingCompany) {
    filteredActivities = filterByTravelingCompany(
      filteredActivities,
      filters.travelingCompany
    );
  }

  if (filters.interests && filters.interests.length > 0) {
    filteredActivities = filterByInterests(
      filteredActivities,
      filters.interests
    );
  }

  if (filters.minAge && filters.maxAge) {
    filteredActivities = filterByAgeRange(
      filteredActivities,
      filters.minAge,
      filters.maxAge
    );
  }

  return filteredActivities;
};
