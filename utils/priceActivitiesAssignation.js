export const priceAssignationPerActivity = (arr, maxPrice) => {
  const numActivities = arr.length;
  const minPrice = 50;
  const arrayOfPrices = [];
  let remainingPrice = maxPrice;

  for (let i = 0; i < numActivities; i++) {
    const maxPossiblePrice =
      remainingPrice - (numActivities - i - 1) * minPrice;

    const randomPriceNumber =
      Math.floor(Math.random() * (maxPossiblePrice - minPrice + 1)) + minPrice;

    remainingPrice -= randomPriceNumber;

    arrayOfPrices.push({
      activity: arr[i],
      price: randomPriceNumber,
    });
  }

  return arrayOfPrices;
};
