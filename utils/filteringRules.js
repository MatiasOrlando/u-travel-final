const budgetAssignation = (budget) => {
  if (budget >= 500 && budget <= 1500) return "$";
  if (budget > 1500 && budget <= 2500) return "$$";
  if (budget > 2500 && budget <= 3500) return "$$$";
};

const filterByBudget = (arr, budget) => {
  const budgetType = budgetAssignation(budget);
  return arr.filter((activity) => activity.budget === budgetType);
};

const filterByTravelingCompany = (arr, travelingCompany) => {
  return arr.filter((activity) => {
    const groupTypes = activity.groupType
      .toLowerCase()
      .split(",")
      .map((type) => type.trim());
    return (
      groupTypes.includes(
        travelingCompany.travelersCompany.split("_")[0].toLowerCase()
      ) || groupTypes.includes("all")
    );
  });
};

const filterByInterests = (arr, arrOfInterests) =>
  arr.filter((activity) =>
    activity.interests.some((interest) =>
      arrOfInterests
        .map((el) => el.interest.toLowerCase())
        .includes(interest.toLowerCase())
    )
  );

const ageRangeAssignation = (minAge, maxAge) => {
  let ageCategories = [];

  if (minAge >= 6 && maxAge <= 13) {
    ageCategories.push("kids");
  }
  if (minAge >= 14 && maxAge <= 17) {
    ageCategories.push("teens");
  }
  if (minAge >= 18) {
    ageCategories.push("adults");
  }

  return ageCategories;
};

const filterByAgeRange = (arr, minAge, maxAge) => {
  const userAgeCategories = ageRangeAssignation(minAge, maxAge);

  return arr.filter((activity) => {
    if (activity.ageRange === "all ages") {
      return true;
    } else {
      const activityAgeRange = activity.ageRange.split(", ");
      return activityAgeRange.some((range) =>
        userAgeCategories.includes(range)
      );
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
